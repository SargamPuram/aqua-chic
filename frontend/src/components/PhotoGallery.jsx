import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        // Fetch existing images when the component mounts
        axios.get('url-to-fetch-images').then((res) => {
            setGallery(res.data.images);
        });
    }, []);

    return (
        <div>
            <h1>Photo Gallery</h1>
            <div className="gallery">
                {gallery.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Uploaded ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;

