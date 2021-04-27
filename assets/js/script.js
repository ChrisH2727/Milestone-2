$(document).ready(function () {
  initNonWorkingDays(); //initialise non working days buttons
  initSimulationRuns(); //initialise simulation runs buttons
  setNonWorkingDays(); // called when non working day button clicked 
  setSimulationRuns(); //called when simulation runs button clicked
  disStart(); // disable simuation start button
  enReset(); // enable reset button
})
function initNonWorkingDays(){
  $("#monDay,#tuesDay,#wednesDay,#thursDay,#friDay,#saturDay,#sunDay").css("background-color", "rgb(0, 128, 0)").data('clicked', false); //initialise buttons to green
  $("#saturDay,#sunDay").css("background-color", "rgb(220, 20, 60)").data('clicked', true); //initialise buttons to red
}

function disNonWorkingDays(){
  $("#monDay,#tuesDay,#wednesDay,#thursDay,#friDay,#saturDay,#sunDay").css("background-color", "rgb(211, 211, 211)").attr("disabled", true);//grey buttons and disable
}

function enNonWorkingDays(){
  $("#monDay,#tuesDay,#wednesDay,#thursDay,#friDay,#saturDay,#sunDay").removeAttr("disabled"); //re-enable non working day buttons
}

function initSimulationRuns(){
  $("#twoT,#threeT,#fourT,#fiveT").css("background-color", "rgb(0, 128, 0)").data('clicked', false); //button green
  $("#oneT").css("background-color", "rgb(220, 20, 60)").data('clicked', true); //button red
}

function disSimulationRuns(){
  $("#oneT,#twoT,#threeT,#fourT,#fiveT").css("background-color", "rgb(211, 211, 211)").attr("disabled", true); //grey buttons and disable
}

function enSimulationRuns(){
  $("#oneT,#twoT,#threeT,#fourT,#fiveT").removeAttr("disabled"); //re-enable buttons
}

function disStart(){
  $("#simulationStart").attr("disabled", true)
}

function enStart(){
  $("#simulationStart").css("background-color", "rgb(0, 128, 0)").removeAttr("disabled");
}

function enReset(){
  $("#restartPage").css("background-color", "rgb(0, 128, 0)")
}

