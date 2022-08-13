import { IPostBox } from "components/interfaces/IPostBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import styles from "./postBox.module.css";

export default function postBox(Props: IPostBox) {
  let dataModificado = Props.date.replace("T", "-").split("-");
  const Meses = [
    null,
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return (
    
      <div key={Props.id} className={styles.box_post_single}>
        <div
          className={styles.clb_post_thumbnail}
          style={{ backgroundImage: `url(${Props.image})` }}
        >
            <div className={styles.clb_hover}>
              <ul className={styles.clb_post_link}>
                <li className={styles.clb_post_link}>
                  <a href={Props.link} target ="_blank">
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                </li>
              </ul>
            </div>

          <div className={styles.clb_post_date}>
            <span className={styles.clb_date}>{dataModificado[2]}</span>
            <span className={styles.clb_month}>
              {Meses[Number(dataModificado[1])]}
            </span>
          </div>
        </div>
        <div className={styles.post_conteudo}>
          {Props.listaCategorias.map((categoria: any, index: any) => {
            return Props.categoria.includes(categoria.id) == true &&
              categoria.name !== "Sem categoria" ? (
              <a key={index} href={categoria.link} className={styles.categoria} target ="_blank">
                {categoria.name}
              </a>
            ) : null;
          })}
          <a href={Props.link} target ="_blank">
            <h3
              className={styles.post_titulo}
              dangerouslySetInnerHTML={{ __html: Props.title["rendered"] }}
            ></h3>
          </a>
          <p
            className={styles.post_descricao}
            dangerouslySetInnerHTML={{ __html: Props.excerpt["rendered"] }}
          ></p>
          <a href={Props.link} className={styles.clb_read_more} target ="_blank">
            leia mais
          </a>
        </div>
      </div>
  );
}
