import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SignupProvider } from './contexts/SignupContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import { PostsProvider } from './contexts/PostsContext.jsx'
import { PostModalProvider } from './contexts/PostModalContext.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SignupProvider>
          <PostsProvider> 
            <PostModalProvider>
            <App />
          </PostModalProvider>
          </PostsProvider>
        </SignupProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
