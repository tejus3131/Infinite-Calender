var currentDate = new Date;
var date = currentDate.getDate() - 1;
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
var days = 0;
var mc = 0;
const day_selector = document.querySelector('.day_selector');

function reset() {
    localStorage.setItem("date", currentDate.getDate());
    localStorage.setItem("month", currentDate.getMonth() + 1);
    localStorage.setItem("year", currentDate.getFullYear());
    init();
}

function yearChange() {
    year = document.querySelector('.year').value;
    if (year % 4 == 0) {
        month_list[2][1] = 29;
        month_list[1][0] = 3;
        month_list[2][0] = 6;
    } else {
        month_list[2][1] = 28;
        month_list[1][0] = 4;
        month_list[2][0] = 0;
    }
    selectMonth(month + 1)
    calculate();
}


var month_list = {
    1: [4, 31],
    2: [0, 28],
    3: [0, 31],
    4: [3, 30],
    5: [5, 31],
    6: [1, 30],
    7: [3, 31],
    8: [6, 31],
    9: [2, 30],
    10: [4, 31],
    11: [0, 30],
    12: [2, 31]
}

function showMonth() {
    const monthItem = document.querySelectorAll('.month_selector li');
    monthItem.forEach(item => {
        item.style.display = 'none';
    });

    if (monthItem[month]) {
        monthItem[month].style.display = 'block';
    }
}

function showDay() {
    const dayItem = document.querySelectorAll('.day_selector li');

    dayItem.forEach(item => {
        item.style.display = 'none';
    });

    if (dayItem[date]) {
        dayItem[date].style.display = 'block';
    }
}

function showAllMonths() {
    const monthItem = document.querySelectorAll('.month_selector li');
    monthItem.forEach(item => {
        item.style.display = 'block';
    });
}

function hideAllMonths() {
    const monthItem = document.querySelectorAll('.month_selector li');
    monthItem.forEach(item => {
        item.style.display = 'none';
    });
    monthItem[month].style.display = 'block';
}

function showAllDays() {
    const dayItem = document.querySelectorAll('.day_selector li');

    dayItem.forEach(item => {
        item.style.display = 'block';
    });
}

function hideAllDays() {
    const dayItem = document.querySelectorAll('.day_selector li');

    dayItem.forEach(item => {
        item.style.display = 'none';
    });
    dayItem[date].style.display = 'block';
}

function setDays() {
    days = month_list[month + 1][1];
    day_selector.innerHTML = "";
    for (let i = 0; i < days; i++) {
        const liElement = document.createElement('li');
        liElement.textContent = (i + 1);
        liElement.setAttribute('class', 'day');
        liElement.setAttribute('onmouseover', 'showAllDays()');
        liElement.setAttribute('onmouseout', 'hideAllDays()');
        liElement.setAttribute('onclick', 'selectDay(' + (i + 1) + ')');
        day_selector.appendChild(liElement);
    }
    selectDay(date);
}

function selectMonth(itemIndex) {
    month = itemIndex - 1;
    mc = month_list[month + 1][0];
    showMonth();
    setDays();
    calculate();
}

function selectDay(itemIndex) {
    if (itemIndex > days) {
        date = days - 1;
    }
    else if (itemIndex == date) {
        date = itemIndex;
    }
    else {
        date = itemIndex - 1;
    }
    showDay();
    calculate();
}

function calculate() {
    localStorage.setItem("date", date + 1);
    localStorage.setItem("month", month + 1);
    localStorage.setItem("year", year);
    var data = ((date + 1 + mc + (year * 1.25)) / 7) % 1;
    if (data > 0 && data < 0.13) {
        var currentDay = "Monday";
    }
    else if (data > 0.13 && data < 0.26) {
        var currentDay = "Tuesday";
    }
    else if (data > 0.27 && data < 0.40) {
        var currentDay = "Wednesday";
    }
    else if (data > 0.41 && data < 0.54) {
        var currentDay = "Thursday";
    }
    else if (data > 0.55 && data < 0.69) {
        var currentDay = "Friday";
    }
    else if (data > 0.70 && data < 0.84) {
        var currentDay = "Saturday";
    }
    else if (data > 0.85 && data < 1) {
        var currentDay = "Sunday";
    }
    document.querySelector('.result').innerHTML = currentDay;
}

function init() {
    localDate = localStorage.getItem("date")
    localMonth = localStorage.getItem("month")
    localYear = localStorage.getItem("year")
    if (localDate !== null) {
        date = localDate - 1;
    }
    if (localMonth !== null) {
        month = localMonth;
    }
    if (localYear !== null) {
        year = localYear;
    }
    document.querySelector('.year').value = year;
    selectMonth(month);
}

init();