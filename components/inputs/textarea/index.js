import React from 'react'

const Textarea = React.forwardRef(({ label, helperText, ...rest }, ref) => {
  return (
    <div className="form-control max-w-md w-full mx-auto">
      <label className="label">
        {label && <span className="label-text">{label}</span>}
      </label>
      <textarea
        className="textarea textarea-bordered  resize-none w-full "
        {...rest}
        ref={ref}
      ></textarea>
      <label className="label">
        {helperText && <span className="label-text-alt">{helperText}</span>}
      </label>
    </div>
  )
})

export default Textarea
