import React from 'react';
import classNames from 'classnames';
import styles from './DropDown.module.css';

const DropDown = ({value, data, onChangeData, name, id, key, valueKey, label, classes}) => {
    return (
        <>
            {(label || name) && <label className={styles.labelWrapper}>{label || name} : </label>}
            <select 
                value={value} 
                className={classNames(styles.dropDownElement, classes.dropDownElement)} 
                name={name}
                id={id} 
                onChange={(e)=>onChangeData({key: valueKey, value: e.target.value})}
            >
                {
                    data.map((item, index)=><option key={index} value={item}>{item}</option>)
                }
            </select> 
        </>
    )
}

export default DropDown;