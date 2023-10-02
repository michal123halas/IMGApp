import React, {useContext, useRef, useState} from 'react';
import {styled,Box} from "@mui/system";
import {Button, Grid} from "@mui/material";
import {FilterContext} from "../App.jsx";
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import "../Compnent/Style/InstaFltr.scss"


const StyleBox = styled(Box)({
    background:'#ddd',
    minHeight:'20rem',
    maxHeight:'100px',
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
    }
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
        </Grid>

    );
};

export default ImageFiled;