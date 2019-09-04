var currentDay = 0;
var currentMonth = 0;
var currentYear=0;
var year = 0;
var month = 0;
var day = 0;
var am_List = [];
var pm_List = [];
var calendarArr = [];

$(function () {
    let currentDate = new Date();
    year = currentDate.getFullYear();
    month = currentDate.getMonth();
    day = currentDate.getDate();
    currentDay = currentDate.getDate();
    currentMonth = currentDate.getMonth();
    currentYear=currentDate.getFullYear();

    let input=document.getElementById('timepicker');
    let show_month=currentMonth+1;
    input.attributes[1].nodeValue=currentYear+'-'+show_month;
    

    createArr();
    renderArr();


})
$("#timepicker").datetimepicker({
    language:"zh-CN",
    startView: 3,  
    minView: 3,  
    format:'yyyy-m',
}).on('changeDate',function(event){             //每次点击时改变year和month的值
    let choose_month=event.date.getMonth();
    let choose_year=event.date.getFullYear();
    year=choose_year;
    month=choose_month;
}).on('hide',function(){         //当选择框隐藏，刷新日历
    clearChild();           
    createArr();
    renderArr();
})
function createArr() {
    let firstDate = new Date(year, month, 1);
    let firstWeekday = firstDate.getDay();
    if (firstWeekday == 0)
        firstWeekday = 7;
    let startTime = firstDate - (firstWeekday - 1) * 24 * 60 * 60 * 1000;
    calendarArr = [];
    for (let i = 0; i < 42; i++) {
        let new_date = new Date(startTime + i * 24 * 60 * 60 * 1000);
        calendarArr.push({
            year: new_date.getFullYear(),
            month: new_date.getMonth(),
            day: new_date.getDate(),
        })

    }
}

function renderArr() {
    for (let i = 0; i < 42; i++) {

        let each_day_div = document.createElement('div');
        let each_day_class = document.createAttribute('class');
        each_day_class.nodeValue = "each_day";
        each_day_div.setAttributeNode(each_day_class);

        let day_header_div = document.createElement('div');
        let day_header_class = document.createAttribute('class');
        day_header_class.nodeValue = "day_header";
        day_header_div.setAttributeNode(day_header_class);
        day_header_div.appendChild(document.createTextNode(calendarArr[i].day));
        if(calendarArr[i].month!=month){
            let other_month_class = document.createAttribute('class');
            other_month_class.nodeValue = "other_month day_header";
            day_header_div.setAttributeNode(other_month_class);
        }
        if(calendarArr[i].year==currentYear&&calendarArr[i].month==currentMonth&&calendarArr[i].day==currentDay){
            let today_class = document.createAttribute('class');
            today_class.nodeValue = "current_day day_header";
            day_header_div.setAttributeNode(today_class);
        }
        each_day_div.appendChild(day_header_div);

        let day_bottom_div = document.createElement('div');
        let day_bottom_class = document.createAttribute('class');
        day_bottom_class.nodeValue = "day_bottom";
        day_bottom_div.setAttributeNode(day_bottom_class);

        let am_div = document.createElement('div');
        let am_class = document.createAttribute('class');
        am_class.nodeValue = "am";
        am_div.setAttributeNode(am_class);
        let am_event = document.createAttribute('onclick');
        am_event.nodeValue = "add_am(" + i + ")";
        am_div.setAttributeNode(am_event);
        if(is_in_List(am_List,i)){
            am_div.innerHTML='✔'
        }
        let pm_div = document.createElement('div');
        let pm_class = document.createAttribute('class');
        pm_class.nodeValue = "pm";
        pm_div.setAttributeNode(pm_class);
        let pm_event = document.createAttribute('onclick');
        pm_event.nodeValue = "add_pm(" + i + ")";
        pm_div.setAttributeNode(pm_event);
        if(is_in_List(pm_List,i)){
            pm_div.innerHTML='✔'
        }
        day_bottom_div.appendChild(am_div);
        day_bottom_div.appendChild(pm_div);
        each_day_div.appendChild(day_bottom_div);
        let father_div = $('.day_wrap')[0];
        father_div.appendChild(each_day_div);
    }
}

function clearChild() {
    let father_div = $('.day_wrap')[0];
    father_div.innerHTML = '';

}

function preMonth() {
    if (month == 0) {
        month = 11;
        year--;
    } else
        month--;
    let arr = $('.current_year');
    real_month = month + 1;
    arr[0].innerHTML = year + '-' + real_month;
    clearChild();
    createArr();
    renderArr();
}

function nextMonth() {
    if (month == 11) {
        month = 0;
        year++;
    } else
        month++;
    let arr = $('.current_year');
    real_month = month + 1;
    arr[0].innerHTML = year + '-' + real_month;
    clearChild();
    createArr();
    renderArr();
}

function add_am(index) {
    let object = calendarArr[index];
    for (var j = 0; j < pm_List.length; j++) {
        if (pm_List[j].year == object.year && pm_List[j].month == object.month && pm_List[j].day == object.day)
            break;
    }
    if (j < pm_List.length) {

        $('.each_day')[index].childNodes[1].childNodes[1].innerHTML = '';
        $('.each_day')[index].childNodes[1].childNodes[0].innerHTML = "✔";
        am_List.push(object);
        pm_List.splice(j, 1);
    } else {
        for (var i = 0; i < am_List.length; i++) {
            if (am_List[i].year == object.year && am_List[i].month == object.month && am_List[i].day == object.day)
                break;
        }
        if (i == am_List.length) {

            $('.each_day')[index].childNodes[1].childNodes[0].innerHTML = "✔";
            am_List.push(object);
        } else {

            am_List.splice(i, 1);
            $('.each_day')[index].childNodes[1].childNodes[0].innerHTML = '';
        }
    }
    console.log(am_List);
}

function add_pm(index) {
    let object = calendarArr[index];
    for (var j = 0; j < am_List.length; j++) {
        if (am_List[j].year == object.year && am_List[j].month == object.month && am_List[j].day == object.day)
            break;
    }
    if (j < am_List.length) {

        $('.each_day')[index].childNodes[1].childNodes[0].innerHTML = '';
        $('.each_day')[index].childNodes[1].childNodes[1].innerHTML = "✔";
        pm_List.push(object);
        am_List.splice(j, 1);
    } else {
        for (var i = 0; i < pm_List.length; i++) {
            if (pm_List[i].year == object.year && pm_List[i].month == object.month && pm_List[i].day == object.day)
                break;
        }
        if (i == pm_List.length) {

            $('.each_day')[index].childNodes[1].childNodes[1].innerHTML = "✔";
            pm_List.push(object);
        } else {

            pm_List.splice(i, 1);
            $('.each_day')[index].childNodes[1].childNodes[1].innerHTML = '';
        }
    }
    console.log(pm_List);
}

function is_in_List(List,index) {
    let object = calendarArr[index];
    for (var j = 0; j < List.length; j++) {
        if (List[j].year == object.year && List[j].month == object.month && List[j].day == object.day)
            break;
    }
    if (j < List.length) 
        return true;
     else
     return false;
}
