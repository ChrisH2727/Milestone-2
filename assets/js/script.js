//
//Title:                                  Rapid Project Scheduler
//                                       -----------------------
// JavaScript Code
//
// The cells within HTML task entry table are navigated by row and column. The following constants define the column labels used throughout this script
// This is provided to aid code readability.
//
// | TASKNOCOL | TASKDESCOL | STARTDAYCOL | BCDURCOL | MLDURCOL| WCDURCOL | BCDATECOL | MLDATECOL | WCDATECOL |  
// |-----------|------------|-------------|----------|---------|----------|-----------|-----------|-----------|
// |           |            |             |          |         |          |           |           |           |
//
const TASKNUMCOL = 0;
const TASKDESCOL = 1;
const STARTDAYCOL = 2;                                                                                 
const BCDURCOL = 3;
const MLDURCOL = 4;
const WCDURCOL = 5;
const BCDATECOL = 6;
const MLDATECOL = 7;
const WCDATECOL = 8;
const TABLEREF = document.getElementById("taskEntryTable");
//
// If using any of the functions below in isolation, you must include the above constants
//

$(document).ready(function () {
  //Function called when the document has loaded

  initNonWorkingDays();                                            //initialise non working days buttons
  initSimulationRuns();                                            //initialise simulation runs buttons
  setNonWorkingDays();                                             // called when non working day button clicked 
  setSimulationRuns();                                             //called when simulation runs button clicked
  disStart();                                                      // disable simuation start button
  enReset();                                                       // enable reset button
  enhelp();                                                        // Enables Help button
  google.charts.load('current', { 'packages': ['corechart'] });   //Load Google charting package
  google.charts.load("current", { "packages": ["timeline"] });    //Load Google charting package
});


function initNonWorkingDays() {
  //Initialises the Non Project Day buttons. Mon - Fri set to inactive. Sat & Sun set to active, non working days

  $("#monDay,#tuesDay,#wednesDay,#thursDay,#friDay,#saturDay,#sunDay").css("background-color", "rgb(0, 128, 0)").data('clicked', false); //initialise buttons to green
  $("#saturDay,#sunDay").css("background-color", "rgb(220, 20, 60)").data('clicked', true); //initialise buttons to red
}

function disNonWorkingDays() {
  //Disables and greys out the Non Working Day buttons

  $("#monDay,#tuesDay,#wednesDay,#thursDay,#friDay,#saturDay,#sunDay").toggleClass("greyed").attr("disabled", true);                             //grey buttons and disable
}

function enNonWorkingDays() {
  //Enables the Non project day buttons

  $("#monDay,#tuesDay,#wednesDay,#thursDay,#friDay,#saturDay,#sunDay").removeAttr("disabled").toggleClass("greyed");                            //Re-enable non project day buttons
}

function initSimulationRuns() {
  //Initialises the Simulation Runs buttons and defaults to 1000 runs

  $("#twoT,#threeT,#fourT,#fiveT").css("background-color", "rgb(0, 128, 0)").data('clicked', false); //button green
  $("#oneT").css("background-color", "rgb(220, 20, 60)").data('clicked', true); //button red 
}

function disSimulationRuns() {
  //Disables and greys out the Simulation Runs buttons

  $("#oneT,#twoT,#threeT,#fourT,#fiveT").toggleClass("greyed").attr("disabled", true); //grey buttons and disable
}

function enSimulationRuns() {
  //Enables the Simulation Runs buttons

  $("#oneT,#twoT,#threeT,#fourT,#fiveT").removeAttr("disabled").toggleClass("greyed");                       //re-enable buttons
}

function disStart() {
  //Disables the Start button

  $("#simulationStart").css("background-color", "rgb(211, 211, 211)").attr("disabled", true);
}

function enStart() {
  //Enables the Start button

  $("#simulationStart").css("background-color", "rgb(0, 128, 0)").removeAttr("disabled");
}

