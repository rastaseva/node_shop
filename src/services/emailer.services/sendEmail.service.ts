import transport from './transport';

const sendEmailService = async (
  to: string | string[],
  subject: string,
  text: string,
  html: string
) => {
  const mailOptions = {
    to,
    subject,
    text,
    html,
  };

  const response = await transport.sendMail(mailOptions);

  return {
    accepted: response.accepted.map((u) => String(u)),
    rejected: response.rejected.map((u) => String(u)),
  };
};

export default sendEmailService;
