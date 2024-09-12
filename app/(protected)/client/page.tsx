import { UserInfo } from "@/components/auth/UserInfo";
import { authUser } from "@/utils/authuser";


export default async function ClientPage() {
  let user = await authUser();
  console.log("ClientPage: ", user);


  return (
    <UserInfo user={user} label="Client Component" />
  )
}
