export interface FileGroup {
    value: string;
    label: string;
}

export interface FileType {
    accept: string;
    label: string;
}

export interface FileInfo {
    value: string;
    label: string;
    cover: string;
}

export interface FileRequest {
    pageIndex: number;
    type?: string;
    group?: string;
}

export interface FileResponse {
    pageIndex: number;
    total: number;
    data: FileInfo[];
}

export interface FileManagerProps {
    group?: FileGroup[];
    type?: FileType[];
    onRequest?: (params: FileRequest) => Promise<FileResponse>;
    onUpload?: (file: File, onProgress: (progress: number) => void) => Promise<any>;
    onRemoveFile?: (file: FileInfo[]) => Promise<any>;
    count?: number;
    onGroupEdit?: (group: FileGroup) => Promise<any>;
    limitType?: FileType;
}
