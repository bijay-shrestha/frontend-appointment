# CFeedback

Component that shows feedback on FormControls(form validation message) made using react-bootstrap's \
`FormControl.Feedback` component.

To use it ,first import the component,

```jsx harmony
import {CFeedback} from ui-elements;
```
Then use it as, 

```jsx harmony
<CForm id="test"  validated={true}>
  <CFormGroup
    id="email">
    <CFLabel
       id="name"
       labelName="Email"
    />
    <CFControl
       id="email"
       type="email"
       name="email"
       placeholder="Enter your email"
       size="lg"
       required={true}
       onChange={(e) => console.log(e.target.value)}
    />
    <CFeedback id="email" message="Email looks good."/>
    <CFeedback id="email" message="Email looks bad." type="invalid"/>
  </CFormGroup>
</CForm>
```
``Note:`` To use CFeedback, we have to use it within the CForm component with validated props set to true.
## CFeedback props

```text
as: elementType - You can use a custom element type for this component.

className: string - Css classname for additional styling.

id: string - Id of the component.

message: string - A feedback message to display.

type: 'valid' | 'invalid' -  defaultValue:'valid' - Specify whether the feedback is for valid or invalid fields.                                                  
```
