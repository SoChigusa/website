import createHeaderData from '../../../utils/createHeaderData';
import ArticlesMeta from "../../../components/meta/articles";
import { PAGE_SIZE, range } from '../../../components/PaginationBar';
import ArticleList from '../../../components/ArticleList';
import loadNotePosts from '../../../utils/loadNotePosts';
import type { NotePost } from '../../../utils/notePosts';
import useLocale from '../../../utils/useLocale';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const page = params?.page;
  if (typeof page !== 'string' || !/^[1-9]\d*$/.test(page) || !Number.isSafeInteger(Number(page))) {
    return { notFound: true };
  }
  const headerData: HeaderData = createHeaderData();
  const initialNotePosts = await loadNotePosts(locale).catch(() => null);
  const localPosts = locale === 'en' ? headerData.tips_en : headerData.tips_ja;
  if (initialNotePosts && Number(page) > Math.max(1, Math.ceil((localPosts.length + initialNotePosts.length) / PAGE_SIZE))) {
    return { notFound: true, revalidate: 600 };
  }
  return {
    props: {
      headerData,
      current_page: Number(page),
      initialNotePosts: initialNotePosts ?? [],
      existTranslation: false,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const headerData = createHeaderData();
  const notePosts = await loadNotePosts('ja').catch(() => []);
  const count_ja = headerData.tips_ja.length + notePosts.length;
  const paths_ja: PostPath[] = range(1, Math.ceil(count_ja / PAGE_SIZE)).map((i) =>
  ({
    params: { page: i.toString() },
    locale: 'ja',
  }));
  const count_en = headerData.tips_en.length + notePosts.length;
  const paths_en: PostPath[] = range(1, Math.ceil(count_en / PAGE_SIZE)).map((i) =>
  ({
    params: { page: i.toString() },
    locale: 'en',
  }));
  const paths: PostPath[] = paths_ja.concat(paths_en);

  return {
    paths,
    fallback: 'blocking',
  }
};

const Page = ({ headerData, current_page, initialNotePosts }: {
  headerData: HeaderData;
  current_page: number;
  initialNotePosts: NotePost[];
}) => {
  const { locale, t } = useLocale();
  const totalPosts: Post[] = locale === 'en' ? headerData.tips_en : headerData.tips_ja;

  return (
    <>
      <ArticlesMeta
        title={t.TIPS_TITLE + ' (' + t.PAGE + ' ' + current_page.toString() + ')'}
        description={t.TIPS_DESCRIPTION}
        url={`/tips/page/${current_page}`}
        img=""
      />
      <ArticleList localPosts={totalPosts} initialNotePosts={initialNotePosts} currentPage={current_page} />
    </>
  );
};

export default Page;
