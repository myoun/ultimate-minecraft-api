import { HttpService } from "@nestjs/axios";
import { Controller, Get, Param, Redirect } from "@nestjs/common";
import { DownloadService } from "./download.service";

@Controller("/download")
export class DownloadController {

    constructor(private readonly downloadService: DownloadService, private readonly httpService: HttpService) {}

    // Spigot Download Api

    @Get("/spigot/:version")
    @Redirect()
    getSpigotDownloadUrl(@Param("version") version: string) {
        return {
            "url" : this.downloadService.generateSpigotDownloadUrl(version)
        }
    }

    // Paper Download Api

    @Get("/paper/:version")
    @Redirect()
    async getPaperDownloadUrl(@Param("version") version: string) {
        if (version == "latest") {  
            // Get Latest Version
            version = await DownloadService.paperLatestVersion
            if (!version) {
                return  {
                    "statusCode" : 204
                }
            }
        }
        const build = await this.downloadService.getLatestPaperBuild(version);
        return {
            "url" : this.downloadService.generatePaperDownloadUrl(version, build)
        }
    }

    @Get("/paper/:version/:build")
    @Redirect()
    async getPaperDownloadUrlWithBuild(@Param("version") version: string, @Param("build") build: string) {
        if (version == "latest") {
            // Get Latest Version
            version = await DownloadService.paperLatestVersion
        }    
        return {
            "url" : this.downloadService.generatePaperDownloadUrl(version, parseInt(build))
        }
    }

    @Get("/vanilla/:version")
    @Redirect()
    async getVanillaDownloadUrl(@Param("version") version: string) {
        if (version == "latest") {
            version = DownloadService.vanilaLatestVersion
        }
        const url: string = DownloadService.vanillaServerUrlMap[version]
        if (!url) {
            return  {
                "statusCode" : 404
            }
        }
        return {
            "url" : url
        }
    }

    
}