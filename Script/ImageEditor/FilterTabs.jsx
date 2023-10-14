import React, {useContext, useState} from 'react';
import {Tabs, Tab, Box} from "@mui/material";
import {FilterContext} from "../ImageEditorFinish.jsx";

const FilterTabs = () => {
    const {tabFilter, setTabFilter, setFilterClass} = useContext(FilterContext);
    const handleChange =(e, newValue)=>{
        setTabFilter(newValue);
        if(newValue==='customFilter'){
            setFilterClass('')
        }
    }
    return (
        <Box sx={{marginBottom:'2rem'}}>
        <Tabs value={tabFilter} onChange={handleChange} textColor='secondary' indicatorColor='secondary'>

            <Tab value='instaFilter' style={{color:'white'}}label='Instagram Filtr'/>
            <Tab value='customFilter'style={{color:'white'}} aria-selected='true' label='Custom Filter'/>
        </Tabs>
        </Box>
    );
};

export default FilterTabs;