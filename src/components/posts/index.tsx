import { useEffect, useRef, useState } from "react";
import { IPosts } from "components/interfaces/IPosts";
import https from "components/https";
import { Col, Row, Spinner } from "react-bootstrap";
import styles from './posts.module.css';

export default function Posts() {
  const loaderRef = useRef(null);
  const [PageError, setPageError] = useState(false);
  const [Mensagem, setMensagem] = useState("");
  const [ProxPagina, setProxPagina] = useState(0);
  const [posts, setPosts] = useState<IPosts[]>([]);

  const options = {
    root: null,
    rootMargin: "20px",
    threshold: 1.0,
  };

  const observer = new IntersectionObserver((entries) => {
    const first = entries[0];
    if (first.isIntersecting) {
      if (PageError !== true) {
        setProxPagina((ProxPagina) => ProxPagina + 1);
      }
    }
  }, options);

  useEffect(() => {
    const CarregarMais = async () => {
      try {
        if (ProxPagina !== 0 && PageError === false) {
          const { data } = await https.get("posts/", {
            params: {
              page: ProxPagina,
              per_page: 20,
            },
          });
          console.log(data);
          if (Mensagem === "") {
            setMensagem(" Carregando mais ...");
          }
          setPosts( posts =>[...posts, ...data]);
        }
      } catch (error) {
        //console.log(error);
        setMensagem("");
        setPageError(PageError => true);
      }
    };
    CarregarMais();
  }, [ProxPagina]);

  useEffect(() => {
    if (loaderRef.current && PageError !== true) {
      observer.observe(loaderRef.current);
    }
  }, []);

  return (
    <Row>
      {posts.map((post, index) => (
        <Col md={4}>
          <div key={index} className={styles.box_post_single}>
            <div>
              <h1>{post.title["rendered"]} </h1>
            </div>
          </div>
        </Col>
      ))}
      <p className="carregar-spinner" ref={loaderRef}>
        {Mensagem !== "" ? (
          <Spinner animation="border" role="status"></Spinner>
        ) : (
          ""
        )}
        {Mensagem}
      </p>
    </Row>
  );
}
