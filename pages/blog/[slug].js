import { useEffect, useState } from 'react';


import Head from "next/head";
import Image from "next/image";

import styles from "./blog.module.scss"

export default function Single({post, featuredImage}){
    const [safeContent, setSafeContent] = useState('');
     

    useEffect(() => {
        // Appliquer les modifications ou traitements du contenu ici, après que le composant ait été monté
        if (post && post.length > 0) {
            setSafeContent(post[0].content.rendered);
        }
    }, [post]);  // Dépendances pour exécuter l'effet

    const data = post[0];
    console.log(data)
    
    //console.log(data)
    
    return(
        <>
        <Head>
            <title>{data.title.rendered}</title>
        </Head>
           <div className={styles.blog}>
            <h1>{data.title.rendered}</h1>
            <div className={styles.featuredImg}>
                {featuredImage && <Image src={featuredImage} alt="image a la une" fill/>}
            </div>
            <div className={styles.content}>
                 <div dangerouslySetInnerHTML={{ __html: safeContent }}></div>
            </div>
        </div>
        </>
     
    )
}

export async function getStaticPaths(){
    const res = await fetch('http://localhost:8888/WP-NextJs/wp-json/wp/v2/posts');
    const posts = await res.json();
    
    const paths = posts.map((post) =>({
        params :{ slug: post.slug }
    }))

    return {paths, fallback:false }
}


export async function getStaticProps({ params }) {
    try {
        const res = await fetch(`http://localhost:8888/WP-NextJs/wp-json/wp/v2/posts/?slug=${params.slug}`);
        const post = await res.json();
        const postdata = post[0];

        let featuredImage = null;
        if (postdata.featured_media) {
            const imgRes = await fetch(`http://localhost:8888/WP-NextJs/wp-json/wp/v2/media/${postdata.featured_media}`);
            const imgData = await imgRes.json();
            console.log(imgData);
            featuredImage = imgData.source_url;
        }

        return { props: { post, featuredImage } };
    } catch (error) {
        console.error('Failed to fetch post data:', error);
        return { props: { post: [], featuredImage: null } };  // Provide fallback values
    }
}