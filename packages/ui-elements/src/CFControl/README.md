# CFControl

This is a `Form Control` component made using react-bootstrap's `Form.Control`.

To use it ,first import the component,

```jsx harmony
import {CFControl} from ui-elements;
```
Then use it as,

```jsx harmony
<CFControl
   id="text"
   type="email"
   placeholder="Enter your email"
   size="lg"
   required={true}
/>
```
*Note:* While using **CFControl** with **CFormGroup**, either pass only `id` for **CFControl** or only pass `controlId` for **CFormGroup**.
If we pass `controlId` for **CFormGroup**, don't pass `id` for **CFControl** and vice versa.
```
Warning: `controlId` is ignored on `<FormControl>` when `id` is specified.
```
To do:
```jsx harmony
<CFormGroup
    id="test"
    controlId="formHorizontalEmail">
    <CFControl
       type="email"
       placeholder="Enter your email"
       size="lg"
       required={true}
    />
  </CFormGroup>
```

Not to do:

```jsx harmony
<CFormGroup
    id="test"
    controlId="formHorizontalEmail">
    <CFControl
       id="email"
       type="email"
       placeholder="Enter your email"
       size="lg"
       required={true}
    />
  </CFormGroup>
```

## CFControl Props:
```text
 _ref: ReactRef - The FormControl ref will be forwarded to the underlying input element, which means unless as is a composite component, it will be a DOM node, when resolved.
 
as: 'input' | 'textarea' | elementType - The underlying HTML element to use when rendering the FormControl.

autoComplete: string - To prevent auto-complete of CFControl, pass in 'off' to disable autocomplete.Specially to use when using CFControl as password.

bsPrefix: string - defaultValue: {'form-control'} - Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.

children: node - Children element of the component.

className: string - Css classname for additional styling.

defaultValue: string - Default value for Form Control.

id: string - Uses controlId from <FormGroup> if not explicitly specified.

isInvalid: boolean - Add "invalid" validation styles to the control and accompanying label

isValid: boolean - Add "valid" validation styles to the control.

max: number - Max number allowed when using CFormControl as number input.

min:number - Min number allowed when using CFormControl as number input.

multiple: boolean - When using CFControl as 'select', enables selection of multiple option.

name: string - Name of CFControl(Form Control).

onChange: function - A callback fired when the value prop changes.

placeholder: string - Placeholder for CFControl.

plaintext: boolean - Render the input as plain text. Generally used along side readOnly.

readOnly: boolean - Make the control readonly.

required: boolean - To mark certain field's value compulsory.

rows: string - To specify row width when using as text area.

size: string - Eg.'sm','lg - Input size variants.

type: string - The HTML input type, which is only relevant if as is 'input' (the default).

value: string - controlled by: onChange, initial prop: defaultValue
                The value attribute of underlying input.
```
