import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import useLocale from '../../utils/useLocale';
import Image from 'next/image';
import { FacebookIcon, FacebookShareButton, HatenaIcon, HatenaShareButton, LineIcon, LineShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { Box, Stack, Typography } from '@mui/material';
import createHeaderData from '../../utils/createHeaderData';
import GoBackButton from '../../components/GoBackButton';
// import Like from '../../components/Like';
import ArticlesMeta from '../../components/meta/articles';
import hljs from 'highlight.js';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // const ip = await marked.setOptions({
  //   highlight: (code) => {
  //     return hljs.highlightAuto(code).value
  //   },
  // });

  const renderer = new marked.Renderer();
  renderer.code = (code, codeInfo) => {
    const [lang, fileName] = typeof codeInfo === 'undefined' ? [undefined, undefined] : codeInfo.split(':');
    const langClass = lang === undefined ? 'bash' : (hljs.getLanguage(lang) ? lang : 'plaintext');
    const codeBlockClass = fileName === undefined ? 'code-block-no-info' : 'code-block';
    const highlightedCode = hljs.highlight(code, { language: langClass }).value;

    let codeBlock = `<code class="hljs ${codeBlockClass} language-${langClass}">${highlightedCode}</code>`
    if (fileName !== undefined) {
      codeBlock = `<div class="code-info"><span>${fileName}</span></div>` + codeBlock
    }
    return `<pre>${codeBlock}</pre>`
  };

  let url: string;
  let file: string;
  let existTranslation = true;
  if (locale === 'en') {
    url = `/tips/${params!.slug}`;
    file = fs.readFileSync(`tips/en/${params!.slug}.md`, 'utf-8');
  } else {
    url = `/ja/tips/${params!.slug}`;
    file = fs.readFileSync(`tips/${params!.slug}.md`, 'utf-8');
    existTranslation = fs.existsSync(`tips/en/${params!.slug}.md`);
  }
  const my_matter: Matter = matter(file);
  const html: string = await marked(my_matter.content, { renderer });

  const headerData: HeaderData = createHeaderData();
  return { props: { headerData, url, slug: params!.slug, frontMatter: my_matter.data, html, existTranslation: existTranslation } };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allFiles_ja: fs.Dirent[] = fs.readdirSync('tips', { withFileTypes: true });
  const files_ja: string[] = allFiles_ja.filter(dirent => dirent.isFile()).map(({ name }) => name);
  const paths_ja: PostPath[] = files_ja.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
    locale: 'ja',
  }));
  const files_en: string[] = fs.readdirSync('tips/en');
  const paths_en: PostPath[] = files_en.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
    locale: 'en',
  }));
  const paths: PostPath[] = paths_ja.concat(paths_en);
  return {
    paths,
    fallback: false,
  }
}

export default function Post({ url, slug, frontMatter, html, existTranslation }: { url: string, slug: string, frontMatter: FrontMatter, html: string, existTranslation: boolean }) {
  const { t } = useLocale();
  return (
    <>
      <ArticlesMeta
        title={frontMatter.title}
        description={frontMatter.description}
        url={`/tips/${slug}`}
        img={`/logos/${frontMatter.image}`}
      />
      <div className="markdown-body">
        <Typography gutterBottom variant="h1">
          {frontMatter.title}
        </Typography>
        <Stack spacing={2} direction='row'>
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: '70%' }}>
            <Typography>
              {t.LATEST_UPDATE}: {frontMatter.date}
            </Typography>
            <Typography>
              {frontMatter.description}
            </Typography>
            {!existTranslation ?
              (
                <Typography variant='caption' display='block' color='secondary'>
                  日本語限定記事
                </Typography>
              ) : (<></>)
            }
          </Box>
          <Box
            sx={{ width: { xs: '96%', sm: '80%', md: '30%' }, paddingLeft: { sm: '6%' }, marginLeft: { md: '70%' }, padding: '2%' }}>
            <Image
              src={`/logos/${frontMatter.image}`}
              width={1200}
              height={675}
              objectFit='contain'
              alt='logo'
            />
          </Box>
        </Stack>
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>
          <Typography variant='body1'>{t.LATEST_UPDATE}: {frontMatter.date}</Typography>
          <Typography variant='body1'>{frontMatter.description}</Typography>
          {!existTranslation ?
            (
              <Typography variant='caption' display='block' color='secondary'>
                日本語限定記事
              </Typography>
            ) : (<></>)
          }
        </Box>
        <article>
          <Typography variant='body1' component='div' dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
      {/* <Like sx={{ marginBottom: 2 }} id={{ collection: 'posts', document: slug }} /> */}
      <Stack direction='row' spacing={1}>
        <Typography variant='subtitle1'>
          {t.SHARE_THIS_POST}
        </Typography>
        <TwitterShareButton
          url={`https://website-sochigusa.vercel.app${url}`}
          title={frontMatter.title}>
          <TwitterIcon size={30} round={true} />
        </TwitterShareButton>
        <FacebookShareButton
          url={`https://website-sochigusa.vercel.app${url}`}
          title={frontMatter.title}>
          <FacebookIcon size={30} round={true} />
        </FacebookShareButton>
        <LineShareButton
          url={`https://website-sochigusa.vercel.app${url}`}
          title={frontMatter.title}>
          <LineIcon size={30} round={true} />
        </LineShareButton>
        <HatenaShareButton
          url={`https://website-sochigusa.vercel.app${url}`}
          title={frontMatter.title}>
          <HatenaIcon size={30} round={true} />
        </HatenaShareButton>
      </Stack>
      <GoBackButton gutterBottom browserBack />
    </>
  );
}
