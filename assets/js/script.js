$(document).ready(function () {
  //Function called when the document has loaded
  initNonWorkingDays();     //initialise non working days buttons
  initSimulationRuns();     //initialise simulation runs buttons
  setNonWorkingDays();      // called when non working day button clicked 
  setSimulationRuns();      //called when simulation runs button clicked
  disStart();               // disable simuation start button
  enReset();                // enable reset button
  enhelp();                 // Enables Help button
  google.charts.load('current', { 'packages': ['corechart'] });   //Load Google charting package
  google.charts.load("current", { "packages": ["timeline"] });    //Load Google charting package
})
function initNonWorkingDays() {
  //Initialises the Non Working Day buttons. Mon - Fri set to inactive. Sat & Sun set to active, non working days

  $("#monDay,#tuesDay,#wednesDay,#thursDay,#friDay,#saturDay,#sunDay").css("background-color", "rgb(0, 128, 0)").data('clicked', false); //initialise buttons to green
  $("#saturDay,#sunDay").css("background-color", "rgb(220, 20, 60)").data('clicked', true); //initialise buttons to red
}

function disNonWorkingDays() {
  //Disables and greys out the Non Working Day buttons

  $("#monDay,#tuesDay,#wednesDay,#thursDay,#friDay,#saturDay,#sunDay").css("background-color", "rgb(211, 211, 211)").attr("disabled", true);//grey buttons and disable
}

function enNonWorkingDays() {
  //Enables the Non Woring Day buttons

  $("#monDay,#tuesDay,#wednesDay,#thursDay,#friDay,#saturDay,#sunDay").removeAttr("disabled"); //re-enable non working day buttons
}

function initSimulationRuns() {
  //Initialises the Simulation Runs buttons and defaults to 1000 runs

  $("#twoT,#threeT,#fourT,#fiveT").css("background-color", "rgb(0, 128, 0)").data('clicked', false); //button green
  $("#oneT").css("background-color", "rgb(220, 20, 60)").data('clicked', true); //button red
}

function disSimulationRuns() {
  //Disables and greys out the Simulation Runs buttons

  $("#oneT,#twoT,#threeT,#fourT,#fiveT").css("background-color", "rgb(211, 211, 211)").attr("disabled", true); //grey buttons and disable
}

function enSimulationRuns() {
  //Enables the Simulation Runs buttons

  $("#oneT,#twoT,#threeT,#fourT,#fiveT").removeAttr("disabled"); //re-enable buttons
}

function disStart() {
  //Disables the Start button

  $("#simulationStart").css("background-color", "rgb(211, 211, 211)").attr("disabled", true)
}

function enStart() {
  //Enables the Start button

  $("#simulationStart").css("background-color", "rgb(0, 128, 0)").removeAttr("disabled");
}

function enReset() {
  //Initialises the Reset button

  $("#restartPage").css("background-color", "rgb(0, 128, 0)")
}

function enhelp() {
  //Initialises the Help button

  $("#getHelp").css("background-color", "rgb(0, 128, 0)")
}

function setNonWorkingDays() {
  $("#monDay,#tuesDay,#wednesDay,#thursDay,#friDay,#saturDay,#sunDay").on({
    click: function () {
      if ($(this).css("background-color") == "rgb(220, 20, 60)") {
        $(this).css("background-color", "rgb(0, 128, 0)").data('clicked', false);
      } else {
        $(this).css("background-color", "rgb(220, 20, 60)").data('clicked', true);
      }
      taskUpdate(); //update the task table with new non working days
    }
  });

}

