import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "testcoderbackend@gmail.com",
    pass: "aqkwtsgljqfdxcno",
  },
});

const sendTicketMail = async (ticket) => {
  let result = await transporter.sendMail({
    from: "Tienda Node",
    to: ticket.purchaser,
    subject: `Ticket de compra ${ticket.code}`,
    // Mandamos los datos del ticket en el cuerpo del mail
    html: `
      <h1>Ticket de compra</h1>
      <p>Gracias por tu compra</p>
      <p>Este es tu ticket de compra</p>
      <p>Código: ${ticket.code}</p>
      <p>Fecha: ${ticket.purchase_datetime}</p>
      <p>Total: ${ticket.amount}</p>
    `,
  });

  return result;
};

export { sendTicketMail };