function enReset() {
  //Initialises the Reset button

  $("#restartPage").css("background-color", "rgb(0, 128, 0)");
}

function enhelp() {
  //Initialises the Help button

  $("#getHelp").css("background-color", "rgb(0, 128, 0)");
}

function setNonWorkingDays(elem) {
  // Initialises the Non Project Days buttons both with background colour and clicked state

  if ($(elem).css("background-color") == "rgb(220, 20, 60)") {                      //if button colour red
    $(elem).css("background-color", "rgb(0, 128, 0)").data('clicked', false);       //toggle to green and set to non clicked state
  } else {
    $(elem).css("background-color", "rgb(220, 20, 60)").data('clicked', true);      //otherwise toggle to red and set to clicked state
  }
  taskUpdate();                                                                     //update the task table with new non working days
}

function setSimulationRuns(elem) {
  //This function ensures that only one of the Simulations Runs buttons is active Red turing all others to inactive green

  if (elem == "#oneT") {                                                                                  //if button 1000 green
    $("#twoT, #threeT, #fourT, #fiveT").css("background-color", "rgb(0, 128, 0)").data("clicked", false); //turn green
    $("#oneT").css("background-color", "rgb(220, 20, 60)").data("clicked", true); //turn red

  } else if (elem == "#twoT") {                                                                           //if button 2000 green
    $("#oneT, #threeT, #fourT, #fiveT").css("background-color", "rgb(0, 128, 0)").data("clicked", false); //turn green
    $("#twoT").css("background-color", "rgb(220, 20, 60)").data("clicked", true); //turn red

  } else if (elem == "#threeT") {                                                                         //if button 3000 green
    $("#oneT, #twoT, #fourT, #fiveT").css("background-color", "rgb(0, 128, 0)").data("clicked", false);   //turn 1000, 2000, 4000, 5000 green
    $("#threeT").css("background-color", "rgb(220, 20, 60)").data("clicked", true);                       //turn 3000 red

  } else if (elem == "#fourT") {                                                                          //if button 4000 green
    $("#oneT, #twoT, #threeT, #fiveT").css("background-color", "rgb(0, 128, 0)").data("clicked", false);  //turn green
    $("#fourT").css("background-color", "rgb(220, 20, 60)").data("clicked", true); //turn red

  } else if (elem == "#fiveT") { //if button 5000 green
    $("#oneT, #twoT, #threeT, #fourT").css("background-color", "rgb(0, 128, 0)").data("clicked", false); //turn green
    $("#fiveT").css("background-color", "rgb(220, 20, 60)").data("clicked", true); //turn red
  }
}

