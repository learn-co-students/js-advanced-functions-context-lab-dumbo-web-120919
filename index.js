/* Your Code Here */
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    this.timeInEvents.push(
        {
            type: "TimeIn",
            hour: Number(hour),
            date: date
        }
    )

    return this
}

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    this.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: Number(hour),
            date: date
        }
    )

    return this
}

function hoursWorkedOnDate(date) {
    // find the matching date in timeIn && timeOut
    let timeOut = this.timeOutEvents.find(event => (event.date === date))
    let timeIn = this.timeInEvents.find(event => (event.date === date))
    // calculate hours worked 
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date)
    let rate = this.payPerHour
    return rate * hoursWorked
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
}


function calculatePayroll(employees) {
    // loop thru each employee object and add up all of their wages
    let payroll = employees.reduce(function(accumulator, currEmployee) {
        return accumulator + allWagesFor.call(currEmployee)
    }, 0)

    return payroll
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}