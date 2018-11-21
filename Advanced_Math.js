var Advanced = {
//All types of math solutions
  Math: {
    //Your basic addition
    Add:  (a,b) => {
      var y = a + b;
      return y;
    },
    //Basic Subtraction, a is final b is initial
    Subtract: (a,b) => {
      var y = a - b;
      return y;
    },
    //Basic multiplication
    Multiply: (a,b) => {
      var y = a * b;
      return y;
    },
    //Basic division sends the un-rounded answer and the remainder
    Divide: (a,b) => {
      var y = a / b;
      var r = a % b;//calculate the remainder
      var res = [y,r];
      return res;
    },
    //Basic exponential calculation
    Exponential: (a,b) => {
      if(b >= 2){
        var res = 0;
        for(var i = b-1; i > 0; i--){
          res += this.Multiply(a,a);
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
          res += this.Multiply(a,a);
        }
        return 1 / res;
      }
    },
    //Solve for y given x in an equation format
    Equation: (e,x) => {
      //PEMDAS
    },

  },

  //Linear Algebra functions
  LinearAlgebra: {
    MultiplyArray: (theta,x) => {
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
  Calculus: {

  },

  //Statistical analysis functions
  Statistics: {

  },

  //Graphing functions
  Graph: {

  },

  //functions that deal with time and timing
  Time: {
    //Countdown to 0 timer
    countdown: (h,m,s) => {

    },
    //Countup from zero
    countup: (h,m,s) => {

    },
    //Convert to Unix date
    toUnix: (natDate) => {

    },
    //convert to natural language date
    toNatural: (unixDate) => {

    },
    // Count up stopwatch
    stopwatch: () => {

    }
  },

};
