import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isEnteredNameValid, setEnteredNameValid] = useState(true);
  const [isEnteredNameTouched, setEnteredNameTouched] = useState(false);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    if (event.target.value.trim() !== "") {
      setEnteredNameValid(true);
    }
  };

  const nameInputBlueHandler = (event) => {
    setEnteredNameTouched(true);
    if (enteredName.trim() === "") {
      setEnteredNameValid(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    if (enteredName.trim() === "") {
      setEnteredNameValid(false);
      return;
    }
    setEnteredNameValid(true);
    setEnteredName("");
  };

  const nameInputIsValid = !isEnteredNameValid && isEnteredNameTouched;
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={nameInputIsValid ? "form-control invalid" : "form-control"}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
          onBlur={nameInputBlueHandler}
        />
      </div>
      {nameInputIsValid && <p style={{ color: "red" }}> Name is Invalid</p>}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
