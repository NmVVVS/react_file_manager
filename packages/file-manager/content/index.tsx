import React, {useMemo, useState} from "react";
import Style from './index.module.scss'
import {Checkbox, Empty, Image, Progress} from "antd";
import {FileInfo} from "../interface";


interface FileSelectorContentEvent {
    fileList?: FileInfo[];
    onSelectedFileChange: (selectedFiles: FileInfo[]) => void;
}

const FileSelectorContent: React.FC<FileSelectorContentEvent & { multiple: boolean }> = (props) => {
    const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);


    const onItemSelected = (selected: boolean, file: FileInfo) => {
        if (selected) {
            if (props.multiple === undefined || !props.multiple) {
                selectedFiles.splice(0, selectedFiles.length);
            }
            selectedFiles.push(file);
            setSelectedFiles([...selectedFiles]);
        } else {
            selectedFiles.splice(selectedFiles.indexOf(file), 1);
            setSelectedFiles([...selectedFiles]);
        }
        props.onSelectedFileChange(selectedFiles);
    }

    const fileContent = useMemo(() => {
        return props.fileList?.map((item, index) => {
            return <div className={Style.fileItem} key={index}>
                <Checkbox checked={selectedFiles.indexOf(item) !== -1} className={Style.checkbox}
                          onChange={(e) => onItemSelected(e.target.checked, item)}/>
                <div className={Style.coverContainer}>
                    <Image src={item.cover} width={100} height={100}/>
                    <div className={Style.title}>{item.title}</div>
                </div>
                {/*{*/}
                {/*    item.progress === undefined ? null : <Progress percent={item.progress}/>*/}
                {/*}*/}
            </div>
        })
    }, [props.fileList, selectedFiles]);


    return useMemo(() => {
        if (props.fileList === undefined || props.fileList?.length === 0) return <Empty/>
        return <div className={Style.contentRoot}>
            <div className={Style.content}>
                {fileContent}
            </div>
        </div>
    }, [props.fileList]);
}

export default FileSelectorContent;
