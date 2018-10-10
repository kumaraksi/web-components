function sumSmallestNumbers(arr = []){
    let first = Infinity,second = Infinity;
    for(const num of arr){
        if(num < first){
            first = num;
        }else if(num < second && first <= num){
            second = num;
        }
    }
    return first+second;
}

export default sumSmallestNumbers;
