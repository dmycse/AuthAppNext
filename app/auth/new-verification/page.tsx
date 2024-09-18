import { SuspenseBoundary } from '@/components/auth/SuspenseBoundary';
import { NewVerificationForm } from '@/components/auth/NewVerificationForm';


export default function NewVerification() {
  return (
    <SuspenseBoundary>
      <NewVerificationForm />
    </SuspenseBoundary>
  )
}
