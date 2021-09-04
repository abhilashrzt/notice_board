import React, {useEffect, useState} from 'react';
import AddStaff from '../AddStaff/AddStaff';
import EditStaff from '../EditStaff/EditStaff';
import styles from './ManageStaff.module.css';
import { firebaseDb } from '../../firebaseConfig';
import Toast from '../Toast/Toast';


const ManageStaff = ({loggedInUser}) => {
    const [allStaffs, setAllStaffs] = useState([]);
    const [toast, setToast] = useState({
        type: '',
        msg: '',
    });
    const [staffData, setStaffData] = useState({
        staffName: '',
        staffUserName: '',
        staffNumber: '',
        staffQualification: '',
        staffEmail: '',
        password: '',
        confirmPassword: '',
        isAdmin: false,
    })

    useEffect(()=>{
        getData();
        return ()=>setAllStaffs([]);
    },[]);

    const isDisabled = !((staffData.password === staffData.confirmPassword) 
    && staffData.staffName
    && staffData.staffUserName
    && staffData.staffEmail
    && staffData.staffNumber
    && staffData.staffQualification
    && staffData.password
    && staffData.confirmPassword
    )

    const onClickAddStaff = () => {
        firebaseDb.ref().child(`staffs/${staffData.staffUserName}`)
        .set(staffData, err=>{
            if(err){
                console.log("fireDb err:", err);
                showToast({type:'error', msg: err.message});
            }
        });
        firebaseDb.ref().child(`cred/${staffData.staffUserName}`)
        .set(staffData.confirmPassword, err=>{
            if(err){
                console.log("fireDb err:", err);
                showToast({type:'error', msg: err.message});
            }
        });
        setTimeout(()=>{
            setStaffData({
                staffName: '',
                staffNumber: '',
                staffQualification: '',
                staffEmail: '',
                password: '',
                confirmPassword: '',
                isAdmin: false,
            })
            showToast({type:'success', msg:'Staff added successfully'});
        },1000)
    }

    const showToast = ({type, msg}) => {
            setToast({type, msg});
            setTimeout(()=>{
                setToast({
                    type: '',
                    msg: '',
                });
            },5000);
    }

    const getData = () => {
        firebaseDb.ref().child('staffs/').on('value', (snapshot)=>{
             const data = snapshot.val();
             const arrayData = Object.values(data || [])
             setAllStaffs(arrayData);
        });
     }

     const onClickDelete = (uniqueKey) =>{
        firebaseDb.ref().child(`staffs/${uniqueKey}`).remove().then(function() {
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
            showToast({type:'error', msg: error.message});
          });
          firebaseDb.ref().child(`cred/${uniqueKey}`).remove().then(function() {
            showToast({type:'success', msg:'Staff removed successfully'});
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
            showToast({type:'error', msg: error.message});
          });;
    }
    
    return(
        <div className={styles.wrapper}>
            {toast.type !== '' && <Toast type={toast.type} msg={toast.msg}/>}
           <AddStaff 
                staffData={staffData} 
                setStaffData={setStaffData} 
                isDisabled={isDisabled} 
                onClickAddStaff={onClickAddStaff}
                isAdmin={loggedInUser?.isAdmin}
                loggedInUser={loggedInUser}
           />
           <EditStaff 
                allStaffs={allStaffs}
                setStaffData={setStaffData} 
                isAdmin={loggedInUser?.isAdmin}
                onClickDelete={onClickDelete}
                loggedInUser={loggedInUser}
           />
        </div>
    )
}

export default ManageStaff;