#CModal

`CModal` is a modal component dynamically build using react-bootstrap component.

Props of CModal:

```text
Name	            Type	                Default	    Description
animation	        boolean	                true	    Open and close the Modal with a slide and fade animation.
autoFocus	        boolean	                true	    When true The modal will automatically shift focus to itself when it opens, and replace it to the last focused element when it closes. Generally this should never be set to false as it makes the Modal less accessible to assistive technologies, like screen-readers.
backdrop	        'static' | true         true	    Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
                    | false	
backdropClassName	string		                        Add an optional extra class name to .modal-backdrop It could end up looking like class="modal-backdrop foo-modal-backdrop in".
centered	        boolean		                        vertically center the Dialog in the window
container	        any		
dialogAs	        elementType	           <ModalDialog> A Component type that provides the modal content Markup. This is a useful prop when you want to use your own styles and markup to create a custom modal component.
dialogClassName	    string		                         A css class to apply to the Modal dialog DOM node.
enforceFocus	    boolean	                true	     When true The modal will prevent focus from leaving the Modal while open. Consider leaving the default value here, as it is necessary to make the Modal work well with assistive technologies, such as screen readers.
keyboard	        boolean	                true	     Close the modal when escape key is pressed
manager	            object	        new BootstrapModalManager()	A ModalManager instance used to track and manage the state of open Modals. Useful when customizing how modals interact within a container
onEnter 	        function		                       Callback fired before the Modal transitions in
onEntered	        function		                       Callback fired after the Modal finishes transitioning in
onEntering	        function		                       Callback fired as the Modal begins to transition in
onEscapeKeyDown	    function		                       A callback fired when the escape key, if specified in keyboard, is pressed.
onExit	            function		                       Callback fired right before the Modal transitions out
onExited	        function		                       Callback fired after the Modal finishes transitioning out
onExiting	        function		                       Callback fired as the Modal begins to transition out
onHide	            function		                       A callback fired when the header closeButton or non-static backdrop is clicked. Required if either are specified.
onShow	            function		                       A callback fired when the Modal is opening.
restoreFocus	    boolean	                true	       When true The modal will restore focus to previously focused element once modal is hidden
scrollable	        boolean		                           Allows scrolling the <Modal.Body> instead of the entire Modal when overflowing.
show	            boolean	                false	       When true The modal will show itself.
size	            'sm' | 'lg','xl'		               Render a large, extra large or small modal.
bsPrefix	        string	                'modal'	       Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatchfor working with heavily customized bootstrap css.
closeButton	      boolean	                false	       Specify whether the Component should contain a close button
onHide	            function		                       A Callback fired when the close button is clicked. If used directly inside a Modal component, the onHide will automatically be propagated up to the parent Modal onHide.
as	            elementType	        <DivStyledAsH4>    You can use a custom element type for this component.
                                                or <div>

```

To use this component, create a boolean property, initially set to false  in the state of the component where modal is required.

```javascript

class ModalTestComponent extends PureComponent {

    state = {
        showModal: false
    };

    setShowModal = () => {
        this.setState({showModal: !this.state.showModal});
    };
}
```
Usually modals are opened on certain events or button click.
Pass this `setShowModal` or function that toggles the value of boolean property of state(`showModal`) 
to the eventHandler(here, `onClickHandler`).

```javascript
 render() {
        let footerButton = <CButton id="sabu" name="Sabu"/>;
        let body = <> <h1>This is Modal body</h1><CButton id="sauravi" name="sauravi"/></>;
        return (
            <>
                <CButton id="modal" name="Open Modal" onClickHandler={this.setShowModal}/>
                <CModal show={this.state.showModal}
                        modalHeading="Modal Smriti"
                        size="md"
                        bodyChildren={body}
                        footerChildren={footerButton}
                        onHide={this.setShowModal}
                />
            </>
        );
    }
```
`show` ,`modalHeading`,`bodyChildren` and `onHide` props are required. Other props mentioned above can be used according to requirement.