function sameXOAmount(str){
    const len  = str.length;
    let i = 0;
    let xCount = 0, oCount = 0;
    while(i<len){
        let char = str[i].toLowerCase();
        switch(char){
            case 'x'    :   xCount++;
                            break;
            case 'o'    :   oCount++;
                            break;
        }
        i++;
    }
    if (xCount === oCount){
        return true;
    }
    return false;
}
export default sameXOAmount;