import memberModel from "../Models/member.model.js"

const updateMember = (req, res) => {
  const memberId = req.params.id;
  const { name, select_option, date } = req.body;

  memberModel.updateMemberData(memberId, name, select_option, date, (err, results) => {
    if (err) {
      return res.status(500).send("Error updating data.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Member not found.");
    }
    res.status(200).send({ message: "Member updated successfully" });
  });
};

const deleteMember = (req, res) => {
  const memberId = req.params.id;

  memberModel.deleteMemberData(memberId, (err, results) => {
    if (err) {
      return res.status(500).send("Error deleting data.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Member not found.");
    }
    res.status(200).send({ message: "Member deleted successfully" });
  });
};

module.exports = { updateMember, deleteMember };
