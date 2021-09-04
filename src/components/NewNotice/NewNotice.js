import React, {useEffect, useState} from 'react';
import { storage, firebaseDb } from '../../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import styles from './NewNotice.module.css';
import InputText from '../InputText/InputText';
import DropDown from '../DropDown/DropDown';


const NewNotice = ({loggedInUser}) => {
    const [data, setData] = useState({
            heading: '',
            description: '',
            isImportant: false,
            noticeType: 'Text',
            uniqueKey: "",
    })
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState({});
    const [fileChanged, setFileChanged] = useState(false);
    const [link, setLink] = useState('');
    const [uploading, setUploading] = useState(false);
    const isDisabled = !(data.heading && data.description && !(data.noticeType !== 'Text' && !file.name));
    const noticeTypes = {
        Image: ".png, .JPG, .jpg, .JPEG, .jpg",
        File: ".pdf, .doc, .txt, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }

    const onAddNotice = () =>{
        if(fileChanged && data.noticeType !== 'Text'){
            setUploading(true);
            const uploadTask = storage.ref(`files/${data.uniqueKey}/`).put(file);
            uploadTask.on(
              "state_changed",
              snapshot => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
              },
              error => {
                console.log(error);
              },
              () => {
                storage
                  .ref("files")
                  .child(`${data.uniqueKey}/`)
                  .getDownloadURL()
                  .then(url => {
                    console.log("Uploaded URL :",url)
                     onSaveClick(url);
                     setUploading(false);
                     setFileChanged(false);
                  });
              }
            );
        }
            onSaveClick();
    }

    const getNewFormatDate = () => {
         const d = new Date(Date.now());
        return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
    }

    const onSaveClick = (url)=>{
        const timeStamp = data?.timeStamp || getNewFormatDate();
        const locationUrl = data.uniqueKey ? `notice/${data.uniqueKey}/`:`notice/${uuidv4()}/`
        const dataObject = url ? {...data, url, timeStamp, ...loggedInUser} : {...data, timeStamp, ...loggedInUser};
        firebaseDb.ref().child(locationUrl).set(dataObject, err=>{
            if(err){
                console.log("fireDb err:", err)
                window.alert(err?.message)
            }
        });
        setFile({});
        setData({
            heading: '',
            description: '',
            isImportant: false,
            noticeType: 'Text',
            uniqueKey: "",
    });
    }

    const onSelectFile = (e) => {
        const fileData = e.target.files[0];
        if(fileData){
            setLink('');
            setProgress(0);
            setFile(fileData);
            setFileChanged(true);
            setData({
                ...data, 
                fileName: fileData.name, 
                downloads: 0,
                uniqueKey: uuidv4(),
            });
        }
    }

    return(
        <div className={styles.wrapper}>
            {uploading && <div className={styles.uploadPopup}>{`Uploading file ${progress}%`}</div>}
            <div className={styles.headerText}>Add New Notice</div>
            <div className={styles.inputWrapper}>
                Notice Heading
                <InputText
                    onInputChange={(e)=>setData({...data, heading: e.target.value})}
                    value={data.heading}
                    type="text"   
                    placeholder='Enter Heading'
                />
            </div>
            <div className={classNames(styles.inputWrapper, styles.textAreaWrapper)}>
                Notice Type
                    <DropDown
                        classes={{
                            dropDownElement: styles.dropDownElement
                        }}
                        value={data?.noticeType || []}
                        onChangeData={({key, value})=>{setData({...data, [key]: value}); setFile({})}}
                        id={"noticeType"} 
                        valueKey={"noticeType"}
                        data={["Text","Image", "File"]}
                    />
                </div>
            {data.noticeType !== 'Text' && <div className={classNames(styles.inputWrapper, styles.textAreaWrapper)}>
                    File 
                    <input
                        className={styles.fileSelectElement}  
                        disabled={!data.noticeType} 
                        title={'Upload File'} 
                        type="file"
                        accept={noticeTypes[data.noticeType]}
                        onChange={onSelectFile} 
                    />
            </div>}
            <div className={classNames(styles.inputWrapper, styles.textAreaWrapper)}>
                Description
                <textarea
                    className={styles.textArea}
                    onChange={(e)=>setData({...data, description: e.target.value})}
                    value={data?.description}  
                    placeholder='Enter Description'
                />
            </div>
            <div className={classNames(styles.inputWrapper, styles.isAdminWrapper)}>
                Is Important
                <input
                    className = {styles.checkBox}
                    onChange={(e)=>setData({...data, isImportant: e.target.checked})}
                    value={setData.isImportant}
                    type="checkbox"   
                />
            </div>
            <button 
                disabled={isDisabled}
                className={classNames(styles.addStaffBtn, {[styles.disabled]: isDisabled})} 
                onClick={()=>onAddNotice()}
            >
                ADD NOTICE
            </button>
        </div>
    )
}

export default NewNotice;