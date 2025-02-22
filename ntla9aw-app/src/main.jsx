import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/Store.js'
import { AnimatePresence } from 'framer-motion'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <AnimatePresence mode='wait'>
        <ChakraProvider>
          <App /> 
        </ChakraProvider>
      </AnimatePresence>
    </Router>
  </Provider>
)
