import React from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

class CImageDisplayAndView extends React.PureComponent {
    state = {
        openViewer: false,
        currentImage: 0
    };

    setOpenViewer = (event, { photo, index }) => {
        this.setState({
            openViewer: true,
            currentImage: index
        });
    };

    closeViewer = () => {
        this.setState({
            openViewer: false,
            currentImage: 0
        });
    };

    render() {
        const { images } = this.props;
        const { openViewer, currentImage } = this.state;
        console.log(images);
        return (
            <>
                {/*photos is array of object{src,height,width} all three are required
                 also can pass alt property(optional) in object*/}
                <Gallery photos={images} onClick={this.setOpenViewer} />
                <ModalGateway>
                    {openViewer && (
                        <Modal onClose={this.closeViewer}>
                            <Carousel
                                currentIndex={currentImage}
                                views={images.map(img => ({
                                    ...img,
                                    srcset: img.srcSet,
                                    caption: img.title
                                }))}
                            />
                        </Modal>
                    )}
                </ModalGateway>
            </>
        );
    }
}

export default CImageDisplayAndView;
