

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



function taskUpdate() {

  //Event handler called whenever there is a change to the task table
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
    if (!(startDate)) {
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
  }
  if (document.readyState === "complete") { //wait for the DOM to load
    if (tableRef.rows[tableRef.rows.length - 1].cells[8].innerText != "") {
      addTableRow();
      // update the row start date and display start date in the task table field
      tableRef.rows[tableRef.rows.length - 1].cells[2].innerHTML = tableRef.rows[tableRef.rows.length - 2].cells[6].innerHTML;
    }
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
  //runs the Monte Carlo simulation
  alert("simulation start");
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

  // -3 becuase first two rows of the task table have no data and the last row will always be empty
  let dataTableLength = tableRef.rows.length - 3;

  alert("data table length = " + (tableRef.rows.length - 3));

  //set number of rows in the the plot data table from the HTML task table * 3 for Best Case, Most Likely Case and Worst Case dates
  //each task table row maps onto 3 plot table rows
  plotTable.addRows(dataTableLength * 2);
  
  alert ("plot table length " + plotTable.addRows(dataTableLength * 2) );

  //populate the plot data table by row and column
  //note that the 3 of the columns in each of the 3 plot table rows requires different data so further "for" loops not practical  
  for (let plotTableRow = 0; plotTableRow < dataTableLength; plotTableRow++) {
    plotTable.setCell(plotTableRow, 0, (tableRef.rows[plotTableRow + 2].cells[1].children[0].value));
    plotTable.setCell(plotTableRow, 1, "Best Case");
    
    // start date in first row of task table is input box, subsequent rows are just table cells so reference differently 
    if (plotTableRow === 0) {
        plotTable.setCell(plotTableRow, 2, new Date(tableRef.rows[plotTableRow + 2].cells[2].children[0].value));
    } else if (plotTableRow > 0){
        plotTable.setCell(plotTableRow, 2,  new Date(revDateStr(tableRef.rows[plotTableRow + 2].cells[2].textContent)));
    }
    
    plotTable.setCell(plotTableRow, 3, new Date(revDateStr(tableRef.rows[plotTableRow +2].cells[6].textContent)));

    plotTable.setCell(plotTableRow + 1, 0, (tableRef.rows[plotTableRow + 2].cells[1].children[0].value));
    plotTable.setCell(plotTableRow + 1, 1, "Most Likely Case");
    plotTable.setCell(plotTableRow + 1, 2, new Date(revDateStr(tableRef.rows[plotTableRow +2].cells[6].textContent)));
    plotTable.setCell(plotTableRow + 1, 3, new Date(revDateStr(tableRef.rows[plotTableRow +2].cells[7].textContent)));

    plotTable.setCell(plotTableRow + 2, 0, (tableRef.rows[plotTableRow + 2].cells[1].children[0].value));
    plotTable.setCell(plotTableRow + 2, 1, "Worst Case");
    plotTable.setCell(plotTableRow + 2, 2, new Date(revDateStr(tableRef.rows[plotTableRow +2].cells[7].textContent)));
    plotTable.setCell(plotTableRow + 2, 3, new Date(revDateStr(tableRef.rows[plotTableRow +2].cells[8].textContent)));
  }

  var options = {
    timeline: { groupByRowLabel: true }
  };
  chart.draw(plotTable, options);

  // Credit: this function was inspired by the code examples provided at: https://developers.google.com/chart/interactive/docs/gallery/timeline

  //alert("Task name = " + tableRef.rows[2].cells[1].textContent);
  //alert("start date = " + new Date((tableRef.rows[2].cells[2].children[0].value)));
  //alert("finish date = " + new Date(revDateStr(tableRef.rows[2].cells[6].innerText)));

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
