import React, {useState} from "react";
import Style from './index.module.scss';
import {FileGroup, FileSelectorGroupProps, FileSelectorProps} from "../interface";
import Global from "../Global";


const FileSelectorGroup: React.FC<{ group: FileGroup[], onGroupChange: (groupId: string) => void }> = (props) => {

    const [currentGroup, setCurrentGroup] = useState<string>(props.group[0].value);

    const onGroupChange = (groupId: string) => {
        setCurrentGroup(groupId);
        props.onGroupChange(groupId);
    }

    return <div className={Style.groupRoot}>
        <ul className={Style.groupList}>
            {
                props.group.map(item => {
                    return <li key={item.value}
                               className={item.value === currentGroup ? Style.active : ''}
                               onClick={() => onGroupChange(item.value)}>{item.label}</li>;
                })
            }
        </ul>
        <div className={Style.addGroupContainer}>新增分组</div>
    </div>
}

export default FileSelectorGroup;
