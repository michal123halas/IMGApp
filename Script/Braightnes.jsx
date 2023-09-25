import React from 'react';

const Braightnes = ({ brightness, handleBrightnessChange }) => {
    return (
        <>
            <label htmlFor="brightnessSlider">Brightness:</label>
            <input
                type="range"
                id="brightnessSlider"
                min="0"
                max="2"
                step="0.1"
                value={brightness}
                onChange={handleBrightnessChange}
            />
        </>
    );
};

export default Braightnes;