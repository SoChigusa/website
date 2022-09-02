import fs from 'fs';
import matter from 'gray-matter';

const createHeaderData = () => {
  const files = fs.readdirSync('tips');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`tips/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );
  return {
    tips: sortedPosts,
  };
}

export default createHeaderData;