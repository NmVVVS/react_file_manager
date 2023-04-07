import React from "react";
import ReactDOM from "react-dom/client";
// import {openDialog} from "@ghgenz/react-dialog";
import FileManager, {init} from "../packages";
import {FileInfo, FileRequest} from "../packages/file-manager/interface";
import {openDialog} from "@ghgenz/react-dialog";


const getFiles = (pageIndex: number, group: string, fileType: string): Promise<any> => {
    return Promise.resolve(undefined);
}
const groups = [
    {value: "", label: "全部"},
    {value: "1", label: "文章"},
    {value: "2", label: "医师头像"},
];


init({
    group: groups,
    type: [{accept: "*/*", label: "All"}, {accept: "image/*", label: "图片"}],
    onRequest: (params: FileRequest) => {
        return new Promise(resolve => {

            const item: FileInfo = {
                label: "111",
                value: "111",
                cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F12f18496-3075-4367-b599-ae390f0e0b37%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683363538&t=b024e2b3378e14af47432f1992d93899"
            };

            const result: FileInfo[] = [];
            for (let i = 0; i < 18; i++) {
                result.push({...item, value: item.value + i});
            }

            resolve({pageIndex: 1, total: 100, data: []});
        });
    },
    onUpload: (file, onProgress) => {
        return new Promise(resolve => {
            let i = 0;
            let a = setInterval(() => {
                onProgress(i);

                if (i >= 100) {
                    clearInterval(a);
                    resolve({
                        title: "1111",
                        cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fbf6fe5f0-4e5c-4dd1-9545-f58151164f0c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683289020&t=d625b97d43070e0a71d5f38daa576f2a",
                        accept: "image/png",
                        size: 100
                    });
                }
                i++;
            }, 1000);
        });
    },
    onGroupEdit: (group) => {
        return new Promise((resolve) => {

        });
    },
    onSelected: (files) => {
        console.log(files);
    }
})


const fileManager = <FileManager/>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <div>
        <button onClick={() => {
            const closeDialog = openDialog({
                width: 735,
                title: "文件管理器",
                children: <FileManager count={2}/>,
                // onOk: () => {
                //     closeDialog();
                // }
            })
        }}>显示
        </button>
    </div>
);
