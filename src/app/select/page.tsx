'use client'
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation'

import { Box, Grid2, Fab, Pagination } from '@mui/material';
import { Home, AccountCircle, AutoStories } from '@mui/icons-material'
import styles from "./styles/select.module.css";

import { getAllPhotos } from "../api/firebase/getRandomPhoto";
import shuffleArray from '@/helpers/shuffleArray';

import { AppContext } from '@/context/AppContext';
import ConceptSelectionModal from '@/components/ConceptSelectionModal';

type Props = {

}

const Select: React.FC = (props: Props) => {
    const [photos, setPhotos] = useState(['']);
    const router = useRouter();
    const { setSelectedLocation } = useContext(AppContext);

    // Did this with a server component but it ultimately won't work with having to store data within context
    // Maybe explore getServerSideProps or getStaticProps?

    
    const [currentPage, setCurrentPage] = useState(1);
    const photosPerPage = 8; // Set the number of photos per page

    // Calculate the photos to display on the current page
    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

    // Handle pagination change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };


    useEffect(() => {
        async function getPhotoUrls() {
            const fetchedPhotos = await getAllPhotos();
            const shuffledPhotos = shuffleArray(fetchedPhotos)
            setPhotos(shuffledPhotos);
        }
        getPhotoUrls()
    }, [])


    // Concept Select Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const startSession = () => {
        router.push('/session')
    }
    

    return (
        <div className={styles.container}>
            <div className={styles.pageControls}>
                <Fab size='medium' sx={{ margin: "5px"}}>
                    <Home />
                </Fab>
                <Fab size='medium' sx={{ margin: "5px"}}>
                    <AccountCircle />
                </Fab>
                <Fab size='medium' sx={{ margin: "5px"}}>
                    <AutoStories />
                </Fab>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid2 container size={12} spacing={6} justifyContent="center" alignItems="center">
                    {
                        currentPhotos.map((photo: string, index: number) => (
                            <Grid2 key={index} onClick={() => {
                                handleOpen();
                                setSelectedLocation(photo);
                                // router.push('/session')
                            }}>
                                <div className={styles.thumbnail} style={{ backgroundImage: `url(${photo})` }}></div>
                            </Grid2>))
                    }
                </Grid2>
                <Pagination
                    count={Math.ceil(photos.length / photosPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
                />
            </Box>
            <ConceptSelectionModal open={open} handleClose={handleClose} startSession={startSession} />
        </div>
    )
}

export default Select