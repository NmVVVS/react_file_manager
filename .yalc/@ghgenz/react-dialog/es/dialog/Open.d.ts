import React from "react";
import Dialog from "./Dialog";
import { DialogProps } from "./interface";
export interface ICloseDialogOption {
    triggerOnClose?: boolean;
}
export declare function closeDialog(dialogId: string, options?: ICloseDialogOption): void;
export interface IOpenDialogOption extends Omit<DialogProps, 'onClose'> {
    dialogId?: string;
    ref?: (ins: typeof Dialog) => void | React.RefObject<typeof Dialog>;
    parentComponent?: React.ReactInstance;
    onClose?: () => void;
}
export declare function openDialog(options?: Partial<IOpenDialogOption>): (triggerOnClose?: boolean) => void;
