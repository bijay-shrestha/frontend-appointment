import React, {memo} from 'react'
import {SimpleSelect} from 'react-selectize'

const CNormalSelect = props => {
  const {
    value,
    placeholder,
    classes,
    options,
    transitionEnter,
    reference,
    renderNoResultsFound,
    editable,
    style,
    theme,
    disabled,
    isRestoreOnBackspace,
    isFormSearch,
    renderOption,
    renderValue,
    onChangeHandler
  } = props

  const onChange = e => {
      console.log("event-----select",e);
      onChangeHandler(e);
  }

  const restoreOnBackspace = item => {
    return item.label.substr(0, item.label.length - 1)
  }
  const createFormSearch = (options, search) => {
    if (
      search.length == 0 ||
      options
        .map(function (option) {
          return option.label
        })
        .indexOf(search) > -1
    )
      return null
    else return {label: search, value: search}
  }

  return (
    <SimpleSelect
      placeholder={placeholder}
      onValueChange={onChange}
      theme={theme}
      className={classes}
      transitionEnter={transitionEnter}
      value={value}
      ref={reference}
      renderNoResultsFound={renderNoResultsFound}
      restoreOnBackspace={isRestoreOnBackspace ? restoreOnBackspace : () => {}}
      editable={editable}
      createFormSearch={isFormSearch ? createFormSearch : () => {}}
      disabled={disabled}
      style={style}
      // renderOption={renderOption}
      // renderValue={renderValue}
    >
      {options && options.length && options.map(option =>{
        console.log('hello');
        return(<option key={option.label+'opt'} value={option.value}>{option.label}</option>)
      })}
    </SimpleSelect>  
  )
}
export default memo(CNormalSelect)
