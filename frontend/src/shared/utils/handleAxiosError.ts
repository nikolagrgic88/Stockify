import axios from "axios";

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("Error response from server:", error.response?.data);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.response?.data?.message || "Something went wrong",
        details: error.response?.data?.details || null,
        errors: error.response?.data?.errors || [],
      }),
      {
        status: error.response?.status || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    console.error("Unknown error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An unknown error occurred",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
