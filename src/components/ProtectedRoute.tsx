"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  // Protected route check temporarily disabled
  /*
  useEffect(() => {
    const token = localStorage.getItem("catAdmin");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);
  */

  return <>{children}</>;
}