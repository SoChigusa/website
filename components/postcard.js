import Link from "next/link";
import { Card, Col } from "react-bootstrap";

const PostCard = ({ post }) => {
  return (
    <Col md="auto" key={post.slug} style={{ padding: '5px' }}>
      <Card style={{ width: '24em', height: '100%' }}>
        <Link href={`/tips/${post.slug}`}>
          <a>
            <Card.Img
              top='true'
              height='240px'
              src={`/images/${post.frontMatter.image}.svg`}
              alt={post.frontMatter.title}
              style={{ padding: '5px', objectFit: 'contain' }}
            />
          </a>
        </Link>
        <Card.Body>
          <Link href={`/tips/${post.slug}`}>
            <a>
              <Card.Title>{post.frontMatter.title}</Card.Title>
            </a>
          </Link>
          <Card.Subtitle>{post.frontMatter.date}</Card.Subtitle>
          <Card.Text>{post.frontMatter.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PostCard;