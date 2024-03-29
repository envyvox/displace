"use client";

import { useUserByHandle } from "@/hooks/queries/use-user-by-handle";
import { useUserRoles } from "@/hooks/queries/use-user-roles";
import { useUserSocials } from "@/hooks/queries/use-user-socials";
import UserCard from "@/components/user-card";

const UserPage = ({ params }: { params: { handle: string } }) => {
  const { data: user, isLoading: isLoadingUser } = useUserByHandle(
    params.handle
  );
  const { data: userRoles, isLoading: isLoadingRoles } = useUserRoles(user?.id);
  const { data: userSocials, isLoading: isLoadingSocials } = useUserSocials(
    user?.id
  );

  return (
    <div className="-mt-24 flex min-h-screen flex-col items-center justify-center">
      <UserCard
        user={user}
        isLoadingUser={isLoadingUser}
        roles={userRoles ?? []}
        isLoadingRoles={isLoadingRoles}
        socials={userSocials ?? []}
        isloadingSocials={isLoadingSocials}
      />
    </div>
  );
};

export default UserPage;