function taskUpdate() {
  //Event handler called whenever there is a change to the task table

  const startDay = 1;                                                                          

  for (var currentRow = startDay; currentRow < TABLEREF.rows.length; currentRow++) {          //start at currentRow = 1 because the first two rows of the HTML task table have no task data

    if (currentRow > startDay) {                                                              //only do if more than one task has been entered
      loadNextStartDate(currentRow);                                                          // update the row start date from previous worst case date
    }

    let bcDuration = parseInt(TABLEREF.rows[currentRow].cells[BCDURCOL].children[0].value);
    if (bcDuration >= 1) {                                                                    //Test best case duration value entered in task table
      let bcDate = calcWorkingDays(getStartDate(currentRow), bcDuration).toLocaleDateString("en-GB");
      if (bcDate != "Invalid Date") {
        TABLEREF.rows[currentRow].cells[BCDATECOL].innerText = bcDate;                        //Enter best case date into table
      } else {
        TABLEREF.rows[currentRow].cells[BCDATECOL].innerText = "No start date";               //Display error message
      }
    } else {
      TABLEREF.rows[currentRow].cells[BCDATECOL].innerText = "";                              //No duration value entered yet so make best case date ""
    }

    let mlDuration = parseInt(TABLEREF.rows[currentRow].cells[MLDURCOL].children[0].value);
    if (mlDuration >= 1) {                                                                    //Test most likely case duration value entered in task table
      let mlDate = calcWorkingDays(getStartDate(currentRow), mlDuration).toLocaleDateString("en-GB");
      if (mlDate != "Invalid Date") {
        TABLEREF.rows[currentRow].cells[MLDATECOL].innerText = mlDate;
      } else {
        TABLEREF.rows[currentRow].cells[MLDATECOL].innerText = "No start date";                //Test failed clear most likely case date
      }
    } else {
      TABLEREF.rows[currentRow].cells[MLDATECOL].innerText = "";                               //No duration value entered yet so make best case date ""
    }

    let wcDuration = parseInt(TABLEREF.rows[currentRow].cells[WCDURCOL].children[0].value);
    if (wcDuration >= 1) {                                                                     //Test worst case duration value entered in task table 
      let wcDate = calcWorkingDays(getStartDate(currentRow), wcDuration).toLocaleDateString("en-GB");
      if (wcDate != "Invalid Date") {                                                          //Test worst case duration value entered in task table
        TABLEREF.rows[currentRow].cells[WCDATECOL].innerText = wcDate;
      } else {
        TABLEREF.rows[currentRow].cells[WCDATECOL].innerText = "No start date";                 //Test failed clear worst case date
      }
    } else {
      TABLEREF.rows[currentRow].cells[WCDATECOL].innerText = "";                                 //No duration value entered yet so make worst case date ""
    }
  }

  if (TABLEREF.rows[TABLEREF.rows.length - 1].cells[WCDATECOL].innerText.length > 0) {             //check if a worst case date has been calculated 
    if (errorCheckRow(TABLEREF.rows.length - 1)) {                                                //check that there are no errors in the task data entered 
      addTableRow();                                                                             // Add a new task table row
      loadNextStartDate(TABLEREF.rows.length - 1);                                               // Load a start date into the new task table row from worst case date of previous task row
    }
  }
  if (TABLEREF.rows.length > 2) {
    enStart();                                                                                 //Enable the simualtion start button if more than 1 table row entered (table length = 2)
  }
}

function loadNextStartDate(currentRow) {
  //Determines the next working day omitting the non working days selected by the user

  let lastwc = new Date(revDateStr(TABLEREF.rows[currentRow - 1].cells[8].innerText));          //Get the worst case date from the task table reverse the sting and convert to date object
  TABLEREF.rows[currentRow].cells[2].innerText = calcWorkingDays(lastwc, 1).toLocaleDateString("en-GB");  // Add one working day to the worst case date and convert back to a string
}                                                                                                         // defect fix "en-GB" option required for IE browser                          

function errorCheckRow(curRow) {
  // Error checks the current row of task entry data

  let bcDur = Number(TABLEREF.rows[curRow].cells[BCDURCOL].children[0].value);
  let mlDur = Number(TABLEREF.rows[curRow].cells[MLDURCOL].children[0].value);
  let wcDur = Number(TABLEREF.rows[curRow].cells[WCDURCOL].children[0].value);
  let taskDes = TABLEREF.rows[curRow].cells[TASKDESCOL].children[0].value;

  if (taskDes.length === 0) {                                                                      //check for empty task description input
    errorHandler(4);
    return false;
  } else if (taskDes[0].match(/^[0-9a-zA-Z]+$/) === null) {                                       //check task description for 1st alphanumerical char credit code https://www.w3resource.com/javascript/form/letters-numbers-field.php
    errorHandler(7);
    return false;
  } else if ((Math.sign(bcDur) === -1) || (Math.sign(mlDur) === -1) || (Math.sign(wcDur) === -1)) {
    errorHandler(9);
    return false;
  } else if ((bcDur < 1) || (mlDur < 1) || (wcDur < 1)) {                               //check duration days greater or equal to 1
    errorHandler(5);
    return false;
  } else if ((Number.isInteger((bcDur)) == false) || (Number.isInteger((mlDur)) == false) || (Number.isInteger((wcDur)) == false)) {               // check if duration days are integer values
    errorHandler(8);
    return false;
  } else if ((bcDur >= mlDur) || (mlDur >= wcDur) || (bcDur >= wcDur)) {                   // check best case < most likely case < worst case days
    errorHandler(2);
    return false;
  } else if (!Date.parse(getStartDate(curRow))) {                                          // check task start date present
    errorHandler(0);
    return false;
  } else {
    return true;
  }
}

