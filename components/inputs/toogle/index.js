import React from 'react'

const Toogle = React.forwardRef(
  (
    { label = 'label', helperText, size = 'xs', ...rest },
    ref
  ) => {
    return (
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>{label}</span>
          <input
            ref={ref}
            type='checkbox'
            className='toggle toggle-primary'
            {...rest}
          />
        </label>
      </div>
    )
  }
)

Toogle.displayName = 'Toogle'

export default Toogle
