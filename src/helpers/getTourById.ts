export const getToutById = async (blogId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/tours/${blogId}`
  );
  return await res.json();
};
