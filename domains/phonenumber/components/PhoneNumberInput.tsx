'use client'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js'

export type { E164Number } from 'libphonenumber-js'

type PhoneNumberInputProps = {
  value: E164Number | undefined
  onChange: (value: E164Number | undefined) => void
}

const PhoneNumberInput = ({ value, onChange }: PhoneNumberInputProps) => {
  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={(value) => onChange(value)}/>
  )
}

export default PhoneNumberInput

