import React, {PureComponent} from 'react';
import {CButton, CImageCrop, CModal} from "@frontend-appointment/ui-elements";
import "./image-upload.scss";
import {Col, Container, Row} from "react-bootstrap";

class CImageUploadAndCropModal extends PureComponent {

    state = {
        srcValue: null,
        crop: {
            unit: 'px',
            width: 150,
            height: 150,
            x: 25,
            y: 25,
            aspect: 4 / 4,
        },
        croppedImageUrl: '',
        croppedImageFile: '',
        errorMessage: ''
    };

    resetStateValues = () => this.setState({
        srcValue: null,
        crop: {
            unit: 'px',
            width: 30,
            aspect: 4 / 4,
        },
        croppedImageUrl: '',
        croppedImageFile: '',
        errorMessage: ''
    });

    handleImageSelect = async e => {
        let files = e.target.files;
        if (files && files.length > 0) {
            let FileSize = files[0].size; // in bytes
            if (FileSize > process.env.REACT_APP_IMAGE_UPLOAD_SIZE_LIMIT) {
                this.setState({
                    srcValue: '',
                    errorMessage: 'Image size exceeds 2MB!'
                });
                document.getElementById("imageUpload").value = '';
            } else {
                await this.setState({
                    srcValue: URL.createObjectURL(files[0]),
                    errorMessage: ''
                });
                this.props.onImageSelect(this.state.srcValue, files[0]);
            }
        }
    };

    handleCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({crop});
    };

    handleCropComplete = crop => {
        this.makeUserCrop(crop);
    };

    handleImageLoad = image => {
        this.imageRef = image;
    };

    handleUploadConfirmClick = () => {
        this.props.handleImageUpload(this.state.croppedImageFile);
    };

    handleModalClose = () => {
        this.props.setShowModal();
        this.resetStateValues();
    };

    async makeUserCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({
                croppedImageUrl
            });
            this.props.onImageCrop(croppedImageUrl);
        }
    }

    async getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        // TO CONVERT TO BLOB FOR API SAVE MULTIPART
        let fileFromBlob = this.convertCanvasToBlob(canvas);
        await this.setState({
            croppedImageFile: fileFromBlob
        });

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    convertCanvasToBlob = canvas => {
        // toDataURL CONVERTS CANVAS TO BASE64
        let dataURL = canvas.toDataURL("image/jpeg");
        // atob - DECODE A BASE-64 ENCODED STRING
        let blobBin = atob(dataURL.split(',')[1]);
        let array = [];
        for (let i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/png'});
    };

    render() {
        const {
            crop,
            errorMessage,
            srcValue
        } = this.state;

        const {
            circularCrop,
            className,
            croppedImageSrc,
            crossorigin,
            disabled,
            id,
            imageSrc,
            imageStyle,
            keepSelection,
            locked,
            maxHeight,
            maxWidth,
            minHeight,
            minWidth,
            onCropComplete,
            onDragEnd,
            onDragStart,
            onImageError,
            renderComponent,
            renderSelectionAddon,
            ruleOfThirds,
            showModal,
            style,
        } = this.props;

        const bodyContent = (<>
            <Container fluid="true">
                <Row>
                    <Col md={12} lg={8}>
                        <div className="image-container">

                            {imageSrc ?
                                (<CImageCrop
                                    // src={srcValue}
                                    src={imageSrc}
                                    crop={crop}
                                    onImageLoaded={this.handleImageLoad}
                                    onCropChange={this.handleCropChange}
                                    onCropComplete={this.handleCropComplete}
                                    id={id}
                                    minWidth={minWidth}
                                    minHeight={minHeight}
                                    maxWidth={maxWidth}
                                    maxHeight={maxHeight}
                                    keepSelection={keepSelection}
                                    disabled={disabled}
                                    locked={locked}
                                    className={className}
                                    style={style}
                                    imageStyle={imageStyle}
                                    onComplete={onCropComplete}
                                    onImageError={onImageError}
                                    onDragStart={onDragStart}
                                    onDragEnd={onDragEnd}
                                    crossorigin={crossorigin}
                                    renderSelectionAddon={renderSelectionAddon}
                                    renderComponent={renderComponent}
                                    ruleOfThirds={ruleOfThirds}
                                    circularCrop={circularCrop}
                                />) :
                                <div className="default-image"></div>
                            }

                        </div>
                        {errorMessage ?
                            <p className="modal-error"><i
                                className="fa fa-exclamation-triangle"/> &nbsp;  {errorMessage}
                            </p> : ''}
                        <input id="imageUpload" type="file" accept="image/*" onChange={this.handleImageSelect}
                               className=""/>

                    </Col>
                    <Col md={12} lg="4">
                        <div className="cropped-image-container">
                            <div className="cropped-image">
                                <p className="text-center">Preview Final Image</p>
                                {croppedImageSrc && (
                                    <img alt="Crop" style={{maxWidth: '100%'}}
                                         src={croppedImageSrc}
                                    />
                                )}
                            </div>
                        </div>

                    </Col>
                </Row>

            </Container>

        </>);

        let footerContent = <>
            <Container fluid="true">
                <Row>
                    <div className="col-md-12">
                        <CButton
                            name="Confirm"
                            variant="primary"
                            size="xl"
                            className="float-right btn-action"
                            disabled={srcValue && !errorMessage ? false : true}
                            onClickHandler={this.handleUploadConfirmClick}/>
                    </div>
                </Row>
            </Container>
        </>;

        return <>
            <CModal
                modalHeading="Upload Image"
                size="lg"
                show={showModal}
                onHide={this.handleModalClose}
                centered={true}
                dialogClassName="preview-modal image-crop"
                closeButton={true}
                className=""
                bodyChildren={bodyContent}
                footerChildren={footerContent}
            />
        </>
    }
}

export default CImageUploadAndCropModal;
