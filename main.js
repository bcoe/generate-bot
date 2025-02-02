const { prompt } = require('enquirer');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path')

async function programName() {
     return  await prompt([
	{
       type: 'input',
       name: 'programName', 
       message: 'What is the name of the program?'
	},
        {
      type: 'input', 
      name: 'description', 
      message: 'What is the description of the program?'
       } 
    ]); 
}

/*

async function handlebarCompiler() {
   const data = await programName();
   //console.log(await programName());
   
   fs.mkdirSync(`../${data.programName}`);
   console.log(`${data.programName}`+" generated")
   //console.log('a');
   fs.readdir("./templates/", function(err, items) {
   	if (err) throw err;
	//console.log('b');
	//console.log(items.length);
   	for (var i=0; i<items.length; i++) {
		//console.log(items.length);
		let currentFile = items[i];
		fs.readFile(path.join(path.dirname(),currentFile), function(err, contents) {
			if (err) throw err
			//console.log('c');
			//console.log(currentFile);
			let source = contents.toString();
			//console.log(source);
			let template = Handlebars.compile(source);
			let result = template(data);
			//console.log(result);
			fs.writeFile(`../${data.programName}/${currentFile}`, result, function(err, contents) {
				if (err) throw err
				console.log(currentFile+" generated")
			});
		 });
	}  
    });
}

*/
//handlebarCompiler();




async function recursiveCompiler() {
	const data = await programName();
	fs.mkdirSync(`../$data.programName}`);
	console.log(`data.programName}`+ "generated");

	let currentDirectory = `../$data.programName}/`

	let readAllFiles = function(dir, filelist) {
		let files = fs.readdirSync("./templates/");
		let filelist = filelist || [];
		files.forEach(function(file) {
			if (fs.statSync(dir+file).isDirectory()) {
				filelist = readAllFiles(path.join(dir+file), filelist);
				currentDirectory = path.join(currentDirectory, dir+file);
				fs.mkdirSync(currentDirectory);
			}
		else {
			filelist.push(file);
			fs.writeFile(path.join(currentDirectory, file));
		}
		})
	};
};

recursiveCompiler();
