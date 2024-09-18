import { SuspenseBoundary } from "@/components/auth/SuspenseBoundary";
import { SignInForm } from "@/components/auth/SignInForm";


export default function SignInPage() {
  return (
    <SuspenseBoundary>
      <SignInForm />
    </SuspenseBoundary>
  )
}