function setSimulationRuns() {
  $("#oneT,#twoT,#threeT,#fourT,#fiveT").on({
    click: function () {
      if ($(this).css("background-color") == "rgb(0, 128, 0)") { //if button 1000 green
        $("#twoT, #threeT, #fourT, #fiveT").css("background-color", "rgb(0, 128, 0)").data("clicked", false); //turn green
        $("#oneT").css("background-color", "rgb(220, 20, 60)").data("clicked", true); //turn red
      }
      if ($(this).css("background-color") == "rgb(0, 128, 0)") { //if button 2000 green
        $("#oneT, #threeT, #fourT, #fiveT").css("background-color", "rgb(0, 128, 0)").data("clicked", false); //turn green
        $("#twoT").css("background-color", "rgb(220, 20, 60)").data("clicked", true); //turn red
      }
      if ($(this).css("background-color") == "rgb(0, 128, 0)") { //if button 3000 green
        $("#oneT, #twoT, #fourT, #fiveT").css("background-color", "rgb(0, 128, 0)").data("clicked", false); //turn green
        $("#threeT").css("background-color", "rgb(220, 20, 60)").data("clicked", true); //turn red
      }
      if ($(this).css("background-color") == "rgb(0, 128, 0)") { //if button 4000 green
        $("#oneT, #twoT, #threeT, #fiveT").css("background-color", "rgb(0, 128, 0)").data("clicked", false); //turn green
        $("#fourT").css("background-color", "rgb(220, 20, 60)").data("clicked", true); //turn red
      }
      if ($(this).css("background-color") == "rgb(0, 128, 0)") { //if button 5000 green
        $("#oneT, #twoT, #threeT, #fourT").css("background-color", "rgb(0, 128, 0)").data("clicked", false); //turn green
        $("#fiveT").css("background-color", "rgb(220, 20, 60)").data("clicked", true); //turn red
      }
    }
  });
}


function taskUpdate() {
//Event handler called whenever there is a change to the task table

  var tableRef = document.getElementById("taskEntryTable");
  const startDay = 2;

  //start at currentRow = 2 because the first two rows of the HTML task table have no task data
  for (var currentRow = startDay; currentRow < tableRef.rows.length; currentRow++) {

    if (currentRow > startDay) {    //only do if more than one task has been entered
      // update the row start date from previous worst case date
      loadNextStartDate(currentRow);
      //tableRef.rows[currentRow].cells[2].innerHTML = tableRef.rows[currentRow - 1].cells[8].innerHTML
    }

    let bcDuration = parseInt(tableRef.rows[currentRow].cells[3].children[0].value);
    if (bcDuration >= 1) {                                          //Test duration value entered in task table
      let startDateN = getStartDate(currentRow);
      let bcDate = calcWorkingDays(startDateN, bcDuration).toLocaleDateString();
      tableRef.rows[currentRow].cells[6].innerText = bcDate;
    } else {
      tableRef.rows[currentRow].cells[6].innerHTML = "";             //Test failed clear best case date
    }
    let mlDuration = parseInt(tableRef.rows[currentRow].cells[4].children[0].value);
    if (mlDuration >= 1) {
      let startDateN = getStartDate(currentRow);
      let mlDate = calcWorkingDays(startDateN, mlDuration).toLocaleDateString();
      tableRef.rows[currentRow].cells[7].innerHTML = mlDate;
    } else {
      tableRef.rows[currentRow].cells[7].innerHTML = "";            //Test failed clear most likely case date
    }

    let wcDuration = parseInt(tableRef.rows[currentRow].cells[5].children[0].value);
    if (wcDuration >= 1) {
      let startDateN = getStartDate(currentRow);
      let wcDate = calcWorkingDays(startDateN, wcDuration).toLocaleDateString();
      tableRef.rows[currentRow].cells[8].innerHTML = wcDate;
    } else {
      tableRef.rows[currentRow].cells[8].innerHTML = "";            //Test failed clear worst case date
    }
  }
  if ((tableRef.rows[tableRef.rows.length - 1].cells[8].innerText != "") && (errorCheckRow(currentRow - 1))) { //check that a worst case date has been calculated and that there are no errors in the task entry 
    addTableRow();                      // Add a new task table row
    loadNextStartDate(tableRef.rows.length - 1);                // Load a start date into the new task table row from worst case date of previous task row
    enStart();                          //Enable the simualtion start button

  }
}

function loadNextStartDate(currentRow){
  //Determines the next working day omitting the non working days selected by the user

  let tableRef = document.getElementById("taskEntryTable");
  let lastwc = new Date(revDateStr(tableRef.rows[currentRow - 1].cells[8].innerHTML));  //Get the worst case date from the task table reverse the sting and convert to date object
  tableRef.rows[currentRow].cells[2].innerHTML = calcWorkingDays(lastwc, 1).toLocaleDateString();  // Add one working day to the worst case date and convert back to a string
    
}


