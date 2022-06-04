import { AxiosClientProvider } from '@/components/Provider/AxiosProvider'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RecoilRoot } from 'recoil'

type Props = {
  children: JSX.Element;
};
export const Providers = ({ children }: Props) => {
  return (
    <NativeBaseProvider>
      <AxiosClientProvider>
        <RecoilRoot>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </RecoilRoot>
      </AxiosClientProvider>
    </NativeBaseProvider>
  )
}
