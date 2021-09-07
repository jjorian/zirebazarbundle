export const sumKala = (rows) => {
    return rows.map(li => li.Count).reduce((sum, val) => sum + val, 0)
}
export const sumPurePrice = (rows) => {
    return rows.map(li => li.Count * (li.Price - li.Discount)).reduce((sum, val) => sum + val, 0)
}
export const sumPrice = (rows) => {
    return rows.map(li => li.Count * li.Price).reduce((sum, val) => sum + val, 0)
}
export const sumDiscount = (rows) => {
    return rows.map(li => li.Count * li.Discount).reduce((sum, val) => sum + val, 0)
}