function errorCheckRow(curRow) {
  // Error checks the current row of task entry data
  const taskDescCol = 1;
  const bcDurCol = 3;
  const mlDurCol = 4;
  const wcDurCol = 5;

  let tableRef = document.getElementById("taskEntryTable");
  let bcDur = parseInt(tableRef.rows[curRow].cells[bcDurCol].children[0].value);
  let mlDur = parseInt(tableRef.rows[curRow].cells[mlDurCol].children[0].value);
  let wcDur = parseInt(tableRef.rows[curRow].cells[wcDurCol].children[0].value);

  if (tableRef.rows[curRow].cells[taskDescCol].children[0].value == "") { //check task description available
    errorHandler(4);
    return false;
  } else if ((bcDur <= 1) || (mlDur <= 1) || (wcDur <= 1)) { //check duration days greater or equal to 1
    errorHandler(5);
    return false;
  } else if ((bcDur > mlDur) || (mlDur > wcDur) || (bcDur > wcDur)) { // check best case < most likely case < worst case days
    errorHandler(2);
    return false;
  } else if (!Date.parse(getStartDate(curRow))) { // check task start date present
    errorHandler(0);
    return false;
  } else {
    return true;
  }
}

function checkAllData() {
  // checks the complete task entry table for errors. Returns true for no error found, false if error found

  let tableRef = document.getElementById("taskEntryTable");
  let curRow = 2;  // task entry table starts on row 2

  while ((curRow < tableRef.rows.length-1) && (errorCheckRow(curRow)== true)) {
    curRow++;
  }
  return errorCheckRow(curRow - 1); // -1 as curRow has been incremented in while loop
}

function getStartDate(rowNumber) {
  // start date in first row of task table is input box, subsequent rows are just table cells so reference differently
  var tableRef = document.getElementById("taskEntryTable");
  if (rowNumber === 2) {
    return new Date(tableRef.rows[rowNumber].cells[2].children[0].value);
  } else if (rowNumber > 2) {
    return new Date(revDateStr(tableRef.rows[rowNumber].cells[2].textContent));
  }
}

function revDateStr(Sdate) {
  //re formats input string from dd/mm/yyyy to yyyy-mm-dd
  let sYear = Sdate.slice(6, 10);
  let sMonth = Sdate.slice(3, 5);
  let sDay = Sdate.slice(0, 2);
  return Sdate = sYear.concat("-", sMonth, "-", sDay);
}

function calcWorkingDays(fromDate, days) {
  // This function returns a completion date based on a Start Date and an array holding days of the week deemed
  // working and non working.
  // The function also catches the condition where the Start Date is a non working day and calculates the next working day.
  //read the non working days selected by the checkboxes into the array nonWorkingdays
  var nonWorkingDays = [];
  var workingDay = 0;

  if ($("#monDay").data("clicked")) {
    nonWorkingDays.push("1"); 
  }
  if ($("#tuesDay").data("clicked")) { 
    nonWorkingDays.push("2"); 
  }
  if ($("#wednesDay").data("clicked")) {
    nonWorkingDays.push("3"); 
  }
  if ($("#thursDay").data("clicked")) { 
    nonWorkingDays.push("4"); 
  }
  if ($("#friDay").data("clicked")) {
     nonWorkingDays.push("5"); 
    }
  if ($("#saturDay").data("clicked")) {
     nonWorkingDays.push("6"); 
    }
  if ($("#sunDay").data("clicked")) {
     nonWorkingDays.push("0"); 
    }

  if (nonWorkingDays.includes("0") && nonWorkingDays.includes("1") && nonWorkingDays.includes("2") && nonWorkingDays.includes("3") &&
    nonWorkingDays.includes("4") && nonWorkingDays.includes("5") && nonWorkingDays.includes("6")) { //detect error condition where all week days selected as non working
    errorHandler(3);
    nonWorkingDays = ["0", "2", "3", "4", "5", "6"];
  }

  while (workingDay < days) {
    fromDate.setDate(fromDate.getDate() + 1);
    if (!(nonWorkingDays.includes(fromDate.getDay().toString()))) {
      workingDay++;
    }
  }
  return fromDate;
}

