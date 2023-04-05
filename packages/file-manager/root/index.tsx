import React, {useEffect, useMemo, useRef, useState} from "react";
import {FileGroup, FileInfo, FilePagination, FileSelectorProps, FileType} from "../interface";
import Style from './index.module.scss';
import FileSelectorGroup from "../group";
import FileSelectorContent from "../content";
import {Button, Pagination, Radio, Spin, Upload} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import Global from "../Global";
import {CheckboxOptionType} from "antd/es/checkbox/Group";

const FileSelectorRoot = (props: FileSelectorProps & { onCancel: VoidFunction, waitUploadFile: FileInfo[] }) => {

    const [loading, setLoading] = useState<boolean>(false),
        [currentFileType, setCurrentFileType] = useState<string>(""),
        [datasource, setDatasource] = useState<FilePagination>(), _currentGroup = useRef<string>(""),
        query = useRef<{ fileType?: string, group?: string, pageIndex?: number }>({});
    let group: FileGroup[], [fileTypeOption, setFileTypeOption] = useState<CheckboxOptionType[]>();
    useEffect(() => {
        if (Global.config === undefined) {
            console.error("react-file-manager 暂未初始化，请先调用【ReactFileManager.init】初始化后重试！")
        }

        if (props.groups !== undefined) {
            group = props.groups;
        } else if (Global.config?.group !== undefined) {
            group = Global.config.group;
        }

        let fileType: FileType[] | undefined = undefined;
        if (props.fileType !== undefined) {
            fileType = props.fileType;
        } else if (Global.config?.fileType !== undefined) {
            fileType = Global.config?.fileType;
        }

        if (fileType !== undefined) {
            fileTypeOption = fileType.map(item => ({
                label: item.label,
                value: item.accept,
                disabled: false
            }));
        }
        // item.accept !== props.limitFileType

        if (fileTypeOption !== undefined) {
            if (props.limitFileType !== undefined) {
                fileTypeOption = fileTypeOption.map(item => ({...item, disabled: item.value !== props.limitFileType}));
            }
            query.current.fileType = fileType![0].accept;
            setCurrentFileType(fileType![0].accept);
            setFileTypeOption([...fileTypeOption]);
        }

        if (group !== undefined) {
            query.current.group = group![0].value;
        }

        query.current.pageIndex = 1;

        loadFileList();

    }, []);

    const onFileTypeChange = (fileType: string) => {
        query.current.fileType = fileType;
        loadFileList();
    }

    const onGroupChange = (groupId: string) => {
        query.current.group = groupId;
        loadFileList();
    }

    const onPageChange = (pageIndex: number) => {
        query.current.pageIndex = pageIndex;
        loadFileList();
    }

    const onSelectedFileChange = (selectedFiles: FileInfo[]) => {
        console.log(selectedFiles);
    }

    const loadFileList = () => {
        setLoading(true);
        Global.config?.loadFile(query.current.pageIndex || 1, 18, query.current.fileType || "", query.current.group || "").then(res => {
            setDatasource({...res});
            setLoading(false);
        });
    }

    const groupNode = useMemo(() => {
        if (group === undefined) return null;
        _currentGroup.current = group[0].value;
        return <>
            <FileSelectorGroup group={group} onGroupChange={onGroupChange}/>
            <div className={Style.driver}></div>
        </>
    }, [])

    // function fileUploadProgress(this: MyFile, progress: number) {
    //     this.progress = progress;
    //     setFilePagination({...filePagination!, data: [...getFilePagination()!.data]});
    // }
    //
    // const upload = (file: RcFile) => {
    //     if (props.onUpload === undefined) return false;
    //     if (filePagination === undefined) return false;
    //     if (filePagination.data.length >= 18) filePagination.data.shift();
    //
    //     const newFile: MyFile = {title: file.name, cover: '', onUploading: fileUploadProgress, file};
    //     props.waitUploadFile.push(newFile);
    //     filePagination.data.unshift(newFile);
    //     setFilePagination({...filePagination, data: [...filePagination.data]});
    //
    //     props.onUpload(newFile).then(r => {
    //         newFile.cover = r;
    //         delete newFile.progress;
    //         delete newFile.file;
    //         delete newFile.onUploading;
    //         props.waitUploadFile.splice(props.waitUploadFile.indexOf(newFile, 1));
    //         setFilePagination({...filePagination, data: [...getFilePagination()!.data]});
    //     });
    //     return false;
    // }
    //

    const fileTypeRadioGroup = useMemo(() => {
        if (fileTypeOption === undefined) return null;

        return <Radio.Group
            options={fileTypeOption} optionType="button" value={currentFileType} buttonStyle="solid"
            onChange={(e) => onFileTypeChange(e.target.value)}/>
    }, [fileTypeOption, currentFileType]);

    const toolbar = useMemo(() => {
        return <div className={Style.toolbarContainer}>
            {fileTypeRadioGroup}
            {/*beforeUpload={upload}*/}
            <Upload accept={currentFileType} showUploadList={false}>
                <Button type="primary" icon={<UploadOutlined/>}>点击上传</Button>
            </Upload>
        </div>
    }, [currentFileType, fileTypeOption]);

    const pagination = useMemo(() => {
        return <div className={Style.pagination}>
            <Pagination total={datasource?.total} pageSize={18}
                        current={datasource?.pageIndex}
                        showSizeChanger={false} onChange={(page: number) => onPageChange(page)}/>
        </div>
    }, [datasource]);

    return <Spin tip="数据加载中..." spinning={loading}>
        <div className={Style.root}>
            <div className={Style.body}>
                {groupNode}
                <div className={Style.content}>
                    {toolbar}
                    <FileSelectorContent fileList={datasource?.data} multiple={false}
                                         onSelectedFileChange={onSelectedFileChange}/>
                    {pagination}
                </div>
            </div>
        </div>
    </Spin>

}

export default FileSelectorRoot;
