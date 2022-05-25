import { IPostBox } from "components/interfaces/IPostBox";
import styles from "./postBox.module.css";

export default function postBox(Props: IPostBox) {

  return (
    <div key={Props.id} className={styles.box_post_single}>
      <div className={styles.clb_post_thumbnail} style={{backgroundImage:`url(${Props.image})`}}>
      </div>
      <div className={styles.post_descricao}>
        <h3>{Props.title["rendered"]} </h3>
      </div>
    </div>
  );
}
