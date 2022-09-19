import React from 'react'

const InputNumber = React.forwardRef(({ label, sideLabel, helperText, smallSize, ...rest }, ref) => {
  return (
    <div className={`form-control  ${sideLabel ? 'flex-row ' : ''} flex`}>
      <label className="label">
        {label &&
          <span
            className="label-text font-bold"
          >
            {label}:
          </span>
        }
      </label>

      <input
        ref={ref}
        type="number"
        className={`input input-bordered  ${smallSize ? 'w-16 input-sm' : 'w-full'}`}
        {...rest}
      />

      {helperText &&
        <label className="label">
          <span className="label-text-alt">
            {helperText}
          </span>
        </label>
      }
    </div>
  )
})

export default InputNumber
