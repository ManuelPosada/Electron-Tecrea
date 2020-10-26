/**
 * 
 * @param {* Hours} horas 
 * @param {* Minutes} minutos 
 * @param {* Seconds} segundos 
 */
export function timetoSeconds (horas, minutos, segundos) {
    return (horas*3600)+(minutos*60)+segundos;
}

/**
 *
 * @param {* Time in seconds} timeOnSeconds 
 */
export function secondstoDate(timeOnSeconds) {
    let dais, hours, minutes, seconds;

    if(timeOnSeconds >= 84600) dais = Math.floor(timeOnSeconds/86400); else dais = 0;
    if(timeOnSeconds >= 3600 ) hours = Math.floor((timeOnSeconds-(dais*86400))/3600); else hours = 0;
    if(timeOnSeconds >= 60) minutes = Math.floor(((timeOnSeconds-((dais*86400)+(hours*3600)))/60)); else minutes = 0;
    seconds = timeOnSeconds - ((dais*86400)+(hours*3600)+(minutes*60));

    return dais + ':' + hours+ ':' + minutes + ':' + seconds;
}

/**
 * 
 * @param {* Time in milliseconds} ms 
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}