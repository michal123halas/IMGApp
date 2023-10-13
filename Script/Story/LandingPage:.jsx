import { getDownloadURL, ref, listAll } from 'firebase/storage';
import React,{useEffect,useState} from "react";
import {storage} from "../Database/GoogleStorge.jsx";
import {Grid} from "@mui/material";

const LandingPage = () => {
    const [imageURLs, setImageURLs] = useState([]);

    useEffect(() => {
        const fetchImageURLs = async () => {
            const storageRef = ref(storage, 'images'); // Ścieżka do folderu z obrazami
            const imagesList = await listAll(storageRef);

            const urls = await Promise.all(
                imagesList.items.map(async (imageRef) => {
                    const url = await getDownloadURL(imageRef);
                    return url;
                })
            );

            setImageURLs(urls);
        };

        fetchImageURLs();
    }, []);

    return (
        <Grid container spacing={2}>
            {imageURLs.map((imageUrl, index) => (
                <Grid key={index} item xs={12} md={6}>
                    <div style={{ margin: '50px' }}>
                        <img src={imageUrl} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%' , objectFit: "contain"}} />
                    </div>
                </Grid>
            ))}
        </Grid>
    );
};

export default LandingPage;
