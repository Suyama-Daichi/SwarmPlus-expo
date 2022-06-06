import { StatusBar } from 'expo-status-bar'
import { Providers } from './src/components/Providers'

import { Navigation } from './src/routes/Navigation'

export default function App() {
  return (
    <Providers>
      <>
        <Navigation />
        <StatusBar />
      </>
    </Providers>
  )

}
