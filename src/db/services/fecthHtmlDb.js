import axios from "axios";

export default async function fecthHtmlDb() {
  try {
    const response = await axios.get("http://localhost:3001/data");
    const dados = response.data;
    return dados;
  } catch (err) {
    throw err;
  }
}
