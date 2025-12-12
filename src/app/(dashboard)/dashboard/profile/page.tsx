import ProfileForm from "@/components/profile/profileForm";
import { getUserSession } from "@/helpers/getUserSession";

const MYProfilePage = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
    headers: {
      authorization: token || "",
    },
    next: { tags: ["user-profile"] },
    cache: "no-store",
  });

  const { data: user } = await res.json();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h3 className="text-2xl font-semibold mb-6">My Profile</h3>
      <ProfileForm user={user} token={token} />
    </div>
  );
};

export default MYProfilePage;
