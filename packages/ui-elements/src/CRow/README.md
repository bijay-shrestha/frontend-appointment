# CRow 

Row component made using react-bootstrap's `Row` component.
To use it ,first import the component,

```jsx harmony
import {CRow} from ui-elements;
```
Then use it as,

```jsx harmony
<CRow id="passwordRow">
      <CCol id="passLabel">
            <CFLabel
                 id="password"
                 labelName="Password"
                 column={true}
                 srOnly={false}
                 md={4}
            />
      </CCol>
      <CCol id="passwordCol">
           <CFControl
                id="password"
                type="password"
                placeholder="Your password here."
                size="lg"
                autoComplete="off"
           />
      </CCol>
</CRow>
```
## CRow Props

```
as: elementType - You can use a custom element type for this component.

bsPrefix string - defaultValue: 'row' - Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.

children: node - Children components.

className: string - Css classname for additional styling.

id: string - Id of the component.

noGutters: boolean - defaultValue: false - 	
           Removes the gutter spacing between Cols as well as any added negative margins.
```
