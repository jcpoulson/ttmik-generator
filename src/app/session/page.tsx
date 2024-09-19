"use client"
import React, { useRef, useState, useContext } from 'react'
import styles from "./styles/session.module.css"

import { Button, Fab } from '@mui/material'
import { FlipCameraAndroid, SkipNext, Check, Cancel, CropOriginal, RoomPreferences } from '@mui/icons-material';

import { AppContext } from '@/context/AppContext';
import generateConceptSaying from '../api/firebase/AI/generateConceptSaying';

import anime from "animejs";

const Session: React.FC = () => {
    const scrollRef = useRef(null);
    const [display, setDisplay] = useState(true);
    const [sideDisplay, setSideDisplay] = useState<'front' | 'back'>('front');
    const [seeThroughMode, setSeeThroughMode] = useState(false);

    const { selectedLocation, selectedConcepts } = useContext(AppContext);

    const [saying, setSaying] = useState('Not yet generated');
    const [backSaying, setBackSaying] = useState('Not yet generated');

    async function handleAIGeneration() {
        const randomConcept = selectedConcepts[Math.floor(Math.random() * selectedConcepts.length)];
        const request = await generateConceptSaying(randomConcept.korean, randomConcept.english);
        setSaying(request.translation);
        setBackSaying(request.sentence);
    }


    function handleAnimation() {
        anime({
            targets: scrollRef.current,
            rotateY: 180,
            scaleX: -1,
            duration: 1600,
            easing: 'easeInOutQuad'
        })
        // Clear the scroll front
        setTimeout(() => {
            setDisplay(false)
            setSideDisplay('back');
            setDisplay(true);
        }, 800)
        // start an animation for display the scroll back
    }

    function resetAnimation() {
        anime({
            targets: scrollRef.current,
            rotateY: 180,
            scaleX: -1,
            duration: 1600,
            easing: 'easeInOutQuad'
        })
        // Clear the scroll front
        setTimeout(() => {
            setDisplay(false)
            setSideDisplay('front');
            setDisplay(true);
        }, 800)
    }

    function handleSeeThroughModeStatus() {
        if (seeThroughMode) {
            return {
                backgroundColor: "transparent",
                color: "white"
            }
        } else {
            return {
                backgroundColor: "white",
                color: "black"
            }
        }
    }

    return (
        <div style={{ backgroundImage: `url(${selectedLocation})` }} className={styles.container}>
            <div className={styles.scroll} ref={scrollRef} style={handleSeeThroughModeStatus()}>
                
                <div style={{ display: display === true ? 'block' : 'none' }}>
                    {
                        sideDisplay === 'front' ?
                            <div className={styles.scrollFront}>
                                <div className={styles.frontButtons}>
                                    <Fab size='small' sx={{ margin: "5px"}} onClick={() => setSeeThroughMode(!seeThroughMode)}>
                                        <RoomPreferences />
                                    </Fab>
                                    <Fab size='small' sx={{ margin: "5px"}} onClick={() => setSeeThroughMode(!seeThroughMode)}>
                                        <CropOriginal />
                                    </Fab>
                                    <Fab size='small' sx={{ margin: "5px"}} onClick={handleAnimation}>
                                        <FlipCameraAndroid />
                                    </Fab>
                                    <Fab size='small' sx={{ margin: "5px"}} onClick={handleAIGeneration}>
                                        <SkipNext />
                                    </Fab>
                                </div>
                                {
                                    saying === 'Not yet generated' ?
                                    <Button variant="contained" onClick={handleAIGeneration}>Generate</Button>
                                    :
                                    <p style={{ color: seeThroughMode ? "white": "black", backgroundColor: seeThroughMode ? "navy" : "" }} className={styles.scrollWriting}>{saying}</p>
                                }
                            </div>
                            :
                            <div className={styles.scrollBack}>
                                <div className={styles.backButtons}>
                                    <Fab size='small' sx={{ margin: "5px"}} onClick={() => setSeeThroughMode(!seeThroughMode)}>
                                        <RoomPreferences />
                                    </Fab>
                                    <Fab size='small' sx={{ margin: "5px"}} onClick={() => setSeeThroughMode(!seeThroughMode)}>
                                        <CropOriginal />
                                    </Fab>
                                    <Fab size='small' color="success" sx={{ margin: "5px"}} onClick={() => {
                                        resetAnimation();
                                        handleAIGeneration();
                                    }}>
                                        <Check />
                                    </Fab>
                                    <Fab size='small' color="error" sx={{ margin: "5px"}}>
                                        <Cancel />
                                    </Fab>
                                </div>
                                <p style={{ color: seeThroughMode ? "white": "black", backgroundColor: seeThroughMode ? "navy" : "" }} className={styles.scrollWriting}>{backSaying}</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Session