import { CheckCircledIcon } from '@radix-ui/react-icons';

type FormSuccessProps = {
  message?: string
}

export const FormSuccess = ({message}: FormSuccessProps) => {

  if(!message) return null;

  return (
    <div 
      className='p-3 flex items-center gap-x-2 text-sm text-emerald-500 
                bg-emerald-500/15 rounded-md'
    >
      <CheckCircledIcon className='w-4 h-4' />
      <p>{message}</p>
    </div>
  )
}
