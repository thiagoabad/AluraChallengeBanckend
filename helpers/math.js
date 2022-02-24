function round(num){
    return Math.round( num * 100 + Number.EPSILON ) / 100
}

module.exports = round