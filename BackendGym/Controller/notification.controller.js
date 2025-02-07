import nodemailer from "nodemailer"
import memberModel from "../Models/member.model.js"
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const checkDueDatesAndNotify = () => {
  const today = new Date().toISOString().split("T")[0];

  memberModel.getAllMembers((err, members) => {
    if (err) {
      console.error("Error fetching members:", err);
      return;
    }

    const dueMembers = members.filter((member) => {
      let nextDueDate = new Date(member.date);
      if (member.select_option.toLowerCase() === "monthly") {
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
      } else if (member.select_option.toLowerCase() === "yearly") {
        nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
      }
      return nextDueDate.toISOString().split("T")[0] === today;
    });

    if (dueMembers.length === 0) return;

    const emailContent = dueMembers
      .map((member) => `Member: ${member.name}, Due Date: ${member.date}`)
      .join("\n");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: "Membership Renewal Reminders",
      text: `The following members have fees due today:\n\n${emailContent}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log(`Email sent:`, info.response);
      }
    });
  });
};

module.exports = { checkDueDatesAndNotify };
