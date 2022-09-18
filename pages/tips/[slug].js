import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import Image from 'next/image';
import createHeaderData from '../../utils/createHeaderData';
import ArticlesMeta from '../../components/meta/articles';
import hljs from 'highlight.js';
import styles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  marked.setOptions({
    highlight: (code) => {
      return hljs.highlightAuto(code).value
    },
  });

  const file = fs.readFileSync(`tips/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);
  const html = marked(content);

  const headerData = createHeaderData();
  return { props: { headerData, slug: params.slug, frontMatter: data, html } };
}

export async function getStaticPaths() {
  const files = fs.readdirSync('tips');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  return {
    paths,
    fallback: false,
  }
}

export default function Post({ headerData, slug, frontMatter, html }) {
  return (
    <>
      <ArticlesMeta
        title={frontMatter.title}
        description={frontMatter.description}
        url={`/tips/${slug}`}
        img={`/images/${frontMatter.image}`}
      />
      <div className="markdown-body">
        <div className={styles.imageBox}>
          <Image
            src={`/images/${frontMatter.image}`}
            width={1200}
            height={675}
            objectFit='contain'
          />
        </div>
        <h1>{frontMatter.title}</h1>
        <span>最終更新: {frontMatter.date}</span>
        <p>{frontMatter.description}</p>
        <article>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </article>
      </div>
    </>
  );
}
