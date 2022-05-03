import React from "react"

const Text = React.forwardRef(({ label, helperText, ...rest }, ref) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        {label &&
          <span className="label-text">{label}</span>
        }
      </label>
      <input type="text" className="input input-bordered w-full max-w-xs" {...rest} ref={ref} />
      {helperText &&
        <label className="label">
          <span className="label-text-alt">{helperText}</span>
        </label>
      }
    </div>
  )
})

export default Text