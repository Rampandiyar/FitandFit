import db from "./db.js"

const updateMemberData = (memberId, name, select_option, date, callback) => {
  const query = "UPDATE members SET name = ?, select_option = ?, date = ? WHERE id = ?";
  db.execute(query, [name, select_option, date, memberId], callback);
};

const deleteMemberData = (memberId, callback) => {
  const query = "DELETE FROM members WHERE id = ?";
  db.execute(query, [memberId], callback);
};

const getAllMembers = (callback) => {
  const query = "SELECT * FROM members";
  db.execute(query, [], callback);
};

module.exports = { updateMemberData, deleteMemberData, getAllMembers };
