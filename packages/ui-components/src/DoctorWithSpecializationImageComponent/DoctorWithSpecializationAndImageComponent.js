import React, {memo} from 'react'
import DefaultPic from './picture.png'

const DoctorWithSpecializationAndImage = props => {
    return (
        <div className="di-column">
            {props.node.data.doctorAvatar ||
            props.node.data.fileUri ||
            props.node.data.transferredFromFileUri ? (
                <div className="data-image">
                    <img
                        alt="PIC"
                        src={
                            props.node.data.doctorAvatar ||
                            props.node.data.fileUri ||
                            props.node.data.transferredFromFileUri
                        }
                    />{' '}
                </div>
            ) : (
                <div className="data-image">
                    <img alt="PIC" src={DefaultPic}/>
                </div>
            )}

            <ul className="di-details">
                <li>
                    {props.node.data.doctorSalutation ? props.node.data.doctorSalutation.concat(" ") : ''}{props.node.data.doctorName ||
                props.node.data.transferredFromDoctor || ''}
                </li>
                <li>
                    {props.node.data.specializationName ||
                    props.node.data.specialization ||
                    props.node.data.transferredFromSpecialization ||
                    ''}
                </li>
            </ul>
        </div>
    )
}

export default memo(DoctorWithSpecializationAndImage)
