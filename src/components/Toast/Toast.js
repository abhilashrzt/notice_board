import React from 'react';
import styles from './Toast.module.css';
import classNames from 'classnames';


const Toast = ({msg, type=''}) => {
    return(
        <div className={classNames(styles.wrapper, type === 'success' ? styles.success : styles.error)}>
            {msg || 'Success'}
        </div>
    )
}

export default Toast;