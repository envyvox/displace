export const ReactQueryKeys = {
  users: ["users"],
  roles: ["roles"],
  projects: ["projects"],
  project: (id: string) => ["project", id],
  handle: (handle: string) => ["handle", handle],
  userByHandle: (handle: string) => ["user", handle],
  userRoles: (userId: string) => ["user-roles", userId],
  userSocials: (userId: string) => ["user-socials", userId],
};
