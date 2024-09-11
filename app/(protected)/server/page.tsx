import { UserInfo } from "@/components/auth/UserInfo";
import { authUser } from "@/utils/authuser";


export default async function ServerPage() {
  let user = await authUser();
  console.log("ServerPage: ", user);


  return (
    <UserInfo user={user} label="Server Component" />
  )
}
