import { IPostBox } from "components/interfaces/IPostBox";
import styles from "./postBox.module.css";

export default function postBox(Props: IPostBox) {
  return (
    <div key={Props.id} className={styles.box_post_single}>
      <div
        className={styles.clb_post_thumbnail}
        style={{ backgroundImage: `url(${Props.image})` }}
      ></div>
      <div className={styles.post_conteudo}>
        {console.log(Props.listaCategorias)}
        {Props.listaCategorias.map((categoria: any, index: any) => {
          return Props.categoria.includes(categoria.id) == true &&
            categoria.name !== "Sem categoria" ? (
            <a key={index} href={categoria.link} className={styles.categoria}>
              {categoria.name}
            </a>
          ) : null;
        })}
        <a href={Props.link}>
          <h3
            className={styles.post_titulo}
            dangerouslySetInnerHTML={{ __html: Props.title["rendered"] }}
          ></h3>
        </a>
        <p
          className={styles.post_descricao}
          dangerouslySetInnerHTML={{ __html: Props.excerpt["rendered"] }}
        ></p>
        <a href={Props.link} className={styles.clb_read_more}>
          leia mais
        </a>
      </div>
    </div>
  );
}
