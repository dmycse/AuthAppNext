import { CardWrapper } from "./CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


export const ErrorCard = () => {
  return (
    <CardWrapper 
      headerLabel="Oops! Something went wrong!" 
      backButtonLabel="Back to signin" 
      backButtonHref="/auth/signin"
    >
      <div className="w-full flex justify-center">
        <ExclamationTriangleIcon className="w-10 h-10 text-destructive" />
      </div>
    </CardWrapper>
  )
}
