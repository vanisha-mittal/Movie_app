const BACKEND_URL = "http://localhost:5000/api/search";

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    await fetch(`${BACKEND_URL}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchTerm, movie }),
    });
  } catch (error) {
    console.error("MongoDB update error:", error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/trending`);
    return await res.json();
  } catch (error) {
    console.error("MongoDB fetch trending error:", error);
    return [];
  }
};
