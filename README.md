# forms-user-input

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
