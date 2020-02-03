export const checkIfOneArrayElementContainOther = (fArray, sArray) =>{
     console.log("2nd Array",sArray);
     console.log("frist Array",fArray);
    return fArray.some(elem => sArray.includes(elem.name.toLowerCase()))
}
