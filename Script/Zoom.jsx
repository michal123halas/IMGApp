import React from 'react';

const Zoom = ({imgZoomIn,imgZoomOut}) => {
    return (
        <>
            <button onClick={imgZoomIn}>+</button>
            <button onClick={imgZoomOut}>-</button>
        </>
    );
};

export default Zoom;