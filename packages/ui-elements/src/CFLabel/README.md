# CLabel

Form Label made using react-bootstrap's `Form.Label` component.
To use it, first

```jsx harmony
import {CFLabel} from ui-elements;
```
Then simply use it,
```jsx harmony
 <CFLabel
     id="name"
     labelName="Name"
     column={true}
     srOnly={false}
     md={4}
 />

```

## CLabel props:
```text
_ ref: ReactRef - The FormGroup ref will be forwarded to the underlying element. Unless the FormGroup is rendered as a composite component, it will be a DOM node, when resolved.
as: elementType - You can use a custom element type for this component.
bsPrefix: string - defaultValue: 'form-group' - Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.
className: string - Css classname for additional styling.
column: boolean - defaultValue: false - Renders the FormLabel as a <Col> component (accepting all the same props), as well as adding additional styling for horizontal forms.
htmlFor: string - Uses controlId from <FormGroup> if not explicitly specified.
id: string - id of the FormGroup component.
labelName: string - Display name of Label
srOnly: boolean - defaultValue: false - Hides the label visually while still allowing it to be read by assistive technologies.
sm,md,lg,xl : number - To provide column size(grid). To be used with column props set to true.

```
We can pass ``sm``,``lg``,``md`` and ``xl`` props only when column prop is passed with boolean value 'true'.
Example:
```jsx harmony
<CFLabel 
    labelName="Email" 
    column={true} 
    sm={2}
/>
```
