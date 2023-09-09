import {  NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'


const img : NextPage = ()=>{
        const router = useRouter();
        //console.log("Query in img:\n"+router.query.images)
        const images = {image_resource_url:""}

        if(router.query.images != undefined){
            const images = JSON.parse((String)(router.query.images));
            console.log(images);
            return (
                <div className="img page aligned-center">
                   <img src={images?.image_resource_url} height="475px" width="475px"/>  
                <button className={styles.button} onClick={()=>router.push(`/`)}>Back</button>
            </div>
            )
        }
        else{
            return (
                <div className='page aligned-center'>
                    <h1>Nothing to show</h1>
                    <button className={styles.button} onClick={()=>router.push(`/`)}>Back</button>
                </div>
            )
        }
        
        
    }

export default img;
