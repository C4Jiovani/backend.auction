import { db } from "../../../config/bd.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { upload } from '../../../config/multer.js';

dotenv.config();

export const addPro = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Failed to upload image', error: err });
    }

    const imagePath = req.file.path;

    const insertQuery =
      "INSERT INTO product (`NomPro`, `PrixInitial`,`PrixFinale`,`img`, `desc`,`status`) VALUES (?)";
    const values = [
      req.body.NomPro,
      req.body.PrixInitial,
      req.body.PrixFinale,
      imagePath,
      req.body.desc,
      req.body.status,
    ];

    db.query(insertQuery, [values], async (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      const message = "Une enchère sera disponible dans quelques instants";

      const insertNotificationQuery = "INSERT INTO notification (`motif`) VALUES (?)";
      const notificationValues = [message];

      db.query(insertNotificationQuery, [notificationValues], async (err, notificationData) => {
        if (err) {
          return res.status(500).json(err);
        }

        const getCustomersEmailQuery = "SELECT email FROM user";
        db.query(getCustomersEmailQuery, (err, customers) => {
          if (err) return res.status(500).json(err);

          const recipients = customers.map((customer) => customer.email);

          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "rakotorisonlandry@gmail.com",
              pass: "mpea dxeb unhw iewy ",
            },
          });

          const mailOptions = {
            from: "rakotorisonlandry@gmail.com",
            to: recipients.join(","),
            subject: "Nouveau produit disponible",
            text: "Bonjour, un nouveau produit est disponible. Venez le découvrir sur notre site",
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending emails:", error);
              return res.status(500).json("Failed to send emails.");
            } else {
              console.log("Emails sent:", info.response);
              return res.status(200).json("Product has been created and emails have been sent!");
            }
          });
        });
      });
    });
  });
};

export const getlive = (req, res) => {
  const query = "SELECT * FROM live";

  db.query(query, (err, products) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(products);
  });
};
export const getProds = (req, res) => {
  const query = "SELECT * FROM `product` ORDER BY `product`.`IdPro` DESC";

  db.query(query, (err, products) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(products);
  });
};

export const getProd = (req, res) => {
  const q = "SELECT * FROM product WHERE IdPro=?";
  db.query(q, [req.params.IdPro], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const deletePro = (req, res) => {
  const postId = req.params.IdPro;
  const q = "DELETE FROM product WHERE `IdPro`=?";
  db.query(q, [postId], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post");
    return res.json("Product has been deleted!");
  });
};

export const updatePro = (req, res) => {
  const postId = req.params.IdPro;

  const q =
    "UPDATE product SET `NomPro`=?, `PrixInitial`=?, `PrixFinale`=?, `img`=?, `desc`=?, `date`=? WHERE `IdPro`=?";

  const values = [
    req.body.NomPro,
    req.body.PrixInitial,
    req.body.PrixFinale,
    req.body.img,
    req.body.desc,
    req.body.date,
    postId,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Product has been Updated! ");
  });
};
export const getNotif = (req,res) =>{
  const query = "SELECT * FROM notification";

  db.query(query, (err, notification) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(notification);
  });
}