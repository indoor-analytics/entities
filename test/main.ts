const normalizedPath = require("path").join(__dirname, "tests");

require("fs").readdirSync(normalizedPath).forEach(async function(file: string) {
    const file_path = "./tests/" + file;
    console.log(`Loading tests from ${file}`);
    require(file_path);
});
