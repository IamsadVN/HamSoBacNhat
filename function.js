import { evaluate,simplify,parse } from "mathjs";

/**
 * @param {number} start 
 * @param {number} end 
 * @param {number} step
 * @returns {number[]} - return gia tri X duoi dang mang
 */

export function laygiatriX(start,end,step) {
    const result = [];
    if (start === end) return result.push(start); //start hay end cung dc
    while (start <= end) {
        result.push(start);
        start += step;
    }
    return result;
}

/**
 * 
 * @param {string} strConstan 
 * @param {number[]} xValues 
 * @returns {number[]} 
 */

export function laygiatriY(strConstan,xValues) {
    strConstan = strConstan.replace("y","");
    strConstan = strConstan.replace("=","");
    strConstan = parse(strConstan);
    
    let simplified = simplify(strConstan);

    let result = [];

    for(let i=0;i < xValues.length;i++) {
        result.push(simplified.evaluate({x: xValues[i]}));
    }

    return result;
}
