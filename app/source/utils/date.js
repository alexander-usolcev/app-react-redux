'use strict';

export function secondsToMinutes(seconds) {
    // Hours, minutes and seconds
    const hrs = ~~(seconds / 3600);
    const mins = ~~((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Output like "01:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += hrs + ":";
    }

    ret += (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "");
    ret += secs;

    return ret;
}

export function minutesToSeconds(date) {
    const [minutes, seconds] = date.split(':');

    return (parseInt(minutes) * 60) + parseInt(seconds && seconds.match(/\d\d/) ? seconds : null);
}

export function isToday(timestamp) {
    // Create date from input value
    let inputDate = new Date(parseInt(timestamp));

    // Get today's date
    let todaysDate = new Date();

    // call setHours to take the time out of the comparison
    return inputDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0);
}

/**
 * Метод, возвращающий дату в читаемом виде.
 *
 * @param [timestamp=Date.now()]
 * @param [withToday=true]
 * @example toLocalDate( new Date('December 17, 1986 03:24:00').getTime() ); // "Среда, 3:24 AM"
 * @return {string}
 */
export function toLocaleDate(timestamp = Date.now(), withToday = true) {
    let {DATE_WEEKDAYS, TODAY} = Lang.get();

    let date = new Date(parseInt(timestamp));
    let today = new Date();
    let isToday = (today.toDateString() === date.toDateString());

    let weekday = DATE_WEEKDAYS[date.getDay()];

    if (isToday) {
        weekday = TODAY;
    }

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return (withToday ? (weekday + ', ') : '') + hours + ':' + minutes + ' ' + ampm;
}

export function timestampToDate(timestamp) {
    let date = new Date(parseInt(timestamp));

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export function toMs(timestamp) {
    return parseInt(timestamp) * 1000;
}

export function weeksBetween(from, to) {
    return Math.ceil((new Date(from) - new Date(to)) / (7 * 24 * 60 * 60 * 1000));
}

export function weeksBetweenByPlan(plan, date) {
    let week = 1;

    for (let i = 0; i < plan.length; i++) {
        if (date < plan[i].date) {
            week = i + 1;
            break;
        }
    }

    return week;
}