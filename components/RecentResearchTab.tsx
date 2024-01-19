import useLocale from "../utils/useLocale";
import React from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import Image from "next/image";
import { deformAuthorNames, latexReplacement } from "../utils/deformPublicationData";
import Link from "./Link";
import TalkList from "./TalkList";

const PublicationCardSmall = (publication: Publication) => {
  const authorOrig: string = publication.entryTags.AUTHOR;
  const titleOrig: string = publication.entryTags.TITLE.slice(1, -1);
  const eprint: string = publication.entryTags.EPRINT;
  const date: string = publication.entryTags.date;
  const noimage = 'https://placehold.jp/32/003060/e0e0e0/286x180.png?text=No Image'

  // from [Family], [First] to [First] [Family]
  const author: string = deformAuthorNames(authorOrig);

  // replace specific latex commands in my paper titles
  const title: string = latexReplacement(titleOrig);

  // query for Link
  const query: LinkQuery = {
    expanded: eprint
  };

  return (
    <Box key={eprint} sx={{ display: 'flex' }}>
      <Box sx={{ display: { xs: 'none', sm: 'block', md: 'none', lg: 'block' }, width: 196, height: 144, padding: 2 }}>
        <Link href='research/publications' query={query}>
          <Image
            width={196}
            height={144}
            layout='fixed'
            src={publication.entryTags.imageExist ? `/publicationImages/${eprint}.svg` : noimage}
            alt={eprint}
          />
        </Link>
      </Box>
      <Box sx={{ width: 'auto', height: 'auto', padding: 2 }}>
        <Link href='research/publications' query={query}>
          <Typography variant="subtitle1" component="div" gutterBottom>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" component="div">
          {author}
        </Typography>
        <Stack spacing={1} direction='row' sx={{ mt: 1 }}>
          <AccessTime sx={{ fontSize: 15, mt: '3px', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" component="div">
            {date}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

const RecentResearchTab = ({ publications, talks }: { publications: Publication[], talks: Talk[] }) => {
  const { t } = useLocale();
  const [tab, setTab] = React.useState(0);
  const handleChange: TabOnChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <>
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Tab of recent research activities"
        centered
      >
        <Tab label={t.PUBLICATIONS} />
        <Tab label={t.TALKS} />
      </Tabs>
      {
        tab == 0 &&
        publications.map(publication => {
          return (PublicationCardSmall(publication))
        })
      }
      {
        tab == 1 && (
          <TalkList talks={talks} />
        )
      }
    </>
  )
}

export default RecentResearchTab;