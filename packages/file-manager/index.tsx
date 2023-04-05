import {ReactFileManagerConfig} from "./interface";
import Global from "./Global";
import FileSelectorRoot from "./root";

const ReactFileManager = {
    init: (config: ReactFileManagerConfig) => {
        Global.config = config;
    }
}

const ReactFileManagerNode = FileSelectorRoot;

export {ReactFileManager, ReactFileManagerNode};


// import {FileSelectorProps, MyFile} from "./Props";
// import React from "react";
// import FileSelectorRoot from "./root";
// import ReactDialog from 'react-dialog';
//
// let _options: FileSelectorProps;
// let _waitUploadFile: MyFile[] = [];
// const FileSelector = {
//     init(options: FileSelectorProps) {
//         _options = options;
//     },
//     show(op: { currentGroup?: string, limitFileType?: string }) {
//         const file = <FileSelectorRoot {..._options} onCancel={this.close}
//                                        limitFileType={op.limitFileType}
//                                        currentGroup={op.currentGroup}
//                                        waitUploadFile={_waitUploadFile}/>;
//         new ReactDialog().show(
//             {
//                 title: "文件资源管理器",
//                 children: file,
//                 onCancel: (e) => {
//                     e.close();
//                 }
//             }
//         );
//         // ReactDialog.
//         // let fileSelectorDocument = document.createElement("div");
//         // fileSelectorDocument.setAttribute("id", "file-selector");
//         // fileSelectorDocument.setAttribute("class", "file-selector");
//         // document.body.insertBefore(fileSelectorDocument, null);
//         //
//         // fileSelectorReactRoot = ReactDOM.createRoot(fileSelectorDocument);
//         //
//         //
//         // // const fileSelector = FileSelectorRoot({
//         // // 		..._options, ...op,
//         // // 		waitUploadFile: _waitUploadFile,
//         // // 		onCancel: this.close
//         // // });
//         // // fileSelectorReactRoot.render(ReactNode);
//         //
//         // fileSelectorReactRoot.render(<FileSelectorRoot {..._options} onCancel={this.close}
//         // 																							 limitFileType={op.limitFileType}
//         // 																							 currentGroup={op.currentGroup}
//         // 																							 waitUploadFile={_waitUploadFile}/>);
//     },
//     close() {
//         // fileSelectorReactRoot.unmount();
//         // document.body.removeChild(document.getElementById("file-selector")!);
//     }
// };
//
// export default FileSelector;
