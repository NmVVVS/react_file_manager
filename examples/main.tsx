import React from "react";
import ReactDOM from "react-dom/client";
import ReactFileManager from "../packages";
import {FileSelectorProps} from "../packages/file-manager/Props";


const options: FileSelectorProps = {
    fileTypes: [
        {accept: "image/*", label: "图片"},
    ],
    groups: [
        {id: "", title: "全部"},
        {id: "1", title: "文章"},
        {id: "2", title: "医师头像"},
    ],
    getFiles(pageIndex: number, group: string, fileType: string): Promise<any> {
        return Promise.resolve(undefined);
    }

}


ReactFileManager.init(options);

const onClick = () => {
    ReactFileManager.show({});
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <div>
        <button onClick={onClick}>点击</button>
    </div>
);
