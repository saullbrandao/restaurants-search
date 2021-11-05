import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'
import { theme } from 'styles/theme'
import { HomePage } from 'pages/Home'
import { store } from 'redux/store'
import { Provider } from 'react-redux'

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Reset />
        <HomePage />
      </ThemeProvider>
    </Provider>
  )
}
