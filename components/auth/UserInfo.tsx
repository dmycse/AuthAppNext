import { User } from "next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type UserInfoProps = {
  user?: User;
  label: string;
};

export const UserInfo =({ user, label }: UserInfoProps) => {

  console.log('UserInfo: ', user);

  let userDetails = user && Object.entries({
    ID: user.id,
    Name: user.name,
    Email: user.email,
    Role: user.role,
    "2FA": user.isTwoFactorEnabled ? "Enabled" : "Disabled",
  });

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {label}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {userDetails?.map(([key, value]) => (
          <div key={key} className="p-3 flex justify-between items-center rounded-sm shadow-md">
            <p className="text-sm font-medium">{key}</p>
            <p className="p-2 text-md font-medium font-mono bg-slate-100 rounded-md truncate">
              {value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
