import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./index.css";
import { create, all } from "mathjs";
/**
 * This will be the Calculator component, it could have the property initialValue that would initialize the calculator with a custom value insted of 0.
 */
//Let's create an array with buttons of the calculator
//Edited for testing the OrderCalculator function.
const button_values = [
  9,
  1,
  2,
  3,
  7,
  5,
  6,
  4,
  8,
  0,
  "C",
  "=",
  ".",
  "+",
  "-",
  "/",
  "*",
  "←",
];
const Calculator = (props) => {
  //It will have an operation state for the logic part of the component.
  const [operation, setOperation] = useState(
    props.initialValue ? props.initialValue : "0"
  );
  //Add a state for errors or infinity results.
  const [hasFailed, setHasfailed] = useState(false);
  useEffect(() => {
    if (hasFailed) {
      //If fails, restart calculator to 0.
      setHasfailed(false);
      setOperation("0");
      return;
    }
    if (
      operation.toLowerCase() === "syntax error" ||
      operation.toLowerCase() === "infinity"
    )
      setHasfailed(true);
  }, [operation]);
  //Let's order the buttons, divided by numeric and non-numeric values.
  //If someone wants to add buttons all it takes is to add it to the button_values array, but if it's an util button and not an operation one, it has to be added to the util_buttons array and code it's logic on the switch.
  const OrderCalculator = (type) => {
    //Let's order the array of numeric buttons in order to allow mistakes from the initial array of buttons
    let numeric_buttons = [...button_values]
      .filter((a) => !isNaN(a))
      .sort((a, b) => (a > b ? 1 : -1));
    let non_numeric_buttons = [...button_values].filter((a) => isNaN(a));
    //This array will help to differentiate the arithmetical operation buttons and those that are util for the logic, such as clear, equals, etc..
    let utils_buttons = ["C", "=", ".", "←"];
    let array_final = [];
    //In order to keep it simple and ordered, we will get a type value, and separate the cases so it will return only numeric, operation and util buttons for each case.
    switch (type) {
      case "numeric": {
        let aux_array = [];
        let i = 0;
        for (var value in numeric_buttons) {
          /**
           *  we have to considerate cases where the remainder of i divided by 3 is 0 to put our auxiliar array in the start of the final array,
           *  and restart the auxiliar array again, this will create three columns for the numberpad of the calculator with the standard format.
           */
          aux_array.push(value);
          if (i % 3 === 0) {
            array_final.unshift(aux_array);
            aux_array = [];
          }
          i++;
        }
        array_final = [].concat.apply([], array_final);
        //We do it this way so it gives the standard 789 -> first row,456 -> second row,123 -> third row, 0 -> fourth row format, instead of just an ordered 1234...
        return array_final;
      }
      case "operation": {
        //Here we will use our utils_buttons array to differentiate between the arithmetical operation buttons and the util ones.
        array_final = non_numeric_buttons.filter(
          (a) => utils_buttons.indexOf(a) === -1
        );
        return array_final;
      }
      case "utils": {
        let aux_array = [];
        //Let's iterate on the util_buttons array to splice and get each util button on a separate array in order to return one array with only util buttons.
        for (var button_util of utils_buttons) {
          let pos_button_util = non_numeric_buttons.indexOf(button_util);
          if (pos_button_util > -1) {
            aux_array.push(non_numeric_buttons.splice(pos_button_util, 1));
          }
        }
        array_final = [].concat.apply([], aux_array);
        return array_final;
      }
      default:
        break;
    }
  };
  //This will be the logical of the Calculator, all the process will be evaluated by the library mathjs.
  const math = create(all);
  const MathOperator = (buttonpressed) => {
    switch (buttonpressed) {
      case ".": {
        setOperation(operation + buttonpressed);
        break;
      }
      case "=": {
        try {
          setOperation(math.evaluate(operation).toString());
        } catch {
          setOperation("Syntax Error");
        }
        break;
      }
      case "C": {
        setOperation("0");
        break;
      }
      case "←": {
        operation.length === 1
          ? setOperation("0")
          : setOperation(operation.slice(0, -1));
        break;
      }
      default: {
        operation === "0"
          ? setOperation(buttonpressed)
          : setOperation(operation + buttonpressed);
        break;
      }
    }
  };
  return (
    <div className="calculator">
      <div className="calculator__results">
        <input
          type="text"
          value={operation}
          name="result"
          id="result"
          disabled
        />
      </div>
      <div className="calculator__buttons">
        {/* Put the buttons in distinct divs for orders sake and an easiest way to approach the styling */}
        <div className="operation_buttons">
          {OrderCalculator("operation").map((button) => {
            return (
              <button
                key={button.toString()}
                className="operation_button"
                onClick={() => MathOperator(button)}
              >
                {button}
              </button>
            );
          })}
        </div>
        <div className="numeric_buttons">
          {OrderCalculator("numeric").map((button) => {
            return (
              <button
                key={button.toString()}
                className="numeric_button"
                onClick={() => MathOperator(button)}
              >
                {button}
              </button>
            );
          })}
        </div>
        <div className="util_buttons">
          {OrderCalculator("utils").map((button) => {
            return (
              <button
                key={button.toString()}
                className="util_button"
                onClick={() => MathOperator(button)}
              >
                {button}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Calculator.propTypes = {
  initialValue: PropTypes.string,
};

export default Calculator;
