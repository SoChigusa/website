import fs from 'fs';
import matter from 'gray-matter';

const createSortedPosts = ({ dirName }: { dirName: string }): Post[] => {
  const allFiles: fs.Dirent[] = fs.readdirSync(dirName, { withFileTypes: true });
  const files: string[] = allFiles.filter(dirent => dirent.isFile()).map(({ name }) => name);
  const posts: Post[] = files.map((fileName) => {
    const slug: string = fileName.replace(/\.md$/, '');
    const fileContent: string = fs.readFileSync(`${dirName}/${fileName}`, 'utf-8');
    const frontMatter: FrontMatter = matter(fileContent).data;
    return {
      frontMatter: frontMatter,
      slug,
    };
  });

  return posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );
};

const createHeaderData = (): HeaderData => {
  const posts_ja: Post[] = createSortedPosts({ dirName: 'tips' });
  const posts_en: Post[] = createSortedPosts({ dirName: 'tips/en' });
  return {
    tips_ja: posts_ja,
    tips_en: posts_en,
  };
};

export default createHeaderData;