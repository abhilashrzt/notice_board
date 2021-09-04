import React from 'react';
import styles from './EditStaff.module.css';

const EditStaff = ({allStaffs, setStaffData, isAdmin, onClickDelete}) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.headerText}>Staffs</div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Sl no</th>
                            <th>Staff Name</th>
                            <th>Staff Number</th>
                            <th>Staff Qualification</th>
                            <th>Staff Email</th>
                            {isAdmin && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                       {allStaffs.map((item, index)=>{
                           return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td title={item.staffName}>{item.staffName}</td>
                                <td title={item.staffNumber}>{item.staffNumber}</td>
                                <td title={item.staffQualification}>{item.staffQualification}</td>
                                <td title={item.staffEmail}>{item.staffEmail}</td>
                                {isAdmin && <td>
                                    <button className={styles.editBtn} onClick={()=>setStaffData(item)}>Edit</button>
                                    <button className={styles.deleteBtn} onClick={()=>onClickDelete(item.staffUserName)}>Delete</button>
                                </td>}
                            </tr>
                           )
                       }) }
                    </tbody>
                </table> 
            </div>
        </div> 
    )
}

export default EditStaff;