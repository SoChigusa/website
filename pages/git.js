import { Container } from "react-bootstrap";
import ArticlesMeta from "../components/meta/articles";

export default function Home() {
  return (
    <Container>
      <ArticlesMeta
        title="Github repositories of So Chigusa"
        description="Summary of projects shared on github by So Chigusa"
        url=""
        img=""
      />
      Summarize github repositories here
    </Container>
  )
}