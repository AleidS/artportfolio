import React from 'react'
import styles from './info.module.css'

export default function Information(props){

    return(
        <div className={styles.info}>
            <h2> Portfolio Gallery </h2>
            <h6>(Web design Demonstration)</h6>
            This website was made with React <br/>
            Animations done with framer motion package <br/>
            Icons from Font Awesome<br/>
            contact : <a href="mailto:aleidoonk@gmail.com">Here</a><br/><br/>
            Photos/drawings/digital works are my own <br/><small>(portraits drawn from reference photos) </small><br/><br/>
           <small><small>Only for web design demonstration, nothing for sale.<br/> message me for removal</small></small>
        </div>
    )
}