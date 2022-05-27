import { IPostBox } from "components/interfaces/IPostBox";
import styles from "./postBox.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function postBox(Props: IPostBox) {
  return (
    <div key={Props.id} className={styles.box_post_single}>
      <div
        className={styles.clb_post_thumbnail}
        style={{ backgroundImage: `url(${Props.image})` }}
      >
        <div className={styles.clb_hover}>
          <ul>
            <li>
              <a href={Props.link} className="fas fa-link"><FontAwesomeIcon icon={["fas","link"]} /></a>
            </li>
          </ul>
        </div>
        <div className={styles.clb_date}>
          <span className={styles.clb_date}></span>
          <span className={styles.clb_month}></span>
        </div>
      </div>
      <div className={styles.post_conteudo}>
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
