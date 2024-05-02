import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier où les fichiers téléchargés seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Utilisez un nom de fichier unique pour éviter les conflits
  }
});

export const upload = multer({ storage: storage });

