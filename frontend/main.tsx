import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/index.css';
import App from './app/App.js';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ClerkProvider
         publishableKey={CLERK_KEY}
         appearance={{
            theme: dark as any,
         }}
      >
         <App />
      </ClerkProvider>
   </StrictMode>,
);
