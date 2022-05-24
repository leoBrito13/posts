import { Key, useEffect, useRef, useState } from "react";
import { IPosts } from "components/interfaces/IPosts";
import https from "components/https";

export default function Posts() {
  const loaderRef = useRef(null);
  const [PageError, setPageError] = useState(false);
  const [Mensagem, setMensagem] = useState('');
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
      if( PageError !== true){
      setProxPagina((ProxPagina) => ProxPagina + 1);
      }
    }
  }, options);

  useEffect(() => {
    const CarregarMais = async () => {
      try {
          if (ProxPagina !== 0 && PageError == false){      
          const { data } = await https.get("posts/", {
            params: {
              page: ProxPagina,
              per_page: 20,
            },
          });
          if(Mensagem ==''){
          setMensagem('Carregando mais ...');
          }
          setPosts([...posts, ...data]);
        }
      } catch (error) {
        //console.log(error);
        setMensagem('');
        setPageError(true);
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
    <section className="box-posts">
      {posts.map((post, index) => (
          <div key={index} className="box-post-single">
            <div>
              <h1>{post.title["rendered"]} </h1>
            </div>
          </div> 
      ))}
      <p ref={loaderRef}>{Mensagem}</p>
    </section>
  );
}
