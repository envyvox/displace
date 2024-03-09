"use client";

import AuthProvider from "@/services/providers/auth-provider";
import ReactQueryProvider from "@/services/providers/react-query-provider";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => (
  <ReactQueryProvider>
    <AuthProvider>
      <ThemeProvider attribute="class" enableSystem={false}>
        {children}
      </ThemeProvider>
    </AuthProvider>
  </ReactQueryProvider>
);

export default Providers;
