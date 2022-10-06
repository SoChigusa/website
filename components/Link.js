import NextLink from "next/link";
import { Link as MUILink } from "@mui/material";

const Link = ({ children, href, target, color = 'primary', query = {} }) => {
  if (target == '_blank') {
    return (
      <MUILink href={href} color={color} underline="none" target='_blank' rel="noreferrer">
        {children}
      </MUILink>
    );
  } else {
    return (
      <NextLink href={{ pathname: href, query: query }} passHref>
        <MUILink color={color} underline="none">
          {children}
        </MUILink>
      </NextLink>
    );
  }
}

export default Link;