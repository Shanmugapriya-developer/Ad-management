import api from "./api";

// ✅ GET ADS
export const getAds = async () => {
  try {
    const res = await api.get("/ads");
    return res.data;
  } catch (error) {
    console.error("Get Ads Error:", error?.response?.data || error.message);
    return [];
  }
};

// ✅ CREATE AD
export const createAd = async (payload) => {
  const token = localStorage.getItem("adms_token");

  const finalData = {
    title: payload.title,
    description: payload.description,
    budget: Number(payload.budget),
    duration: payload.duration,
    media_url: payload.mediaUrl,
    media_type: payload.mediaType,
  };

  const res = await api.post("/ads", finalData, {
    headers: {
      Authorization: `Bearer ${token || "dummy-token"}`,
    },
  });

  return res.data;
};