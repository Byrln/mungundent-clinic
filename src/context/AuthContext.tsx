"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  const isAuthenticated = status === "authenticated";
  const loading = status === "loading";
  const user = session?.user;

  // Redirect to login if not authenticated and trying to access admin pages
  useEffect(() => {
    if (!isAuthenticated && !loading && pathname?.startsWith("/admin") && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isAuthenticated, loading, pathname, router]);
  
  // Store session token in localStorage for API requests
  useEffect(() => {
    if (session?.user) {
      // For demo purposes, we're using a hardcoded API key
      // In a real app, you would use a proper JWT token
      const token = 'demo-api-key';
      console.log('Setting admin token from session:', token);
      localStorage.setItem('admin-token', token);
    } else {
      localStorage.removeItem('admin-token');
    }
  }, [session]);

  // Login function using NextAuth
  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      
      if (result?.ok) {
        // Store token immediately after successful login
        // Use a hardcoded token for demo purposes
        const token = 'demo-api-key';
        console.log('Setting admin token:', token);
        localStorage.setItem('admin-token', token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Logout function using NextAuth
  const logout = () => {
    signOut({ redirect: false });
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}