// import { upload } from "../../../config/multer.js";

// export const updateUser = (req, res) => {
//   upload.single('image')(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: 'Failed to upload profile picture' })
//     }
//   })
//   const imagePath = req.body.path
//   const UserId = req.params.IdUser;

//   const q =
//     "UPDATE user SET `name`=?, `userName`=?, `profile`=? WHERE `IdUser`=?";

//   const values = [req.body.name, req.body.userName, imagePath];

//   db.query(q, [...values, UserId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.json("User has been Updated! ");
//   });
// };

import { db } from "../../../config/bd.js";


export const updateUser = (req, res) => {
  const UserId = req.params.IdUser;
  const q =
    "UPDATE user SET `name`=?, `userName`=?, `email`=?, `numTelephone`=? WHERE `IdUser`=?";
  const values = [req.body.name, req.body.userName, req.body.email, req.body.numTelephone];

  db.query(q, [...values, UserId], (err, data) => {
    if (err) return res.status(500).json("Error updating user");
    return res.status(200).json("User has been updated");
  });
};
///avec image pdp
// import { db } from "../../../config/bd.js";
// import { upload } from "../../../config/multer.js";

// export const updateUser = (req, res) => {
//   upload.single('image', (req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: 'Failed to upload profile picture' })
//     }
//     const UserId = req.params.IdUser;
//     const imagePath = req.body.path
//     const q =
//       "UPDATE user SET `name`=?, `userName`=?, `email`=?,`profile`=?, `numTelephone`=? WHERE `IdUser`=?";
//     const values = [req.body.name, req.body.userName, req.body.email,imagePath, req.body.numTelephone];

//     db.query(q, [...values, UserId], (err, data) => {
//       if (err) return res.status(500).json("Error updating user");
//       return res.status(200).json("User has been updated");
//     });
//   }))
// };
