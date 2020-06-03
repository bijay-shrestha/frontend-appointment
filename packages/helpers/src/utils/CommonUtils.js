export const checkIfOneArrayElementContainOther = (fArray, sArray) => {
  return fArray.some(elem => sArray.includes(elem.name.toLowerCase()))
}

export const checkIfTwoArrayEquals = (fArray, sArray, keyToMatch) => {
  return fArray.length && sArray.length
    ? fArray.every((value, index) =>
        keyToMatch
          ? Number(value[keyToMatch]) === Number(sArray[index][keyToMatch])
          : value === sArray[index]
      )
    : false
}

export const getUserNameHospitalIdAndAdminId = token => {
  const splitTokenInTwoGroup = token.split(' ')
  const againSplitTokenTokenInToken = splitTokenInTwoGroup[1].split(':')
  return {
    id: againSplitTokenTokenInToken[0],
    username: againSplitTokenTokenInToken[1],
    hospitalId: againSplitTokenTokenInToken[2],
    hospitalCode: againSplitTokenTokenInToken[3]
  }
}

export const filterTableDataWithGivenStatus = (status, filterData) =>
  filterData.filter(datum => datum.status === status)

export const appendSerialNumberToDataList = (dataList, page, size) => {
  let startingNumber = 1
  if (page && page > 1) {
    startingNumber += (page - 1) * size
  }
  let dataWithSerialNumberAdded =
    dataList &&
    dataList.map(data => {
      let dataWithSN = {
        ...data,
        sN: startingNumber
      }
      startingNumber++
      return dataWithSN
    })

  return dataWithSerialNumberAdded ? dataWithSerialNumberAdded : []
}

export const changeCommaSeperatedStringToObjectAndStringifyIt = commaSeperatedString => {
  let splittedCommaSperatedString = commaSeperatedString.split(',')
  let objFromSplittedCommaString = {}
  splittedCommaSperatedString.map(scsp => {
    objFromSplittedCommaString[scsp] = ''
    return scsp
  })
  return objFromSplittedCommaString
}

export const checkKeyValuePairAndRemoveIfAnyOfThemIsNotPresent = arrayOfKeyValuePair => {
  //console.log(arrayOfKeyValuePair);
  const filteredValue = arrayOfKeyValuePair.filter(
    keyValPair => keyValPair.keyParam && keyValPair.valueParam
  )
  //console.log("filtered",filteredValue);
  return filteredValue
}
