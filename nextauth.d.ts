import { AccessRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    onboardingCompleted: boolean;
    accessRole: AccessRole;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
