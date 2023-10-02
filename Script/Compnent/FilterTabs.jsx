import React, {useContext, useState} from 'react';
import {Tabs, Tab, Box} from "@mui/material";
import {FilterContext} from "../App.jsx";

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

            <Tab value='instaFilter' label='Instagram Filtr'/>
            <Tab value='customFilter' aria-selected='true' label='Custom Filter'/>
        </Tabs>
        </Box>
    );
};

export default FilterTabs;