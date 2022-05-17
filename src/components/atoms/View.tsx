import { InterfaceViewProps } from 'native-base/lib/typescript/components/basic/View/types'
import { View as NBView } from 'native-base'

export const View = ({ children }: InterfaceViewProps) => {
  return (
    <NBView backgroundColor={'white'} flex={1}>
      {children}
    </NBView>
  )
}
