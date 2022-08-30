import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';

export async function getStaticProps({ params }) {
  marked.setOptions({
    highlight: (code) => {
      return hljs.highlightAuto(code).value
    },
  });

  const file = fs.readFileSync(`tips/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);
  const html = marked(content);
  return { props: { frontMatter: data, html } };
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
    <div>
      <h1>{frontMatter.title}</h1>
      <span>{frontMatter.date}</span>
      <article className="markdown-body">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </article>
    </div>
  );
}
