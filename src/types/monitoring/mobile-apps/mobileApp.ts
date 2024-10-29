export interface MobileAppType {
    id: string;
    appName: string;
    downloadLink: string;
    releaseDate: string;
    version: string;
    source: string;
    digitalSignature: string;
    apkHash: string;
    details: any;
    score: number;
}

export interface Detail {
    language: string;
    downloads: string;
    permissions: string[];
}