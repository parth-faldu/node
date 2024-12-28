import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fileCreate = () => {
    rl.question("Enter The File Name :", (filename) => {
        rl.question("Enter The File Content :", (filecontent) => {
            fs.writeFile(`${filename}.txt`, filecontent, (err) => {
                if(err){
                    console.error(err.message);
                }
                else{
                    console.log("file created successfully :)");
                }
                rl.close();
            });
        });
    });
}

fileCreate();