const isDni = (value) => {
    if(isNaN(value)) return false;
    return true;
}

module.exports = {
    isDni
}