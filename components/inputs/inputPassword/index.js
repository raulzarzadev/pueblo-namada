import React, { useState } from 'react'

const InputPassword = React.forwardRef(
  ({ label, helperText, errors, ...rest }, ref) => {
    const [inputType, setInputType] = useState('password')
    const { wrongPassword, toManyRequests } = errors

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
          type={inputType}
          id='password'
        ></input>
        <div className='flex w-full justify-between'>
          <label className='label-text text-error'>
            {wrongPassword && (
              <span>Incorrect credentials</span>
            )}
            {toManyRequests && (
              <span>
                To many requests. Try again in a few minutes
              </span>
            )}
          </label>
          <label className='label-text-alt cursor-pointer '>
            <input
              className='hidden'
              type='checkbox'
              onClick={(e) => {
                e.stopPropagation()
                setInputType(
                  inputType === 'text' ? 'password' : 'text'
                )
              }}
            />
            {inputType === 'text' ? 'hidde' : 'show'}
          </label>
        </div>

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
export default InputPassword
