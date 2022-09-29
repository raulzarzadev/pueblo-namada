import React from 'react'
import PhoneInput from 'react-phone-input-2'
import es from 'react-phone-input-2/lang/es.json'
import 'react-phone-input-2/lib/style.css'

const Phone = React.forwardRef(
  (
    { onChange, value, label, helperText, error, ...rest },
    ref
  ) => (
    <div className='form-control '>
      <span className='label-text capitalize-first text-left'>
        { label }
      </span>
      <PhoneInput
        forwardRef={ ref }
        localization={ es }
        onChange={ (value, _data, _event) => onChange(value) }
        defaultMask='.. .... .. ..'
        alwaysDefaultMask
        // onlyCountries={['mx']}
        preferredCountries={ ['mx', 'us'] }
        country={ 'mx' }
        value={ value }
        inputProps={ {
          name: 'phone',
          className: 'input input-bordered w-full pl-[40px]'
          // style: { paddingLeft: '40px' }
        } }
        dropdownClass='bg-base-300'
        { ...rest }
      />
      { helperText && (
        <span className='label-text text-info'>
          { helperText }
        </span>
      ) }
      { error && (
        <span className='label-text text-error'>
          { error }
        </span>
      ) }
    </div>
  )
)

export default Phone
