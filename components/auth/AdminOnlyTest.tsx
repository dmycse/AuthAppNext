"use client";

import { admin } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type AdminOnlyTestProps = {
  label: string;
  type: 'api' | 'action';
}

export const AdminOnlyTest = ({label, type}: AdminOnlyTestProps) => {

  let clickHandler = () => {
    if (type === 'api') {
      fetch('/api/admin')
        .then(response => {
          if (response.ok) {
            toast.success('Allowed API Route!');
          } else {
            toast.error('Forbidden API Route!');
          }
        })
    } else {
        admin()
          .then(response => {
            if (response.success) {
              toast.success(response.success);
            } else {
              toast.error(response.error);
            }
          })
    }
  };

  
  return (
    <div className="p-3 flex flex-row justify-between items-center rounded-md shadow-md border">
      <p className="text-sm font-medium">
        Admin-only {label}
      </p>
      <Button onClick={clickHandler}>
        Click to test
      </Button>
    </div>
  )
}
