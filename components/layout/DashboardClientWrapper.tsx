"use client";
import React from "react";
import { useApp } from "@/contexts/AppContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function DashboardClientWrapper({ children }: { children: React.ReactNode }) {
  const { currentUser } = useApp();
  const allowedMenus = currentUser?.role?.allowedMenus || [];
  return (
    <ProtectedRoute allowedMenus={allowedMenus}>
      {children}
    </ProtectedRoute>
  );
}
