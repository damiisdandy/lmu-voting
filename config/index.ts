const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  sessionId: process.env.NEXT_PUBLIC_SESSION_ID || "",
  cloudinaryCloudName: process.env.CLOUD_NAME || "jetron-mall",
};

export default config;
