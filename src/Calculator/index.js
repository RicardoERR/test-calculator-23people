import React, { useState } from "react";
import PropTypes from "prop-types";
/**
 * This will be the Calculator component, it could have the property initialValue that would initialize the calculator with a custom value insted of 0.
 */
//Let's create an array with buttons of the calculator
const button_values = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
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
        {button_values.map((button) => {
          return <button key={button.toString()}>{button}</button>;
        })}
      </div>
    </div>
  );
};

Calculator.propTypes = {
  initialValue: PropTypes.string,
};

export default Calculator;
