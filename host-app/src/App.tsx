import './App.css'

import LandingPage from './components/landing-page/landing-page'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {

  return (
    <>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </>
  )
}

export default App
