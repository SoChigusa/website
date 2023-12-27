import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MathJax } from "better-react-mathjax";

const StatementCard = ({ statement, expanded, handle }) => {
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
        <Typography gutterBottom variant="body1">
          <MathJax>
            {statement.content.map((paragraph, index) => (
              <Box key={statement.title + index.toString()}>
                {<div dangerouslySetInnerHTML={{ __html: paragraph }} />}
              </Box>
            ))}
          </MathJax>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default StatementCard;