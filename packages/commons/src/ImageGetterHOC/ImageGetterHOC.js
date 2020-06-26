import React from 'react';
import {MinioResource} from '@frontend-appointment/minio-client'

const ImageGetterHOC = (Component, fileLocation, option) => {
    class ImageGetter extends React.PureComponent {
        state = {
            fileUri: '',
            isFileSet: false
        }

        getPresignedUrlForFile = async () => {
            let fileUrl = await MinioResource.getPresignedUrlForImage(fileLocation)
            if (!this.state.isFileSet)
                await this.setState({
                    fileUri: fileUrl,
                    isFileSet: true
                })
        }
        //
        // componentDidUpdate(prevProps, prevState, snapshot) {
        //     if (!this.state.fileUri) {
        //         this.getPresignedUrlForFile()
        //     }
        // }

        // shouldComponentUpdate(nextProps, nextState, nextContext) {
        //     if (!this.state.isFileSet && !nextState.fileUri) {
        //         this.setState({
        //             isFileSet: true
        //         })
        //         return true
        //     }
        //     return false
        // }

        componentDidMount() {
            this.getPresignedUrlForFile()
        }

        render() {
            return <Component option={{...option, fileUri: this.state.fileUri}}/>
        }

    }

    return <ImageGetter/>
}

export default ImageGetterHOC
