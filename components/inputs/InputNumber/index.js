import React from "react"

const InputNumber = React.forwardRef(({ label, sideLabel, helperText, smallSize, ...rest }, ref) => {
  return (
    <div className={`form-control  ${sideLabel ? 'flex-row ' : ''} flex`}>
      <label className="label">
        {label &&
          <span className="label-text font-bold">{label}:</span>
        }
      </label>
      <input type="number" className={`input input-bordered  ${smallSize ? 'w-14' : 'w-full'}`} {...rest} ref={ref} />
      {helperText &&
        <label className="label">
          <span className="label-text-alt">{helperText}</span>
        </label>
      }
    </div>
  )
})

export default InputNumber