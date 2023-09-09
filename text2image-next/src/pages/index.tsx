import type { NextPage } from "next"
import styles from "../styles/Home.module.css";
import { Form } from "../components/form/form"
import { useRouter } from "next/router";


const Home: NextPage = ( ) => {
  const router = useRouter()
  return (
    <div className="page aligned-center">
      <Form/>
      <button className={styles.button} onClick={()=>{router.push('/upscale')}}>Go to Upscale</button>
    </div>
  )
};


export default Home;