import {FileManagerProps} from "./interface";

type InitProps = Omit<FileManagerProps, "limitType">

let Config: InitProps = {};

const init = (config: InitProps) => {
    Config = config;
}

export {Config};
export default init;
