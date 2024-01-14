import requestIp from 'request-ip';

const getIP = (req, res) => {
  const ip = requestIp.getClientIp(req);
  res.status(200).json({ ip: ip });
};

export default getIP;