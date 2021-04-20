

//Event handler called whenever there is a change to the task table
function taskUpdate() {

  var tableRef = document.getElementById("taskEntryTable");

  //start at i = 2 because the first two rows of the HTML task table have no task data
  for (var i = 2; i < tableRef.rows.length; i++) {

    // start date in first row of task table is input box, subsequent rows are just table cells so reference differently 
    if (i === 2) {
      var startDate = new Date(tableRef.rows[i].cells[2].children[0].value);
    } else if (i > 2) {
      //var sDate =tableRef.rows[i].cells[2].textContent ;
      var startDate = new Date(revDateStr(tableRef.rows[i].cells[2].textContent));
    }

    // if no task start date error out
    if (!Date.parse(startDate)) {
      alert("error");
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
    addTableRow();
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

  var workingDay = 0;
  while (workingDay < days) {
    fromDate.setDate(fromDate.getDate() + 1);
    if (fromDate.getDay() != 0 && fromDate.getDay() != 6) // Skip weekends
      workingDay++;
  }
  return fromDate;
}


function checkTaskEntry(taskTablelength) {

}


function workingDayUpdate() {

  //Event handler called whenever there is a change to the non working day checkbox array//
  var NonWorkingDay = [7];

  alert(ele.target.value);
  alert("got here 5");
}



function addTableRow() {
  //function adds a new row into the task entry table
  let tableRef = document.getElementById("taskEntryTable");
  var newTaskRow = tableRef.insertRow(tableRef.rows.length);
  var cell1 = newTaskRow.insertCell(0);
  var cell2 = newTaskRow.insertCell(1);
  var cell3 = newTaskRow.insertCell(2);
  var cell4 = newTaskRow.insertCell(3);
  var cell5 = newTaskRow.insertCell(4);
  var cell6 = newTaskRow.insertCell(5);
  var cell7 = newTaskRow.insertCell(6);
  var cell8 = newTaskRow.insertCell(7);
  var cell9 = newTaskRow.insertCell(8);

  var inputBox = document.createElement("input");

  cell1.classList.add("taskNo");
  cell1.innerText = tableRef.rows.length - 2;
  cell2.classList.add("taskDescriptionBox");
  cell2.innerHTML = '<input type="text" class="taskDescriptionBox" />';
  cell3.classList.add("taskDateBox");
  cell3.innerText = "";
  cell4.classList.add("taskDuration");
  cell4.innerHTML = '<input type= "number" min="0" class="taskDurationBox"/>';
  cell5.classList.add("taskDuration");
  cell5.innerHTML = '<input type= "number" min="0" class="taskDurationBox"/>';
  cell6.classList.add("taskDuration");
  cell6.innerHTML = '<input type= "number" min="0" class="taskDurationBox"/>';
  cell7.classList.add("taskDate");
  cell7.innerText = "";
  cell8.classList.add("taskDate");
  cell8.innerText = "";
  cell9.classList.add("taskDate");
  cell9.innerText = "";
}


function monteCarlo(taskList) {
  //runs the Monte Carlo simulation
  google.charts.load("current", { packages: ["timeline"] });
  google.charts.setOnLoadCallback(drawTimeLine);
  var tableRef = document.getElementById("taskEntryTable");
  var simRunsArray = [];

  let simRuns = document.getElementById("simulationRuns").value;
  var runDuration = 0;  // initialise the sum of random variates for each simulation run
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

  let results = resultProc(simRunsArray);

  let resultsProj = addProjectDates(results);

  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawProbabilityChart(resultsProj));
}

function addProjectDates(resultsArray) {
  let tableRef = document.getElementById("taskEntryTable");
  let startDate = new Date(tableRef.rows[2].cells[2].children[0].value);
  for (i = 0; i < 10; i++) {
    resultsArray[i].projectDate = (calcWorkingDays(startDate, resultsArray[i].projectDays)).toString();
  }
  return resultsArray;
}




function resultProc(numbers) {
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
  var freqbucket = Math.ceil((Math.max.apply(null, numbers) - Math.min.apply(null, numbers)) / 10);
  var fCount = 0;
  var popSize = numbers.length;
  var histoArray = [];

  for (j = 1; j < 10; j++) {
    for (let i = 0; i < popSize; i++) {
      if (numbers[i] < Math.ceil(Math.min.apply(null, numbers) + (freqbucket * j))) {
        fCount = fCount + 1;
      }
    }
    histoArray.push(new Results());
    histoArray[j - 1].freqCount = fCount;
    histoArray[j - 1].percentage = fCount / popSize;
    histoArray[j - 1].projectDays = freqbucket * j;
    fCount = 0;
  }
  // hard code the 100% entry to include the entire population
  histoArray.push(new Results());
  histoArray[9].freqCount = popSize;
  histoArray[9].percentage = 1; //100% expressed as a decimal
  histoArray[9].projectDays = Math.max.apply(null, numbers);

  return histoArray;
}

function drawProbabilityChart(resultsArray) {
  var chart = new google.visualization.ScatterChart(document.getElementById('plot1'));
  alert("got here 1");
  //construct data array for plotting in the scatter plot
  var dataArray = [['Date', '% Probability']];
  for (i = 0; i < 10; i++) {
    dataArray.push([(resultsArray[i].projectDate), resultsArray[i].percentage * 100]);
  }
  var data = google.visualization.arrayToDataTable(dataArray);

  //add plot options
  var options = {
    title: 'Probability of Completing The Project',
    hAxis: { title: 'Date', minValue: resultsArray[0].projectDate, maxValue: resultsArray[9].projectDate },
    vAxis: { title: '% Probability', minValue: 0, maxValue: 100 },
    legend: 'none'
  };

  //generate chart
  chart.draw(data, options);
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


  //let noTasks = tableRef.rows.length -3;      // -3 becuase first two rows of the task table have no data and the last row will always be empty                 
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
    timeline: { groupByRowLabel: true }
  };
  chart.draw(plotTable, options);

  // Credit: this function was inspired by the code examples provided at: https://developers.google.com/chart/interactive/docs/gallery/timeline

}



