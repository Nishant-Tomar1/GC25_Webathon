import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DialogContextProvider } from './store/context/DialogContextProvider.jsx'
import { LoginContextProvider } from './store/context/LoginContextProvider.jsx'

createRoot(document.getElementById('root')).render(
      <LoginContextProvider>
            <DialogContextProvider>
                  <App />
            </DialogContextProvider>
      </LoginContextProvider>
)
