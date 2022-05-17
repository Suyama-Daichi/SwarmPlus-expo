import { Navigation } from '@/routes/Navigation'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'

const App = () => {
  return (
    <>
      <SafeAreaView />
      <StatusBar style="auto" />
      <Navigation />
    </>
  )
}

export default App