function checkAllData() {
  // checks the complete task entry table for errors. Returns true for no error found, false if error found

  let curRow = 1;  // task entry table starts on row 1
  var errorState = true;

  while (curRow < TABLEREF.rows.length - 1) {
    if (errorCheckRow(curRow) == true) {
      errorState = true;
      curRow++;
    } else {
      errorState = false;
      break;
    }
  }
  return errorState;
}

function getStartDate(rowNumber) {
  // start date in first row of task table is input box, subsequent rows are just table cells so reference differently

  if (rowNumber === 1) {
    return new Date(TABLEREF.rows[rowNumber].cells[STARTDAYCOL].children[0].value);
  } else if (rowNumber > 1) {
    return new Date(revDateStr(TABLEREF.rows[rowNumber].cells[STARTDAYCOL].textContent));
  }
}

function revDateStr(Sdate) {
  //re formats input string from dd/mm/yyyy to yyyy-mm-dd

  return Sdate.slice(6, 10).concat("-", Sdate.slice(3, 5), "-", Sdate.slice(0, 2));
}

function calcWorkingDays(fromDate, days) {

  // This function returns a completion date based on a Start Date and an array holding days of the week deemed
  // working and non working.
  // The function also catches the condition where the Start Date is a non working day and calculates the next working day.
  //read the non working days selected by the checkboxes into the array nonWorkingdays

  var nonWorkingDays = [];
  var workingDay = 0;

  let SimButtonArray = ["#sunDay", "#monDay", "#tuesDay", "#wednesDay", "#thursDay","#friDay","#saturDay"];
  SimButtonArray.forEach(getDayValue);
  function getDayValue(item, index) {                                      // Get the day of the week from the DOM 
    if ($(item).data("clicked")) {
      nonWorkingDays.push(index.toString());                               //Load numeric equivelent into array nonWorkingDay
    }
  }

  // Error check. Checks the condition where the user has selected every day of the week as a Non Project Day  
  if (nonWorkingDays.includes("0") && nonWorkingDays.includes("1") && nonWorkingDays.includes("2") && nonWorkingDays.includes("3") &&
    nonWorkingDays.includes("4") && nonWorkingDays.includes("5") && nonWorkingDays.includes("6")) {                  //Detect error condition where all days of the selected as non working
    errorHandler(3);                                                                                                 //Would result in a catestrophic failure 
    nonWorkingDays = ["0", "2", "3", "4", "5", "6"];                                                                 //Make Monday a working day
    $("#monDay").removeAttr("disabled").css("background-color", "rgb(0, 128, 0)").data('clicked', true);             //Re-enable Monday as working day  
  }

  while (workingDay < days) {                                                  //Determines the project date                                                       //Loop through the task duation days
    fromDate.setDate(fromDate.getDate() + 1);                                  //Get the week day number of the next day                                      //Get the day of the week for the next day  
    if (!(nonWorkingDays.includes(fromDate.getDay().toString()))) {            // Is the week day number in the non working day array?     
      workingDay++;
    }
  }
  return fromDate;
}

