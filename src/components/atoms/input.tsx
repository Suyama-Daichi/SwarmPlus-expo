import { Input as NBInput } from 'native-base'
import { IInputProps } from 'native-base/lib/typescript/components/primitives/Input/types'

export const Input = ({ ...props }: IInputProps) => {
  return <NBInput width={'3/5'} backgroundColor="gray.50" {...props}></NBInput>
}
