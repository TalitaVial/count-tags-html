import axios from "axios";
import saveHtmlDb from "../db/services/saveHtmlDb";
import fecthHtmlDb from "../db/services/fecthHtmlDb";

function UseHandleTags() {
  async function _getHmlContent(url) {
    const response = await axios.get(url);
    const html = response.data;
    return html;
  }

  async function _checkIfExistsUlrDb(urls) {
    const handleUrlsParms = urls.filter(
      (url, index) => urls.indexOf(url) === index
    );
    const responseUrls = await fecthHtmlDb();
    const dublicatedUrls = responseUrls.filter((responseUrlDB) =>
      handleUrlsParms.includes(responseUrlDB.url)
    );

    if (dublicatedUrls.length > 0) {
      window.alert(
        "Existem URLs que já foram Analisadas e não serão incluidas na base!!"
      );
    }

    const filterUniqueUrls = handleUrlsParms.filter((newurl) => {
      const isDulicated =
        dublicatedUrls.filter((item) => newurl == item.url).length > 0;
      return !isDulicated;
    });

    return filterUniqueUrls;
  }

  async function saveTagsArray(urls) {
    try {
      const uniqueUlrs = await _checkIfExistsUlrDb(urls);
      await Promise.all(
        uniqueUlrs.map(async (url) => {
          const html = await _getHmlContent(url);
          const regex = /<\/([^>]+)>/g;
          const result = html.match(regex);
          const tagAccount = result.reduce((acc, currence) => {
            return acc[currence] ? ++acc[currence] : (acc[currence] = 1), acc;
          }, {});
          const uniqTagsArray = Object.entries(tagAccount).map(
            ([tag, count]) => ({
              tag,
              count,
            })
          );
          saveHtmlDb({ url, result: uniqTagsArray });
        })
      );
    } catch (err) {
      console.log(err);
      window.alert("Por favor Informe uma URL válida");
    }
  }

  const readTagsDb = async () => {
    return fecthHtmlDb();
  };

  return [saveTagsArray, readTagsDb];
}

export default UseHandleTags;