function addTableRow() {
  //function adds a new row into the task entry table
  let tableRef = document.getElementById("taskEntryTable");
  let newTaskRow = tableRef.insertRow(tableRef.rows.length);
  const taskNumber = 0;

  newTaskRow.insertCell(taskNumber).classList.add("taskNo");
  tableRef.rows[tableRef.rows.length - 1].cells[taskNumber].innerHTML = (tableRef.rows.length - 2);
  newTaskRow.insertCell(1).innerHTML = '<input type="text" class="taskDescriptionBox taskDes" />';
  newTaskRow.insertCell(2).classList.add("sDate");
  newTaskRow.insertCell(3).innerHTML = '<input type= "number" min="1" class="bctaskDurationBox bCase"/>';
  newTaskRow.insertCell(4).innerHTML = '<input type= "number" min="1" class="mltaskDurationBox mlCase"/>'
  newTaskRow.insertCell(5).innerHTML = '<input type= "number" min="1" class="wctaskDurationBox wCase"/>';
  newTaskRow.insertCell(6).classList.add("bctaskDate");
  newTaskRow.insertCell(7).classList.add("mltaskDate");
  newTaskRow.insertCell(8).classList.add("wctaskDate");
}

function runSimulation() {
  //runs the Monte Carlo simulation

  var tableRef = document.getElementById("taskEntryTable");
  var simRunsArray = [];
  var runDuration = 0;  // initialise the sum of random variates for each simulation run

  // get the number of simulation runs from the DOM 
  if ($("#oneT").data("clicked")) { simRuns = 1000; }
  if ($("#twoT").data("clicked")) { simRuns = 2000; }
  if ($("#threeT").data("clicked")) { simRuns = 5000; }
  if ($("#fourT").data("clicked")) { simRuns = 10000; }
  if ($("#fiveT").data("clicked")) { simRuns = 20000; }

  // last HTML task entry table row is always blank
  var dataTableEnd = tableRef.rows.length - 1;
  for (let i = 0; i < simRuns; i++) {
    for (let j = 2; j < dataTableEnd; j++) {
      let bestCaseDuration = parseInt(tableRef.rows[j].cells[3].children[0].value);
      let mostLikelyCaseDuration = parseInt(tableRef.rows[j].cells[4].children[0].value);
      let worstCaseDuration = parseInt(tableRef.rows[j].cells[5].children[0].value);
      // cumulative addition of task random variats is ok because all tasks have a finish to start date relationship
      let variat = randomVariat(bestCaseDuration, mostLikelyCaseDuration, worstCaseDuration);
      runDuration = runDuration + variat;
    }
    simRunsArray[i] = runDuration;
    runDuration = 0; //reset the sum of random variates after each run
  }
  return simRunsArray;
}
function reLoad() {
  //restarts everything!

  window.location.reload();
}

function monteCarlo() {
  //This is the core simulation function and is called when the "start" button is clicked

  disStart();   //Disable start button while in simulation
  disSimulationRuns(); //disable simulation runs buttons
  disNonWorkingDays(); // disable non working days buttons

  if (checkAllData()) {     //If no task table errors plot data
    var dataPoints = 20;  //number of data points for plotting probability chart
    
    document.getElementById("plotPanel").style.display = "block"; //display HTML div for plotting charts
    google.charts.setOnLoadCallback(drawTimeLine); //plot timeline on call back
    let simRunsArray = runSimulation(); //run core simulation
    let results = resultProc(simRunsArray, dataPoints); // process simulation runs into frequency buckets and determine project durations 
    let resultsProj = addProjectDates(results, dataPoints); // assign dates to project duration dates 
    google.charts.setOnLoadCallback(drawProbabilityChart(resultsProj, dataPoints)); //plot probability chart
    
  } else {             
    errorHandler(6); // Do not plot data report error
  }
  enStart();  //Enable start button
  enSimulationRuns(); //enable simulation runs buttons
  initSimulationRuns(); // re initialise simulation runs buttons
  enNonWorkingDays(); // enable non working days buttons
  initNonWorkingDays(); // re initialise non working days buttons
}

function addProjectDates(resultsArray, dataPoints) {
  //uses the calcWorkingDays function to determine the probable project dates and stores these in resultsArray (array of objects class Results) 

  for (i = 0; i < dataPoints; i++) {
    let tableRef = document.getElementById("taskEntryTable");
    let startDate = new Date(tableRef.rows[2].cells[2].children[0].value);
    let finishDate = calcWorkingDays(startDate, resultsArray[i].projectDays);
    resultsArray[i].projectDate = finishDate.toString();
  }
  return resultsArray;
}

