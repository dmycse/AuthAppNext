import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import SignInButton from '@/components/auth/SignInButton';

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

export default function Home() {

  return (
    <main className='h-full flex flex-col justify-center items-center bg-sky-400'>
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>
          Auth
        </h1>
        <p className='text-white text-lg drop-shadow-md'>
          An authentication service based on AuthJS v.5
        </p>
        <div>
          <SignInButton>
            <Button variant='secondary' size="lg">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </div>
    </main>
  );
}
