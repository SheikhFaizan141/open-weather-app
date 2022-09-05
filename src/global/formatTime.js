class formatTime {
    static formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

 
     static  formatKalvin(unit, kelvin) {
        if (unit === 'c') {
    
          return Math.round(kelvin - 273.15) + '°';
        } else {
    
          return Math.round(1.8 * (kelvin - 273.15) + 32) + '°';
        }
      }
}

export default formatTime;