import { PropsWithChildren } from "react";
export interface DialogProps extends PropsWithChildren {
    visible?: boolean;
    width?: number | string;
    bodyPadding?: number | string;
    onClose?: () => void;
    title?: string;
    min?: boolean;
    max?: boolean;
    onOk?: () => void;
}
