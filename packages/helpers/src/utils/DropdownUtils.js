import React from 'react';

export const addPictureInLabel = (dataList) => {
    return dataList.map(data => {
        return {
            ...data,
            label: (
                <div className="doctor-with-image">
                    {/* <img src={require('../img/picture.png')} alt="img"/>   */}
                    <img src={data.fileUri ? data.fileUri : "../img/picture.png"} alt="img"/> 
                    <span className="doctor-name">{data.label}</span>
                </div>
            )
        }
    })
};
