import axios from "./axios";

export default async function fetchPosts() {
  try {
    const res = await axios.get("/posts");
    return res.data.data;
  } catch (error) {
    console.log("Fetch post failed: ", error);
    throw error;
  }
}
