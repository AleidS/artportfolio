import React from 'react'
import styles from './allArtworks.module.css'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// Animation effect
import {
    motion,
    AnimatePresence,
    useScroll
} from 'framer-motion'


export default function AllArtworks(props) {

    const setImgNames = props.setImgNames
    const imgNames = props.imgNames
    const artworks = props.artworks
    const newList = props.newList
    const scrollDirection = props.scrollDirection

    return (
        <motion.div layout className={styles.imagesContainer} >
            <AnimatePresence>
                {artworks.map((artwork, index) => {
                    return (
                        <motion.div
                            onMouseEnter={() => { newList[index] = true; setImgNames(newList) }}
                            onTouchStart={() => { newList[index] = true; setImgNames(newList) }}
                            onMouseLeave={() => { newList[index] = false; setImgNames(newList) }}
                            onTouchEnd={() => { newList[index] = false; setImgNames(newList) }}
                            whileHover={{ zIndex: 15 }}
                            whileInView={{ x: 0, opacity: 1, scale: 1, filter: 'brightness(100%)', translate: 'rotateY(0deg)' }}
                            whileTap={{ zIndex: 15 }}
                            layout
                            initial={{ x: 70 * scrollDirection, opacity: 0, filter: 'brightness(0%)', transform: 'rotateY(90deg)' }}
                            animate={{ opacity: 1, scale: 1, transform: 'rotateY(0deg)' }}
                            exit={{ opacity: 0, scaleX: 0.4, transform: 'rotateY(100deg)', }}
                            transition={{
                                opacity: { duration: 1 },
                                scale: { duration: 1 },
                                default: { duration: 1.3 },
                                zIndex: { duration: 0 },
                                y: { duration: 1 }
                            }}
                            className={styles.imageContainer}
                            key={artwork.id}>
                            <Link to={`/artportfolio/${artwork.name}`}>
                                <LazyLoadImage
                                    id={styles.a}
                                    src={require(`./images/ThumbNails/${artwork.image}`)}

                                    href={`/${artwork.name}`}
                                    alt={artwork.name}
                                    className={styles.frontPageImage}
                                    key={artwork.id} />
                            </Link>
                            {
                                imgNames[index] &&
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        opacity: { duration: 0 },
                                        default: { duration: 0 },
                                    }}
                                    id={styles.b} className={imgNames[index] ? styles.cover : styles.cover2}>
                                    <h3 className={styles.imageName}>{artwork.name}</h3>
                                </motion.div>
                            }

                        </motion.div>

                    )
                })}
            </AnimatePresence >
        </motion.div >
    )
}