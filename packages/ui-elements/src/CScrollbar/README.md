# CScrollbar

Scrollbar component made using `react-custom-scrollbars'` **Scrollbars** component.

To use this component first,

```text
import {CScrollbar} from "@frontend-appointment/ui-components";
```
Then,
```jsx harmony
const scrollContent = (
    <>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
        </p>
    </>);

<CScrollbar id="test" style={{ height: 100}}>
      {scrollContent}
</CScrollbar>
```
## Props of CScrollbar
```text
autoHeight: (Boolean) Enable auto-height mode. (default: false)
            When true container grows with content.
            
autoHeightMax: (Number) Set a maximum height for auto-height mode (default: 200)
            
autoHeightMin: (Number) Set a minimum height for auto-height mode (default: 0)
            
autoHide: (Boolean) Enable auto-hide mode (default: false)
          When true tracks will hide automatically and are only visible while scrolling.
            
autoHideDuration: (Number) Duration for hide animation in ms. (default: 200)

autoHideTimeout:  (Number) Hide delay in ms. (default: 1000)

children: (Node) Children of the component.

className: (String) Apply additional css classes.

hideTracksWhenNotNeeded: (Boolean) Hide tracks (visibility: hidden) when content does not overflow container. (default: false)
            
id: (String) Id of the component.
            
onScroll: (Function) Event handler.

onScrollFrame: (Function) Runs inside the animation frame.
            
onScrollStart: (Function) Called when scrolling starts.

onScrollStop: (Function) Called when scrolling stops.

renderThumbHorizontal: (Function) Horizontal thumb element.(change css of the horizontal scrollbar)

renderThumbVertical: (Function) Vertical thumb element.(change css of the vertical scrollbar)

renderTrackHorizontal: (Function) Horizontal thumb element.(change css of the horizontal scrollbar background)

renderTrackVertical: (Function) Vertical track element.(change css of the vertical scrollbar background)

renderView:  (Function) The area within scrollbar where your content will be rendered.

style: (Object) To add inline css.

thumbMinSize: (Number) Minimal thumb size in px. (default: 30)

thumbSize: (Number) Set a fixed size for thumbs in px.

universal: (Boolean) Enable universal rendering (default: false)

```

## Methods available 
```text
scrollTop(top = 0): scroll to the top value

scrollLeft(left = 0): scroll to the left value

scrollToTop(): scroll to top

scrollToBottom(): scroll to bottom

scrollToLeft(): scroll to left

scrollToRight(): scroll to right

getScrollLeft(): get scrollLeft value

getScrollTop(): get scrollTop value

getScrollWidth(): get scrollWidth value

getScrollHeight(): get scrollHeight value

getClientWidth(): get view client width

getClientHeight(): get view client height

getValues(): get an object with values about the current position.
```

**`Note`**: To use the methods provided by CScrollbar, 
we need to create a ref(callback ref) to the component and simply call the methods using the ref.

Example:
```jsx harmony
import React, {PureComponent} from 'react';
import {CScrollbar} from ui-elements;
import {Button} from "react-bootstrap";

class ScrollerComponentTest extends PureComponent {

    scrollToTop = () => {
        this.scrollbarsRef.scrollToTop();
    };

    scrollToBottom = () => {
        this.scrollbarsRef.scrollToBottom();
    };

    render() {
        const scrollContent = (
            <>
                <Button onClick={this.scrollToBottom}>Scroll bottom</Button>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when<br/>
                    <Button onClick={this.scrollToTop}>Scroll top</Button>
                </p>
            </>);
        return (
            <CScrollbar
                _ref={c => { this.scrollbarsRef = c }}
                id="test"
                style={{height: 100}}
                className="abc"
                renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                renderTrackHorizontal={props => <div {...props} className="track-horizontal"/>}
                renderThumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
                renderView={props => <div {...props} className="view"/>}
            >
                {scrollContent}
            </CScrollbar>
        );
    }
}
```
**`Note:`** While using the customization props(renderTrackHorizontal, renderThumbHorizontal, renderTrackVertical, 
renderThumbVertical,renderView), we will always need to pass through the given props for the respective element like 
in the example above: <div {...props} className="track-horizontal"/>. This is because we need to pass some default 
styles down to the element in order to make the component work.

# References

-[x] [Malte Wessel](https://malte-wessel.com/react-custom-scrollbars/)
-[x] [Issue fix](https://github.com/malte-wessel/react-custom-scrollbars/issues/119)
