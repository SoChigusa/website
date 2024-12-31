interface MyPageProps {
  headerData: HeaderData
  publications: Publication[]
  talk_list: TalkList
  latex_RS: LatexRS
  latex_RS_history: LatexRS[]
}

interface HeaderData {
  tips_ja: Post[]
  tips_en: Post[]
}

interface EntryTags {
  EPRINT: string
  AUTHOR: string
  TITLE: string
  date: string
  abstract: string
  isExist: boolean
  imageExist: boolean
}

interface Publication {
  entryTags: EntryTags
  citationKey: string
  YouTube?: string
  posterName?: string
  slideName?: string
}

interface Materials {
  eprint: string
  YouTube?: string
  posterName?: string
  slideName?: string
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

interface TalkFilters {
  filter: string
  oral: boolean
  poster: boolean
  invitation: string
  international: boolean
  domestic: boolean
}

interface TalkFiltersOnChange {
  filter: RadioOnChange
  oral: CheckboxOnChange
  poster: CheckboxOnChange
  invitation: RadioOnChange
  international: CheckboxOnChange
  domestic: CheckboxOnChange
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
  year?: number
}

interface PersonalInfo {
  age: number
}

interface CVTableData {
  name: string
  content: string
}

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

interface PostPath {
  params: {
    slug?: string
    page?: string
  }
  locale: string
}

// Copies of Default Types

type AccordionOnChange = ((event: SyntheticEvent<Element, Event>, expanded: boolean) => void) | undefined;
type RadioOnChange = ((event: ChangeEvent<HTMLInputElement>, value: string) => void) | undefined;
type CheckboxOnChange = ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined;
type TabOnChange = ((event: React.SyntheticEvent<Element, Event>, value: any) => void) | undefined;
type LinkQuery = string | ParsedUrlQueryInput | null | undefined;
type MenuOnClose = ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
