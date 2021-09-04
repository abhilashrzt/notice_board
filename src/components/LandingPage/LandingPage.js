import React, { useEffect, useState, useMemo } from 'react';
import NoticeBoard from '../NoticeBoard/NoticeBoard';
import Login from '../Login/Login';
import Header from '../Header/Header';
import { firebaseDb } from '../../firebaseConfig';
import styles from './LandingPage.module.css';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';



const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(document.cookie.includes('authTokenNoticeBoard'));
    const [loggedInUser, setLoggedInUser] = useState({});
    const [tab, setTab] = useState('newNotice');

   
    useEffect(()=>{
            firebaseDb.ref().child(`staffs/${document.cookie.split('=')[1]}/`).on('value', (snapshot)=>{
                const data = snapshot.val();
                if(!data){
                    if(document.cookie.includes('authTokenNoticeBoard'))
                    document.cookie = "authTokenNoticeBoard=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                    setIsLoggedIn(false);
                }
                delete data?.confirmPassword;
                delete data?.password;
                setLoggedInUser(data);
           });
       return ()=>setLoggedInUser({});
    },[isLoggedIn === true])

    const GetSwitchComp = useMemo(()=>{
        return <Switch>
                <Route path={'/'} exact component={()=><NoticeBoard />}/>
                <Route path={'/admin'} component={()=><Login 
                    setTab={setTab}
                    tab={tab}
                    setIsLoggedIn={setIsLoggedIn} 
                    setLoggedInUser={setLoggedInUser} 
                    loggedInUser={loggedInUser} 
                    isLoggedIn={isLoggedIn}/>}/>
    </Switch>
    },[tab, isLoggedIn, loggedInUser?.isAdmin])


    return(
        <div className={styles.wrapper}>
            <Header 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn} 
            loggedInUser={loggedInUser}/>
            <div className={styles.contentWrapper}>
                {GetSwitchComp}
            </div>
            
    </div>
    ) 
}

export default LandingPage;