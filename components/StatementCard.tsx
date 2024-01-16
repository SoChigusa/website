import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MathJax } from "better-react-mathjax";

const StatementCard = ({ statement, expanded, handle }: { statement: any, expanded?: boolean, handle?: any }) => {
  return (
    <Accordion expanded={expanded} onChange={handle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={statement.title}
        id={statement.title}
      >
        <Typography variant="button" color="primary">
          {statement.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MathJax>
          {statement.contents.map((paragraph: string, index: number) => (
            <Typography
              key={statement.title + index.toString()}
              gutterBottom
              variant="body1"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </MathJax>
      </AccordionDetails>
    </Accordion >
  );
};

export default StatementCard;