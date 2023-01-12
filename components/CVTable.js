import useLocale from "../utils/useLocale";
import styled from "@emotion/styled";
import Link from "./Link";
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from "@mui/material";
import { Email } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f6f6f6',
  },
}));

const TitleBlock = ({ title }) => {
  if (title != '') {
    return (
      <Typography gutterBottom variant="h5">
        {title}
      </Typography>
    );
  } else {
    return (
      <Typography gutterBottom variant="h5" sx={{ display: { xs: 'none', md: 'flex' } }}>　</Typography>
    );
  }
};

const MyTableCell = ({ name, content }) => {
  const { t } = useLocale();
  if (name == t.EMAIL) {
    return (
      <TableCell align="left">
        {content}
        <a href="mailto:SoChigusa@lbl.gov">
          <Tooltip title={t.EMAIL_ME} placement="bottom" arrow>
            <IconButton aria-label={t.EMAIL} size="small" color="primary">
              <Email fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </a>
      </TableCell>
    );
  } else if (name == t.WEBPAGE) {
    return (
      <TableCell align="left">
        <Link href={content}>{content}</Link>
      </TableCell>
    )
  } else {
    return (
      <TableCell align="left">{content}</TableCell>
    );
  }
}

const CVTable = ({ title = '', rows }) => {
  return (
    <Grid item xs={12} md={6}>
      <TitleBlock title={title} />
      <TableContainer component={Paper} >
        <Table size="small" aria-label="personal data">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                <MyTableCell name={row.name} content={row.content} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default CVTable;