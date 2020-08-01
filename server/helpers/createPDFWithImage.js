const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const CreatePDFWithImages = (folderImages, scale = 1, fit) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!fs.existsSync(folderImages)) {
                return reject({
                    code: 512,
                    message: `Error in path: ${folderImages}`
                });
            }
            let folderSeed = path.resolve(__dirname, '../../storage/PDF');

            if (!fs.existsSync(folderSeed)) {
                return reject({
                    code: 512,
                    message: `Error in Path: ${folderSeed}`
                });
            }

            let imagesNames = fs.readdirSync(folderImages);
            console.log(imagesNames);
            let newFolder = path.join(folderSeed, `${folderImages.split('/')[folderImages.split('/').length-1]}`);

            fs.mkdirSync(newFolder);

            let doc = new PDFDocument();

            doc.pipe(fs.createWriteStream(`${newFolder}/file.pdf`));

            let options = {
                align: 'center',
            }
            scale ? options.scale = scale : {};

            fit ? options.fit : {};

            for (let i = 0; i < imagesNames.length; i++) {
                doc.image(`${folderImages}/${imagesNames[i]}`, options);
                if (i < imagesNames.length - 1) {
                    doc.addPage();
                }
            }

            doc.end();

            return resolve({
                message: 'Success',
                folder: `${newFolder}/file.pdf`
            });
        } catch (err) {
            return reject(err);
        }
    });
}


module.exports = {
    CreatePDFWithImages
}