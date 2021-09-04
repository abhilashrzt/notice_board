import React, { useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import { firebaseDb } from '../../firebaseConfig';
import Card from '../Card/Card';
import styles from './NoticeBoard.module.css';

/* randomColor(); 
 
// Returns an array of ten green colors
randomColor({
   count: 10,
   hue: 'green'
});
 
// Returns a hex code for a light blue
randomColor({
   luminosity: 'light',
   hue: 'blue'
});
 
// Returns a hex code for a 'truly random' color
randomColor({
   luminosity: 'random',
   hue: 'random'
});
 
// Returns a bright color in RGB
randomColor({
   luminosity: 'bright',
   format: 'rgb' // e.g. 'rgb(225,200,20)'
});
 
// Returns a dark RGB color with random alpha
randomColor({
   luminosity: 'dark',
   format: 'rgba' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
});
 
// Returns a dark RGB color with specified alpha
randomColor({
   luminosity: 'dark',
   format: 'rgba',
   alpha: 0.5 // e.g. 'rgba(9, 1, 107, 0.5)',
});
 
// Returns a light HSL color with random alpha
randomColor({
   luminosity: 'light',
   format: 'hsla' // e.g. 'hsla(27, 88.99%, 81.83%, 0.6450211517512798)'
}); */
const NoticeBoard = () => {
    const [isLoading, setIsloading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        getData();
        return ()=> setTableData([]);
    },[])

    const getData = () => {
        setIsloading(true);
       firebaseDb.ref().child(`notice/`).on('value', (snapshot)=>{
            const data = snapshot.val();
            const arrayData = Object.values(data || []);
            console.log("arrayData : ",arrayData)
            setTableData(arrayData);
       });
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.secondaryHeader}>
                <div className={styles.rightWrapper}>
                    <input 
                        type="text"
                        className={styles.searchTextBox}
                        placeholder="Search"
                        onChange={(e)=>setSearchText(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.cardsWrapper}>
                {(searchText ? tableData.filter(item=>
                (item?.heading?.toLowerCase().includes(searchText?.toLowerCase())) 
                || (item?.description?.toLowerCase().includes(searchText?.toLowerCase()))
                || (item?.timeStamp?.toLowerCase().includes(searchText?.toLowerCase()))
                || (item?.staffName?.toLowerCase().includes(searchText?.toLowerCase()))
                ) : tableData).map((item, index)=>
                <Card
                    bgColor={randomColor({
                        luminosity: 'light',
                        format: 'rgb',
                     })}
                   key={index}
                   data={item} 
                />)}
                
            </div>
        </div>

        
    ) 
}

export default NoticeBoard;