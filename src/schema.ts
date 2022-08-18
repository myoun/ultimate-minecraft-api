export interface PaperProjectResponse {
    project_id: string
    project_name: string
    version_groups: string[]
    versions: string[]
}

export interface PaperBuildResponse {
    project_id: string
    project_name: string
    version: string
    builds: PaperBuildInfo[]
}

export interface PaperBuildInfo {
    build: number
    time: string
    channel: string
    promoted: boolean
    changes: PaperBuildChange[]
    downloads: PaperBuildDownloads
}

export interface PaperBuildChange {
    commit: string
    summary: string
    message: string
}

export interface PaperBuildDownloads {
    application: PaperBuildDownloadInfo
    ["mojang-mappings"]: PaperBuildDownloadInfo
}

export interface PaperBuildDownloadInfo {
    name: string
    sha256: string
}

export interface VanillaVersionManifestResponse {
    latest : {
        release: string
        snapshot: string
    }
    versions: VanillaVersionInfo[]
}

export interface VanillaVersionInfo {
    id: string
    type: "release" | "snapshot" | "old_beta" | "old_alpha"
    url: string
    time: string
    releaseTime: string
}

export interface VanilaVersionSpecificResponse {
    downloads: {
        client: VanilaVersionSpecificDownloads
        server: VanilaVersionSpecificDownloads
    }
}

export interface VanilaVersionSpecificDownloads {
    sha1: string
    size: number
    url: string
}