function setNonWorkingDays(){
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

function setSimulationRuns(){
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

//Event handler called whenever there is a change to the task table
function taskUpdate() {

  var tableRef = document.getElementById("taskEntryTable");

  //start at i = 2 because the first two rows of the HTML task table have no task data
  for (var i = 2; i < tableRef.rows.length; i++) {

    // start date in first row of task table is input box, subsequent rows are just table cells so reference differently 
    if (i === 2) {
      var startDate = new Date(tableRef.rows[i].cells[2].children[0].value);
    } else if (i > 2) {
      var startDate = new Date(revDateStr(tableRef.rows[i].cells[2].textContent));
    }

    // if no task start date error out
    if (!Date.parse(startDate)) {
      errorHandler(0);
    }
    let bcDuration = parseInt(tableRef.rows[i].cells[3].children[0].value);
    if (bcDuration) {
      let bcDate = calcWorkingDays(startDate, bcDuration).toLocaleDateString();
      tableRef.rows[i].cells[6].innerText = bcDate;
      if (tableRef.rows.length > 3) {
        // update the row start date and display start date in the task table field
        tableRef.rows[tableRef.rows.length - 1].cells[2].innerHTML = tableRef.rows[tableRef.rows.length - 2].cells[6].innerHTML;
      }
    }
    let mlDuration = parseInt(tableRef.rows[i].cells[4].children[0].value);
    if (mlDuration) {
      let mlDate = calcWorkingDays(startDate, mlDuration).toLocaleDateString();
      tableRef.rows[i].cells[7].innerHTML = mlDate;
    }
    let wcDuration = parseInt(tableRef.rows[i].cells[5].children[0].value);
    if (wcDuration) {
      let wcDate = calcWorkingDays(startDate, wcDuration).toLocaleDateString();
      tableRef.rows[i].cells[8].innerHTML = wcDate;
    }
    if ((bcDuration > mlDuration) || (mlDuration > wcDuration) || (bcDuration > wcDuration)) {
      errorHandler(2);
    }
  }
  if (tableRef.rows[tableRef.rows.length - 1].cells[8].innerText != "") {
    addTableRow(); // add a task table row
    enStart(); //enable the simualtion start button
    // update the row start date and display start date in the task table field
    tableRef.rows[tableRef.rows.length - 1].cells[2].innerHTML = tableRef.rows[tableRef.rows.length - 2].cells[6].innerHTML;
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

  if ($("#monDay").data("clicked")) { nonWorkingDays.push("1"); }
  if ($("#tuesDay").data("clicked")) { nonWorkingDays.push("2"); }
  if ($("#wednesDay").data("clicked")) { nonWorkingDays.push("3"); }
  if ($("#thursDay").data("clicked")) { nonWorkingDays.push("4"); }
  if ($("#friDay").data("clicked")) { nonWorkingDays.push("5"); }
  if ($("#saturDay").data("clicked")) { nonWorkingDays.push("6"); }
  if ($("#sunDay").data("clicked")) { nonWorkingDays.push("0"); }

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

//function workingDayUpdate() {
  //Event handler called whenever there is a change to the non working day checkbox array
//  taskUpdate(); // call the task update function to revise dates
//}

function addTableRow() {
  //function adds a new row into the task entry table
  let tableRef = document.getElementById("taskEntryTable");
  let newTaskRow = tableRef.insertRow(tableRef.rows.length);

  newTaskRow.insertCell(0).classList.add("taskNo");
  newTaskRow.insertCell(0).innerText = tableRef.rows.length - 2;
  newTaskRow.insertCell(1).classList.add("taskDes");
  newTaskRow.insertCell(1).innerHTML = '<input type="text" class="taskDescriptionBox taskDes" />';
  newTaskRow.insertCell(2).classList.add("sDate");
  newTaskRow.insertCell(3).classList.add("taskDuration","bCase");
  newTaskRow.insertCell(3).innerHTML = '<input type= "number" min="0" class="taskDurationBox bCase"/>';
  newTaskRow.insertCell(4).classList.add("taskDuration", "mlCase");
  newTaskRow.insertCell(4).innerHTML = '<input type= "number" min="0" class="taskDurationBox mlCase"/>';
  newTaskRow.insertCell(5).classList.add("taskDuration", "wCase");
  newTaskRow.insertCell(5).innerHTML = '<input type= "number" min="0" class="taskDurationBox wCase"/>';
  newTaskRow.insertCell(6).classList.add("taskDate", "bCase");
  newTaskRow.insertCell(7).classList.add("taskDate", "mlCase");
  newTaskRow.insertCell(8).classList.add("taskDate", "wCase");
}

function runSimulation() {
  //runs the Monte Carlo simulation

  var tableRef = document.getElementById("taskEntryTable");
  var simRunsArray = [];
  var runDuration = 0;  // initialise the sum of random variates for each simulation run

// get the number of simulation runs from the DOM 
  if ($("#oneT").data("clicked")) { simRuns =1000; }
  if ($("#twoT").data("clicked")) { simRuns =2000; }
  if ($("#threeT").data("clicked")) { simRuns =3000; }
  if ($("#fourT").data("clicked")) { simRuns =4000; }
  if ($("#fiveT").data("clicked")) { simRuns =5000; }
  
  disSimulationRuns(); //disable simulation runs buttons
  disNonWorkingDays(); // disable non working days buttons

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
    enSimulationRuns(); //enable simulation runs buttons
    initSimulationRuns(); // re initialise simulation runs buttons
    enNonWorkingDays(); // enable non working days buttons
    initNonWorkingDays(); // re initialise non working days buttons
  }
  return simRunsArray;
}
function reLoad(){
  //restarts everything!

  window.location.reload();
}

function monteCarlo() {
  //This is the core simulation function and is called when the "start" button is clicked

  var dataPoints = 10; //number of data points for plotting probability chart
  //this is the callback function called when the simulation start button is clecked
  document.getElementById("simulationStart").style.backgroundColor = "red"; //turn button red for the duration of the simulation
  document.getElementById("plotPanel").style.display = "block";

  google.charts.load("current", { packages: ["timeline"] });
  google.charts.setOnLoadCallback(drawTimeLine); //plot timeline on call back
  let simRunsArray = runSimulation(); //run core simulation

  let results = resultProc(simRunsArray, dataPoints); // process simulation runs into frequency buckets and determine project durations 

  let resultsProj = addProjectDates(results, dataPoints); // assign dates to project duration dates 

  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawProbabilityChart(resultsProj, dataPoints)); //plot probability chart
  document.getElementById("simulationStart").style.backgroundColor = "green"; // turn button green when simulation complete

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
  //alert("max days = "+ maxDuration);
  var minDuration = Math.min.apply(null, numbers);
  //alert("min days = "+ minDuration);
  var binWidth = ((maxDuration - minDuration) / dataSamples);
  for (j = 1; j < dataSamples; j++) {
    for (let i = 0; i < popSize; i++) {
      if (numbers[i] < ((binWidth * j))) {
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
    //alert("date = "+ resultsArray[i].projectDate + " "+ "percent = "+ resultsArray[i].percentage);
    if (resultsArray[i].percentage === 1) { break; }  // break out of the loop early if 100% reached
  }
  var data = google.visualization.arrayToDataTable(dataArray);

  //add plot options
  var options = {
    title: 'Probability of Completing The Project',
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
    timeline: { groupByRowLabel: true },
    colors: ["#90ee90", "#ffa500", "#ff4500"],
    timeline: { colorByRowLabel: false },
  }
  chart.draw(plotTable, options);

  // Credit: this function was inspired by the code examples provided at: https://developers.google.com/chart/interactive/docs/gallery/timeline

}

function randomVariat(bestCase, mostLikelyCase, worstCase) {
  // This function returns a triangular distributed random variat from the Best Case, Most Likely Case and Worst Case
  // estimates passed to it.
  // Returns integer values only 
  let sample = Math.random();
  if (sample <= ((mostLikelyCase - bestCase) / (worstCase - bestCase))) {
    return math.round(bestCase + Math.sqrt((worstCase - bestCase) * (mostLikelyCase - bestCase) * sample));
  } else if (sample > ((mostLikelyCase - bestCase) / (worstCase - bestCase))) {
    return math.round(worstCase - Math.sqrt((worstCase - bestCase) * (worstCase - mostLikelyCase) * (1 - sample)));
  } else {
    errorHandler(1);
  }
}


function errorHandler(errorCode) {
  document.getElementById("alert").style.display = "block";
  document.getElementById("alert").classList.add("alertbox")
  switch (errorCode) {
    case 0:
      document.getElementById("alert").innerText = 'No start date entered: error code 0';
      break;
    case (1):
      document.getElementById("alert").innerText = 'Out of range Gantt or Triangular distributed variat : error code 1';
      break;
    case (2):
      document.getElementById("alert").innerText = 'Best case duration musts be less that most likely case duration and most likely case duration must be less than worst case duration : error code 2';
      break;
    case (3):
      document.getElementById("alert").innerText = 'You must include at least 1 working day: error code 3';
      break;
    default:
      document.getElementById("alert").innerText = 'Unkown error code';
  }
  document.getElementById("alert").addEventListener("click", hideAlert);
}

function hideAlert() {
  document.getElementById("alert").style.display = "none";
}



// Event listeners 
// Sets up event listener for changes to the task table
document.getElementById("taskEntryTable").addEventListener("change", taskUpdate);

// Sets up event listener for changes to the working day checkbox array 
// credit: https://stackoverflow.com/questions/44988614/pass-this-to-addeventlistener-as-parameter
var workingDays = document.getElementsByClassName('checkboxInput');
Array.from(workingDays).forEach(function () {
  this.addEventListener("change", workingDayUpdate, false);
});

//Sets up event listener for "Start Simulation" & "Restart Page" buttons
document.getElementById("simulationStart").addEventListener("click", monteCarlo);
document.getElementById("restartPage").addEventListener("click", reLoad);
