# Milestone Project 2 - Fast Project Scheduling

## Table of Contents

    1.0 Introduction
        1.1 Why The Project?
        1.2 Monte Carlo Simulation
        1.3 Random Numbers and All That

    2.0 UX
        2.1 User Stories
        2.2 Strategy
        2.3 Structure
        2.4 (Surface) Wireframes

    3.0 Features
        3.1 Features Implemented
            3.1.1 Section 1 - The Task Entry Table
            3.1.2 Section 2 - Non Working Days & Simulation Runs Buttons
            3.1.3 Section 3 - Timeline Plot & Probability Plot
            3.1.4 Section 4 - Alert Box
        3.2 Future Features Possibilities
    
    4.0 Technologies Used
    
    5.0 Detailed Requirements
        5.1 Functional Requirements
        5.2 Non Functional Requirements

    6.0 Code Design Description
        6.1 Data Structures and Handling
        6.2 JavaScript Code Stucture and flow
        6.3 Javascript Functions and their Purpose

    7.0 Testing
        7.1 Test Approach
        7.2 Test Cases & Test Execution

    8.0 Deployment

    9.0 Acknowledgements

    Annex 1. Triangular Probability Distribution

## 1.0 Introduction

### 1.1 Why The Project?

As a project manager I have on many occasions been set the challenge of generating a high level project schedule for the development of a new product or an enhancement to an existing product. Often I am asked to consider more than one option and to consider the risks associated with each.  Somehow such requests usually come about a few days before the next board meeting. While the resulting project schedule(s) appear simple, the effort required can be significant and disruptive to the project team. This need not be the case if an appropriate scheduling tool is used. While there are many project planning tools available that can meet this challenge, they are complex to use and often require significant of initial set up. 
My proposed browser based planning tool overcomes many of the problems by providing a simple interactive user interface that focuses on the need to produce simple project schedule and risk analysis.
Some project planning basics
While agile project management methodologies are used by virtually every organisation involved in development work, they are of little use when preparing an initial project schedule(s) for the project board. The project board will want to know, how long will the project take to complete, what options have been considered and have the associated risks been taken into consideration. Project costs can usually be determined at least at a high level from the schedule.
It has been common practice to estimate the duration of project stages or tasks using a 3 point estimate: 
Best Case:  where it is assumed that nothing goes wrong.
Worst Case: where everything that will go wrong does go wrong
Most Likely Case: what the team lead / technical authority believes will happen
For a simple project schedule where each task or stage has a finish to start relationship with its successor,  total project duration will be the sum of all the individual task or stage durations. Summing the Most Likely durations means that risks have not been factored in and therefore not a reflection of how long the project will take to complete. Summing all the Worst Case durations means that all the risks will mature. This again is unlikely to turn out to be true. In reality, the actual duration of the project will lie somewhere between the sum of the Most Likely Case estimates and the sum  of the Worst Case estimates, but where?

### 1.2 Monte Carlo Simulation

Fortunately, a Monte Carlo simulation can be used to determine not only finish date for the project, but also an associated probability. It is then up to the project board to decide on which project option, but also the delivery date dependant on their risk appetite.
For project scheduling application Monte Carlo simulation involves selecting a random (in the next section we will talk more about what random means) duration task or project stage duration greater than the Best Case estimate and less than the Worst Case estimate and because the project tasks or stages have a simple finish to start relationship, summing together to produce an estimate for the duration of the complete project. By iterating through this process many times we end up with a range of project durations.  

### 1.3 Random Numbers and All That

Most programming languages include a function to generate a random number, either in the range 0 -1 or some other numerical range. Javascript is no exception, however as with other programming languages Javascript generates random numbers with a linear probability of occurrence. Unfortunately project task durations do not follow a linear distribution. The probability of a project task requiring the worst case duration is in reality lower than the probability of the task requiring the most likely time to complete. When selecting a random task duration between the best case and worst case for our Monte Carlo simulation we need to take this into consideration. Fortunately this has all been taken care of by the PERT probability distribution.

While the PERT distribution is not native Javascript nor JQuery, 

## 2.0 UX

### 2.1 User Stories

1. As a project manager I want an online highlevel project planning tool so that I can rapidly assemble a project schedule.

2. As a project manager I want a project planning tool that will accomodate project risks using the well tried and widely understood 3 point estimate: "Best Case", "Most Likely Case" and "Worst Case" approach.

3. As a project manager I want a project planning tool that will calculate a range of probable project completion dates so that the project board can select an option dependant on their appetite for risk.

4. As a project manager I want a project planning tool that will permit me to enter 3 point task estimates in man days and have the task completion dates calculated for me.

5. As a project manager I want a project planning tool that allows me to enter 3 point estimates in tabular form similar to other project planning tools that I am familiar with.

6. As a project manager I want a project planning tool that will allow me to select non working days as a means of controling project resource availability.

7. As a user I want to be able to change my three point task duration estimates and have the planning tool recalculate the task completion dates. 

8. As a user I want information that is not complete not relevent hiden to prevent unnecessary information overload.

