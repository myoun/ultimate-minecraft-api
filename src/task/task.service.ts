import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { firstValueFrom } from "rxjs";
import { DownloadService } from "src/download/download.service";
import { PaperBuildResponse, PaperProjectResponse, VanilaVersionSpecificResponse, VanillaVersionManifestResponse } from "src/schema";

@Injectable()
export class TaskService {

    private readonly logger = new Logger(TaskService.name);

    constructor(private readonly httpService: HttpService) {}

    @Cron(CronExpression.EVERY_30_MINUTES)
    async crawlVersionBuildInfo() {
        // Get All Paper Versions

        this.logger.log(`Crawling paper latest version...`);

        const projectResponse = await firstValueFrom(this.httpService.get<PaperProjectResponse>("https://api.papermc.io/v2/projects/paper/"));
        const versions = projectResponse.data.versions
        const latestVersion = versions.at(-1);

        DownloadService.paperLatestVersion = latestVersion;

        this.logger.log(`Updating paper version build...`)
        versions.forEach(async version => {
            const buildResponse = await firstValueFrom(this.httpService.get<PaperBuildResponse>(`https://api.papermc.io/v2/projects/paper/versions/${version}/builds/`));
            const buildNumber = buildResponse.data.builds.at(-1).build;
            DownloadService.paperBuildMap[version] = buildNumber;
        });
    }

    @Cron(CronExpression.EVERY_30_MINUTES)
    async crawlVanillaServerVersionInfo() {
        this.logger.log(`Crawling vanilla latest version...`)

        const versionManifestResponse = await firstValueFrom(this.httpService.get<VanillaVersionManifestResponse>("http://launchermeta.mojang.com/mc/game/version_manifest.json"));
        
        // Set Latest Version (Release)
        DownloadService.vanilaLatestVersion = versionManifestResponse.data.latest.release

        versionManifestResponse.data.versions.forEach(async versionInfo => {            
            const response = await firstValueFrom(this.httpService.get<VanilaVersionSpecificResponse>(versionInfo.url));
            const server = response.data.downloads.server;
            if (response.data.downloads.server != undefined) {
                DownloadService.vanillaServerUrlMap[versionInfo.id] = server.url;
            }
        })
    }
}