import { db } from "../index.js";
import { calculateNextPaymentDate } from "../Utils/paymentUtils.js";


// Get all members
export const getMembers = (req, res) => {
    const query = "SELECT * FROM member";
    db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

// Get a single member by ID
export const getMemberById = (req, res) => {
    const memberId = req.params.id;
    const query = "SELECT * FROM member WHERE member_id = ?";
    db.query(query, [memberId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Member not found" });
        return res.status(200).json(data[0]);
    });
};

// Add a new member
export const addMember = (req, res) => {
    const { name, age, dob, phone_no, email, joining_date, role, scheme_id } = req.body;
    const query = "INSERT INTO member (name, age, dob, phone_no, email, joining_date, role, scheme_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [name, age, dob, phone_no, email, joining_date, role, scheme_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Member added successfully", member_id: data.insertId });
    });
};

// Update a member
export const updateMember = (req, res) => {
    const memberId = req.params.id;
    const { name, age, dob, phone_no, email, joining_date, role, scheme_id } = req.body;
    const query = "UPDATE member SET name = ?, age = ?, dob = ?, phone_no = ?, email = ?, joining_date = ?, role = ?, scheme_id = ? WHERE member_id = ?";
    db.query(query, [name, age, dob, phone_no, email, joining_date, role, scheme_id, memberId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "Member not found" });
        return res.status(200).json({ message: "Member updated successfully" });
    });
};

// Delete a member
export const deleteMember = (req, res) => {
    const memberId = req.params.id;
    const query = "DELETE FROM member WHERE member_id = ?";
    db.query(query, [memberId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "Member not found" });
        return res.status(200).json({ message: "Member deleted successfully" });
    });
};


export const getMembersWithDuePayments = () => {
  const sql = `
    SELECT m.member_id, m.name, m.email, m.joining_date, s.duration 
    FROM member m
    JOIN scheme s ON m.scheme_id = s.scheme_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching members:", err);
      return;
    }

    const today = new Date();
    const membersWithDuePayments = results.filter((member) => {
      const nextPaymentDate = calculateNextPaymentDate(member.joining_date, member.duration);
      const daysUntilPayment = Math.ceil((nextPaymentDate - today) / (1000 * 60 * 60 * 24)); // Days until payment
      return daysUntilPayment <= 7; // Send reminder if payment is due in 7 days or less
    });

    // Send email reminders to these members
    membersWithDuePayments.forEach((member) => {
      const subject = "Gym Membership Payment Reminder";
      const text = `Dear ${member.name},\n\nYour gym membership payment is due soon. Please make the payment to avoid any inconvenience.\n\nThank you!`;
      sendPaymentReminder(member.email, subject, text);
    });
  });
};