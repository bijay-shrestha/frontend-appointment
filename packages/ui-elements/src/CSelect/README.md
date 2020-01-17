#CSelect

This is __select/dropdown__ made using **react-select**.

Ref: [https://jedwatson.github.io/react-select/]() 

##Installation
First we have to install react-select, using command :

```
 yarn add react-select
```
Next to use it, first import it, then simply use it as,

```jsx harmony
   <CSelect
      value={value}
      options={optionsArray}
      onChange={(e) => console.log(e)}
   />
```
We have to provide our options 'array of object' and an event listener function for onChange. 
We can bind the selected value through`value` prop.

To use the CSelect as **multi-select**, we simply have to pass in the prop *`isMulti`* set to true.
When using as multi-select, it will bind data in array which we can get through `value` prop.

##Note: We need to provide an object with properties `label` and `value` to `value` prop.
```jsx harmony
let obj= {
    label:'',
    value:''
};
<CSelect
    value={obj}
    options={optionsArray}
    onChange={(e) => console.log(e)}
/>

```

##Props of CSelect
```text
    autoFocus: boolean - Focus the control when it is mounted
    backspaceRemovesValue: boolean - Remove the currently focused option when the user presses backspace 
    blurInputOnSelect: boolean - Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices)
    captureMenuScroll: boolean - When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent
    className: string - Sets a className attribute on the outer component - Select container will  be given a className based on provided value
    classNamePrefix: string - If provided, all inner components will be given a prefixed className attribute
    closeMenuOnScroll: boolean || function - If true, close the select menu when the user scrolls the document/body.
    closeMenuOnSelect: boolean - Close the select menu when the user selects an option
    components: object - This complex object includes all the compositional components that are used in react-select.
    defaultInputValue: string -  set the initial value of the search input
    defaultMenuIsOpen: boolean - set the initial open value of the menu
    defaultValue: object || arrayOf(object) - set the initial value of the control
    delimiter: string - Delimiter used to join multiple values into a single HTML Input value
    escapeClearsValue: boolean - Clear all values when the user presses escape AND the menu is closed
    hideSelectedOptions: boolean - Hide the selected option from the menu
    inputId: string - The id of the search input
    inputValue: string - The value of the search input
    id: string - The id to set on the SelectContainer component.
    isClearable: boolean - Is the select value clearable
    isDisabled: boolean - Is the select disabled
    isLoading: boolean - Is the select in a state of loading (async)
    isMulti: boolean - Support multiple selected options
    isOptionDisabled: boolean - Override the built-in logic to detect whether an option is disabled
    isOptionSelected: boolean - Override the built-in logic to detect whether an option is selected
    isRtl: boolean - Is the select direction right-to-left.
    isSearchable: boolean - Whether to enable search functionality.
    maxMenuHeight: number - Maximum height of the menu before scrolling
    menuIsOpen: boolean - Whether the menu is open
    menuPlacement: string - Default placement of the menu in relation to the control. 
                            'auto' will flip when there isn't enough space below the control. Eg. auto,bottom,top
    menuPosition: string - The CSS position value of the menu, when "fixed" extra layout management is required 
                           Eg. absolute, fixed
    minMenuHeight: number - Minimum height of the menu before flipping.
    name: string - Name of the HTML Input (optional - without this, no input will be rendered)
    noOptionsMessage: string - Text to display when there are no options
    onChange: function - Handle change events on the select
    onInputChange: function - Handle change events on the input
    onKeyDown: boolean - Handle key down events on the select
    onMenuClose: function - Handle the menu closing
    onMenuOpen: function - Handle the menu opening
    openMenuOnClick: boolean - Allows control of whether the menu is opened when the Select is clicked.
    options: arrayOf(shape({
            value: any.isRequired,
            label: PropTypes.string.isRequired
        }).isRequired
    ) - Array of options that populate the select menu
    pageSize: number - Number of options to jump in menu when page{up|down} keys are used
    placeholder: string - Placeholder for the select value
    styles: object - Style modifier methods
    theme: object - Theme modifier method
    value: any - The value of the select; reflected by the selected option
```
For more details about props and react-select component: [https://react-select.com/home]()
