import { ReactNode } from "react";

export const CurrencySpan = ({ cost = null, currency = '$', value = null }) => (
  <span className="flex justify-between max-w-[5rem] mx-auto" >
    <span>{currency}</span>

    {` ${parseFloat(cost | value | '0').toFixed(2)}`}
  </span >
)

