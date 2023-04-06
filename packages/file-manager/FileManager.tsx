import React, {useEffect, useMemo, useState} from "react";
import Style from '../assets/style/file.manager.module.scss';
import {FileGroup, FileInfo, FileManagerProps, FileResponse, FileType} from "./interface";
import {Config} from "./init";
import {Button, Checkbox, Image, Input, Pagination, Popover, Progress, Radio, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload/interface";
import {useGetState, useMap} from "ahooks";
import FileUpload from "./FileUpload";


const init = (props: FileManagerProps) => {
    const config: FileManagerProps = {...Config, ...props};
    if (props.onRequest !== undefined) {
        config.onRequest = props.onRequest;
    } else if (Config.onRequest !== undefined) {
        config.onRequest = Config.onRequest;
    } else {
        throw new Error("未设置onRequest，请先调用 init 设置，或者在组件中传入！");
    }
    return config;
}


const FileManager: React.FC<FileManagerProps> = (props) => {

    const [currentGroup, setCurrentGroup] = useState<FileGroup>(), [currentType, setCurrentType] = useState<FileType>(),
        [showGroupEl, setShowGroupEl] = useState<boolean>(false), [datasource, setDatasource, getDatasource] = useGetState<FileResponse>();
    const [uploadingFileMap, {set, setAll, remove, get}] = useMap<FileInfo, FileUpload>();
    const config = init(props);


    const upload = (file: RcFile) => {
        const cover = URL.createObjectURL(file);
        const fileInfo = {label: file.name, cover: cover, value: file.type} as FileInfo;
        const fileUpload = new FileUpload(fileInfo, file);
        config.onUpload!(file, fileUpload.onProgress.bind(fileUpload));

        set(fileInfo, fileUpload);
        // setAll(uploadingFileMap);
        // setUploadingFileMap(getUploadingFileMap());

        // Global.fileUpload.push(fileUpload);
        // Global.config?.uploadFile(file, fileUpload.onProgress.bind(fileUpload));
        setDatasource({...datasource!, data: [fileInfo, ...getDatasource()!.data!]});
        //
        // setInterval(() => {
        //     console.log(uploadingFileMap);
        //     // setAll(uploadingFileMap);
        //     //     // console.log(getUploadingFileMap());
        //     //     // setUploadingFileMap(getUploadingFileMap());
        // }, 1000);
    }

    let groupEl, typeEl, uploadEl, addGroupEl;
    if (config.onGroupEdit !== undefined) {
        addGroupEl = <Popover style={{width: 500}} content={<Input/>} trigger="click" open={showGroupEl}>
            <Button type="link" onClick={() => setShowGroupEl(true)}>新增分组</Button>
        </Popover>
    }
    if (config.group !== undefined) {
        groupEl = <>
            <ul className={Style.groupList}>
                {
                    config.group.map(item => {
                        return <li key={item.value}
                                   className={item.value === currentGroup?.value ? Style.active : ''}
                                   onClick={() => setCurrentGroup(item)}>{item.label}</li>;
                    })
                }
            </ul>
            {addGroupEl}
        </>
    }

    if (config.type !== undefined) {
        // setCurrentType(config.type[0]);
        typeEl = <Radio.Group
            options={config.type.map(item => ({...item, value: item.accept}))} optionType="button"
            value={currentType?.accept} buttonStyle="solid"
            onChange={(e) => setCurrentType(config.type?.find(item => item.accept === e.target.value))}/>;
    }

    if (config.onUpload !== undefined) {
        uploadEl = <Upload accept={currentType?.accept} beforeUpload={upload} showUploadList={false}>
            <Button type="primary" icon={<UploadOutlined/>}>点击上传</Button>
        </Upload>;
    }

    useEffect(() => {
        config.onRequest!({type: "", pageIndex: 1, group: ""}).then(res => {
            setDatasource(res);
        });
    }, []);

    useEffect(() => {
        if (uploadingFileMap.size === 0) return;
        // setTimeout(() => {
        //     setAll(uploadingFileMap);
        // }, 1000);
    }, [uploadingFileMap]);

    const fileList = useMemo(() => {
        // console.log("AA");
        return datasource?.data.map((item, index) => {
            // let fileUpload: FileUpload;
            // if (fileUpload?.percent === 100) remove(item);
            return <div className={Style.fileItem} key={index}>
                <div><Image src={item.cover} width={100} height={100}/></div>
                <div className={Style.title}>{item.label}</div>

                {/*{*/}
                {/*    fileUpload ?*/}
                {/*        <div className={Style.uploadContainer}>*/}
                {/*            <Progress type="circle" percent={fileUpload!.percent} size={50}*/}
                {/*                      strokeWidth={12}/>*/}
                {/*        </div> :*/}
                {/*        <Checkbox className={Style.checkbox}/>*/}
                {/*}*/}

            </div>
        });
    }, [datasource, uploadingFileMap]);


    return <div className={Style.container}>
        <div className={Style.group}>
            {groupEl}
        </div>
        <div className={Style.body}>
            <div className={Style.toolbar}>
                <div className={Style.type}>{typeEl}</div>
                <div className={Style.uploadBtn}>{uploadEl}</div>
            </div>
            <div className={Style.content}>
                {fileList}
            </div>
            <div className={Style.pagination}><Pagination/></div>
        </div>
    </div>
}

export default FileManager;
