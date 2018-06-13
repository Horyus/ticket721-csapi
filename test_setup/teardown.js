const Fs = require("fs");

const teardown = async () => {
    console.log("\n+--------------------------------------+");
    console.log("| Starting Test Teardown               |");
    console.log("+--------------------------------------+\n");
    global.Server.close();
    console.log("# Closing Ganache server");
    console.log("\n+--------------------------------------+");
    console.log("| Test Teardown Successful             |");
    console.log("+--------------------------------------+\n");
};

module.exports = teardown;
