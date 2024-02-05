export function TimeConvertNotForDateTime(timeString) {
    // Parse the time
    let [hours, minutes] = timeString.split(':').map(Number);

    // Get the timezone offset in minutes
    let timezoneOffset = new Date().getTimezoneOffset();

    // Adjust the time by the timezone offset
    hours = (hours - Math.floor(timezoneOffset / 60)) % 24;
    minutes = (minutes - timezoneOffset % 60) % 60;

    // Convert to 12-hour format
    let period = 'AM';
    if (hours >= 12) {
        period = 'PM';
        if (hours > 12) {
            hours -= 12;
        }
    } else if (hours === 0) {
        hours = 12;
    }

    // Format the time string
    let timeString12Hour = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;

    return timeString12Hour;
}