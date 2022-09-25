import { Alert } from "@mui/material";
import Link from "./Link";

const TemporalAlert = () => {
  return (
    <Alert severity='error' sx={{ marginBottom: 2 }}>
      This page is still under construction.<br />
      Please visit <Link href="https://sochigusa.bitbucket.io/" target="_blank">my current website</Link> for more information.
    </Alert>
  )
};

export default TemporalAlert;