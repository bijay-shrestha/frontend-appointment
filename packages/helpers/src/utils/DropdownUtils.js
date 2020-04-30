import React from 'react';

export const addPictureInLabel = (dataList) => {
    return dataList.map(data => {
        return {
            ...data,
            label: (
                <div>
                    <img src={data.fileUri ? data.fileUri : ""} alt="img"/> {data.label}
                </div>
            )
        }
    })
};