9. As a user I want to be informed of any errors that I may make entering data so that I can correct these before moving on.

### 2.2 Strategy

The purpose of this web site is to provide project managers with a high level project scheduling tool that encompases risk management again at a high level. This project scheduling tool is not intended to be used for day to day planning activities. It is intended that this project scheduling tool should be simple and intuitive to use.

### 2.3 Structure

This project scheduling tool consists of a single web page.

### 2.4 (Surface) Wireframes

The web page may be considered in terms of 5 distinct section. 

1. Section 1 Top left - provides a task entry table. 

2. Section 2 Top right - provides buttons for selecting non working days and the number of simulation runs. 

3. Section 3 Middle - provides a timeline for the tasks entered by the user and a probability chart detailing the probability of compleing the project by a given date.

4. Section 4 Bottom  - provides an alert box which is displayed whenever an error is detected.

![wireframe full size](screenshots/fullSize.png)

*fig: Full screen width 1206px*


All pages will render to provide a readable display at 1206px, 768px and 320px screen widths.

![wireframe full size](screenshots/ipad.png){width=80%}
*fig: wireframe representation at 768px*

Colours will be used to guide the user to make the correct assocaitions between information presented by the web page.



## 3.0 Features

### 3.1 Features Implemented

#### 3.1.1 Section 1 - The Task Entry Table

* As the user completes the entry of one line in the task entry table, a new blank line appears automatically.

* The user may enter as many tasks as are required 

* Task numbers are automatically numbered from 1.

* Best case, worst case and most likely case dates are automatically determined based on the non working days selected.

* The user may change either the best case duration, most likely case duration and worst case duration at any time and the table will be recalculated.

* All tasks have a best case finish to best case start relationship with the subsequent task.

* Until atleast one task is fully entered, the submit button is greyed out and disabled.

* Selecting fewer or more non working days using the non working days buttons causes the calculated best case, most likely case and worst case dates displayed by the task entry table to be recalculated. 

* During simulation runs, the Non Working Days and Simulation run buttons are greyed out and disabled to prevent errors while running the simulation algorthm.  

* The restart button is always enabled and when clicked, reloads the complete page.

#### 3.1.2 Section 2 - Non Working Days & Simulation Runs Buttons

The user may select from between 1000 and 5000 simulation runs. Note that it is not possible to select any other value including 0.

when a simulation runs button is clicked it turns from green to red to indicate that it is now active.

The user may select any of the days in the week as non working.

If the user attempts to select all 7 days as non working, then dates in the task table will be marked as invalid and an error message will be displayed at the bottom of the page.  

#### 3.1.3 Section 3 - Timeline Plot & Probability Plot

The timeline plots and probability plots are rendered using Google Charts.

#### 3.1.4 Section 4 - Alert Box

The alert box appears when one of the following error conditions is detected:

* No start date has been entered into the task table.

* A task description has not been provided.

* All days of the week have been selected as non working.

* ......

### 3.2 Future Features Possibilities

1. Add a full calandar from which the user is able to select specific non working days.

2. Replace the non working days selection buttons with resource availability buttons. The user could then select resource availability as a pecentage of full availability.

3. Add a full Gantt chart with the project critical path displayed. A Gantt chart is available from Google Charts.

4. Replace the triangular probablity distribution with a PERT probability distribution. While a PERT probability is not a available as a stand alone library function, the Javascript library stdlib supports the Beta probability. The PERT probability distribution can be obtained from the Beta probability distribution by calculating the alpha and beta parameters from the Best Case, Most Likely Case and Worst Case values.

## 4.0 Technologies Used

* [JQuery](http://jquery.com)

  * The project uses JQuery to simplify DOM manipulation where appropriate. Table referencing by row and cell is more easily undertaken in javaScript

* [Google Charts](https://developers.google.com/chart)

  * Google charts offers a wide variety of configurable charts with a common interface. More importantly, it provides a timeline chart central to the implementation of this project.

* [Plotly](https://plotly.com/javascript/)  

  * Plotly provides a simple to use charting library. Applications may be implemented in just a few lines of javaScript. For this project Plotly was used to test the triangular probability distribution algorithm.

## 5.0 Detailed Requirements

### 5.1 Functional Requirements

### 5.2 Non Functional Requirements

1. The HTML code  must validation by a suitable code validator.

2. The CSS code must pass validation by a suitable code validator.

3. The JavaScript code must pass validation by a suitable code validator.

## 6.0 Code Design Description

### 6.1 Data Structures and Handling

All data required to render the timeline plot and the probability ploy is sourced from the DOM.

......

### 6.2 JavaScript Code Stucture and flow

.....

### 6.3 Javascript Functions and their Purpose

......

## 7.0 Testing

### 7.1 Test Approach

......

### 7.2 Test Cases & Test Execution

........

## 8.0 Deployment

........

## 9.0 Credits

.........

### 9.0 Acknowledgements

......

## Annex 1. Triangular Probability Distribution

Although the equations for generating a triangularly distributed are generally available, no examples of coding in JavaScript are available, and since this is key to the operation of the web page, it was worthy of further investigation.

......