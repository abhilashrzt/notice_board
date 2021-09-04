import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';


const Header = ({isLoggedIn, setIsLoggedIn, loggedInUser}) => {
    const logOut = () =>{
        if(document.cookie.includes('authTokenNoticeBoard'))
        document.cookie = "authTokenNoticeBoard=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        setIsLoggedIn(false);
    }
    return(
        <div className={styles.wrapper}>
            {loggedInUser?.staffName && <div className={styles.leftWrapper}>
                Hi, welcome 
                <span className={styles.userName}>{loggedInUser.staffName}</span> !!!
            </div>}
            <div className={styles.middleWrapper}>
                <h6 className={styles.headerText1}>Sahyadri  Science College</h6>
                <h2 className={styles.headerText2}>Notice Board</h2>
            </div>
            <div className={styles.RightWrapper}>
                <Link to={'/'}>
                    <button className={classNames(styles.loginBtn, styles.btn)}>BOARD</button>
                </Link>
                {isLoggedIn && <Link to={'/admin'}>
                    <button className={classNames(styles.loginBtn, styles.btn)}>ADMIN</button>
                </Link>}
                <Link to={'/admin'}>
                    <button className={classNames(styles.loginBtn, styles.btn)} onClick={()=>{isLoggedIn && logOut()}}>
                        {isLoggedIn ? 'LOG OUT' : 'LOG IN'}</button>
                </Link>
            </div>
        </div>
    ) 
}

export default Header;