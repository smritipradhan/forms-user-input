# Forms and User Inputs

Handling Forms,Adding Validations, Custom Input Hooks , Using useReducer

## Whats so complex about forms ?

Forms might seem simple.Forms and inputs can assume broad variety of inputs and states.One more states can be valid or invalid.Valid and Invalid does not imply on the entire form but also to every individual input in the form.And this sum of all the states makes up the overall form State.

One or more inputs are invalid

- Output input specific error message & highlight problamatic inputs
- Ensure forms can't be submitted / saved.

All the inputs are valid
-Allow forms to be submitted / saved

When to Validate the User Input ?

1. When form is submitted
2. When Input losses focus
3. On Every Keystroke

---

1. When form is submitted

-Allows user to enter a valid value before warning .
-Avoid unnecessary warnings but maybe present feedback very late.

If someone submits and then its told that something was wrong. The user needs to go back and correct it again.

2. When Input losses focus
   -Allows the user to enter a valid value before warning.But shows an Error after user is done with the input.

3. On Every Keystroke
   -Provide direct feedback to the user if the input is valid or not on every keystroke.
   Initially every input is invalid. It would be useful if we combine this with other methods somehow if the input was invalid before can provide direct feedback, once the input is valid.

## Dealing with Form Submission & Getting User Input Values

There are two ways of fetching the user Input

1. Using ref once the user is done typing the value
2. Listen on every key stroke

### Using event.preventDefault()

And the default behavior by the browser is that if a form is submitted with a button instead of a form, a HTTP request is sent to the server serving this website. That happens automatically. The browser does this automatically. It sends an HTTP request to the server, which is serving this website. The problem with that is that here, we don't really have a server that wants to do anything with that request, we just have a static server that serves our JavaScript and HTML files. So we don't want this request to be sent, and hence on this event object, which we get automatically passed into this function since we've bounded to on submit, on this event object, we can call prevent default to tell the browser to not do that default behavior, to not send this HTTP request, and instead to do nothing.

And we need to do that because if that HTTP request would be sent, it would lead to the page being reloaded in the end, and we definitely don't want that, because that would restart the entire react application, we would lose all our state,

1.Listen on every key stroke

```
import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState();

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(enteredName);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={nameInputChangeHandler} />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

```

2. Using useRef()

```
import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputName = nameInputRef.current.value;
    console.log(inputName);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

```

### When to use What ??

When we are using the input data only once for submission, we can use ref and if we want to validate after every keystroke , we can use ref.

## Adding Basic Validation

One way of adding Basic Validation to the Form

```
import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isEnteredNameValid, setEnteredNameValid] = useState(true);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (enteredName.trim() === "") {
      setEnteredNameValid(false);
      return;
    }
    setEnteredNameValid(true);
    console.log(enteredName);
    setEnteredName("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      {!isEnteredNameValid && <p style={{ color: "red" }}> Name is Invalid</p>}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
```

Note - ignore inline styling . Do not try this Stunt in your home .

### Handling the was touched state

```
 const [isEnteredNameValid, setEnteredNameValid] = useState(true);
```

This is a cheating as we are setting a value which is not correct just to get rid of the invalid thing initially.
Where this could be a problem ?
if we do this - Ideally you may want to send a http request to the server.

```
  useEffect(() => {
    if (isEnteredNameValid) console.log("Entered Name is Valid");
  }, [])

```

This gets logged right at the beginning.

Now we add another state, isEnteredNameTouched which will be used with isEnteredNameValid

### React to Lost Focus

We might want to react to the lost focus. When the user didnt enter anything and then losses focus we can give error feedback to the user.Now whenever the input field loses focus , even when there was nothing in the input field.
Now when we enter something , we want to give the user chance to enter correct data and not to show error once the use starts typing correctly.
We want to give the user immediate feedback when it comes to fixing.

```
import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isEnteredNameValid, setEnteredNameValid] = useState(false);
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
    setEnteredNameTouched(false);
    setEnteredName("");
  };

  const nameInputIsInValid = !isEnteredNameValid && isEnteredNameTouched;

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

```

### Refactoring the Code

We can get rid of isEnteredNameValid state as we can always derive isEnteredNameValid from the enteredName and whenever enteredName is change , the component rerenders and we are ensured the derived state is always updated.

```
import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isEnteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInValid = !enteredNameIsValid && isEnteredNameTouched;

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
    setEnteredNameTouched(false);
    setEnteredName("");
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
```

### Managing the Overall Form Validity

Here we have only one input field. But what should we do when there are more and we need to have the entire form Validity.
In that case we need to check the form validity whenever one input field changes.

```
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
```

## Using Custom Hook

"Hook"

```

import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    isValid: valueIsValid,
    reset,
  };
};
export default useInput;
```

---

Input Form

```
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

```
