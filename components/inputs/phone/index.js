import React from 'react'
import PhoneInput from 'react-phone-input-2'
import es from 'react-phone-input-2/lang/es.json'
import 'react-phone-input-2/lib/style.css'


const Phone = React.forwardRef(({ onChange, value, label, helperText, error, ...rest }, ref) =>
  <div className="form-control ">
    <span className="label-text capitalize-first text-left">{label}</span>
    <PhoneInput
      forwardRef={ref}
      localization={es}
      onChange={(value, _data, _event,) => onChange(value)}
      defaultMask='.. .... .. ..'
      alwaysDefaultMask
      {...rest}
      // onlyCountries={['mx']}
      country={'mx'}
      value={value}
      inputProps={{
        name: 'phone',
        className: 'input input-bordered w-full'
      }}
      dropdownClass='bg-base-300'

    /> {helperText && (
      <span className="label-text text-info">{helperText}</span>
    )}
    {error && <span className="label-text text-error">{error}</span>}
  </div>)

export default Phone