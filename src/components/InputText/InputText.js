import React from 'react';
import classNames from 'classnames';
import styles from './InputText.module.css';

const InputText = ({type, value, placeholder, classes={}, onInputChange=f=>f}) => {
    return (
        <div className={styles.wrapper}>  
          <input 
                onChange={onInputChange}
                className={classNames(styles.inputTextBox, classes.inputTextBox)} 
                placeholder={placeholder || 'Type here'} 
                type={type || 'text'} 
                value={value || ''}
            />
        </div>
    )
}

export default InputText;