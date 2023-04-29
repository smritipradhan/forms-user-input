import useInput from "../hooks/input-hook";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    valueBlurHandler: nameInputBlueHandler,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    isValid: emailInputIsValid,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  let isFormIsValid = false;

  if (enteredNameIsValid && emailInputIsValid) {
    isFormIsValid = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormIsValid) return;

    resetNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={nameInputHasError ? "form-control invalid" : "form-control "}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
          onBlur={nameInputBlueHandler}
        />
        {nameInputHasError && <p style={{ color: "red" }}> Name is Invalid</p>}
      </div>
      <div
        className={
          emailInputHasError ? "form-control invalid" : "form-control "
        }
      >
        <label htmlFor="name">Email</label>
        <input
          type="text"
          id="name"
          onChange={emailInputChangeHandler}
          value={enteredEmail}
          onBlur={emailInputBlurHandler}
        />

        {emailInputHasError && (
          <p style={{ color: "red" }}> Email is Invalid</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
