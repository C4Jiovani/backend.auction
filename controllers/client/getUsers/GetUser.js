import { db } from "../../../config/bd.js";

export const getUser = (req, res) => {
    const q = "SELECT * FROM user  WHERE IdUser=?";
    db.query(q, [req.params.IdUser], (err, produits) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(produits[0]);
    });
  };