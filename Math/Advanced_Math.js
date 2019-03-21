Math.Basic = (function(Basic){
  var add =  (a,b) => {
    var y = a + b;
    return y;
  }
  var subtract = (a,b) => {
    var y = a - b;
    return y;
  }
  var multiply = (a,b) => {
    var y = a * b;
    return y;
  }
  var divide = (a,b) => {
    var y = a / b;
    var r = a % b;
    var res = [y,r];
    return res;
  }
  var exponential = (a,b) => {
    if(b >= 2){
      var res = 0;
      for(var i = b-1; i > 0; i--){
        res += multiply(a,a);
      }
      return res;
    }
    else if(b == 0){
      return 1;
    }
    else if(b == 1) {
      return a;
    }
    else if(b == -1){
      return 1 / a;
    }
    else {
      var res = 0;
      for(var i = 0 - (b+1); i > 0; i--){
        res += multiply(a,a);
      }
      return 1 / res;
    }
  }
  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    exponential: exponential,
  }
})(Basic || {})

Math.Advanced = (function(Advanced){

  var equation = (e,x) => {
      //PEMDAS
  }

  //Linear Algebra functions
  var linearAlgebra = (function(linearAlgebra){
    var multiply = (theta,x) => {
      if(0 in theta = true && 0 in x == true){
        var arr = [][];
        for(var i = 0; i < theta.length; i++){
          for(var j = 0; j < theta.length; j++){
            arr[i][j] = theta[i][j] * x[i][j];
          }
        }
        return arr;
      }
    }
    return {multiply: multiply}
  })(linearAlgebra || {})

  //Calculus functions
  var calculus = (function(calculus){
    return {}
  })(calculus || {})

  //Statistical analysis functions
  var statistics = (function(statistics){
    return {}
  })(statistics || {})

  //Graphing functions
  var graph = (function(graph){
    return {}
  })(graph || {})

  //functions that deal with time and timing
  var time = (function(time){
    //Countdown to 0 timer
    var countdown = (h,m,s) => {

    }
    //Count up from zero
    var countUp = (h,m,s) => {

    }
    //Convert to Unix date
    var toUnix = (natDate) => {

    }
    //convert to natural language date
    var toNatural = (unixDate) => {

    }
    // Count up stopwatch
    var stopwatch = () => {

    }
    return {
      countdown: countdown,
      countUp: countUp,
      toUnix: toUnix,
      toNatural: toNatural,
      stopwatch: stopwatch,
    }
  })(time || {})

  return {}
})(Advanced || {})