# CFormGroup 

Form.Group component made using react-bootstrap's `Form.Group`.

To use it, first

```jsx harmony
import {CFormGroup} from ui-elements;
```
Then simply use it,

```jsx harmony
 let form = (<>
        <input type="text" required/>
        <CButton id="c-button-2" type="submit" name="Submit"/>
   </>);

  <CFormGroup
         id="test"
         controlId="formHorizontalEmail"
         children={form}/>;
```
You can pass in the form components through children props and submit handler function through onSubmit props.

## CFormGroup props:

```text
_ ref: ReactRef - The FormGroup ref will be forwarded to the underlying element. Unless the FormGroup is rendered as a composite component, it will be a DOM node, when resolved.
as: elementType - You can use a custom element type for this component.
bsPrefix: string - defaultValue: 'form-group' - Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.
children: node - Children of CFormGroup Component.
className: string - Css classname for additional styling.
controlId: string - Sets id on <FormControl> and htmlFor on <FormGroup.Label>. 
                    If the children component have their own id, they take their own id by default
id: string - id of the FormGroup component.
```
