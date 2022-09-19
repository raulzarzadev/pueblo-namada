import React from 'react'

const Checkbox = React.forwardRef(
  ({ label, helperText, size = 'xs', ...rest }, ref) => {
    const SIZES = {
      xs: 'checkbox-xs',
      sm: 'checkbox-sm',
      md: 'checkbox-md',
      lg: 'checkbox-lg',
      xl: 'checkbox-xl'
    }
    return (
      <label className="flex flex-col text-center justify-center items-center text-xs">
        {label}
        <input
          type="checkbox"
          className={`checkbox ${SIZES[size]}`}
          ref={ref}
          {...rest}
        />
      </label>
    )
  }
)

export default Checkbox
