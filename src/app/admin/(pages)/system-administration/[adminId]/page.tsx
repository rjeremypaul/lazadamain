import React from "react";
import db from "@/lib/db";
import AdminForm from "./admin-form";

const AdminId = async (props: { params: Promise<{ adminId: string }> }) => {
  const params = await props.params;
  const data = await db.admin.findUnique({
    where: {
      id: params.adminId,
    },
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <AdminForm initialData={data} />
    </div>
  );
};

export default AdminId;
