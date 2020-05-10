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

export const matchTheWordEveryPossible = (
  stringToMatch,
  stringToMatchAgainst
) => {
  const secondString = stringToMatchAgainst.toLowerCase().split('')
  let i = 0

  const firstString = stringToMatch.toLowerCase().split('')
  for (let count = 0; count < firstString.length; count++) {
    let elem = firstString[count]

    let next = secondString.indexOf(elem, i)
    if (next < 0) {
      return false
    }
    i = next + 1
  }
  return true
}
