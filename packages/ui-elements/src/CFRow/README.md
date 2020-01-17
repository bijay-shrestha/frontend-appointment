# CFRow 

Row component made using react-bootstrap's `Form.Row` component.
To use it ,first import the component,

```jsx harmony
import {CFRow} from ui-elements;
```
Then use it as,

```jsx harmony
<CFRow id="email">
    <CFLabel
       id="name"
       labelName="Email"
       column={true}
       srOnly={false}
       md={4}
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
</CFRow>
```
## CFRow Props

```
as: elementType - defaultValue: <div> - You can use a custom element type for this component.

bsPrefix string - defaultValue: 'form-row' - Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.

children: node - Children components.

className: string - Css classname for additional styling.

id: string - Id of the component.
```
