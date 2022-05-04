import React from "react"

const File = React.forwardRef(({ label, ...rest }, ref) => {
  return (
    <div className="form-control w-full max-w-sm">
      <label for="formFileMultiple" className="form-label inline-block  text-left">{label} </label>
      <input
        ref={ref}
        className="
          input 
          input-bordered w-full
          file:btn
          file:rounded-r-none
          p-0
          "
        type="file"
        id="formFileMultiple"
        {...rest}
      />
    </div>
  )
})

export default File
