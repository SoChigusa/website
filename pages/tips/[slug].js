import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import createHeaderData from '../../utils/createHeaderData';
import Image from 'next/image';
import ArticlesMeta from '../../components/meta/articles';
import { Container } from 'react-bootstrap';
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
  return { props: { headerData, frontMatter: data, html } };
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

export default function Post({ headerData, frontMatter, html }) {
  return (
    <Container className="w-100">
      <ArticlesMeta
        title={frontMatter.title}
        description={frontMatter.description}
        url=""
        img=""
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
    </Container>
  );
}
