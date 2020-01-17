# CForm 

Form component made using react-bootstrap's form.

To use it, first

```jsx harmony
 import {CForm} from ui-elements;
```
Then simply use it,

```jsx harmony
 let form = (<>
        <input type="text" required/>
        <CButton id="c-button-2" type="submit" name="Submit"/>
   </>);

 <CForm
      id="test"
      children={form}
      onSubmit={()=> {}}
 />
```
You can pass in the form components through children props and submit handler function through onSubmit props.

CForm props:
```
_ref: ReactRef - The Form ref will be forwarded to the underlying element, which means, unless it's rendered as a composite component, it will be a DOM node, when resolved.

as: elementType - You can use a custom element type for this component.,

bsPrefix: string - defaultValue: {'form'} - Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.,

children: node - Children of Form Component,

className: string - Css classname for additional styling.

id: string - Unique id of the form component,

inline: boolean - defaultValue: false -	Display the series of labels, form controls, and buttons on a single horizontal row,

noValidate: boolean - Determines whether form-data should be validated or not on submission. When set to true,specifies that the form-data should not be validated on submission.
                                                                                                             
onSubmit: function - The method that handles the form submit action.,

validated: boolean - Mark a form as having been validated. Setting it to true will toggle any validation styles on the forms elements.,
```
