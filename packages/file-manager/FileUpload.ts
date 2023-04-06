import {FileInfo} from "./interface";

class FileUpload {
    public fileInfo: FileInfo;
    public file: File;
    public callback?: (percent: number) => void;
    public percent: number = 0;


    constructor(fileInfo: FileInfo, file: File) {
        this.fileInfo = fileInfo;
        this.file = file;
    }

    public onProgress(percent: number) {
        this.percent = percent;
        this.callback?.(percent);
    }
}

export default FileUpload;
