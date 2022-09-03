import { Alert } from "react-bootstrap";

const TemporalAlert = () => {
  return (
    <Alert variant='danger'>
      This website is still under construction.<br />
      Please visit <a href="https://sochigusa.bitbucket.io/" target="_blank" rel="noreferrer">my current website</a> for more information.
    </Alert>
  )
};

export default TemporalAlert;