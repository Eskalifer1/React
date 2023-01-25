import { Spin } from "antd";
import React from "react";
import classes from './Preloader.module.css';
import { LoadingOutlined } from '@ant-design/icons';

const Preloader: React.FC = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 88 }} spin />
    return (
        <Spin indicator={antIcon} className={classes.preloader} />
    )
}

export default Preloader;