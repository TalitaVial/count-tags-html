import styles from "../styles/tableTags.module.css";

function TableTags(props) {
  const tags = props.result;
  const url = props.url;

  return (
    <div className={styles.containerTable}>
      <h1 className={styles.titleTable}>Resultados Para:</h1>
      <p className={styles.urlInfo}>{url}</p>
      <table className={styles.tableTags}>
        <thead>
          <tr>
            <td>Tag</td>
            <td>Quantidade</td>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, i) => {
            let start = tag.tag.indexOf("<") + 2;
            let end = tag.tag.indexOf(">");
            let nomeTag = tag.tag.substring(start, end);
            return (
              <tr>
                <td key={i}>{nomeTag}</td>
                <td>{tag.count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableTags;
