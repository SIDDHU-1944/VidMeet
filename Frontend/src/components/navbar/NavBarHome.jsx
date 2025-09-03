import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import RestoreIcon from "@mui/icons-material/Restore"

export default function NavBar(){
    let router = useNavigate();
    return (
        <>
            <nav className={styles.navContainer}>
                <div className={styles.navHeader}>
                    <h2>VidMeet</h2>
                </div>
                <div className={styles.navList}>
                    <ul className={styles.listItems}>
                        {/* <li className={styles.item}>Join as Guest</li> */}
                        <IconButton style={{color: "white"}} onClick={()=>{ router('/history') }}>
                            <RestoreIcon/> <li className={styles.item}>History</li>
                        </IconButton>
                        <li className={styles.item}
                        onClick={()=>{
                            localStorage.removeItem("token");
                            router('/');
                        }}>
                        LogOut
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    )
}