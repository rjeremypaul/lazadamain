import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { SystemAdministrationColumn } from "./_components/column";
import SystemAdministrationClient from "./_components/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const SystemAdministration = async () => {
  const datas = await db.admin.findMany({
    where: {
      role: "Admin",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: SystemAdministrationColumn[] = datas.map((item) => {
    return {
      id: item.id,
      name: item.name,
      username: item.username,
      role: item.role,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="System Administration"
          description="Manage all system administrators. You can add, edit, and delete system administrators."
        />
        <div className="flex items-center space-x-2">
          <Link href="/admin/system-administration/new">
            <Button size="sm">
              {" "}
              <PlusCircle />
              Add New Admin
            </Button>
          </Link>
        </div>
      </div>
      <SystemAdministrationClient data={formattedData} />
    </div>
  );
};

export default SystemAdministration;
