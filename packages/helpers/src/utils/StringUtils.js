import React from "react";

export const stringContainsWhiteSpacesOnly = stringValue => {
    // console.log('string only contains whitespace (ie. spaces, tabs or line breaks)')return true
    let stringContainsOnlyWhiteSpaces = false;
    if (!stringValue.replace(/\s/g, '').length) stringContainsOnlyWhiteSpaces = true;
    return stringContainsOnlyWhiteSpaces;
};

export const compareStrings = (stringToCompare, stringToCompareAgainst) => {
    // const secondString = stringToMatchAgainst.toLowerCase().split('')
    // let i = 0
    //
    // const firstString = stringToMatch.toLowerCase().split('')
    // for (let count = 0; count < firstString.length; count++) {
    //     let elem = firstString[count]
    //
    //     let next = secondString.indexOf(elem, i)
    //     if (next < 0) {
    //         return false
    //     }
    //     i = next + 1
    // }
    // return true
    let parentCharacterArray = stringToCompareAgainst.toLowerCase().split("");
    let childCharacterArray = stringToCompare.toLowerCase().split("");

    let startingIndex = 0;
    let matchCount = 0;
    for (let i = 0; i < childCharacterArray.length; i++) {
        let characterToFind = childCharacterArray[i];

        let indexOfMatchedCharacter = parentCharacterArray.indexOf(characterToFind, startingIndex);
        if (indexOfMatchedCharacter >= 0) {
            matchCount += 1;
            startingIndex = indexOfMatchedCharacter + 1;
        }
    }
    return matchCount === childCharacterArray.length;
};

export const boldCharactersOfString = (stringToBold, mainString) => {
    let normalCaseString = mainString.split("");
    let parentCharacterArray = mainString.toLowerCase().split("");
    let childCharacterArray = stringToBold.toLowerCase().split("");

    let startingIndex = 0;

    for (let i = 0; i < childCharacterArray.length; i++) {
        let characterToFind = childCharacterArray[i];
        let indexOfMatchedCharacter = parentCharacterArray.indexOf(characterToFind, startingIndex);
        if (indexOfMatchedCharacter >= 0) {
            startingIndex = indexOfMatchedCharacter + 1;

            normalCaseString[indexOfMatchedCharacter] = <span className="selected" >{normalCaseString[indexOfMatchedCharacter]}</span>;
        }
    }
    return normalCaseString;
};

