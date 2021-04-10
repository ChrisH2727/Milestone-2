

google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(drawTimeLine);
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawProbabilityChart);

class Task {
  constructor(taskNo, taskDescription, taskSucessor, startDate, bestCaseEstimate, mostLikelyCaseEstimate, 
              worstCaseEstimate, bestCaseCompletion, mostLikelyCaseCompletion, worstCaseCompletion, randomDuration)
  {
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
var taskList = []; //array of objects with class Task 

function taskUpdate(){
  //Event handler called whenever there is a change to the task table//
  alert(document.getElementById("taskTable").rows[1].cells[3].innerHTML);
}

function workingDayUpdate(ele) {
  //Event handler called whenever there is a change to the non working day checkbox array//
  alert(ele.target.value);
}


function checkTaskEntry(){
  // Called to check best case, most likely case and worst case duration values on entry to the task table??   
}

function addTableRow(){
// Adds a row into the task table //
}

function updateTaskList(taskList){
// updates the task list taskList (array of objects of call task)// 
}

function monteCarlo (taskList){
  //runs the Monte Carlo simulation //
  
  alert(document.getElementById("simulationRuns").value);
}

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

function drawProbabilityChart() {
  var chart = new google.visualization.ScatterChart(document.getElementById('plot1'));
  var data = google.visualization.arrayToDataTable([
    ['Date', '% Probability'],
    [new Date(2021, 5, 10),100],
    [new Date(2021, 5, 9),90],
    [new Date(2021, 5, 8),80],
    [new Date(2021, 5, 5),70],
    [new Date(2021, 5, 3),60],
    [new Date(2021, 4, 31),50],
  ]);

  var options = {
    title: 'Probability of Completing The Project',
    hAxis: {title: 'Date', minValue: new Date(2021,4,30), maxValue: new Date(2021, 5, 15)},
    vAxis: {title: '% Probability', minValue:50, maxValue:100 },
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
  dataTable.addRows([
    [ 'Task1', 'BC', new Date(2021, 4, 8), new Date(2021, 4, 13)],
    [ 'Task1', 'MLC', new Date(2021, 4, 13), new Date(2021, 4, 20)],
    [ 'Task1', 'WC', new Date(2021, 4, 20), new Date(2021, 4, 27)],
    [ 'Task2', 'BC', new Date(2021, 4, 14), new Date(2021, 4, 23)],
    [ 'Task2', 'MLC', new Date(2021, 4, 23), new Date(2021, 4, 29)],
    [ 'Task2', 'WC', new Date(2021, 4, 29), new Date(2021, 5, 6)],
    [ 'Task3', 'BC', new Date(2021, 4, 24), new Date(2021, 4, 31)],
    [ 'Task3', 'MLC', new Date(2021, 4, 31), new Date(2021, 5, 7)],
    [ 'Task3', 'WC', new Date(2021, 5, 7), new Date(2021, 5, 10)]
  ]);

  chart.draw(dataTable,options);
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


function randomVariat(bestCase,mostLikelyCase,worstCase){
  // This function returns a triangular distributed random variat from the Best Case, Most Likely Case and Worst Case
  // estimates passed to it. 
  var sample = Math.random();
      if (sample < ((mostLikelyCase - bestCase)/(worstCase - bestCase))){
        return (bestCase + Math.sqrt((worstCase - bestCase)*(mostLikelyCase - bestCase) * sample));
      } else if (sample >= ((mostLikelyCase - bestCase)/(worstCase - bestCase))){
        return (worstCase - Math.sqrt((worstCase - bestCase) * (worstCase - mostLikelyCase) * (sample)));
      } else {
        errorHandler(1);
      }
  }

  
function errorHandler (errorCode) {
   switch(errorCode){
     case 0:
       alert(`Unknown condition detected: error code $(errorCode)`);
       break;
     case(1):
       alert(`Out of range Gantt or Triangular distributed variat : error code $(errorCode)`);
       break;
     default:
       alert("Unknown error code reported");
   }
}
// Event listeners //
// Sets up event listener for changes to the task table //
document.getElementById("taskTable").addEventListener("change", taskUpdate);

// Sets up event listener for changes to the working day checkbox array //
// acknowledgement https://stackoverflow.com/questions/44988614/pass-this-to-addeventlistener-as-parameter//
var workingDays = document.getElementsByClassName('checkboxInput');
Array.from(workingDays).forEach(function() { this.addEventListener("change", workingDayUpdate, false);
});

//Sets up event listener for "Start Simulation" button
document.getElementById("simulationStart").addEventListener("click", monteCarlo);
