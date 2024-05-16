
import multer from 'multer'
import { Request, Response, NextFunction } from "express"
export function uploadFileToBuffer(req: Request, res: Response, next: NextFunction) {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage }).single('image');

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            
            return res.status(400).send('Error uploading file: ' + err.message);
        } else if (err) {
         
            return res.status(500).send('Error uploading file: ' + err.message);
        }
        
        next();
    });
}