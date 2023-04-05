import React from "react";
import ReactDOM from "react-dom/client";
import ReactFileManager, {ReactFileManagerNode} from "../packages";
import {FileInfo, FilePagination} from "../packages/file-manager/interface";


// const options: FileSelectorProps = {
//     fileTypes: [
//         {accept: "image/*", label: "图片"},
//     ],
//     groups: [
//         {id: "", title: "全部"},
//         {id: "1", title: "文章"},
//         {id: "2", title: "医师头像"},
//     ],
//     getFiles(pageIndex: number, group: string, fileType: string): Promise<any> {
//         return Promise.resolve(undefined);
//     }
//
// }

const getFiles = (pageIndex: number, group: string, fileType: string): Promise<any> => {
    return Promise.resolve(undefined);
}
const groups = [
    {value: "", label: "全部"},
    {value: "1", label: "文章"},
    {value: "2", label: "医师头像"},
];


ReactFileManager.init({
    loadFile: function (pageIndex: number, pageSize: number, accept?: string, group?: string): Promise<FilePagination> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    pageIndex: 1,
                    total: 100,
                    data: [
                        {
                            title: "1111",
                            cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fbf6fe5f0-4e5c-4dd1-9545-f58151164f0c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683289020&t=d625b97d43070e0a71d5f38daa576f2a",
                            accept: "image/png",
                            size: 100
                        }
                    ]
                });
            }, 3000);
        });
    },
    uploadFile: function (file: File): Promise<FileInfo> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({} as FileInfo);
            }, 3000);
        });
    },
    fileType: [{accept: "*/*", label: "All"}, {accept: "image/*", label: "图片"}],
    group: groups
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <div style={{
        width: '100vw',
        height: '100vh',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue"
    }}>
        <div style={{display: "inline", background: "red"}}>
            <ReactFileManagerNode getFiles={getFiles} onCancel={() => {
                console.log("AA");
            }} waitUploadFile={[]} groups={groups}/>
        </div>
    </div>
);
