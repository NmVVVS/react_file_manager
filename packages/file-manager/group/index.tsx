import React, {useState} from "react";
import Style from './index.module.scss';
import {FileSelectorGroupProps, FileSelectorProps} from "../Props";


const FileSelectorGroup: React.FC<FileSelectorGroupProps & { onGroupChange: (groupId: string) => void }> = (props) => {

		const [currentGroup, setCurrentGroup] = useState<string>(props.currentGroup || '');

		const onGroupChange = (groupId: string) => {
				setCurrentGroup(groupId);
				props.onGroupChange(groupId);
		}

		return <div className={Style.groupRoot}>
				<ul className={Style.groupList}>
						{
								props.groups?.map(item => {
										return <li key={item.id}
															 className={item.id === currentGroup ? Style.active : ''}
															 onClick={() => onGroupChange(item.id)}>{item.title}</li>;
								})
						}
				</ul>
				<div className={Style.addGroupContainer}>新增分组</div>
		</div>
}

export default FileSelectorGroup;
