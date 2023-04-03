import {RcFile} from "antd/es/upload/interface";

export interface FileType {
		accept: string;
		label: string;
}

export interface GroupProps {
		title: string;
		id: string;
}

export interface FileSelectorContentProps {
		fileTypes: FileType[];
		getFiles: (pageIndex: number, group: string, fileType: string) => Promise<any>;
		limitFileType?: string;
		multiple?: boolean;
		onUpload?: (file: MyFile) => Promise<any>;
}

export interface FileSelectorGroupProps {
		groups?: GroupProps[];
		currentGroup?: string;
}

export interface FileSelectorProps extends FileSelectorContentProps, FileSelectorGroupProps {
}

export interface MyFile {
		title: string;
		cover: string;
		file?: RcFile;
		progress?: number;
		onUploading?: (progress: number) => void;
}

export interface FilePagination {
		total: number;
		pageIndex: number;
		data: MyFile[];
}
