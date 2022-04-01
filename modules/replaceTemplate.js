module.exports = (temp, val) => {
    let output  = temp.replace(/{%PRODUCTNAME%}/g, val.productName);
    output = output.replace(/{%IMAGE%}/g, val.image)
    output = output.replace(/{%PRICE%}/g, val.price)
    output = output.replace(/{%FROM%}/g, val.from)
    output = output.replace(/{%NUTRIENTS%}/g, val.nutrients)
    output = output.replace(/{%QUANTITY%}/g, val.quantity)
    output = output.replace(/{%DESCRIPTION%}/g, val.description)
    output = output.replace(/{%ID%}/g, val.id)
    if (!val.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    }

    return output;
}