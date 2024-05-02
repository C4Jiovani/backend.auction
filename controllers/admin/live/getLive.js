import { db } from "../../../config/bd.js";
// import dotenv from'dotenv'
// dotenv.config()
export const liveShow = (req, res) => {
    const q = req.query.idLive
        ? "SELECT * FROM live WHERE idLive=?"
        : "SELECT * FROM live";
    db.query(q, [req.query.idLive], (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    })
}