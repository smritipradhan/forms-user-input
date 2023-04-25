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

Wtted 2. When Input losses focus 3. On Every Keystroke

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
