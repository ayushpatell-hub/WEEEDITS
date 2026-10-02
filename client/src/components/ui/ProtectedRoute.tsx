"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children: ReactNode;
  role?: "client" | "admin";
};

export default function ProtectedRoute({ children, role }: Props) {
  const { firebaseUser, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!firebaseUser) {
      router.replace("/login");
      return;
    }

    if (role && profile && profile.role !== role) {
      router.replace("/");
    }
  }, [loading, firebaseUser, profile, role, router]);

  if (loading || !firebaseUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}