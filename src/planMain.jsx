import React,{useState} from "react"
import PlanInput from "./planInput"
// const seasonsArr = ["daily", " weekly", "fortnight"]
    let months_needed
    let monthlySavings
    let dailySavings
    let weeklySavings
    let fortnightlySavings

function PlanMain(){

  const [income,setIncome] = useState("")
  const [savingGoal, setSavingGoal] = useState("")
  // const [checkboxValues, setCheckBoxValues] = useState([]) it literally has no use
  const [dailyCost, setDailyCost] = useState("")
  const [weeklyCost, setWeeklyCost] = useState("")
  const [fortnightCost, setFortnightCost] = useState("")
  const [showResults, setShowResults] = useState(false)
/*I need a state variable to track if the income is greater than the saving
goal so I can display different data and html 
*/
const [savingGoalisBiggerThanIncome, setSavingGoalisBiggerThanIncome] = useState(true)

  //I need to define the functions that go to take all the data from the child component

function getChildData(monthly_income, saving_goal, checkbox_values){
    setIncome(monthly_income)
    setSavingGoal(saving_goal)
    // setCheckBoxValues(checkbox_values)
  //anytime the button is clicked before updating any state, 
  //I want to set all those states that I use their truthy or falsy
  //values for conditional rendering to empty strings

//possible bug I need to use these arguments in my function for calculations
//not the state variables
  setDailyCost("")
  setWeeklyCost("")
  setFortnightCost("")


    if(monthly_income > saving_goal){
      
      const costs = monthly_income - saving_goal
      const amountToSpendDaily = Math.floor(costs/30)
      const amountToSpendWeekly = Math.floor(costs/4)
      const amountToSpendFortnight = Math.floor(costs/2)

      //check if checkbox_values array contains daily, weekly or fortnight
      //and update the state accordingly
      if(checkbox_values.includes("daily")){
        setDailyCost(amountToSpendDaily)
      }
      if(checkbox_values.includes("weekly")){
        setWeeklyCost(amountToSpendWeekly)
      }
      if(checkbox_values.includes("fortnight")){
      setFortnightCost(amountToSpendFortnight)
    }
    setSavingGoalisBiggerThanIncome(false)
  } else {
    /*when saving goal is bigger than income, I will display 
    how many times you need to take monthly income in order to reach this big saving goal */
  const actual_saving_goal = saving_goal
//calculate the number of months needed to reach the saving goal
  const monthsNeeded = Math.ceil(actual_saving_goal/monthly_income)
  months_needed = monthsNeeded
 // Calculate the amount that needs to be saved each month to reach the goal
  monthlySavings = Math.round((actual_saving_goal/monthsNeeded)*100)/100
  dailySavings = Math.round((monthlySavings / 30) * 10) / 10;
  weeklySavings = Math.round((monthlySavings / 4) * 10) / 10;
  fortnightlySavings = Math.round((monthlySavings / 2) * 10) / 10;

    setSavingGoalisBiggerThanIncome(true)
    console.log(monthlySavings)
    console.log(dailySavings)
    console.log(weeklySavings)
    console.log(fortnightlySavings)
  }
  //after all the calculations show the results
  setShowResults(true)
}
//remember empty strings are falsy values so this will help us render conditionally

  return(
    <div>
      <div>
        {/*this is the div where we will display the header and input */}
        <nav className = "navbar navbar-expand-lg navbar-dark bg-primary">
          <div className = "container-fluid" style = {{
            fontSize: "30px",
            color: "black",
            justifyContent: "center"
          }}>
            Reach your monthly saving target
          </div>
        </nav>
        <div className = "alert alert-dismissible alert-warning m-3">
            <h4 className = "alert-heading">
            What does this app do?
            </h4>
            <p className = "mb-0">
            What this app does is actually fairly simple.
            You provide it with how much money you earn in a month, 
            and how much money you want to save at the end of the month, and depending
            on the timeframe you choose, it tells you how much you should spend in total each day, week or two weeks. i.e.fortnight
            so you can reach your saving goal 
            </p>
        </div>
      </div>
      <div className = "container">
          <div className = "row justify-content-between">
              <div className = "col-4">
              {/*this is where all our input fields gets displayed  */}
                <PlanInput onClicked={getChildData}/>
              </div> 
              <div className = "col-4">
                {/*this is the div where we will display the results from the calculations */}
                {showResults?(
                  <>
                  {!savingGoalisBiggerThanIncome?(
                  <>
                  {dailyCost?(<div className="form-group mb-3">
                        <fieldset disabled="">
                          <label className="form-label" htmlFor="disabledInput">
                            The amount of money you should spend each and every day to reach your saving goal is :
                          </label>
                          <input
                            className="form-control"
                            id="disabledInput"
                            type="text"
                            value={`${dailyCost}.00`}
                            disabled
                          />
                        </fieldset>
                    </div>): null}
                    {weeklyCost?(
                      <div className="form-group">
                        <fieldset disabled="">
                          <label className="form-label" htmlFor="disabledInput" style = {{color: "orange"}}>
                            The amount of money you should spend each and every week to reach your saving goal is :
                          </label>
                          <input
                            className="form-control"
                            id="disabledInput"
                            type="text"
                            value={`${weeklyCost}.00`}
                            disabled
                          />
                        </fieldset>
                    </div>
                    ): null}
                    {fortnightCost? (
                      <div className="form-group mt-3">
                        <fieldset disabled="">
                          <label className="form-label" htmlFor="disabledInput" style = {{color: "black"}}>
                            The amount of money you should spend each and every two weeks to reach your saving goal is :
                          </label>
                          <input
                            className="form-control"
                            id="disabledInput"
                            type="text"
                            value={`${fortnightCost}.00`}
                            disabled
                          />
                        </fieldset>
                    </div>
                    ): null}
                  </>
                ):(
                  //this will display the elements when saving goal is bigger than income
                <div>
                  <div className = "alert alert-dismissible alert-light">
                    <strong>It appears that your current monthly income is smaller than your saving
                    goal. You may need to recieve your monthly income for <span className="badge bg-primary rounded-pill">{months_needed} months</span>
                    to be able to reach your saving goal. </strong>
                    <p>You may need to save some amount each month or day or week to reach your target saving goal.
                    Refer to the saving plan below</p>
                  </div>
                  <ul className = "list-group">
                      <li className = "list-group-item list-group-item-action active">
                      Amount to save : 
                      </li>
                      <li className = "list-group-item d-flex justify-content-between align-items-center"> daily
                      <span className ="badge bg-primary rounded-pill">$ {dailySavings}</span >
                      </li>
                      <li className = "list-group-item d-flex justify-content-between align-items-center">weekly<span className ="badge bg-primary rounded-pill">$ {weeklySavings}
                      </span>
                      </li>
                      <li className = "list-group-item d-flex justify-content-between align-items-center">fortnightly<span className ="badge bg-primary rounded-pill">$ {fortnightlySavings}
                      </span>
                      </li>
                      <li className = "list-group-item d-flex justify-content-between align-items-center"> monthly
                      <span className ="badge bg-primary rounded-pill">$ {monthlySavings}</span >
                      </li>
                  </ul>
                </div>
                )}
                  </>
                ): null}              
              </div>
          </div>
      </div>
    </div>
  )
}

export default PlanMain

/* The thing is that I want the app to display how much the user should spend
in a day, week, fortnight only if the user selected it. 
If the user did not select it, I don't want it to show */


/* 
loop through the seasonsArr, if the checkbox arr contains  */
//if the user doesn't select anything, we need to prompt the user to select something