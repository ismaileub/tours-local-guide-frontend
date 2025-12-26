export const getCompletedBookingId = async (
  token: string,
  targetId: string
): Promise<string | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/single-booking/${targetId}`,
      {
        method: "GET",
        headers: {
          authorization: token,
        },
      }
    );

    if (!res.ok) return null;

    const result = await res.json();

    if (result?.data?.status === "COMPLETED") {
      return result.data._id;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
