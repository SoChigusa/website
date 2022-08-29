import { Container } from "react-bootstrap";
import ArticlesMeta from "../components/meta/articles";

export default function Home() {
  return (
    <Container>
      <ArticlesMeta
        title="Research works by So Chigusa"
        description="Summary of research works of So Chigusa: papers, talks, and awards"
        url=""
        img=""
      />
      Summarize research works here
    </Container>
  )
}