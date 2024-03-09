"use client";

import AuthProvider from "@/services/providers/auth-provider";
import ReactQueryProvider from "@/services/providers/react-query-provider";
import UserProvider from "@/services/providers/user-provider";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => (
  <ReactQueryProvider>
    <AuthProvider>
      <UserProvider>
        <ThemeProvider attribute="class" enableSystem={false}>
          {children}
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  </ReactQueryProvider>
);

export default Providers;
