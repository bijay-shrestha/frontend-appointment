export const getUpdatedDataListForMultiSelect = (originalList, currentList, fieldName, rowIdField) => {
    let updatedDataList = [];
    // FIND NEW ADDED DATA
    currentList && currentList.map(currentItem => {
        let currentItemInOriginalList = originalList && originalList.find(original => original.value === currentItem.value);
        if (!currentItemInOriginalList) {
            let dataToAdd = {
                [fieldName.concat("Id")]: currentItem.value,
                status: 'Y'
            };
            if (rowIdField)
                dataToAdd[rowIdField] = '';
            updatedDataList.push(dataToAdd)
        }
        return '';
    });

    // REMOVE EXISTING DATA
    originalList && originalList.map(originalItem => {
        let originalItemInCurrentList = currentList && currentList.find(current => current.value === originalItem.value);
        if (!originalItemInCurrentList) {
            let dataToAdd = {
                [fieldName.concat("Id")]: originalItem.value,
                status: 'Y'
            };
            if (rowIdField)
                dataToAdd[rowIdField] = originalItem[rowIdField];
            updatedDataList.push(dataToAdd)
        }
        return '';
    });

    return updatedDataList;
};
