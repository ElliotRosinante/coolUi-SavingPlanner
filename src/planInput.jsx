import React,{useState} from "react"
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

/*selectedOptions array is the array that will contain the options
that have been checked. If these options are unchecked, we remove 
them from the selectedOptions array.*/


const options = ["daily", "weekly", "fortnight"]
function PlanInput(props){
  //state to control the select box values
   const [selectedOptions, setSelectedOptions] = useState([])

//state to control the input fields 
    const [income, setIncome] = useState("")
    const [savingGoal, setSavingGoal] = useState("")
    function handleCheckboxChange(event){
        //ths piece of code handles the checking of the checking of the checkbox using the checked property which results in a boolean

      const value = event.target.value
      if(selectedOptions.includes(value)){
        setSelectedOptions(selectedOptions.filter((option) => (option!== value)))
      }
      else {
        setSelectedOptions([...selectedOptions, value])
      }
    }
  function handleIncomeChange(event){
      const value = event.target.value
      setIncome(value)
  }
  function handleSavingChange(event){
    const value = event.target.value
    setSavingGoal(value)
  }
  //lemme just try out some new js conventions
  const handleResultsDisplay = ()=>{
//send the income, savingGoal and selectedOptions array to the planMain component
    props.onClicked(income,savingGoal,selectedOptions)
    // setSelectedOptions([])
  }
  return (
    <div>
      <div className = "form-group row">
        <label className ="form-label mt-0" htmlfor = "income">Your monthly income</label>
        <div className = "input-group mb-3">
          <span class="input-group-text">$</span>
          <input type = "number" placeholder = "Your monthly income"
          className = "form-control" id ="income" onChange ={handleIncomeChange} value = {income}/>
          <span class="input-group-text">.00</span>
        </div>      
      </div>
      <div className = "form-group row">
        <label className ="form-label mt-0" htmlfor = "saving-goal">Your monthly saving goal</label>
        <div className = "input-group mb-3">
          <span class="input-group-text">$</span>
          <input type = "number" placeholder = "Your saving-goal"
          className = "form-control" id ="saving-goal" onChange = {handleSavingChange} value = {savingGoal}/>
          <span class="input-group-text">.00</span>
        </div>      
      </div>
      <FormGroup>
        {options.map((option)=>{
          return (
            <React.Fragment key = {option}>
              <FormControlLabel control ={<Checkbox
            checked={selectedOptions.includes(option)}
            // defaultChecked , I don't need default checked anylonger
            color = "secondary"
            onChange={handleCheckboxChange}
            value={option}/>}
            label= {option}/>
            </React.Fragment>
          )
        })}
      </FormGroup>
      <button type="button" className="btn btn-success mb-3"
      onClick = {handleResultsDisplay}>Display Results</button>
    </div>
  )
}
export default PlanInput

/*

IMPORTANT 
I HAVE TO CREATE A RESET BUTTON SO THAT 
AFTER THE BUTTON HAS BEEN CLICKED, THE USER CAN CHOOSE TO EMPTY ALL INPUT
FIELDS AND RESET THE DEFAULT CHECKBOX VALUES BACK TO NORMAL */

/*

My effort to understand how material ui's select boxex work. 
we create an empty array and assign it to an empty state variable,
we place an event handler on each checkbox to listen for a change event

Anytime the checkbox is clicked or it changes, we check if that checkbox's 
value is included in the empty array, if it is , we remove it from the array
using filter, because this state array only contains the values or 
checkboxes that have been checked so that the code which activates whether 
or not the value of the checked prop in the checkbox should be set to true 
or false. */