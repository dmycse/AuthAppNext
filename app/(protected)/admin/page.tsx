import { AdminOnlyTest } from "@/components/auth/AdminOnlyTest";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { RoleGate } from "@/components/auth/RoleGate";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserRole } from "@prisma/client";


export default async function AdminPage() {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Admin
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.Admin}>
          <FormSuccess message="You are allowed to access this page!" />
        </RoleGate>
        <AdminOnlyTest label="API Route" type="api" />
        <AdminOnlyTest label="Server Action" type="action" />
      </CardContent>  
    </Card>
  )
}
