import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import Image from 'next/image';
import { Col, Row, Container } from 'react-bootstrap';
import hljs from 'highlight.js';
import styles from '../../styles/utils.module.css';
import createHeaderData from "../../utils/createHeaderData";

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
  return { props: { frontMatter: data, html, headerData } };
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

export default function Post({ frontMatter, html }) {
  return (
    <Container className="w-100">
      <div className="markdown-body">
        <div className={styles.imageBox}>
          <Image
            src={`/images/${frontMatter.image}.svg`}
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
