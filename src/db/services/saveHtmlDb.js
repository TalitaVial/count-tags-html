import axios from "axios";

export default async function saveHtmlDb(analyzeResult) {
  try {
    await axios.post("http://localhost:3001/data", analyzeResult, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
}
