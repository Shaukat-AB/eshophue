import fs from "fs";

const removeFile = (path) => {
    // Async remove file in the path
    if (path) {
        fs.unlink(path, (err) => {
            if (err) console.log(`${path} was not deleted`);
        });
    }
};

export default removeFile;
