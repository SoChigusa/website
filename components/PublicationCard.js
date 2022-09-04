import { Card, Col } from "react-bootstrap";

const deformAuthorNames = (authors) => {
  const authorList = authors.split(' and ');
  const authorListNew = authorList.map((author) => {
    const names = author.split(', ');
    return `${names[1]} ${names[0]}`;
  })
  return authorListNew.join(', ');
};

const latexReplacement = (titleOrig) => {
  let title = titleOrig;
  title = title.replace(' \\ensuremath{-} ', '-');
  title = title.replace('$pp$', 'pp');
  title = title.replace('\\textendash{}', '-');
  return title;
}

const PublicationCard = ({ publication }) => {
  const authorOrig = publication.entryTags.AUTHOR;
  const titleOrig = publication.entryTags.TITLE.slice(1, -1);
  const eprint = publication.entryTags.EPRINT;
  const noimage = 'https://placehold.jp/32/003060/e0e0e0/286x180.png?text=No Image'

  // from [Family], [First] to [First] [Family]
  const author = deformAuthorNames(authorOrig);

  // replace specific latex commands in my paper titles
  const title = latexReplacement(titleOrig);

  return (
    <Col md="auto" key={publication.citationKey} style={{ padding: '5px' }}>
      <Card style={{ width: '36em', height: '100%' }}>
        <a href={`https://arxiv.org/abs/${eprint}`} target="_blank" rel="noreferrer">
          <Card.Img
            top='true'
            height='360px'
            src={publication.entryTags.imageExist ? `/publicationImages/${eprint}.svg` : noimage}
            alt={title}
            style={{ padding: '5px', objectFit: 'contain' }}
          />
        </a>
        <Card.Body>
          <a href={`https://arxiv.org/abs/${eprint}`} target="_blank" rel="noreferrer">
            <Card.Title>{title}</Card.Title>
          </a>
          <Card.Subtitle>{author}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PublicationCard;