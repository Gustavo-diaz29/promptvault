import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { CurrencyProvider } from './context/CurrencyContext'
import { UserProvider } from './context/UserContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <CurrencyProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CurrencyProvider>
    </HashRouter>
  </StrictMode>,
)
