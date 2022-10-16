import fs from 'fs';
import matter from 'gray-matter';

const createSortedPosts = ({ dirName }) => {
  const allFiles = fs.readdirSync(dirName, { withFileTypes: true });
  const files = allFiles.filter(dirent => dirent.isFile()).map(({ name }) => name);
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`${dirName}/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  return posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );
};

const createHeaderData = () => {
  const posts_ja = createSortedPosts({ dirName: 'tips' });
  const posts_en = createSortedPosts({ dirName: 'tips/en' });
  return {
    tips_ja: posts_ja,
    tips_en: posts_en,
  };
};

export default createHeaderData;