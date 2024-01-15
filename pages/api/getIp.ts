import requestIp from 'request-ip';

const getIP = (req: any, res: any) => {
  const ip = requestIp.getClientIp(req);
  res.status(200).json({ ip: ip });
};

export default getIP;