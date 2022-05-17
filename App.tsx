import { Navigation } from '@/routes/Navigation'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'

const App = () => {
  return (
    <>
      <NativeBaseProvider>
        <StatusBar style="auto" />
        <Navigation />
      </NativeBaseProvider>
    </>
  )
}

export default App
