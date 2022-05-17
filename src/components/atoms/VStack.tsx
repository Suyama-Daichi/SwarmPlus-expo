import { VStack as NBVStack } from 'native-base'
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'

export const VStack = ({ children, ...props }: InterfaceVStackProps) => {
  return (
    <NBVStack backgroundColor="white" {...props}>
      {children}
    </NBVStack>
  )
}
