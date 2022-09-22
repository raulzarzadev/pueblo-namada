import React from 'react'

const Radio = React.forwardRef(
  ({ label, helperText, ...rest }, ref) => {
    return (
      <label className='flex flex-col text-center justify-center items-center text-xs'>
        {label}
        <input
          type='radio'
          className='radio'
          ref={ref}
          {...rest}
        />
      </label>
    )
  }
)

export default Radio
