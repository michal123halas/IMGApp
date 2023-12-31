import React, {useContext} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {filterValues} from "../Database/untlis.jsx";
import {FilterContext} from "../ImageEditorFinish.jsx";

const InstaFilter = () => {
    const {filterClass , setFilterClass} = useContext(FilterContext)
    const handleChange =(e)=>setFilterClass(e.target.value)
    return (
     <Box sx={{maxWidth:'300'}}>
         <FormControl fullWidth>
             <InputLabel style={{color:'white'}}>Filter</InputLabel>
             <Select style={{color:'white'}} onChange={handleChange} value={filterClass} label='Filter'>
                 {filterValues.map(i => <MenuItem value={i.class} key={i.class}>{i.name}</MenuItem>)}
             </Select>
         </FormControl>
     </Box>
    );
};

export default InstaFilter;