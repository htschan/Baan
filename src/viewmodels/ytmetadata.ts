export class YtMetaDataVm {
    downloadFile: string;
    url: string;
    message: string;
    result: boolean;
    metaData: MetaData;
}

export class MetaData {
    author: string;
    description: string;
    duration: string;
    id: string;
    keywords: string[];
    statistics: Statistics;
    title: string;
    uploadDate: Date;
    thumbnailStandardRes: string;
}

export class Statistics {
    averageRating: number;
    dislikeCount: number;
    likeCount: number;
    viewCount: number;
}
