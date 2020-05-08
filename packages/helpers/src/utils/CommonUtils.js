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

export const filterTableDataWithGivenStatus = (status,filterData) => filterData.filter(datum =>datum.status===status);

export const matchTheWordEveryPossible = (stringToMatchAgainst,stringToMatch) =>{
  var us = stringToMatch.toLowerCase();
  var i = 0;
  {
      var array14219 = (stringToMatchAgainst.toLowerCase()).split('');
      for (var index14218 = 0; index14218 < array14219.length; index14218++) {
          var c = array14219[index14218];
          {
              var next = us.indexOf(c, i);
              if (next < 0) {
                  return false;
              }
              i = next + 1;
          }
      }
  }
  return true;
} 
