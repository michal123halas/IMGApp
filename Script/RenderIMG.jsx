import React, {useState} from 'react';
import AvatarEditor from "react-avatar-editor";
import Zoom from "./Zoom.jsx";
import Braightnes from "./Braightnes.jsx";
const imagles2 = "src/assets/Test.jpeg" ;
const RenderImg = ({imageUrl}) => {
    const [zoom, setZoom] = useState(1.2)
    const [brightness, setBrightness] = useState(1);
    //zoom
    const imgZoomIn =()=>{
        setZoom(prevState => prevState + 0.1)
    }
    const imgZoomOut =()=>{
        setZoom(prevState => prevState - 0.1)
    }
    //braightness
    const increaseBrightness = () => {
        setBrightness((prevBrightness) => Math.min(prevBrightness + 0.1, 2));
    };

    const decreaseBrightness = () => {
        setBrightness((prevBrightness) => Math.max(prevBrightness - 0.1, 0));
        console.log(brightness)
    };


    return (
        <>
            <Braightnes increaseBrightness={increaseBrightness} decreaseBrightness={decreaseBrightness}/>
             <Zoom imgZoomIn={imgZoomIn} imgZoomOut={imgZoomOut}/>

             <AvatarEditor
            image={imageUrl}
            width={600}
            height={600}
            border={50}
            color={[255, 255, 255, 0.6]}
            scale={zoom}
            rotate={0}
            brightness={brightness}
        />
        </>

    );
};

export default RenderImg;