function addTableRow() {
  //function adds a new row into the task entry table

  let newTaskRow = TABLEREF.insertRow(TABLEREF.rows.length);

  newTaskRow.insertCell(TASKNUMCOL).classList.add("taskNo");
  TABLEREF.rows[TABLEREF.rows.length - 1].cells[TASKNUMCOL].innerHTML = (TABLEREF.rows.length - 1);
  newTaskRow.insertCell(TASKDESCOL).innerHTML = '<input type="text" class="taskDescriptionBox taskDes" />';
  newTaskRow.insertCell(STARTDAYCOL).classList.add("sDate");
  newTaskRow.insertCell(BCDURCOL).innerHTML = '<input type= "number" min="1" class="bctaskDurationBox bCase"/>';
  newTaskRow.insertCell(MLDURCOL).innerHTML = '<input type= "number" min="1" class="mltaskDurationBox mlCase"/>';
  newTaskRow.insertCell(WCDURCOL).innerHTML = '<input type= "number" min="1" class="wctaskDurationBox wCase"/>';
  newTaskRow.insertCell(BCDATECOL).classList.add("bctaskDate");
  newTaskRow.insertCell(MLDATECOL).classList.add("mltaskDate");
  newTaskRow.insertCell(WCDATECOL).classList.add("wctaskDate");

}

function runSimulation() {
  //Runs the Monte Carlo simulation in response to the start button clicked

  let simRunsArray = [];
  let runDuration = 0;                                                    // initialise the sum of random variates for each simulation run
  var simRuns;

  let SimButtonArray = ["#oneT", "#twoT", "#threeT", "#fourT", "#fiveT"];
  let simValueArray = [500, 1000, 5000, 7000, 10000];
  SimButtonArray.forEach(getSimValue)
  function getSimValue(item, index) {                                      // get the number of simulation runs from the DOM 
    if ($(item).data("clicked")) {
      simRuns = simValueArray[index];
    }
  }

  let dataTableEnd = TABLEREF.rows.length - 1;                           // last HTML task entry table row is always blank
  for (let i = 0; i < simRuns; i++) {
    for (let j = 1; j < dataTableEnd; j++) {
      let bestCaseDuration = parseInt(TABLEREF.rows[j].cells[BCDURCOL].children[0].value);
      let mostLikelyCaseDuration = parseInt(TABLEREF.rows[j].cells[MLDURCOL].children[0].value);
      let worstCaseDuration = parseInt(TABLEREF.rows[j].cells[WCDURCOL].children[0].value);
      let variat = randomVariat(bestCaseDuration, mostLikelyCaseDuration, worstCaseDuration);  //Get random variat between best case and worst case duration
      runDuration = runDuration + variat;                              // addition of task random variats is ok as all tasks are finish to start
    }
    simRunsArray[i] = runDuration;
    runDuration = 0;                                                  //reset the sum of random variates after each run
  }
  return simRunsArray;
}
function reLoad() {
  //restarts everything!

  window.location.reload();
}

function monteCarlo() {
  //This is the core simulation function and is called when the "start" button is clicked

  disStart();                                                                  //Disable start button while in simulation
  disSimulationRuns();                                                         //disable simulation runs buttons
  disNonWorkingDays();                                                         // disable non working days buttons

  if (checkAllData()) {                                                        //If no task table errors plot data
    const dataPoints = 100;                                                     //number of data points for plotting probability chart

    $("#plotPanel").css("display", "block");                                   //display HTML div for plotting charts
    google.charts.setOnLoadCallback(drawTimeLine);                             //plot timeline on call back
    let simRunsArray = runSimulation();                                        //run core simulation
    let results = resultProc(simRunsArray, dataPoints);                        // process simulation runs into frequency buckets and determine project durations 
    let resultsProj = addProjectDates(results, dataPoints);                    // assign dates to project duration dates 
    google.charts.setOnLoadCallback(drawProbabilityChart(resultsProj, dataPoints)); //plot probability chart
    enStart();                                                                   //Enable start button
    enSimulationRuns();                                                          //enable simulation runs buttons
    enNonWorkingDays();                                                          // enable non working days buttons
  } else {
    errorHandler(6);                                                           // Do not plot data report error
  }
}

