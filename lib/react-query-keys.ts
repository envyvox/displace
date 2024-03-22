export const ReactQueryKeys = {
  users: ["users"],
  roles: ["roles"],
  projects: ["projects"],
  project: (id: string) => ["project", id],
  userByHandle: (handle: string) => ["user", handle],
  userRoles: (userId: string) => ["user-roles", userId],
  userSocials: (userId: string) => ["user-socials", userId],
};
