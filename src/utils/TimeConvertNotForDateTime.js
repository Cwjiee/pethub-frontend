export function TimeConvertNotForDateTime(timeStr) {
    const [hour, minute, second] = timeStr.split(':').map(Number);
    let period = 'am';
    let convertedHour = hour;
    
    if (hour >= 12) {
        period = 'pm';
        if (hour > 12) {
            convertedHour = hour - 12;
        }
    } else if (hour === 0) {
        convertedHour = 12;
    }
    
    return `${convertedHour}:${String(minute).padStart(2, '0')}${period}`;
}