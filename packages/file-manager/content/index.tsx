import React, {useMemo, useRef, useState} from "react";
import Style from './index.module.scss'
import {Button, Checkbox, Image, Pagination, Progress, Radio, Upload} from "antd";
import {FilePagination, FileSelectorContentProps, MyFile} from "../Props";
import {UploadOutlined} from '@ant-design/icons';
import {RcFile} from "antd/es/upload/interface";


interface FileSelectorContentEvent {
		// onPageIndexChange: (pageIndex: number) => void;
		// onFileTypeChange: (fileType: string) => void;
		fileList?: MyFile[];
		onSelectedFileChange: (selectedFiles: MyFile[]) => void;
}

const FileSelectorContent: React.FC<FileSelectorContentProps & FileSelectorContentEvent> = (props) => {
		const [currentType, setCurrentType] = useState<string>(props.limitFileType || props.fileTypes[0].accept),
				[selectedFiles, setSelectedFiles] = useState<MyFile[]>([]), aaaFile = React.createRef<HTMLInputElement>();


		const onItemSelected = (selected: boolean, file: MyFile) => {
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
								{
										item.progress === undefined ? null : <Progress percent={item.progress}/>
								}
						</div>
				})
		}, [props.fileList, selectedFiles]);

		// const onPageIndexChange = (pageIndex: number) => {
		// 		props.onPageIndexChange(pageIndex);
		// }
		// const onFileTypeChange = (fileType: string) => {
		// 		setCurrentType(fileType);
		// 		props.onFileTypeChange(fileType);
		// }

		return <div className={Style.contentRoot}>
				<div className={Style.content}>
						{fileContent}
				</div>
		</div>
}

export default FileSelectorContent;