function addProjectDates(resultsArray, dataPoints) {
  //uses the calcWorkingDays function to determine the probable project dates and stores these in resultsArray (array of objects class Results) 

  for (let i = 0; i < dataPoints; i++) {
    let startDate = new Date(TABLEREF.rows[1].cells[STARTDAYCOL].children[0].value);
    let finishDate = calcWorkingDays(startDate, resultsArray[i].projectDays);
    resultsArray[i].projectDate = finishDate.toString();
  }
  return resultsArray;
}

function resultProc(numbers, dataSamples) {
  //This function inputs the Monte Carlo simulation results and processes the results into percentage frequency bins.
  //the output is stored in the form of a array of objects of class Results
  class Results {
    constructor(percentage, freqCount, projectDays, projectDate) {
      this.percentage = percentage;
      this.freqCount = freqCount;
      this.projectDays = projectDays;
      this.projectDate = projectDate;
    }
  }
  var fCount = 0;                                                         //initialise count for frequency bin
  var popSize = numbers.length;                                           //Get length of array with project completion date
  var histoArray = [];                                                    //Initialise array of objects class Results
  var maxDuration = Math.max.apply(null, numbers);
  var minDuration = Math.min.apply(null, numbers);
  var binWidth = ((maxDuration - minDuration) / dataSamples);             //Calculate bin width
  for (let j = 1; j < dataSamples; j++) {                                 // For each element in the the project completion array
    for (let i = 0; i < popSize; i++) {                                   //For each frequency bin
      if (numbers[i] < ((binWidth * j) + minDuration)) {                  //Increment frequency count each time project completion date less than cumulative bin width 
        fCount = fCount + 1;
      }
    }
    histoArray.push(new Results());
    histoArray[j - 1].freqCount = fCount;
    histoArray[j - 1].percentage = fCount / popSize;                      //Calc frequency count as % of total possible project outcomes
    histoArray[j - 1].projectDays = Math.round(minDuration + (binWidth * j)); //integer number of project days only
    fCount = 0;
  }

  histoArray.push(new Results());
  histoArray[dataSamples - 1].freqCount = popSize;                        // hard code the 100% entry to include the entire population
  histoArray[dataSamples - 1].percentage = 1;                             //100% expressed as a decimal
  histoArray[dataSamples - 1].projectDays = maxDuration;

  return histoArray;
}

function drawProbabilityChart(resultsArray, dataPoints) {
  //This fuction uses the Google scatter plot API to create  a chart of %probabilities versus project completion dates

  var chart = new google.visualization.LineChart(document.getElementById('plot1'));

  var dataArray = [['Date', '% Probability']];                                         //declare data array for plotting in the scatter plot
  for (let i = 0; i < dataPoints; i++) {
    dataArray.push([resultsArray[i].projectDate, resultsArray[i].percentage * 100]);   //Push the dates and probability into plotting array
  }
  var data = google.visualization.arrayToDataTable(dataArray);

  //add plot options
  var options = {                                                                       //define plot options 
    hAxis: { format: 'M-d-yy', title: 'Date', minValue: resultsArray[0].projectDate, maxValue: resultsArray[dataPoints - 1].projectDate },    //X axis range
    vAxis: { title: '% Probability', minValue: 0, maxValue: 100 },                      // Y axis range
    pointSize: 1,
    legend: 'none',
    backgroundColor: "#ffff99"
  };
  chart.draw(data, options);                                                            //Generate chart
  // Credit: see ref:3 in the README.MD

}

