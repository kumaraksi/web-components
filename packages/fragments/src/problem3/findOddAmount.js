function findOddAmount(arr){
    let res = 0; 
    for (const num of arr) {
        res = res ^ num;
    }
    return res;
}

export default findOddAmount;