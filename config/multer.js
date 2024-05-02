import multer from 'multer';
// Configurer multer pour définir le dossier de destination et le nom du fichier téléchargé
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Dossier où les fichiers téléchargés seront stockés
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utilisez le nom original du fichier
    }
});
export const upload = multer({ storage: storage });