function drawTimeLine() {
  //plots the time lines from the HTML task entry table using the Google Timeline API

  var chart = new google.visualization.Timeline(document.getElementById('plot2'));
  var plotTable = new google.visualization.DataTable();

  // define columns in the plot data table 
  plotTable.addColumn({ type: 'string', id: 'Position' });
  plotTable.addColumn({ type: 'string', id: 'Name' });
  plotTable.addColumn({ type: 'date', id: 'Start' });
  plotTable.addColumn({ type: 'date', id: 'End' });

  let dataTableLength = (((TABLEREF.rows.length - 2) * 3)); // the length of the plot table

  //set number of rows in the the plot data table from the HTML task table * 3 for Best Case, Most Likely Case and Worst Case dates
  //each task table row maps onto 3 plot table rows
  plotTable.addRows(dataTableLength);

  //populate the plot data table by row and column

  let taskTableCtr = 1; //indexes through the task table rows
  //note that the 4 of the columns in each of theplot table rows requires different data so further "for" loops not practical 
  for (let plotTableRow = 0; plotTableRow < dataTableLength; plotTableRow += 3) {
    plotTable.setCell(plotTableRow, 0, (TABLEREF.rows[taskTableCtr].cells[TASKDESCOL].children[0].value));
    plotTable.setCell(plotTableRow, 1, "Best Case");
    if (plotTableRow === 0) {                                      // start date in first row of task table is input box, subsequent rows are just table cells so reference differently 
      plotTable.setCell(plotTableRow, 2, new Date(TABLEREF.rows[taskTableCtr].cells[STARTDAYCOL].children[0].value));
    } else if (plotTableRow > 0) {
      plotTable.setCell(plotTableRow, 2, new Date(revDateStr(TABLEREF.rows[taskTableCtr].cells[STARTDAYCOL].textContent)));
    }
    plotTable.setCell(plotTableRow, 3, new Date(revDateStr(TABLEREF.rows[taskTableCtr].cells[BCDATECOL].textContent)));

    plotTable.setCell(plotTableRow + 1, 0, (TABLEREF.rows[taskTableCtr].cells[TASKDESCOL].children[0].value));
    plotTable.setCell(plotTableRow + 1, 1, "Most Likely Case");
    plotTable.setCell(plotTableRow + 1, 2, new Date(revDateStr(TABLEREF.rows[taskTableCtr].cells[BCDATECOL].textContent)));
    plotTable.setCell(plotTableRow + 1, 3, new Date(revDateStr(TABLEREF.rows[taskTableCtr].cells[MLDATECOL].textContent)));

    plotTable.setCell(plotTableRow + 2, 0, (TABLEREF.rows[taskTableCtr].cells[TASKDESCOL].children[0].value));
    plotTable.setCell(plotTableRow + 2, 1, "Worst Case");
    plotTable.setCell(plotTableRow + 2, 2, new Date(revDateStr(TABLEREF.rows[taskTableCtr].cells[MLDATECOL].textContent)));
    plotTable.setCell(plotTableRow + 2, 3, new Date(revDateStr(TABLEREF.rows[taskTableCtr].cells[WCDATECOL].textContent)));
    taskTableCtr++;
  }

  var options = {
    timeline: { groupByRowLabel: true },                                            // Set up option to display best case, most likely case and worst case timelines on one bar
    colors: ["#90ee90", "#ffa500", "#ff4500"],                                      // Bar colours match task table colours 
    backgroundColor: "#ffff99"

  };
  chart.draw(plotTable, options);

  // Credit: see ref:3 in the README.MD

}

function randomVariat(bestCase, mostLikelyCase, worstCase) {
  // This function returns a triangular distributed random variat from the Best Case, Most Likely Case and Worst Case
  // estimates passed to it. Returns integer values only

  let sample = Math.random();
  if (sample <= ((mostLikelyCase - bestCase) / (worstCase - bestCase))) {
    return Math.round(bestCase + Math.sqrt((worstCase - bestCase) * (mostLikelyCase - bestCase) * sample));
  } else if (sample > ((mostLikelyCase - bestCase) / (worstCase - bestCase))) {
    return Math.round(worstCase - Math.sqrt((worstCase - bestCase) * (worstCase - mostLikelyCase) * (1 - sample)));
  } else {
    errorHandler(1); //Catastrophic error!
  }
}