function randomVariat(bestCase, mostLikelyCase, worstCase) {
  // This function returns a triangular distributed random variat from the Best Case, Most Likely Case and Worst Case
  // estimates passed to it. 
  let sample = Math.random();
  if (sample < ((mostLikelyCase - bestCase) / (worstCase - bestCase))) {
    return (bestCase + Math.sqrt((worstCase - bestCase) * (mostLikelyCase - bestCase) * sample));
  } else if (sample >= ((mostLikelyCase - bestCase) / (worstCase - bestCase))) {
    return (worstCase - Math.sqrt((worstCase - bestCase) * (worstCase - mostLikelyCase) * (sample)));
  } else {
    errorHandler(1);
  }
}


function errorHandler(errorCode) {
  document.getElementById("alert").style.display = "block";
  switch (errorCode) {
    case 0:
      document.getElementById("alert").innerText = 'No start date entered: error code 0';
      break;
    case (1):
      document.getElementById("alert").innerText = 'Out of range Gantt or Triangular distributed variat : error code 1';
      break;
    case (2):
      document.getElementById("alert").innerText = ' Best case duration musts be less that most likely case duration and most likely case duration must be less than worst case duration : error code 2';
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

document.getElementById("nonWorkingDay").addEventListener("CheckboxStateChange", workingDayUpdate, false);

// Sets up event listener for changes to the working day checkbox array 
// acknowledgement https://stackoverflow.com/questions/44988614/pass-this-to-addeventlistener-as-parameter
//var workingDays = document.getElementsByClassName('checkboxInput');
//Array.from(workingDays).forEach(function () {
//  this.addEventListener("change", workingDayUpdate, false);
//});

//Sets up event listener for "Start Simulation" button
document.getElementById("simulationStart").addEventListener("click", monteCarlo);


