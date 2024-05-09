 import React, {useState, useEffect} from 'react';
 import Link from 'next/link';
// Exemple d'utilisation de CSS Modules
import styles from "./index.module.scss"
import Image from 'next/image';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const reqArticles = async () => {
     
      const res = await fetch('http://localhost:8888/WP-NextJs/wp-json/wp/v2/posts?_embed');

        const posts = await res.json();
        setArticles(posts)
        setLoad(true)
    }
    reqArticles()

  }, [])

  const trimText = (text, maxLength) => {
    if(text.length <= maxLength){
      return text;
    }
    return text.substr(0, maxLength) + ' ...';
  }
  return (
    <header>
    <div>
      <div className={styles.list}>
        <h1>Archives du blog</h1>
        <ul>
          {load && articles.map((post) => (
            <li key={post.id}>
              {post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url && (
                <Image
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  width={500} // Définis la taille selon tes besoins
                  height={300}
                />
              )}
              <h2>{post.title.rendered}</h2>
              <p dangerouslySetInnerHTML={{ __html: trimText(post.excerpt.rendered, 100) }}></p>
              <Link href={`/blog/${post.slug}`} >
              <button>En savoir plus</button>
              </Link>
           
            </li>
          ))}
        </ul>
      </div>
    </div>
  </header>
  )
}
