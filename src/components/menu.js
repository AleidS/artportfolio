import React from 'react'
import styles from './menu.module.css'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import {
    motion,
} from 'framer-motion'

export default function Menu(props) {

    return (
        <div
            className={styles.menu}>

            {props.frontpage ?
                <>
                    {props.filter2
                        ?
                        <div
                            className={styles.menuButton}
                            onClick={() => {
                                props.filter(false);
                            }}>

                            <i className="fa-solid fa-filter-circle-xmark"></i>

                        </div>
                        :
                        <motion.div
                            className={styles.menuButton}
                            onClick={() => {
                                props.filter(false);
                            }}>
                            <i className="fa-solid fa-filter" id={styles.filter}></i>
                        </motion.div>
                    }
                    <motion.button
                        className={styles.menuButton}
                        onClick={() => {
                            props.filter('photo');
                        }}>
                        <i className="fa-solid fa-camera"></i>
                    </motion.button>
                    <motion.div
                        className={styles.menuButton}
                        onClick={() => {
                            props.filter('drawing');
                        }}>
                        <i className="fa-solid fa-pencil"></i>
                        {/*  <i className={`fa-solid fa-paintbrush ${styles.faPaintbrush}`}></i> */}
                    </motion.div>
                    <motion.div
                        className={styles.menuButton}
                        onClick={() => {
                            props.filter('digital');
                        }}>
                        {/*<i className="fa-solid fa-display"></i> */}
                        <i className="fa-solid fa-computer-mouse"></i>
                    </motion.div>

                    <Link to={`/artportfolio/info`}>
                        <motion.div
                            className={styles.menuButton}
                            id={styles.info}
                        >
                            <i className="fa-solid fa-circle-info"></i>
                        </motion.div>
                    </Link>
                </>
                :
                // Link to home and info
                <>
                    <Link to='/artportfolio/'>
                        <button className={styles.menuButton} > Home </button>
                    </Link>

                    {!props.info &&
                        <Link to={`/artportfolio/info`}>
                            <div className={styles.menuButton}
                                id={styles.info}
                            >
                                <i className="fa-solid fa-circle-info"></i>
                            </div>
                        </Link>
                    }
                </>
            }
        </div>

    )
}