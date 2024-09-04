const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
	try {
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.USER, // Your email id
				pass: process.env.PASS  // Your password
			}
		});

		const mailOptions = {
			from: process.env.USER,
			to: to,
			subject: subject,
			text: text,
		};

		let info = await transporter.sendMail(mailOptions);
		console.log("Email sent: " + info.response);
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error("Failed to send email");
	}
};

module.exports = sendEmail;
