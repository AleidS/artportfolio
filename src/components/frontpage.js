import Data from '../data/data.js'
import React from 'react'
import styles from './frontpage.module.css'

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState, useCallback, useRef } from 'react'


import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    useParams
} from "react-router-dom";


// Animation effect
import {
    motion,
    AnimatePresence,
    useScroll
} from 'framer-motion'

// Components
import Menu from './menu.js';
import Artwork from './artwork.js'
import Information from './info.js'
import AllArtworks from './allArtworks.js';


export default function Frontpage(props) {

    // Keep track of scroll direction for animating gallery
    const [y, setY] = React.useState(window.scrollY);
    const [scrollDirection, setScrollDirection] = React.useState(-1)
    const handleNavigation = useCallback(
        (e) => {
            const window = e.currentTarget;
            if (y > window.scrollY) {
                //console.log("scrolling up");
                setScrollDirection(-1)
            } else if (y < window.scrollY) {
                //console.log("scrolling down");
                setScrollDirection(1)
            }
            setY(window.scrollY);
        },
        [y]
    );
    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);



    const [frontpage, setFrontpage] = React.useState(true)
    const [artworks, setArtworks] = React.useState(Data.sort((a, b) =>
        // Sort by name (doesn't consider capital letters to be a separate alphabet)
        (a.name.toLowerCase() > b.name.toLowerCase()) ?
            1 :
            ((b.name.toLowerCase() > a.name.toLowerCase() ?
                -1 : 0))).reverse())

    const [currentArt, setCurrentArt] = React.useState(false)
    const [filter2, setFilter2] = React.useState(false)
    const [imgNames, setImgNames] = React.useState(() => {
        let imgNameList = []
        for (var i = 0; i < Data.length; i++) {
            imgNameList.push(false)
        }
        return (imgNameList)
    })
    const [info, setInfo] = React.useState(false)

    useEffect(() => {
        // Update the document title using the browser API
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1000);

    }, []);

    // List that has a true/false attribute for every image, so title can be rendered on image hover
    function onload() {
        let imgNameList = []
        for (var i = 0; i < Data.length; i++) {
            imgNameList.push(false)
        }
        return (imgNameList)
    }
    let newList = onload()


    // If user clicks on one of the three icons, filter out non-relevant styles
    const filter = (x) => {
        let filtered = Data.sort()
        if (x) {
            filtered = Data.filter(artwork =>
                artwork.type === x)
        }
        else {
            filtered = Data.sort()

        }
        if (filter2 !== x) {
            setFilter2(x)
            setArtworks(filtered)
        }
        else {
            setFilter2(false)
            setArtworks(Data.sort())
        }
    }

    // If user clicks on home or arrives to website, hide info and current artwork
    const ShowFrontPage = ({ children }) => {
        useEffect(() => {
            setCurrentArt(false);
            setFrontpage(true);
            setInfo(false);
        }, []);
        return children;
    };

    const ShowArtwork = ({ getProfile }) => {
        const id2 = useParams();
        useEffect(() => {
            // alert(id2.artName)
            setFrontpage(false)
            if (id2.artName == 'info') {
                setCurrentArt(false);
                setFrontpage(false);
                setInfo(true);
            }
            else {
                let artwork1 = artworks.filter(artwork => artwork.name == id2.artName);
                // window.scrollTo(0, 0);
                setCurrentArt(<Artwork
                    {...artwork1[0]}
                    key={artwork1[0].id}
                    frontpage={() => setFrontpage(true)}
                    noCurrentArt={() => setCurrentArt(false)}
                />);
            }
        }, []);

        return (<></>)
    };

    return (

        <Router>
            <div className={styles.frontPage}>
                <Menu filter={filter} filter2={filter2} info={info} frontpage={frontpage} />
                {frontpage &&
                    <AllArtworks
                        artworks={artworks}
                        newList={newList}
                        setImgNames={setImgNames}
                        imgNames={imgNames}
                        scrollDirection={scrollDirection}
                    />}
                {currentArt && currentArt}
                {info &&
                    <Information />}

            </div>
            <Routes>
                <Route path="/artportfolio/" element={(
                    <ShowFrontPage>
                    </ShowFrontPage>
                )}>
                </Route>
                <Route path="/artportfolio/:artName?" element={(
                    < ShowArtwork />
                )}>
                </Route>
            </Routes>
        </Router >


    )
}