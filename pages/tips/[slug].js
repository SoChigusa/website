import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import { useState } from 'react';
import Image from 'next/image';
import { FacebookIcon, FacebookShareButton, HatenaIcon, HatenaShareButton, LineIcon, LineShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { Button, Stack, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import createHeaderData from '../../utils/createHeaderData';
import Like from '../../components/Like';
import ArticlesMeta from '../../components/meta/articles';
import hljs from 'highlight.js';
import styles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  const ip = await

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
  const [count, setCount] = useState(0);
  const handleLike = () => {
    setCount(count + 1);
  }

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
      {/* <Button
        variant='contained'
        startIcon={<ArrowBack />}
        sx={{ marginBottom: 2 }}
        onClick={() => {
          history.back();
          return false;
        }}
      >
        Back
      </Button> */}
      <Like />
      <Button
        variant='contained'
        color='error'
        startIcon={<Favorite />}
        sx={{ marginBottom: 2 }}
        onClick={handleLike}
      >
        {count}
      </Button>
      <Stack direction='row' spacing={1} sx={{ marginBottom: 2 }}>
        <Typography variant='h6'>
          Share this post:
        </Typography>
        <TwitterShareButton
          url={`https://website-sochigusa.vercel.app/tips/${slug}`}
          title={frontMatter.title}>
          <TwitterIcon size={30} round={true} />
        </TwitterShareButton>
        <FacebookShareButton
          url={`https://website-sochigusa.vercel.app/tips/${slug}`}
          title={frontMatter.title}>
          <FacebookIcon size={30} round={true} />
        </FacebookShareButton>
        <LineShareButton
          url={`https://website-sochigusa.vercel.app/tips/${slug}`}
          title={frontMatter.title}>
          <LineIcon size={30} round={true} />
        </LineShareButton>
        <HatenaShareButton
          url={`https://website-sochigusa.vercel.app/tips/${slug}`}
          title={frontMatter.title}>
          <HatenaIcon size={30} round={true} />
        </HatenaShareButton>
      </Stack>
    </>
  );
}
