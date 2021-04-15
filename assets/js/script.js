

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawProbabilityChart);

class Task {
  constructor(taskNo, taskDescription, taskSucessor, startDate, bestCaseEstimate, mostLikelyCaseEstimate,
    worstCaseEstimate, bestCaseCompletion, mostLikelyCaseCompletion, worstCaseCompletion, randomDuration) {
    this.taskNo = taskNo;
    this.taskDescription = taskDescription;
    this.taskSucessor = taskSucessor;
    this.startDate = startDate;
    this.bestCaseEstimate = bestCaseEstimate;
    this.mostLikelyCaseEstimate = mostLikelyCaseEstimate;
    this.worstCaseEstimate = worstCaseEstimate;
    this.bestCaseCompletion = bestCaseCompletion;
    this.mostLikelyCaseCompletion = mostLikelyCaseCompletion;
    this.worstCaseCompletion = worstCaseCompletion;
    this.randomDuration = randomDuration;
  }
};
// Adds a row into the task table
var taskList = []; //array of objects with class Task

//addTableRow();
//addTableRow();

function taskUpdate() {

  //Event handler called whenever there is a change to the task table
  var tableRef = document.getElementById("taskEntryTable");
  for (var i = 2; i < tableRef.rows.length; i++) {
    
    // start date in first row of task table is input box, subsequent rows are just table cells so reference differently 
    if (i === 2) {
      var startDate = new Date(tableRef.rows[i].cells[2].children[0].value);
      //alert("start date first line" + startDate);
      } else if (i > 2) {
      var startDate = new Date(Date.parse(tableRef.rows[i].cells[2].innerHTML));
      alert("start date subsequent" + startDate);
    }
    

    // if no task start date error out
    if (!(startDate)) {
      errorHandler(0);
    }
    var bcDuration = parseInt(tableRef.rows[i].cells[3].children[0].value);
    //alert("best case D: " + bcDuration);
    //alert("start date");
    if (bcDuration) {
      let bcDate = calcWorkingDays(startDate, bcDuration).toLocaleDateString();
      tableRef.rows[i].cells[6].innerText = bcDate;
      //alert("best case Duration: " + bcDuration + " start date: " + startDate + " best case date: " + bcDate);
    }
    let mlDuration = parseInt(tableRef.rows[i].cells[4].children[0].value);
    //alert("ml case D: " + mlDuration);
    if (mlDuration){
      let mlDate = calcWorkingDays(startDate, mlDuration).toLocaleDateString();
      tableRef.rows[i].cells[7].innerHTML = mlDate;
      //alert("ml case: " + mlDate);
    }
    let wcDuration = parseInt(tableRef.rows[i].cells[5].children[0].value);
    //alert("wc case D: " + wcDuration);
    if (wcDuration){
      let wcDate = calcWorkingDays(startDate, wcDuration).toLocaleDateString();
      tableRef.rows[i].cells[8].innerHTML = wcDate;
      //alert("wc case: " + wcDate);
    }
  }
  if (document.readyState === "complete") { //wait for the DOM to load
    if (tableRef.rows[tableRef.rows.length - 1].cells[8].innerText != "") {
      addTableRow();
      // update the row start date and display start date in the task table field
      tableRef.rows[tableRef.rows.length - 1].cells[2].innerHTML = tableRef.rows[tableRef.rows.length - 2].cells[6].innerHTML;
    }
  }
}
function newUYDate(pDate) {
  let dd = pDate.split("/")[0].padStart(2, "0");
  let mm = pDate.split("/")[1].padStart(2, "0");
  let yyyy = pDate.split("/")[2].split(" ")[0];
  let hh = pDate.split("/")[2].split(" ")[1].split(":")[0].padStart(2, "0");
  let mi = pDate.split("/")[2].split(" ")[1].split(":")[1].padStart(2, "0");
  let secs = pDate.split("/")[2].split(" ")[1].split(":")[2].padStart(2, "0");

  mm = (parseInt(mm) - 1).toString(); // January is 0

  return new Date(yyyy, mm, dd, hh, mi, secs);
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


function workingDayUpdate(ele) {
  //Event handler called whenever there is a change to the non working day checkbox array//
  alert(ele.target.value);
}



function addTableRow() {


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

function updateTaskList(taskList) {
  // updates the task list taskList (array of objects of call task)// 
}

function monteCarlo(taskList) {
  //runs the Monte Carlo simulation //
  google.charts.load("current", { packages: ["timeline"] });
  google.charts.setOnLoadCallback(drawTimeLine);

}

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

function drawProbabilityChart() {
  var chart = new google.visualization.ScatterChart(document.getElementById('plot1'));
  var data = google.visualization.arrayToDataTable([
    ['Date', '% Probability'],
    [new Date(2021, 5, 10), 100],
    [new Date(2021, 5, 9), 90],
    [new Date(2021, 5, 8), 80],
    [new Date(2021, 5, 5), 70],
    [new Date(2021, 5, 3), 60],
    [new Date(2021, 4, 31), 50],
  ]);

  var options = {
    title: 'Probability of Completing The Project',
    hAxis: { title: 'Date', minValue: new Date(2021, 4, 30), maxValue: new Date(2021, 5, 15) },
    vAxis: { title: '% Probability', minValue: 50, maxValue: 100 },
    legend: 'none'
  };
  chart.draw(data, options);
}


function drawTimeLine() {
  var container = document.getElementById('plot2');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();
  var options = {
    timeline: { groupByRowLabel: true }
  };

  dataTable.addColumn({ type: 'string', id: 'Position' });
  dataTable.addColumn({ type: 'string', id: 'Name' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });

  let tableRef = document.getElementById("taskEntryTable");
  let dataTableLength = tableRef.rows.length - 2;
  dataTable.addTableRow(dataTableLength);
  dataTable.setCell(0, 0, tableRef.rows[2].cells[1].innerHTML);
  dataTable.setCell(0, 1, "Best Case");
  dataTable.setCell(0, 2, new Date(tableRef.rows[2].cells[2].children[0].value));
  dataTable.setCell(0, 3, new Date(tableRef.rows[2].cells[6].children[0].value));


  //dataTable[0].Position = tableRef.rows[2].cells[1].innerHTML;
  //dataTable[0].Name = "Best Case";
  //dataTable[0].Start = new Date(tableRef.rows[2].cells[2].children[0].value);
  //dataTable[0].End = new Date(tableRef.rows[2].cells[6].children[0].value);


  alert(dataTable);

  //dataTable.addRows([
  //  ['Task1', 'BC', new Date(2021, 4, 8), new Date(2021, 4, 13)],
  //  ['Task1', 'MLC', new Date(2021, 4, 13), new Date(2021, 4, 20)],
  //  ['Task1', 'WC', new Date(2021, 4, 20), new Date(2021, 4, 27)],
  //  ['Task2', 'BC', new Date(2021, 4, 14), new Date(2021, 4, 23)],
  //  ['Task2', 'MLC', new Date(2021, 4, 23), new Date(2021, 4, 29)],
  //  ['Task2', 'WC', new Date(2021, 4, 29), new Date(2021, 5, 6)],
  //  ['Task3', 'BC', new Date(2021, 4, 24), new Date(2021, 4, 31)],
  //  ['Task3', 'MLC', new Date(2021, 4, 31), new Date(2021, 5, 7)],
  //  ['Task3', 'WC', new Date(2021, 5, 7), new Date(2021, 5, 10)]
  //]);

  chart.draw(dataTable, options);
}



function randomVariat(bestCase, mostLikelyCase, worstCase) {
  // This function returns a triangular distributed random variat from the Best Case, Most Likely Case and Worst Case
  // estimates passed to it. 
  var sample = Math.random();
  if (sample < ((mostLikelyCase - bestCase) / (worstCase - bestCase))) {
    return (bestCase + Math.sqrt((worstCase - bestCase) * (mostLikelyCase - bestCase) * sample));
  } else if (sample >= ((mostLikelyCase - bestCase) / (worstCase - bestCase))) {
    return (worstCase - Math.sqrt((worstCase - bestCase) * (worstCase - mostLikelyCase) * (sample)));
  } else {
    errorHandler(1);
  }
}


function errorHandler(errorCode) {
  switch (errorCode) {
    case 0:
      alert('No start date entered: error code 0');
      break;
    case (1):
      alert('Out of range Gantt or Triangular distributed variat : error code ${errorCode}');
      break;
    default:
      alert("Unknown error code reported");
  }
}
// Event listeners 
// Sets up event listener for changes to the task table
document.getElementById("taskEntryTable").addEventListener("change", taskUpdate);

// Sets up event listener for changes to the working day checkbox array 
// acknowledgement https://stackoverflow.com/questions/44988614/pass-this-to-addeventlistener-as-parameter
var workingDays = document.getElementsByClassName('checkboxInput');
Array.from(workingDays).forEach(function () {
  this.addEventListener("change", workingDayUpdate, false);
});

//Sets up event listener for "Start Simulation" button
document.getElementById("simulationStart").addEventListener("click", monteCarlo);
