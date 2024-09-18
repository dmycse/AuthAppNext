import { SettingsForm } from "@/components/auth/SettingsForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function SettingsPage() {
  
  return (
    <Card className="w-[600px] min-h-0 shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Settings
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <SettingsForm />
      </CardContent>
    </Card>
  )
}
