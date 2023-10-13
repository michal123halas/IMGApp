import React, {useContext, useRef, useState} from 'react';
import {styled,Box} from "@mui/system";
import {Button, Grid} from "@mui/material";
import {FilterContext} from "../ImageEditorFinish.jsx";
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import ".//Style/InstaFltr.scss"
import { storage} from "../Database/GoogleStorge.jsx";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const StyleBox = styled(Box)({
    background:'#ddd',
    minHeight:'20rem',
    maxHeight:'100vh',
    marginBottom:'1rem',
    borderRadius:'5px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    cursor:'pointer',
})
const StyleImg = styled('img')(props => ({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter: `contrast(${props.customFilter.contrast}%) brightness(${props.customFilter.brightness}%) saturate(${props.customFilter.saturate}%) sepia(${props.customFilter.sepia}%) grayScale(${props.customFilter.gray}%)`,
}))

const ImageFiled = () => {
    const upLoadInputRef = useRef(null)
    const imgResultRef = useRef(null)
    const [imageFile , setImageFile] = useState(null)
    const {filterClass , customFilter} = useContext(FilterContext)
    const handleChangeInput =(e)=>{
       setImageFile(URL.createObjectURL(e.target.files[0]))
    }
    const downoladImage =()=>{
        domtoimage.toBlob(imgResultRef.current)
            .then(function (blob) {
                saveAs(blob, 'my-node.png');
            });
        console.log(imageFile)
    }

    const uploadImageToFirebase = () => {
        if (imageFile) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const timestamp = Date.now();
            const fileName = `${timestamp}_${imageFile.name}`;


            const img = imgResultRef.current;
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;


            context.filter = `contrast(${customFilter.contrast}%) brightness(${customFilter.brightness}%) saturate(${customFilter.saturate}%) sepia(${customFilter.sepia}%) grayscale(${customFilter.gray}%)`;
            context.drawImage(img, 0, 0, canvas.width, canvas.height);


            canvas.toBlob((blob) => {

                const file = new File([blob], imageFile.name, { type: 'image/jpeg' });

                const storageRef = ref(storage, `images/${fileName}`);
                const uploadTask = uploadBytesResumable(storageRef, file);


                uploadTask.on(
                    'state_changed',
                    snapshot => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload progress: ${progress}%`);
                    },
                    error => {
                        console.error('Upload error:', error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(storageRef);
                        console.log('File available at:', downloadURL);
                    }
                );
            }, 'image/jpeg');
        }
    };
    const renderImage =()=>(
        <figure>
            <StyleImg customFilter={!filterClass && customFilter}  className={filterClass} src={imageFile} alt="" ref={imgResultRef}/>
        </figure>
    )

    return (
        <Grid item xs={12} md={7}>Image
         <StyleBox onClick={()=>{upLoadInputRef.current && upLoadInputRef.current.click()}}>
             {imageFile ? renderImage() : <p>UploadImage</p>}
         </StyleBox>
            <input ref={upLoadInputRef} onChange={handleChangeInput} type="file" accept="image/*" hidden/>
            <Button onClick={downoladImage} disabled={!imageFile} variant='contained'>Download</Button>
            <Button onClick={uploadImageToFirebase} disabled={!imageFile} variant="contained">Upload to Firebase</Button>
        </Grid>

    );
};

export default ImageFiled;