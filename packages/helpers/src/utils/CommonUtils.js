export const checkIfOneArrayElementContainOther = (fArray, sArray) =>{
    return fArray.some(elem => sArray.includes(elem.name.toLowerCase()))
}