function resultProc(numbers, dataSamples) {
  //this function inputs the Monte Carlo simulation results and processes the results into percentage frequency bins.
  //the output is stored in the form of a array of objects of class Results
  class Results {
    constructor(percentage, yAxis, freqCount, projectDays, projectDate) {
      this.percentage = percentage;
      this.yAxis = yAxis;
      this.freqCount = freqCount;
      this.projectDays = projectDays;
      this.projectDate = projectDate;
    }
  };

  var fCount = 0;
  var popSize = numbers.length;
  var histoArray = [];
  var maxDuration = Math.max.apply(null, numbers);
  var minDuration = Math.min.apply(null, numbers);
  var binWidth = ((maxDuration - minDuration) / dataSamples);
  for (let j = 1; j < dataSamples; j++) {
    for (let i = 0; i < popSize; i++) {
      if (numbers[i] < ((binWidth * j) + minDuration)) {
        fCount = fCount + 1;
      }
    }
    histoArray.push(new Results());
    histoArray[j - 1].freqCount = fCount;
    histoArray[j - 1].percentage = fCount / popSize;
    histoArray[j - 1].projectDays = Math.round(minDuration + (binWidth * j)); //integer number of project days only
    fCount = 0;
  }
  // hard code the 100% entry to include the entire population
  histoArray.push(new Results());
  histoArray[dataSamples - 1].freqCount = popSize;
  histoArray[dataSamples - 1].percentage = 1; //100% expressed as a decimal
  histoArray[dataSamples - 1].projectDays = maxDuration;

  return histoArray;
}

function drawProbabilityChart(resultsArray, dataPoints) {
  var chart = new google.visualization.ScatterChart(document.getElementById('plot1'));

  //construct data array for plotting in the scatter plot
  var dataArray = [['Date', '% Probability']];
  for (i = 0; i < dataPoints; i++) {
    dataArray.push([(resultsArray[i].projectDate), resultsArray[i].percentage * 100]);
  }
  var data = google.visualization.arrayToDataTable(dataArray);

  //add plot options
  var options = {
    // title: "",
    hAxis: { title: 'Date', minValue: resultsArray[0].projectDate, maxValue: resultsArray[9].projectDate },
    vAxis: { title: '% Probability', minValue: 0, maxValue: 100 },
    legend: 'none'
  };
  chart.draw(data, options); //generate chart
}


function drawTimeLine() {
  //plots the time lines from the HTML task entry table

  var container = document.getElementById('plot2');
  var chart = new google.visualization.Timeline(container);
  var plotTable = new google.visualization.DataTable();
  let tableRef = document.getElementById("taskEntryTable");

  // define columns in the plot data table 
  plotTable.addColumn({ type: 'string', id: 'Position' });
  plotTable.addColumn({ type: 'string', id: 'Name' });
  plotTable.addColumn({ type: 'date', id: 'Start' });
  plotTable.addColumn({ type: 'date', id: 'End' });

  let dataTableLength = (((tableRef.rows.length - 3) * 3)); // the length of the plot table

  //set number of rows in the the plot data table from the HTML task table * 3 for Best Case, Most Likely Case and Worst Case dates
  //each task table row maps onto 3 plot table rows
  plotTable.addRows(dataTableLength);

  //populate the plot data table by row and column

  let taskTableCtr = 2; //indexes through the task table rows
  //note that the 4 of the columns in each of theplot table rows requires different data so further "for" loops not practical 
  for (let plotTableRow = 0; plotTableRow < dataTableLength; plotTableRow += 3) {
    plotTable.setCell(plotTableRow, 0, (tableRef.rows[taskTableCtr].cells[1].children[0].value));
    plotTable.setCell(plotTableRow, 1, "Best Case");

    // start date in first row of task table is input box, subsequent rows are just table cells so reference differently 
    if (plotTableRow === 0) {
      plotTable.setCell(plotTableRow, 2, new Date(tableRef.rows[taskTableCtr].cells[2].children[0].value));
    } else if (plotTableRow > 0) {
      plotTable.setCell(plotTableRow, 2, new Date(revDateStr(tableRef.rows[taskTableCtr].cells[2].textContent)));
    }
    plotTable.setCell(plotTableRow, 3, new Date(revDateStr(tableRef.rows[taskTableCtr].cells[6].textContent)));

    plotTable.setCell(plotTableRow + 1, 0, (tableRef.rows[taskTableCtr].cells[1].children[0].value));
    plotTable.setCell(plotTableRow + 1, 1, "Most Likely Case");
    plotTable.setCell(plotTableRow + 1, 2, new Date(revDateStr(tableRef.rows[taskTableCtr].cells[6].textContent)));
    plotTable.setCell(plotTableRow + 1, 3, new Date(revDateStr(tableRef.rows[taskTableCtr].cells[7].textContent)));

    plotTable.setCell(plotTableRow + 2, 0, (tableRef.rows[taskTableCtr].cells[1].children[0].value));
    plotTable.setCell(plotTableRow + 2, 1, "Worst Case");
    plotTable.setCell(plotTableRow + 2, 2, new Date(revDateStr(tableRef.rows[taskTableCtr].cells[7].textContent)));
    plotTable.setCell(plotTableRow + 2, 3, new Date(revDateStr(tableRef.rows[taskTableCtr].cells[8].textContent)));
    taskTableCtr++;
  }

  var options = {
    timeline: { groupByRowLabel: true }, // set up option to display best case, most likely case and worst case timelines on one bar
    colors: ["#90ee90", "#ffa500", "#ff4500"],
    timeline: { colorByRowLabel: false },
  }
  chart.draw(plotTable, options);

  // Credit: this function was inspired by the code examples provided at: https://developers.google.com/chart/interactive/docs/gallery/timeline

}

