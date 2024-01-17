import React from 'react'
import styles from './artwork.module.css'


export default function Artwork(props) {
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        //
    });

    return (
        <div className={styles.artwork}>
            <div className={styles.row}>
                <div className={styles.wideColumn}>
                    {props.name && <h1> {props.name}</h1>}
                    <img className={styles.fullImage}
                        src={require(`./images/${props.image}`)}
                        alt={props.name}
                    />
                </div>
                <div className={styles.narrowColumn}>
                    <div className={styles.flexbox}>
                        {props.extra && <span className={styles.extra}><i>{props.extra}</i></span>}
                        {props.medium && <span><strong>Medium:</strong> {props.medium}</span>}
                        {props.date && <span> <strong> Date:</strong> {props.date}</span>}
                        {props.location && <span><strong> Location:</strong> {props.location}</span>}
                        {props.camera && <span><strong> Camera:</strong> {props.camera}</span>}
                        {props.source && <span><strong> Original:</strong> {props.source}</span>}
                        {props.linkje && <span><strong> Unrelated:</strong> {props.linkje}</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}