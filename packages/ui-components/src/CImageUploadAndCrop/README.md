# CImageUploadAndCropModal

Image upload and crop component made using `react-image-crop`.

To use this component first,

```text
import {CImageUploadAndCropModal} from "@cogent/ui-components";
```
Then,
```jsx harmony
 <CImageUploadAndCropModal
                 showModal={showModal}
                 setShowModal={setShowModal}
                 ruleOfThirds={true}
                 handleImageUpload={onImageUpload}
                 imageSrc={adminImage}
                 croppedImageSrc={adminCroppedImage}
                 onImageSelect={onImageSelect}
                 onImageCrop={onImageCrop}/>

```

`showModal`,`adminImage`,`adminCroppedImage` are the state values to be passed as prop.

```text
 showModal: show the modal,
 imageSrc : blob url for the original Image selected,
 croppedImageSrc: blob url for cropped Image
```
# References

-[x] [React Image Crop Demo](https://codesandbox.io/s/72py4jlll6)
-[x] [react-image-crop](https://www.npmjs.com/package/react-image-crop)
