import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "@/components/Layout";
import utilStyles from "../styles/utils.module.css";
import { getPostsData } from "@/lib/post";

const inter = Inter({ subsets: ["latin"] });

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id,title,date,thumbnailを取得
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>私はwebデザイナーとして働いている27歳男です。</p>
        </section>
        <section className={`${utilStyles.headingMD} ${utilStyles.padding1px}`}>
          <h2>📝 ハルキショウのブログ</h2>
          <div className={styles.grid}>
            {allPostsData.map(({id,title,date,thumbnail}) => (
              <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyles.boldText}>
                <p>{title}</p>
              </Link>
              <small className={utilStyles.lightText}>{date}</small>
            </article>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
