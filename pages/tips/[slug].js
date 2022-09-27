import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import Image from 'next/image';
import { FacebookIcon, FacebookShareButton, HatenaIcon, HatenaShareButton, LineIcon, LineShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { Box, Stack, Typography } from '@mui/material';
import createHeaderData from '../../utils/createHeaderData';
import GoBackButton from '../../components/GoBackButton';
import Like from '../../components/Like';
import ArticlesMeta from '../../components/meta/articles';
import hljs from 'highlight.js';

export async function getStaticProps({ params }) {
  const ip = await marked.setOptions({
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
        img={`/logos/${frontMatter.image}`}
      />
      <div className="markdown-body">
        <h1>{frontMatter.title}</h1>
        <Stack spacing={2} direction='row'>
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: '70%' }}>
            <span>最終更新: {frontMatter.date}</span>
            <p>{frontMatter.description}</p>
          </Box>
          <Box
            sx={{ width: { xs: '96%', sm: '80%', md: '30%' }, paddingLeft: { sm: '6%' }, marginLeft: { md: '70%' }, padding: '2%' }}>
            <Image
              src={`/logos/${frontMatter.image}`}
              width={1200}
              height={675}
              objectFit='contain'
            />
          </Box>
        </Stack>
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>
          <span>最終更新: {frontMatter.date}</span>
          <p>{frontMatter.description}</p>
        </Box>
        <article>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </article>
      </div>
      <Like sx={{ marginBottom: 2 }} />
      <Stack direction='row' spacing={1}>
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
      <GoBackButton gutterBottom browserBack />
    </>
  );
}
