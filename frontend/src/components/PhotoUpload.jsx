import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PhotoUpload = () => {
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    function handleImage(e){
        console.log(e.target.files[0])
        setImage(e.target.files[0])

    }
    function handleApi(){
        const formData = new FormData;
        formData.append('image', image)
        axios.post('url', formData).then((res) => {
            console.log(res);
            navigate('/photogallery');
            
        })

    }

  return (
    <div>
        <h1>Please upload the photo here</h1>
        <input type = "file" name="file" onChange={handleImage}></input>
        <button onClick={handleApi}>Submit</button>
        </div>
  )
}

export default PhotoUpload;