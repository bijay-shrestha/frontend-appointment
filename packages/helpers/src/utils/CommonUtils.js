export const checkIfOneArrayElementContainOther = (fArray, sArray) => {
  return fArray.some(elem => sArray.includes(elem.name.toLowerCase()))
}

export const checkIfTwoArrayEquals = (fArray, sArray, keyToMatch) => {
  fArray.every((value, index) =>
    keyToMatch
      ? value[keyToMatch] === sArray[index][keyToMatch]
      : value === sArray[index]
  )
}
