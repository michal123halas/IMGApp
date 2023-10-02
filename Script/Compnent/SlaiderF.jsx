import React, {useContext, useEffect, useState} from 'react';
import {Box, Slider} from "@mui/material";
import {FilterContext} from "../App.jsx";

const SlaiderF = ({slide}) => {
    const styleBOne ={display:'flex', alignItems:'center', gap:'1rem',marginBottom:'1rem'}

    const {label,defaultValue,field} = slide;
    const [value , setValue] = useState(defaultValue);
    const {customFilter, setCustomFilter} =  useContext(FilterContext);

    useEffect(() => {
        setCustomFilter({ ...customFilter, [field]: value });
    }, [value]);
    const handleSliderValue = e => setValue(e.target.value);
    return (
        <Box sx={styleBOne}>
            <Box sx={{minWidth:'6rem'}}>{label}</Box>
            <Slider size='small' valueLabelDisplay='auto' value={value} onChange={handleSliderValue} max={200}/>
        </Box>
    );
};

export default SlaiderF;