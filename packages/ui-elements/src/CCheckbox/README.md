# CCheckbox

`Checkbox` and `Radio` component made using react-bootstrap's Form.Check.

To use it, first

```jsx harmony
 import {CCheckbox} from ui-elements;
```
Then to use it as checkbox pass type as `checkbox`,

```jsx harmony
 <CCheckbox 
     id="checkbox"
     label="Checkbox"
     type="checkbox"
     onChange={(e) => console.log(e)}
     title="checkbox1"
     inline={true}
     custom={true}
/>
```
And to use it as radio button, simply pass type as `radio`.

```jsx harmony
 <CCheckbox 
     id="radio"
     label="Radio Button"
     type="radio"
     onChange={(e) => console.log(e)}
     title="radio1"
     inline={true}
     custom={true}
/>
```

## CCheckbox props:
```
id: string - Id of each checkbox/radio. It must be UNIQUE.

label: string || node - Label to display.

_ref: ReactRef - The FormCheck ref will be forwarded to the underlying input element, 
                 which means it will be a DOM node, when resolved.

children: node - Provide a function child to manually handle the layout of the FormCheck's inner components.

className: string - Css class to customize the design.

custom: boolean - Use Bootstrap's custom form elements to replace the browser defaults.

disabled: boolean - default: false - To manually disable or enable the checkbox.

feedback: node - Message to display when the input is in a validation state.

inline: boolean- default: false - add class 'form-check-inline' to bring checkboxes on the same horizontal line.

isInvalid: boolean - default: false - Manually style the input as invalid, shows in red.

isValid: boolean - default: false - Manually style the input as valid, shows in green.

title: string - default: '' - Label's title property.

type: string('radio' | 'checkbox') -  default: 'checkbox' - The type of checkable.

bsPrefix: string - default:'form-check' - Change the underlying component
                    CSS base class name and modifier class names prefix.
                    This is an escape hatch for working with heavily
                    customized bootstrap css.

onChange: function - Function that handles checkbox/radio button change event.
```
