function createEmployeeRecord(array) {
    let employeeRecordObject = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
};
return employeeRecordObject;
};

function createEmployeeRecords(arrayOfArrays) {
    let employeeRecordsArray = [];
    arrayOfArrays.forEach( array => employeeRecordsArray.push(createEmployeeRecord(array)) )
    return employeeRecordsArray;
};

function createTimeInEvent(dateStamp) {
// dateStamp in "YYYY-MM-DD HHMM" format
let timeInObject = {
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.slice(0, 10)
}
this.timeInEvents.push(timeInObject);
return this;
};

function createTimeOutEvent(dateStamp) {
let timeOutObj = {
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.slice(0, 10)
};
this.timeOutEvents.push(timeOutObj);
return this;
};

function hoursWorkedOnDate(soughtDate) {
    // date is in form "YYYY-MM-DD"
    let timeInObj = this.timeInEvents.find( timeInEvent => timeInEvent.date === soughtDate);
    console.log(this);
    let timeOutObj = this.timeOutEvents.find( timeOutEvent => timeOutEvent.date === soughtDate);
    let hoursWorked = Math.abs((timeOutObj.hour - timeInObj.hour) / 100);
    return hoursWorked;
};


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