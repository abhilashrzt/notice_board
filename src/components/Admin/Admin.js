import React, {useState} from 'react';
import styles from './Admin.module.css';
import InputText from '../InputText/InputText';
import classNames from 'classnames';
import ManageStaff from '../ManageStaff/ManageStaff';
import NewNotice from '../NewNotice/NewNotice';

const Admin = ({loggedInUser, tab, setTab}) => {

    const getTab = () =>{
        switch(tab){
            case 'newNotice' : return <NewNotice loggedInUser={loggedInUser}/>
            case 'manageNoticeBoard' : return <div>Manage Notice Board</div>
            case 'manageStaff' : return <ManageStaff loggedInUser={loggedInUser}/>
            default: return null;
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.tabWrapper}>
                <li 
                className={classNames(styles.liItem, {[styles.active]: tab==='newNotice'})}
                onClick={()=>setTab('newNotice')}>New Notice</li>
                <li className={classNames(styles.liItem, {[styles.active]: tab==='manageNoticeBoard'})} 
                onClick={()=>setTab('manageNoticeBoard')}>Manage Notice Board</li>
                <li className={classNames(styles.liItem, {[styles.active]: tab==='manageStaff'})} 
                onClick={()=>setTab('manageStaff')}>Manage Staff</li>
            </div>
           <div className={styles.bodyWrapper}>
                {
                   getTab()
                }
            </div> 
        </div>
    )
}

export default Admin;