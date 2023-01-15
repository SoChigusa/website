import Link from "./Link";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import useLocale from "../utils/useLocale";
import { Children } from "react";

const RepositoryCard = ({ children, name, href, imgType }) => {
  const { t } = useLocale();

  let body = (<></>);
  let footer = (<></>);
  if (Children.count(children) > 1) { // with footer
    body = (
      <Typography variant="body1" color="text.primary" component="div">
        {children[0]}
      </Typography>
    );
    footer = (
      <Typography variant="body2" color="text.secondary" component="div">
        {children[1]}
      </Typography>
    );
  } else { // without footer
    body = (
      <Typography variant="body1" color="text.primary" component="div">
        {children}
      </Typography>
    );
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Link href={href} target="_blank">
        <CardMedia
          component='img'
          sx={{ width: { xs: '100%', md: 320 }, height: 212 }}
          image={`/repositoryImages/${name}.${imgType}`}
          title={name}
        />
      </Link>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant="h5">
            <Link href={href} target="_blank">{name}</Link>
          </Typography>
          {body}
        </Box>
        {footer}
      </CardContent>
    </Card>
  )
};

export default RepositoryCard;