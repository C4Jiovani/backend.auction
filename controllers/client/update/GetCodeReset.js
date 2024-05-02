import { db } from '../../../config/bd.js';

export const getCode = (req, res) => {
    const getQuery = "SELECT resetCode FROM user WHERE `email` = ?";
    const value = req.body.email;

    db.query(getQuery, [value], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            if (results.length === 0) {
                return res.status(404).json({ error: 'Email not found' });
            } else {
                const code = results[0].resetCode;
                return res.status(200).json({ code: code });
            }
        }
    });
};
