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
  citationKey: string
}

interface Talk {
  Type: string
  Date: string
  Title: string
  Conference: string
  Place: string
  Invited: string
  Symposium: string
}

interface TalkList {
  all: Talk[]
  seminars: Talk[]
  talks: Talk[]
  awards: Talk[]
}

interface MapID2URL {
  id: string
  url: string
}

interface Statement {
  title: string
  contents: string[]
}

interface LatexRS {
  summary: string
  statements: Statement[]
}

// Copies of Default Types

type AccordionOnChange = ((event: SyntheticEvent<Element, Event>, expanded: boolean) => void) | undefined;
type LinkQuery = string | ParsedUrlQueryInput | null | undefined;