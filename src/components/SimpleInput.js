import { useEffect, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isEnteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInValid = !enteredNameIsValid && isEnteredNameTouched;
  let isFormIsValid = false;

  if (enteredNameIsValid) {
    isFormIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlueHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);

    if (!enteredNameIsValid) return;

    setEnteredName("");
    setEnteredNameTouched(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={
          nameInputIsInValid ? "form-control invalid" : "form-control "
        }
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
      {nameInputIsInValid && <p style={{ color: "red" }}> Name is Invalid</p>}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
