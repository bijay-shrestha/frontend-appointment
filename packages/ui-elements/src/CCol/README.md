# CCol 

Col component made using react-bootstrap's `Col` component.
To use it ,first import the component,

```jsx harmony
import {CCol} from ui-elements;
```
Then use it as,

```jsx harmony
<CRow id="email">
    <CCol id="emailLabel" lg={4}>
      <CFLabel
        id="name"
        labelName="Email"
        column={true}
        srOnly={false}
        md={4}
      />
    </CCol>
    <CCol id="email" lg={4}>
        <CFControl
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          size="lg"
          required={true}
          onChange={(e) => console.log(e.target.value)}
        />
    </CCol>
</CRow>
```
## CCol Props

```
as: elementType - You can use a custom element type for this component.

bsPrefix string - defaultValue: 'col' - Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.

children: node - Children components.

className: string - Css classname for additional styling.

id: string - Id of the component.

lg: (true | "auto" | number | { span: true | "auto" | number, offset: number, order: number }) 
    - The number of columns to span on large devices (≥992px)
    
md: (true | "auto" | number | { span: true | "auto" | number, offset: number, order: number })
    - The number of columns to span on medium devices (≥768px)
    
sm: (true | "auto" | number | { span: true | "auto" | number, offset: number, order: number })
    - The number of columns to span on small devices (≥576px)
xl: (true | "auto" | number | { span: true | "auto" | number, offset: number, order: number })
    - The number of columns to span on extra large devices (≥1200px)
    
xs: (true | "auto" | number | { span: true | "auto" | number, offset: number, order: number })
    - The number of columns to span on sxtra small devices (<576px)
```
