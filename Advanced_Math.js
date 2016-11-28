var Advanced = {
//All types of math solutions
  Math: {
    //Your basic addition
    add: function (a,b){
      var y = a + b;
      return y;
    },
    //Basic Subtraction, a is final b is initial
    subtract: function(a,b){
      var y = a - b;
      return y;
    },
    //Basic multiplication
    multiply: function(a,b){
      var y = a * b;
      return y;
    },
    //Basic division sends the unrounded answer and the remainder
    divide: function(a,b){
      var y = a / b;
      var r = a % b;//calculate the remainder
      var res = {y,r};
      return res;
    },
    //Solve for y given x in an equation format
    equation: function(e,x){
      //Use order of opperations to parse the equation and the above functions to calculate
    },

  },

  //Linear Algebra functions
  LinAlg: {
    MultArray: function(theta,x){
      if(0 in theta = true && 0 in x == true){
        var arr = [][];
        for(var i = 0; i < theta.length; i++){
          for(var j = 0; j < theta.length; j++){
            arr[i][j] = theta[i][j] * x[i][j];
          }
        }
        return arr;
      }
    },
  },

  //Calculus functions
  Calc: {

  },

  //Statistical analysis functions
  Stats: {

  },

  //Graphing functions
  Graph: {

  },

  //Functions that deal with time and timing
  Time: {
    //Countdown to 0 timer
    countdown: function(h,m,s){

    },
    //Countup from zero
    countup: function(h,m,s){

    },
    //Convert to Unix date
    toUnix: function(natDate){

    },
    //convert to natural language date
    toNatural: function(unixDate){

    }
  },

};
