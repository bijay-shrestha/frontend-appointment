export const getUpdatedDataListForMultiSelect = (originalList, currentList, fieldName, rowIdFieldName, removedItemStatus) => {
    let updatedDataList = [];
    // FIND NEW ADDED DATA
    currentList && currentList.map(currentItem => {
        let currentItemInOriginalList = originalList && originalList.find(original => original.value === currentItem.value);
        if (!currentItemInOriginalList) {
            let dataToAdd = {
                [fieldName.concat("Id")]: currentItem.value,
                status: 'Y'
            };
            if (rowIdFieldName)
                dataToAdd[rowIdFieldName] = '';
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
                status: removedItemStatus ? removedItemStatus : 'D'
            };
            if (rowIdFieldName)
                dataToAdd[rowIdFieldName] = originalItem[rowIdFieldName];
            updatedDataList.push(dataToAdd)
        }
        return '';
    });

    return updatedDataList;
};
