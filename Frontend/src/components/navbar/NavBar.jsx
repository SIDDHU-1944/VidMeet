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
                        {/* <li className={styles.item} style={{}}>Join as Guest</li> */}
                        <li className={`${styles.item} ${styles.signpBtn}`}>
                                <Link to='/signup'>Register</Link>
                        </li>
                        <li className={`${styles.item} ${styles.itemBtn}`} role="button">
                            <Link to='/auth'>Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    )
}