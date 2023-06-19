import React from 'react'
import Select from "react-select"

export default function SelectBox(props) {
    const {className, options, ...otherProps} = props
  return <Select className={className} options={options} isClearable={false} menuPlacement="auto" {...otherProps} />
}
