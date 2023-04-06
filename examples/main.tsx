import React from "react";
import ReactDOM from "react-dom/client";

//
// const getFiles = (pageIndex: number, group: string, fileType: string): Promise<any> => {
//     return Promise.resolve(undefined);
// }
// const groups = [
//     {value: "", label: "全部"},
//     {value: "1", label: "文章"},
//     {value: "2", label: "医师头像"},
// ];
//
// init({
//     loadFile: function (pageIndex: number, accept?: string, group?: string): Promise<FilePagination> {
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve({
//                     pageIndex: 1,
//                     total: 100,
//                     data: [
//                         {
//                             title: "1111",
//                             cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fbf6fe5f0-4e5c-4dd1-9545-f58151164f0c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683289020&t=d625b97d43070e0a71d5f38daa576f2a",
//                             accept: "image/png",
//                             size: 100
//                         }
//                     ]
//                 });
//             }, 300);
//         });
//     },
//     uploadFile: function (file: File, onProgress: (progress: number) => void): Promise<FileInfo> {
//         return new Promise(resolve => {
//             let i = 0;
//             let a = setInterval(() => {
//                 onProgress(i);
//
//                 if (i >= 100) {
//                     clearInterval(a);
//                     resolve({
//                         title: "1111",
//                         cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fbf6fe5f0-4e5c-4dd1-9545-f58151164f0c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683289020&t=d625b97d43070e0a71d5f38daa576f2a",
//                         accept: "image/png",
//                         size: 100
//                     });
//                 }
//
//                 i++;
//             }, 1000);
//         });
//     },
//     fileType: [{accept: "*/*", label: "All"}, {accept: "image/*", label: "图片"}],
//     group: groups
// })
//
//
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <div style={{
        width: '100vw',
        height: '100vh',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue"
    }}>

        {/*<div style={{display: "inline", background: "red"}}>*/}
        {/*    <FileManager getFiles={getFiles} onCancel={() => {*/}
        {/*        console.log("AA");*/}
        {/*    }} waitUploadFile={[]} groups={groups}/>*/}
        {/*</div>*/}
    </div>
);
