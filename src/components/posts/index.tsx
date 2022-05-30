import { useEffect, useRef, useState } from "react";
import { IPosts } from "components/interfaces/IPosts";
import https from "components/https";
import styles from "./posts.module.css";
import PostBox from "./PostBox";
import { ICategorias } from "components/interfaces/ICategorias";
import Loading from "assets/loading.gif";

export default function Posts(): JSX.Element {
  const loaderRef = useRef(null);
  const [PageError, setPageError] = useState(false);
  const [Mensagem, setMensagem] = useState("");
  const [ProxPagina, setProxPagina] = useState(0);
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);

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
            setMensagem(" Carregando ...");
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
    // obter categorias
    https
      .get<ICategorias[]>("/categories")
      .then((resposta) => {
        setCategorias([...resposta.data]);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  useEffect(() => {
    if (loaderRef.current && PageError !== true) {
      observer.observe(loaderRef.current);
    }
  }, []);

  return (
    <>
      <div
        className={`grid grid-flow-row lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1`}
      >
        {posts.map((post, index) => (
          <div key={index} className={styles.col_posts}>
            <PostBox
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              link={post.link}
              categoria={post.categories}
              listaCategorias={categorias === undefined ? [] : categorias}
              image={
                post._embedded["wp:featuredmedia"] === undefined ||
                post?._embedded["wp:featuredmedia"][0].code ===
                  "rest_post_invalid_id"
                  ? ""
                  : post?._embedded["wp:featuredmedia"][0].media_details.sizes
                      .thumbnail.source_url
              }
            />
          </div>
        ))}
      </div>
      <p className={styles.mensagem} ref={loaderRef}>
        {Mensagem !== "" && posts.length > 10 ? (
          <img className={styles.carregar_img} src={Loading} />
        ) : (
          ""
        )}
        <span>{Mensagem}</span>
      </p>
    </>
  );
}
