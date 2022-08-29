import { Container } from "react-bootstrap";
import ArticlesMeta from "../components/meta/articles";

export default function Home() {
  return (
    <Container>
      <ArticlesMeta
        title="Notes and slides by So Chigusa"
        description="Summary of notes and slides written by So Chigusa"
        url=""
        img=""
      />
      Summarize notes and slides here
    </Container>
  )
}