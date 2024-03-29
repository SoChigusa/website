import useLocale from "../utils/useLocale";
import NextLink from "next/link";
import { Link as MUILink } from "@mui/material";
import { ReactNode } from "react";

const Link = ({ children, href, target, localeChange = false, color = 'primary', query = {} }: { children: ReactNode, href: string, target?: string, localeChange?: boolean, color?: string, query?: LinkQuery }) => {
  if (target == '_blank') {
    return (
      <MUILink href={href} color={color} underline="none" target='_blank' rel="noreferrer">
        {children}
      </MUILink>
    );
  } else {
    if (localeChange) {
      let newLocale = '';
      const { locale } = useLocale();
      if (locale === 'en')
        newLocale = 'ja';
      else
        newLocale = 'en';
      return (
        <NextLink href={{ pathname: href, query: query }} locale={newLocale} passHref>
          <MUILink color={color} underline="none">
            {children}
          </MUILink>
        </NextLink>
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
}

export default Link;