function errorHandler(errorCode) {
  //displays an alert to the user when a date input or other error is detected

  $("#alertBox").css("display", "block"); //bring up the alert modal
  switch (errorCode) { //display the alert message
    case 0:
      $("#alertMess").text('No start date entered: error code 0');
      break;
    case (1):
      $("#alertMess").text("A catastrophic error has occured, please reload the page and start again: error code 1");
      break;
    case (2):
      $("#alertMess").text('Best case duration musts be less that most likely case duration and most likely case duration must be less than worst case duration : error code 2');
      break;
    case (3):
      $("#alertMess").text('You must include at least 1 working day: error code 3');
      break;
    case (4):
      $("#alertMess").text('You must include a unique task description: error code 4');
      break;
    case (5):
      $("#alertMess").text('Best case, most likely case and worst case duration must be greater than 1 day: error code 5');
      break;
    case (6):
      $("#alertMess").text('Unrelaible task entry table data, please reset and try again: error code 6');
      break;
    case (7):
      $("#alertMess").text('The task description must start with an alphanumeric character: error code 7');
      break;
    case (8):
      $("#alertMess").text('The task duration value must be an integer value. Task duration values will be rounded if value is irrational: error code 8');
      break;
    case (9):
      $("#alertMess").text('The task duration values must be positive numbers: error code 9');
      break;
    default:
      $("#alertMess").text('Unkown error code');
  }
  $("#disAlert").click(function () { hideAlert(); });
}

function hideAlert() {
  //Clears the alert modal window

  $("#alertBox").css("display", "none");
}

function loadHelp() {
  //Displays the help modal window

  $("#helpModal").css("display", "block");
}

function hideHelp() {
  //Clears the help modal window

  $("#helpModal").css("display", "none");
}

function hiLightButton(elem) {
  //Highlights button background when hovered over 
  $(elem).css("filter", "brightness(115%)");
}

function loLighteButton(elem) {
  //Low lights button when mouse pointer moves away
  $(elem).css("filter", "brightness(100%)");
}

// Event listeners 

$("#taskEntryTable").change(function () { taskUpdate(); });
$("#simulationStart").click(function () { monteCarlo(); });                                               //Sets up event listener for Start button
$("#restartPage").click(function () { reLoad(); });                                                      //Set up event listener for Restart button
$("#getHelp").click(function () { loadHelp(); });                                                        //Set up event listener for Help button
$("#closeHelp").click(function () { hideHelp(); });                                                       //Sets up event listener to close help modal
$("#closeAlert").click(function () { hideAlert(); });                                                    //Sets up event listener to close alert modal

// Sets up event listeners to hilight and lowlight buttons on hover
let buttonsArray = ["#monDay", "#tuesDay", "#wednesDay", "#thursDay", "#friDay", "#saturDay", "#sunDay", "#oneT", "#twoT", "#threeT", "#fourT", "#fiveT", "#getHelp",
  "#simulationStart", "#restartPage", "#closeHelp"];
buttonsArray.forEach(function (elem) {
  $(elem).hover(function () { hiLightButton(elem); }, function () { loLighteButton(elem); });  //Refer to acknowledgement ref. 1 in Readme.md 
});

let SimButtonArray = ["#oneT", "#twoT", "#threeT", "#fourT", "#fiveT"];
SimButtonArray.forEach(function (elem) {
  $(elem).click(function () { setSimulationRuns(elem); });
});

let nonProjectDayArray = ["#monDay", "#tuesDay", "#wednesDay", "#thursDay", "#friDay", "#saturDay", "#sunDay"];
nonProjectDayArray.forEach(function (elem) {
  $(elem).click(function () { setNonWorkingDays(elem); });
});