import React from 'react'

const SideBarHeading = (props) => {
  console.log(props.heading)
  return (<p className={props.isHover ? 'noClose' : 'closemenutext' }> {props.heading} </p>)
}
export default SideBarHeading;