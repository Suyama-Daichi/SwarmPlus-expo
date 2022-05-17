import { NativeBaseProvider } from 'native-base'
import { Navigation } from '@/routes/Navigation'
import { StatusBar } from 'expo-status-bar'

const App = () => {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <Navigation />
    </NativeBaseProvider>
  )
}

export default App
