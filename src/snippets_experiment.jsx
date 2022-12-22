import React from "react"
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function Random(){
  return (
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked color = "secondary"/>} label="daily"/>
        <FormControlLabel control={<Checkbox defaultChecked />} label="weekly"/>
        <FormControlLabel control={<Checkbox defaultChecked />} label="fortnight"/>
      </FormGroup>
  )
}

export default Random