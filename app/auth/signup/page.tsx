import { SuspenseBoundary } from "@/components/auth/SuspenseBoundary";
import { SignUpForm } from "@/components/auth/SignUpForm";


export default function SignUpPage() {
  return (
    <SuspenseBoundary>
      <SignUpForm />
    </SuspenseBoundary>
  )
}
