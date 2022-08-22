import { Card } from 'react-bootstrap';

export default function Activity({ type, subtitle, author, subject, date }) {
  return (
    <Card style={{ width: '28em', height: '100%' }}>
      <Card.Img variant="top" src="https://placehold.jp/32/003060/e0e0e0/286x180.png?text=No Image" />
      <Card.Body>
        <Card.Title>{type}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>
          {type == 'Paper' ? (
            <>
              {author}
              <br />
              {subject}
            </>
          ) : (
            <>
              {subject}
            </>
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{date}</small>
      </Card.Footer>
    </Card>
  );
}
