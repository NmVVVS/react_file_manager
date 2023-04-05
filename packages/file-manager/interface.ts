import {RcFile} from "antd/es/upload/interface";

export interface FileType {
    accept: string;
    label: string;
}

export interface FileGroup {
    label: string;
    value: string;
}

export interface FileSelectorContentProps {
    fileType?: FileType[];
    getFiles: (pageIndex: number, group: string, fileType: string) => Promise<any>;
    limitFileType?: string;
    multiple?: boolean;
    // onUpload?: (file: MyFile) => Promise<any>;
}

export interface FileSelectorGroupProps {
    groups?: FileGroup[];
    currentGroup?: string;
}

export interface FileSelectorProps extends FileSelectorContentProps, FileSelectorGroupProps {
}

// export interface MyFile {
//     title: string;
//     cover: string;
//     file?: RcFile;
//     progress?: number;
//     onUploading?: (progress: number) => void;
// }

export interface FilePagination {
    total: number;
    pageIndex: number;
    data: FileInfo[];
}

export interface FileInfo {
    title: string;
    cover: string;
    accept: string;
    size: number;
    // onUploading?: (progress: number) => void;
}


export interface ReactFileManagerConfig {
    loadFile: (pageIndex: number, pageSize: number, accept?: string, group?: string) => Promise<FilePagination>;
    uploadFile: (file: File) => Promise<FileInfo>;
    fileType?: FileType[];
    group?: FileGroup[];
}
