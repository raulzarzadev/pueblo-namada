import React from "react"

const Checkbox = React.forwardRef(({ label, helperText, ...rest }, ref) => {
  return (
    <label className="flex flex-col text-center justify-center items-center text-xs">
      {label}
      <input type="checkbox" className="checkbox checkbox-xs" ref={ref} {...rest} />
    </label>
  )
})


export default Checkbox