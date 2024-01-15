interface Matter {
  data: FrontMatter
  content: string
}

declare module 'gray-matter' {
  export default function matter(content: string): Matter;
}