// SignInForm.tsx
import React from 'react';
import { useSignIn } from '@clerk/clerk-react';
import Button from '@ui/Button';

const LoginGuestButton = () => {
   const { isLoaded, signIn, setActive } = useSignIn();

   if (!isLoaded) return;

   const loginGuest = async (e: React.FormEvent) => {
      e.preventDefault();
      const attempt = await signIn.create({
         identifier: 'guest',
         password: ';MEC5+~a7RJFf8K',
         strategy: 'password', // optional since password may be default
      });
      if (attempt.status === 'complete') {
         await setActive({ session: attempt.createdSessionId });
      }
   };

   return (
      <Button className="px-18 py-2" onClick={loginGuest}>
         Continue as guest
      </Button>
   );
};

export default LoginGuestButton;
