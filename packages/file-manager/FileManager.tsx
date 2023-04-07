import React, {useEffect, useMemo, useState} from "react";
import Style from '../assets/style/file.manager.module.scss';
import {FileGroup, FileInfo, FileManagerProps, FileResponse, FileType} from "./interface";
import {Config} from "./init";
import {Button, Checkbox, Empty, Image, Input, message, Pagination, Popover, Progress, Radio, Upload} from "antd";
import {RcFile} from "antd/es/upload/interface";
import {useGetState, useMap} from "ahooks";
import FileUpload from "./FileUpload";
import {UploadOutlined} from "@ant-design/icons";


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
    const config = init(props);

    const [currentGroup, setCurrentGroup] = useState<FileGroup>(), [currentType, setCurrentType] = useState<FileType>(),
        [showGroupEl, setShowGroupEl] = useState<boolean>(false), [messageApi, contextHolder] = message.useMessage(),
        [datasource, setDatasource, getDatasource] = useGetState<FileResponse>(), [selectedFile, setSelectedFile] = useState<FileInfo[]>([]);
    const [uploadingFileMap, {set, setAll, remove, get}] = useMap<FileInfo, FileUpload>();


    const upload = (file: RcFile) => {
        const cover = URL.createObjectURL(file);
        const fileInfo = {label: file.name, cover: cover, value: file.type} as FileInfo;
        const fileUpload = new FileUpload(fileInfo, file);
        config.onUpload!(file, fileUpload.onProgress.bind(fileUpload));

        set(fileInfo, fileUpload);
        setDatasource({...datasource!, data: [fileInfo, ...getDatasource()!.data!]});
    }

    const addGroupEl = useMemo(() => {
        if (config.onGroupEdit === undefined) return null;
        return <Popover style={{width: 500}} content={<Input/>} trigger="click" open={showGroupEl}>
            <Button type="link" onClick={() => setShowGroupEl(true)}>新增分组</Button>
        </Popover>
    }, []);
    // if (config.onGroupEdit !== undefined) {
    //     addGroupEl =
    // }
    const groupEl = useMemo(() => {
        if (config.group === undefined) return null;
        if (currentGroup === undefined) setCurrentGroup(config.group[0]);
        return <>
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
    }, [currentGroup]);
    // if (config.group !== undefined) {
    //     groupEl =
    // }

    const typeEl = useMemo(() => {
        if (config.type === undefined) return null;
        if (currentType === undefined) setCurrentType(config.type[0]);
        return <Radio.Group
            options={config.type.map(item => ({...item, value: item.accept}))} optionType="button"
            value={currentType?.accept} buttonStyle="solid"
            onChange={(e) => setCurrentType(config.type?.find(item => item.accept === e.target.value))}/>
    }, [currentType]);
    // if (config.type !== undefined) {
    //     // setCurrentType(config.type[0]);
    //     typeEl = ;
    // }

    const uploadEl = useMemo(() => {
        if (config.onUpload === undefined) return null;
        return <Upload accept={currentType?.accept} beforeUpload={upload} showUploadList={false}>
            <Button type="primary" icon={<UploadOutlined/>}>点击上传</Button>
        </Upload>;
    }, []);
    // if (config.onUpload !== undefined) {
    //     uploadEl =
    // }

    useEffect(() => {
        config.onRequest!({type: "", pageIndex: 1, group: ""}).then(res => {
            setDatasource(res);
        });
    }, []);

    useEffect(() => {
        if (uploadingFileMap.size === 0) return;
        setTimeout(() => {
            // console.log(uploadingFileMap);
            setAll(uploadingFileMap);
        }, 1000);
    }, [uploadingFileMap]);

    const onSelected = (checked: boolean, file: FileInfo) => {
        const index = selectedFile.findIndex(item => item.value === file.value);
        if (index > -1) {
            if (!checked) {
                selectedFile.splice(index, 1);
            }
        } else {
            if (checked) {
                if (props.count !== undefined) {
                    if (props.count > selectedFile.length) {
                        selectedFile.push(file);
                    } else {
                        messageApi.error(`当前仅允许选择${props.count}个文件`)
                    }
                } else {
                    selectedFile.push(file);
                }

            }
        }
        setSelectedFile([...selectedFile]);
        config.onSelected?.(selectedFile);
    }

    const fileList = useMemo(() => {
        if (datasource?.data.length === 0) return <div
            style={{height: '100%', display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Empty description="这里空空如也~"/>
        </div>

        return datasource?.data.map((item, index) => {
            let fileUpload: FileUpload | undefined = get(item);
            if (fileUpload?.percent === 100) remove(item);
            return <div className={Style.fileItem} key={index}>
                <div><Image src={item.cover} width={100} height={100}/></div>
                <div className={Style.title}>{item.label}</div>
                {
                    fileUpload ?
                        <div className={Style.uploadContainer}>
                            <Progress type="circle" percent={fileUpload!.percent} size={50}
                                      strokeWidth={12}/>
                        </div> :
                        <Checkbox className={Style.checkbox}
                                  checked={selectedFile.findIndex(file => file.value === item.value) > -1}
                                  onChange={(e) => onSelected(e.target.checked, item)}/>
                }
            </div>
        });
    }, [datasource, uploadingFileMap, selectedFile]);


    return <>
        {contextHolder}
        <div className={Style.container}>
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
    </>
}

export default FileManager;
