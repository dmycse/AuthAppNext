import { SuspenseBoundary } from "@/components/auth/SuspenseBoundary";
import { NewPasswordForm } from "@/components/auth/NewPasswordForm";


export default function NewPasswordPage() {
  return (
    <SuspenseBoundary>
      <NewPasswordForm />
    </SuspenseBoundary>
  )
}
