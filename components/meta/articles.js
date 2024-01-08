import Head from "next/head";
import useLocale from "../../utils/useLocale";

const homeURL = 'https://website-sochigusa.vercel.app';

export default function ArticlesMeta({ title, description, url, img }) {
  const { locale } = useLocale();
  const url_head = locale === 'en' ? '' : '/ja';
  return (
    <Head>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${homeURL}${url_head}${url}`} />
      <meta property="og:site_name" content={title} />
      <meta property="article:author" content="https://www.facebook.com/profile.php?id=100007905904884" />
      <meta property="og:image" content={`${homeURL}${img}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@SoChigusa" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${homeURL}${img}`} />
      <title>{title}</title>
    </Head>
  );
}