import { AxiosClientProvider } from '@/components/Provider/AxiosProvider'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RecoilRoot } from 'recoil'

type Props = {
  children: JSX.Element
}
export const Providers = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <AxiosClientProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </AxiosClientProvider>
      </NativeBaseProvider>
    </RecoilRoot>
  )
}
