import { ReactNode, Suspense} from 'react';
import { BeatLoader } from 'react-spinners';


export const SuspenseBoundary = ({children}: {children: ReactNode}) => {
  return (
    <Suspense 
      fallback={
        <div className='w-full h-full flex justify-center items-center'>
          <BeatLoader />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
