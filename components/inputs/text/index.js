import React from 'react'

const Text = React.forwardRef(
  ({ label, helperText, ...rest }, ref) => {
    return (
      <div className='form-control mx-auto w-full'>
        <label className='label'>
          {label && (
            <span className='label-text'>{label}</span>
          )}
        </label>
        <input
          className='input input-bordered '
          {...rest}
          ref={ref}
        />
        {helperText && (
          <label className='label'>
            <span className='label-text-alt'>
              {helperText}
            </span>
          </label>
        )}
      </div>
    )
  }
)

export default Text
