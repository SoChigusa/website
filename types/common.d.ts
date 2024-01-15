interface FrontMatter {
  title: string
  date: string
  description: string
  image: string
}

interface Post {
  frontMatter: FrontMatter
  slug: string
}

interface HeaderData {
  tips_ja: Post[]
  tips_en: Post[]
}

interface EntryTags {
  EPRINT: string | undefined
  date: string
  abstract: string
  isExist: boolean
  imageExist: boolean
}

interface Publication {
  entryTags: EntryTags
}