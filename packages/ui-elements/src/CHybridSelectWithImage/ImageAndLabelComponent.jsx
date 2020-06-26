import React,{memo} from 'react';

const ImageAndLabelComponent = ({option}) => {

    return <>
        <span className="doctor-with-image">
            {
                option.fileUri ?
                    <img
                        src={option.fileUri}
                        // src={`http://localhost:8080/getObjectFromMinio?fileUri=${option.fileUri}`}
                        alt={option.label[0].toUpperCase()}/> :
                    <div className="anchor-icon">
                        {option.label.charAt(0).toUpperCase()}
                    </div>
            }
            {option.label}
        </span>
    </>
}

export default memo(ImageAndLabelComponent);
