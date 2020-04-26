export const stringContainsWhiteSpacesOnly = stringValue => {
    // console.log('string only contains whitespace (ie. spaces, tabs or line breaks)')return true
    let stringContainsOnlyWhiteSpaces = false;
    if (!stringValue.replace(/\s/g, '').length) stringContainsOnlyWhiteSpaces = true;
    return stringContainsOnlyWhiteSpaces;
};
