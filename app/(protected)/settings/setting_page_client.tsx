'use client';

import { signout } from '@/actions/signout';
import { useCurrentUser } from '@/hooks/use-current-user';

export default function SettingsPage() {
  let user = useCurrentUser();
  console.log("\x1b[34m", 'SETTINGSPAGE session: ', "\x1b[0m", user);

  // * Another way to sign out, without using server actions
  // let signOutHandler = () => signOut();

  let signOutAction = () => signout();
  
  return (
    <div>
      {JSON.stringify(user)}
      <button type="submit" className="border" onClick={signOutAction}>
        Sign Out
      </button>
    </div>
  )
  // * Another way to sign out, without using server actions
  // return (
  //   <div>
  //     {JSON.stringify(user)}
  //       <button type="submit" className="border" onClick={signOutHandler}>
  //         Sign Out
  //       </button>
  //   </div>
  // )
}
