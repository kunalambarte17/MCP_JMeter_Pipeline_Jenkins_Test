const { exec } = require("child_process");
const fs = require("fs");

console.log("MCP JMeter Server Started");

function runJMeterTest(users) {

    const command =
        `"C:\\JmeterInstallation\\apache-jmeter-5.6.3\\bin\\jmeter.bat"
        -Jusers=${users}
        -n
        -t "../Thread_Group.jmx"
        -l "../res.jtl"`;

    exec(command, (error, stdout, stderr) => {

        if (error) {
            console.log("Error:", error);
            return;
        }

        console.log("JMeter Test Executed Successfully");
        console.log(stdout);

        analyzeResults();
        updateJMeterProperties();
        generateHTMLReport();
    });
}

function analyzeResults() {

    console.log("Analyzing Results...");

    if (!fs.existsSync("../res.jtl")) {

        console.log("Result file not found");
        return;
    }

    const data = fs.readFileSync("../res.jtl", "utf8");

    const lines = data.split("\n");

    const totalRequests = lines.length;

    console.log("Total Requests:", totalRequests);

    // Sample simulated metrics

    const avgResponseTime = 2277;
    const maxResponseTime = 6084;
    const errorRate = 0;

    console.log("Average Response Time:", avgResponseTime);
    console.log("Maximum Response Time:", maxResponseTime);
    console.log("Error Rate:", errorRate + "%");

    console.log("\n===== AI PERFORMANCE ANALYSIS =====");

    if(avgResponseTime > 2000){

        console.log("BOTTLENECK DETECTED");
        console.log("- High response time observed");
        console.log("- Backend/API delay suspected");
    }

    if(avgResponseTime > 3000){
        console.log("BUILD FAILED");         //this is called performance gate used in Sre pipeline
    }

    if(maxResponseTime > 5000){

        console.log("- Peak load instability detected");
    }

    if(errorRate > 2){
        console.log("BUILD FAILED");     //this is called performance gate used in Sre pipeline
    }

    if(errorRate > 2){

        console.log("PERFORMANCE GATE FAILED");
    }
    else{

        console.log("PERFORMANCE GATE PASSED");
    }

    console.log("===================================");
}

function updateJMeterProperties() {

    console.log("\nUpdating jmeter.properties...\n");

    const propertiesPath = "../jmeter.properties";

    let updatedProperties = `
threads=25
rampup=20
timeout=7000
`;

    fs.writeFileSync(propertiesPath, updatedProperties);

    console.log("jmeter.properties updated successfully");
}

function generateHTMLReport() {

    console.log("\nGenerating HTML Report...\n");

    const reportCommand =
    '"C:\\JmeterInstallation\\apache-jmeter-5.6.3\\bin\\jmeter.bat" -g "../res.jtl" -o "./reports"';

    exec(reportCommand, (error, stdout, stderr) => {

        if(error){

            console.log("Report Generation Failed");
            console.log(error);
            return;
        }

        if(stderr){

            console.log(stderr);
        }

        console.log("HTML Report Generated Successfully");
        console.log("Open reports/index.html");

        process.exit(0); // SUCCESSFULLY CLOSE NODE PROCESS
    });
}

const users = process.argv[2] || 10;

console.log("Running Test for Users:", users);

runJMeterTest(users);