import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom, map } from "rxjs";

@Injectable()
export class DownloadService {

    static paperBuildMap = new Map<string, number>()
    static paperLatestVersion: string | undefined;
    static vanillaServerUrlMap: Map<string, string> = new Map<string, string>();
    static vanilaLatestVersion: string | undefined;

    generateSpigotDownloadUrl(version: string): string {
        return `https://download.getbukkit.org/spigot/spigot-${version}.jar`
    }

    getLatestPaperBuild(version: string): number {
        return DownloadService.paperBuildMap[version];
    }

    generatePaperDownloadUrl(version: string, build: number): string {
        return `https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}/downloads/paper-${version}-${build}.jar`
    }

}