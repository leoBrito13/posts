import { useEffect, useRef, useState } from "react";
import { IPosts } from "components/interfaces/IPosts";
import https from "components/https";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import styles from "./posts.module.css";
import PostBox from "./PostBox";

export default function Posts(): JSX.Element {
  const loaderRef = useRef(null);
  const [PageError, setPageError] = useState(false);
  const [Mensagem, setMensagem] = useState("");
  const [ProxPagina, setProxPagina] = useState(0);
  const [posts, setPosts] = useState<IPosts[]>([]);

  const options = {
    root: null,
    rootMargin: "20px",
    threshold: 0.5,
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
          const { data } = await https.get("posts/?_embed", {
            params: {
              page: ProxPagina,
              per_page: 12,
            },
          });
          if (Mensagem === "") {
            setMensagem(" Carregando mais ...");
          }
          setPosts((posts) => [...posts, ...data]);
        }
      } catch (error) {
        //console.log(error);
        setMensagem("");
        setPageError((PageError) => true);
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
    <Container>
      <Row>
        {posts.map((post, index) => (
          <Col key={index} md={4} className={styles.col_posts}>
            <PostBox
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              link={post.link}
              image={
                post._embedded["wp:featuredmedia"][0].media_details.sizes
                  .thumbnail.source_url
              }
            />
          </Col>
        ))}
        <>
          <span className={styles.carregar_spinner} ref={loaderRef}>
            {Mensagem !== "" ? (
              <Spinner animation="border" role="status"></Spinner>
            ) : (
              ""
            )}
            {Mensagem}
          </span>
        </>
      </Row>
    </Container>
  );
}
