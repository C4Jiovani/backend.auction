
import {db} from '../../../config/bd.js'
import dotenv from 'dotenv';
import { upload } from '../../../config/livemulter.js';

dotenv.config();

export const createLive = (req, res) => {
    upload.array('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Failed to upload', err: err });
        }
        const imagePaths = req.files.map(file => file.path);
        
        const insertNewLive = "INSERT INTO live (`nom`,`image`,`description`,`prixInit`,`prixFinal`,`dateEnchere`,`status`,`timer`) VALUES (?)";
        const values = [
            req.body.nom,
            imagePaths.join(','),
            req.body.description,
            req.body.prixInit,
            req.body.prixFinal,
            req.body.dateEnchere,
            req.body.status,
            req.body.timer
        ];
        console.log(values);
        db.query(insertNewLive, [values], async (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(201).json('Created Succesfully');
        });
    });
};
export const getLive = (req, res) => {
    const query = "SELECT * FROM live";
  
    db.query(query, (err, products) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(products);
    });
  };