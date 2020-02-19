export const checkIfOneArrayElementContainOther = (fArray, sArray) => {
  return fArray.some(elem => sArray.includes(elem.name.toLowerCase()))
}

export const checkIfTwoArrayEquals = (fArray, sArray, keyToMatch) => {
 return fArray.length && sArray.length ? fArray.every((value, index) =>
    keyToMatch
      ? Number(value[keyToMatch]) === Number(sArray[index][keyToMatch])
      : value === sArray[index]
  ):false
}
