import { db } from "../../../config/bd.js";
import bcrypt from "bcryptjs";

export const updatePassword = (req, res) => {
  const q =
    "UPDATE user SET `password`=? WHERE `email`=?";
    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

  const values = [hash,req.body.email];

  db.query(q, [...values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("password has been Updated! ");
  });
};
