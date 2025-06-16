import styles from "./LandingMain.module.css";
import { Link } from "react-router-dom";
export default function LandingMain(){
    
    return(
        <>
            <div className={styles.LandingMainContainer}>
                <div className={styles.tagLines}>
                    <h1><span className={styles.mainTag}>Connect</span> with your Loved Ones</h1>
                    <p>Stay Connected. Anywhere, Anytime.</p>
                    <div role="button">
                        <Link to ={'/auth'}>Get Started</Link>
                    </div>
                </div>
                <div className={styles.mainImg}>
                    <img src="/mainImg1.jpg" alt="videoCall"/>
                </div>
            </div>
            
        </>
    )

}