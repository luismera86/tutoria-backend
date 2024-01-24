import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "testcoderbackend@gmail.com",
    pass: "aqkwtsgljqfdxcno",
  },
});

const sendOwnerMail = async (owner) => {
  let result = await transporter.sendMail({
    from: "Tienda Node",
    to: owner,
    subject: "Producto Eliminado",
    // Mandamos los datos del ticket en el cuerpo del mail
    html: `
      <h1>Se eliminó un producto</h1>
      
    `,
  });
};

export { sendOwnerMail };