function randomVariat(bestCase, mostLikelyCase, worstCase) {
  // This function returns a triangular distributed random variat from the Best Case, Most Likely Case and Worst Case
  // estimates passed to it. Returns integer values only

  let sample = Math.random();
  if (sample <= ((mostLikelyCase - bestCase) / (worstCase - bestCase))) {
    return math.round(bestCase + Math.sqrt((worstCase - bestCase) * (mostLikelyCase - bestCase) * sample));
  } else if (sample > ((mostLikelyCase - bestCase) / (worstCase - bestCase))) {
    return math.round(worstCase - Math.sqrt((worstCase - bestCase) * (worstCase - mostLikelyCase) * (1 - sample)));
  } else {
    errorHandler(1); //Catastrophic error!
  }
}


function errorHandler(errorCode) {
  //displays an alert to the user when a date input or other error is detected

  document.getElementById("alertBox").style.display = "block"; //bring up the alert modal

  switch (errorCode) { //display the alert message
    case 0:
      document.getElementById("alertMess").innerText = 'No start date entered: error code 0';
      break;
    case (1):
      document.getElementById("alertMess").innerText = "A catastrophic error has occured, please reload the page and start again: error code 1";
      break;
    case (2):
      document.getElementById("alertMess").innerText = 'Best case duration musts be less that most likely case duration and most likely case duration must be less than worst case duration : error code 2';
      break;
    case (3):
      document.getElementById("alertMess").innerText = 'You must include at least 1 working day: error code 3';
      break;
    case (4):
      document.getElementById("alertMess").innerText = 'You must include a unique task description: error code 4';
      break;
    case (5):
      document.getElementById("alertMess").innerText = 'Best case, most likely case and worst case duration must be greater than 1 day: error code 5';
      break;
    case (6):
      document.getElementById("alertMess").innerText = 'Unrelaible task entry table data, please reset and try again: error code 6';
      break;
    default:
      document.getElementById("alertMess").innerText = 'Unkown error code';
  }
  document.getElementById("disAlert").addEventListener("click", hideAlert);
}

function hideAlert() {
  //Clears alert modal
  document.getElementById("alertBox").style.display = "none";
}

function loadHelp() {
  //Displays the help modal
  document.getElementById("myModal").style.display = "block";
}

function hideHelp() {
  //Clears the help modal
  document.getElementById("myModal").style.display = "none";
}

function helpClose() {
  document.getElementsByClassName("closeX").color = "rgb(200,200,200)";
}


// Event listeners 

$("#taskEntryTable").change(function () { taskUpdate(); });                                              //Sets up event listener for changes to the task table//document.getElementById("simulationStart").addEventListener("click", monteCarlo);                  
$("#simulationStart").click(function () { monteCarlo(); });                                               //Sets up event listener for Start button
$("#restartPage").click(function () { reLoad(); });                                                      //Set up event listener for Restart button
$("#getHelp").click(function () { loadHelp(); });                                                        //Set up event listener for Help button
$("#closeHelp").click(function () { hideHelp(); });                                                       //Sets up event listener to close help modal
$("#closeAlert").click(function () { hideAlert(); });                                                    //Sets up event listener to close alert modal
$("#closeHelp").mouseover(function () { helpClose(); });