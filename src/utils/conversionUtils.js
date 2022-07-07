const getPhoneNumber = (str) => {
    let num = str.split("").filter(el => Number(el)).join("")
    return `(${num.slice(0,3)}) ${num.slice(3,6)}-${num.slice(6,10)}`
}

module.exports = { getPhoneNumber };