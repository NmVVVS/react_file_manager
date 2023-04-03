import React, {useEffect, useRef, useState} from "react";
import {FilePagination, FileSelectorProps, MyFile} from "../Props";
import Style from './index.module.scss';
import FileSelectorGroup from "../group";
import FileSelectorContent from "../content";
import {Button, Pagination, Radio, Space, Spin, Upload} from "antd";
import {CloseOutlined, UploadOutlined} from '@ant-design/icons';
import {RcFile} from "antd/es/upload/interface";
import {useGetState} from 'ahooks';
import {Simulate} from "react-dom/test-utils";
import waiting = Simulate.waiting;

const FileSelectorRoot = (props: FileSelectorProps & { onCancel: VoidFunction, waitUploadFile: MyFile[] }) => {

    const _groupId = useRef(""), _fileType = useRef(''), _pageIndex = useRef(1),
        [filePagination, setFilePagination, getFilePagination] = useGetState<FilePagination>(), [loading, setLoading] = useState(false),
        [currentType, setCurrentType] = useState<string>(props.limitFileType || props.fileTypes[0].accept);

    let fileTypes = props.fileTypes.map(item => ({label: item.label, value: item.accept}));

    if (props.limitFileType !== undefined) {
        fileTypes = fileTypes.map(item => ({
            label: item.label,
            value: item.value,
            disabled: item.value !== props.limitFileType
        }));
    }

    useEffect(() => {
        for (let item of props.waitUploadFile) {
            item.onUploading = fileUploadProgress;
            console.log(item);
        }

        loadFileList();

        return () => {
            for (let item of props.waitUploadFile) {
                delete item.onUploading;
            }
        }

    }, []);


    const onGroupChange = (groupId: string) => {
        _groupId.current = groupId;
        loadFileList();
    }

    const onFileTypeChange = (fileType: string) => {
        _fileType.current = fileType;
        setCurrentType(fileType);
        loadFileList();
    }

    const onPageIndexChange = (pageIndex: number) => {
        _pageIndex.current = pageIndex;
        loadFileList();
    }

    const onSelectedFileChange = (selectedFiles: MyFile[]) => {
        console.log(selectedFiles);
    }

    const loadFileList = () => {
        setLoading(true);
        props.getFiles(_pageIndex.current, _groupId.current, _fileType.current).then(res => {

            let data: MyFile[] = res;
            if (props.waitUploadFile.length !== 0) {
                data = [...props.waitUploadFile.reverse(), ...data.splice(0, 18 - props.waitUploadFile.length)]
            }

            setFilePagination({data: data, total: 100, pageIndex: _pageIndex.current});
            setLoading(false);
        });
    }

    const createGroupElement = () => {
        if (props.groups === undefined) return null;
        return <>
            <FileSelectorGroup groups={props.groups} onGroupChange={onGroupChange}/>
            <div className={Style.driver}></div>
        </>
    }

    function fileUploadProgress(this: MyFile, progress: number) {
        this.progress = progress;
        setFilePagination({...filePagination!, data: [...getFilePagination()!.data]});
    }

    const upload = (file: RcFile) => {
        if (props.onUpload === undefined) return false;
        if (filePagination === undefined) return false;
        if (filePagination.data.length >= 18) filePagination.data.shift();

        const newFile: MyFile = {title: file.name, cover: '', onUploading: fileUploadProgress, file};
        props.waitUploadFile.push(newFile);
        filePagination.data.unshift(newFile);
        setFilePagination({...filePagination, data: [...filePagination.data]});

        props.onUpload(newFile).then(r => {
            newFile.cover = r;
            delete newFile.progress;
            delete newFile.file;
            delete newFile.onUploading;
            props.waitUploadFile.splice(props.waitUploadFile.indexOf(newFile, 1));
            setFilePagination({...filePagination, data: [...getFilePagination()!.data]});
        });
        return false;
    }


    return <Spin tip="数据加载中..." spinning={loading}>
        <div className={Style.root}>
            <div className={Style.body}>
                {createGroupElement()}
                <div className={Style.content}>
                    <div className={Style.toolbarContainer}>
                        <Radio.Group
                            options={fileTypes} optionType="button" value={currentType} buttonStyle="solid"
                            onChange={(e) => onFileTypeChange(e.target.value)}/>
                        <Upload accept={currentType} beforeUpload={upload} showUploadList={false}>
                            <Button type="primary" icon={<UploadOutlined/>}>点击上传</Button>
                        </Upload>
                    </div>
                    <FileSelectorContent {...props} fileList={filePagination?.data}
                                         onSelectedFileChange={onSelectedFileChange}/>
                    <div className={Style.pagination}>
                        <Pagination total={filePagination?.total} pageSize={18}
                                    current={filePagination?.pageIndex}
                                    showSizeChanger={false} onChange={(page: number) => onPageIndexChange(page)}/>
                    </div>
                </div>
            </div>
        </div>
    </Spin>


    // return <div>
    //     <Spin tip="数据加载中..." spinning={loading} size="small">
    //         <div className={Style.root}>
    //             <div className={Style.header}>
    //                 <div>文件选择器</div>
    //                 <div className={Style.close} onClick={props.onCancel}><CloseOutlined/></div>
    //             </div>
    //
    //             <div className={Style.footer}>
    //                 <Space>
    //                     <Button onClick={props.onCancel}>取消</Button>
    //                     <Button type="primary">确认</Button>
    //                 </Space>
    //             </div>
    //         </div>
    //     </Spin>
    // </div>

}

export default FileSelectorRoot;
