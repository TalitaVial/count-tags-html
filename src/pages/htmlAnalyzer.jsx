import { useEffect, useState } from "react";
import TableTags from "../components/tableTags";
import styles from "../styles/htmlAnalyzer.module.css";
import Loading from "../components/loading";
import UseHandleTags from "../hooks/useHandleTags";

function HtmlAnalyzer() {
  const [dataHtml, setDataHmtl] = useState([]);
  const [saveTagsArray, readTagsDb] = UseHandleTags();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    setIsLoading(true);
    readTagsDb()
      .then((res) => {
        setDataHmtl(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUrlAnalyze = async (e) => {
    const urlsInfo = e.target.elements.urls.value.split(",");
    await saveTagsArray(urlsInfo);
    getTags();
    document.getElementById("urlInput").value = "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h1 className={styles.title}>
          Analisar página &lt;<span className={styles.textHtml}>HTML</span>/&gt;
        </h1>
      </div>
      <div className={styles.containerForm}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleUrlAnalyze(e);
          }}
        >
          <label className={styles.formLabel}>
            Informe as urls separadas por vírgula:
          </label>
          <input
            className={styles.formInput}
            id="urlInput"
            name="urls"
            type="text"
            required
          ></input>
          <button className={styles.formButton} type="submit">
            Analisar
          </button>
        </form>
      </div>
      {isLoading ? (
        <Loading />
      ) : dataHtml.length > 0 ? (
        <div className={styles.containerTable}>
          {dataHtml.map(({ url, result }) => (
            <>{dataHtml && <TableTags url={url} result={result}></TableTags>}</>
          ))}
        </div>
      ) : (
        <div className={styles.welcomeAnalyze}>
          <h1 className={styles.title}>
            Seja Bem Vindo!!Você está no programa de contagem de Tags HTML. Você
            pode começar agora mesmo a verificar sua primeira página HTML.
          </h1>
        </div>
      )}
      <footer className={styles.footer}>
        <h1 className={styles.title}>&copy;2023 Talita Vial</h1>
        <h1 className={styles.title}>
          &lt;
          <span className={styles.textHtml}>
            <a href="https://github.com/TalitaVial" target="_blank">
              GitHub
            </a>
          </span>
          /&gt;
        </h1>
      </footer>
    </div>
  );
}

export default HtmlAnalyzer;
