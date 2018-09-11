for (var i = 2; i <= 20; i++){
    if(isPrime(i)){
        console.log(i);
    }
}

function isPrime(number){
    if(number <= 1){
        return false;
    }
    if(number == 2){
        return true;
    }
    for(var i = 2; i < number; i++){
        if(number % i == 0){
            return false;
        }
    }
    return true;
}