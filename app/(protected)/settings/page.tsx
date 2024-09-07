import { auth, signOut } from "@/auth";

export default async function SettingsPage() {
  let session = await auth();
  console.log("\x1b[34m", 'SETTINGSPAGE session: ', "\x1b[0m", session);

  let signOutAction = async () => {
    "use server";
    await signOut();
  };
  
  return (
    <div>
      {JSON.stringify(session)}
      <form action={signOutAction}>
        <button type="submit" className="border">
          Sign Out
        </button>
      </form>
    </div>
  )
}
