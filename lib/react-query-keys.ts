export const ReactQueryKeys = {
  roles: ["roles"],
  projects: ["projects"],
  userByHandle: (handle: string) => ["user", handle],
  userRoles: (userId: string) => ["user-roles", userId],
  userSocials: (userId: string) => ["user-socials", userId],
};
