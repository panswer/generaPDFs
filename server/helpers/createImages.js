const path = require('path');
const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');

const CreateImageWithHTML = (htmlFolder, content) => {
    return new Promise(async(resolve, reject) => {
        try {
            let pathFolderSeed = path.resolve(__dirname, '../../storage');
            if (fs.existsSync(pathFolderSeed)) {
                let pathFolderHTML = `${pathFolderSeed}/html`;

                if (!fs.existsSync(pathFolderHTML)) {
                    return reject({
                        code: 512,
                        message: `Error in path: ${pathFolderHTML}`
                    });
                }
                let folderSeed = `${pathFolderHTML}/${htmlFolder}`;

                if (!fs.existsSync(folderSeed)) {
                    return reject({
                        code: 512,
                        message: `Error in path: ${folderSeed}`
                    });
                }

                let HTMLs = fs.readdirSync(folderSeed).filter(item => {
                    let parse = path.parse(item);

                    return parse.ext;
                });

                let newFolder = `${pathFolderSeed}/images/${htmlFolder}${new Date().getTime()}`;

                fs.mkdirSync(newFolder);

                for (let i = 0; i < HTMLs.length; i++) {
                    let html = fs.readFileSync(`${folderSeed}/${HTMLs[i]}`).toString();
                    let format = path.parse(HTMLs[i]);

                    await nodeHtmlToImage({
                        output: `${newFolder}/${format.name}.png`,
                        html,
                        content
                    });
                }

                return resolve({
                    message: 'Success',
                    folder: newFolder
                });
            } else {
                return reject({
                    code: 512,
                    message: `Error in path: ${pathFolderSeed}`
                });
            }
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    CreateImageWithHTML
}