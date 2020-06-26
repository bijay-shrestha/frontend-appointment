import React from 'react';
import {MinioResource} from '@frontend-appointment/minio-client'

const ImageGetterHOCForTableComponents = (Component, props) => {
    class ImageGetterHOC extends React.PureComponent {
        state = {
            fileUri: ''
        }

        getPresignedUrlForFile = async () => {
            let fileUrl = await MinioResource.getPresignedUrlForImage(
                this.props.node.data.doctorAvatar ||
                this.props.node.data.fileUri ||
                this.props.node.data.transferredFromFileUri)
            this.setState({
                fileUri: fileUrl
            })
        }

        componentDidMount() {
            this.getPresignedUrlForFile()
        }

        render() {
            return <Component {...this.props} node={{data: {...this.props.node.data, fileUri: this.state.fileUri}}}/>
        }
    }

    return ImageGetterHOC
}

export default ImageGetterHOCForTableComponents
