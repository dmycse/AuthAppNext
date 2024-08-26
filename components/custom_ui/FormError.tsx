import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

type FormErrorProps = {
  message?: string
}

export const FormError = ({message}: FormErrorProps) => {

  if(!message) return null;

  return (
    <div 
      className='p-3 flex items-center gap-x-2 text-sm text-destructive 
                bg-destructive/15 rounded-md'
    >
      <ExclamationTriangleIcon className='w-4 h-4' />
      <p>{message}</p>
    </div>
  )
}
