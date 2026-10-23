import createHeaderData from '../utils/createHeaderData';
import ArticlesMeta from "../components/meta/articles";
import ArticleList from '../components/ArticleList';
import loadNotePosts from '../utils/loadNotePosts';
import type { NotePost } from '../utils/notePosts';
import useLocale from "../utils/useLocale";
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const headerData: HeaderData = createHeaderData();
  const initialNotePosts = await loadNotePosts(locale).catch(() => []);
  return {
    props: {
      headerData,
      initialNotePosts,
    },
    revalidate: 600,
  };
};

const Tips = ({ headerData, initialNotePosts }: { headerData: HeaderData; initialNotePosts: NotePost[] }) => {
  const { locale, t } = useLocale();
  const totalPosts: Post[] = locale === 'en' ? headerData.tips_en : headerData.tips_ja;

  return (
    <>
      <ArticlesMeta
        title={t.TIPS_TITLE}
        description={t.TIPS_DESCRIPTION}
        url="/tips"
        img=""
      />
      <ArticleList localPosts={totalPosts} initialNotePosts={initialNotePosts} />
    </>
  )
};

export default Tips;
