import { AdminOnlyTest } from "@/components/auth/AdminOnlyTest";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { RoleGate } from "@/components/auth/RoleGate";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { authRole } from "@/utils/authuser";
import { UserRole } from "@prisma/client";


export default async function AdminPage() {
  let role = await authRole();

  return (
    <Card className="flex-1 w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Admin Panel
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* <RoleGate allowedRole={role === UserRole.Admin}>
          <FormSuccess message="You are allowed to access this page!" />
        </RoleGate> */}
        {role === UserRole.Admin 
          ? <FormSuccess message="You are allowed to access this page!" />
          : <FormError message="You are not allowed to access this page!" />
        }
        {role === UserRole.Admin && (
          <>
            <AdminOnlyTest label="API Route" type="api" />
            <AdminOnlyTest label="Server Action" type="action" />
          </>
        )}
      </CardContent>  
    </Card>
  )
}
