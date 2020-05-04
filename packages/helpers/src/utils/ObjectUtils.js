export const checkObjectEquality = (object1, object2) => {
    let areObjectsEqual = true;
    let object1Props = Object.getOwnPropertyNames(object1);
    let object2Props = Object.getOwnPropertyNames(object2);

    if (object1Props.length !== object2Props.length) {
        areObjectsEqual = false;
    }

    object1Props.map(object1Prop =>{

        let value1 = object1[object1Prop];
        let value2 = object2[object1Prop];

        if (typeof value1 !== "function" || typeof value2 !== "function") {
            if (value1 !== value2) {
                areObjectsEqual = false;
            }
        }
        return object1Prop;
    });

    return areObjectsEqual;
};

export const areArrayOfObjectsEqual = (array1, array2) => {
    let isEqual = true;

    if (array1.length !== array2.length) {
        return !isEqual;
    } else {
        array1.map((array1Obj, index) => {
            isEqual = checkObjectEquality(array1Obj, array2[index])
            return array1Obj
        });
        return isEqual;
    }
};
