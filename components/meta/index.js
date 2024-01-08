import Head from "next/head";
import { useRouter } from "next/router";
import useLocale from "../../utils/useLocale";

const homeURL = 'https://website-sochigusa.vercel.app';

export default function IndexMeta({ title = "[Default Title]", description = "[Default Description]" }) {
  const { locale, t } = useLocale();
  const url_head = locale === 'en' ? '' : '/ja';
  let new_title = title, new_description = description;
  if (new_title === "[Default Title]")
    new_title = t.TITLE;
  if (new_description === "[Default Description]")
    new_description = t.DESCRIPTION;
  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={new_title} />
      <meta property="og:description" content={new_description} />
      <meta property="og:url" content={`${homeURL}${url_head}`} />
      <meta property="og:site_name" content={new_title} />
      <meta property="article:author" content="https://www.facebook.com/profile.php?id=100007905904884" />
      {/* <meta property="og:image" content="Image" /> */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@SoChigusa" />
      <meta name="twitter:title" content={new_title} />
      <meta name="twitter:description" content={new_description} />
      {/* <meta name="twitter:image" content="Image" /> */}
      <title>{new_title}</title>
    </Head>
  );
}