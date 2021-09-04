import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';

const Card = ({data, bgColor}) => {
    return(
        <div style={{backgroundColor: bgColor}} className={styles.wrapper}>
            <div className={styles.dateWrapper} >
                Date : {data.timeStamp}
            </div>
            <div className={styles.headerWrapper} title={data?.heading || 'No Heading'}>
                {data?.heading || 'No Heading'}
            </div>
            {data.noticeType === 'Text' ? <div className={styles.descriptionWrapper} title={data?.description || 'No description'}>
                {data?.description || 'No description'}
            </div> : <div>File Format</div>}
            <div className={styles.staffDetailsWrapper} >
                Posted By
                <div className={styles.staffDetails}>
                    {data?.staffName}
                    <span className={styles.qualificationText}>{` ${data?.staffQualification}`}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;