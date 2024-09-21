"use client";

import UserManagementPage from "@/components/templates/UserManagementPage";
import { useAppContext } from "@/utils/AppWrapper";
import { redirect } from "next/navigation";

const UserManagement = () => {
  const { token } = useAppContext();
  const envToken = process.env.NEXT_PUBLIC_TOKEN;
  const localToken = localStorage?.getItem("token") || ""
  if (token == null || token == "") {
    // چون پس از ریلود کردن پیج مقدار در یوز رف باقی نمی ماند ار قابلیت لوکال استورج نیز استفاده میکنم
    // هر چند این امکان وجود داشت که کاملا از لوکال استورج استفاده شود
    if (envToken != localToken) {
      redirect("/");
    }
  }


  return (
    <div>
      <UserManagementPage />
    </div>
  );
};

export default UserManagement;
