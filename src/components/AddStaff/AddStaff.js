import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import styles from './AddStaff.module.css';
import InputText from '../InputText/InputText';


const AddStaff = ({setStaffData, staffData, isDisabled, onClickAddStaff, isAdmin}) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.headerText}>Add new staff</div>
            <div className={styles.inputWrapper}>
                Staff Name
                <InputText
                    onInputChange={(e)=>setStaffData({...staffData, staffName: e.target.value})}
                    value={staffData.staffName}
                    type="text"   
                    placeholder='Enter Staff Name'
                />
            </div>
            <div className={styles.inputWrapper}>
                Staff User Name
                <InputText
                    onInputChange={(e)=>setStaffData({...staffData, staffUserName: e.target.value})}
                    value={staffData.staffUserName}
                    type="text"   
                    placeholder='Enter Staff User Name'
                />
            </div>
            <div className={styles.inputWrapper}>
                Staff Number
                <InputText
                    onInputChange={(e)=>setStaffData({...staffData, staffNumber: e.target.value})}
                    value={staffData.staffNumber}
                    placeholder='Enter Staff Number'
                    type="number"
                    label="Staff Number"
                />
            </div>
            <div className={styles.inputWrapper}>
                Staff Email
                <InputText
                    onInputChange={(e)=>setStaffData({...staffData, staffEmail: e.target.value})}
                    value={staffData.staffEmail}
                    type="email"   
                    placeholder='Enter Staff Email'
                />
            </div>
            <div className={styles.inputWrapper}>
                Staff Qualification
                <InputText
                    onInputChange={(e)=>setStaffData({...staffData, staffQualification: e.target.value})}
                    value={staffData.staffQualification}
                    type="text"   
                    placeholder='Enter Staff Qualification'
                />
            </div>
            <div className={styles.inputWrapper}>
                New Password
                <InputText
                    onInputChange={(e)=>setStaffData({...staffData, password: e.target.value})}
                    value={staffData.password}
                    type="password"   
                    placeholder='Enter Password'
                />
            </div>
            <div className={styles.inputWrapper}>
                Confirm Password
                <InputText
                    onInputChange={(e)=>setStaffData({...staffData, confirmPassword: e.target.value})}
                    value={staffData.confirmPassword}
                    type="password"   
                    placeholder='Confirm Password'
                />
            </div>
            {isAdmin && <div className={classNames(styles.inputWrapper, styles.isAdminWrapper)}>
                Is Admin
                <input
                    className = {styles.checkBox}
                    onChange={(e)=>setStaffData({...staffData, isAdmin: !staffData.isAdmin})}
                    checked={staffData.isAdmin}
                    type="checkbox"   
                />
            </div>}
            <button 
            disabled={isDisabled}
            className={classNames(styles.addStaffBtn, {[styles.disabled]: isDisabled})} 
            onClick={()=>onClickAddStaff()}
            >ADD STAFF</button>
        </div>
    )
}

export default AddStaff;