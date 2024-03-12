export const ReactQueryKeys = {
  roles: ["roles"],
  userByHandle: (handle: string) => ["user", handle],
  userRoles: (userId: string) => ["user-roles", userId],
  userSocials: (userId: string) => ["user-socials", userId],
};
