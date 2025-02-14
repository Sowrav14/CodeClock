const formatTime = (time: number) => {
    let seconds = Math.round(time % 60);
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);
    // console.log(time, seconds, minutes, hours);
    if (hours === 0 && minutes === 0) minutes = 1; // Ensure at least "1 min" is shown

    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min`;
    }
    return `${minutes} min ${seconds} sec`;
};

export default formatTime;
