"use client";

import AuthProvider from "@/services/providers/auth-provider";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => (
  <AuthProvider>
    <ThemeProvider attribute="class" enableSystem={false}>
      {children}
    </ThemeProvider>
  </AuthProvider>
);

export default Providers;
