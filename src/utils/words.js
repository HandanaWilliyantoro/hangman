const words = [
    "aiforesee", 
    "indonesia", 
    "jakarta", 
    "credit", 
    "scoring"
]

const isAlphabet = (val) => {
    return /^[a-zA-Z]+$/.test(val);
}

const checkWin = (selected, correct) => {
    let isWin = true;

    if(selected && correct){
        selected.split('').forEach(a => {
          if(!correct.includes(a)){
            isWin = false;
          }
        });
    }
    
    return isWin
}

export {words, isAlphabet, checkWin}