Diem = (function(Diem){
    var isDailightSavingTime = (currentDate) => {
        currentDate = new Date(currentDate)
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        let DSD = null
        const scanDate = currentDate
        switch (month) {
          case 1:
          case 2:
          case 12:
            return false
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            return true
          case 3:
            if (day < 8) return false
            else if (day > 14) return true
            for (let i = 8; i < 15; i++) {
              scanDate.setDate(i)
              if (scanDate.getDay() === 0) {
                DSD = scanDate.getDate()
              }
            }
            if (day >= DSD && currentDate.getHours() >= 2) return true
            return false
          case 11:
            if (day > 7) return false
            for (let i = 1; i < 8; i++) {
              scanDate.setDate(i)
              if (scanDate.getDay() === 0) {
                DSD = scanDate.getDate()
              }
            }
            if (day >= DSD && currentDate.getHours() >= 2) return false
            return true
          default:
            return true
        }
      }
      
      var getUTCOffSet = (time, zone) => {
        const DST = {
          'ET': -4,
          'CT': -5,
          'MT': -6,
          'PT': -7,
          'ALASKA': -8,
        }
        const ST = {
          'ET': -5,
          'CT': -6,
          'MT': -7,
          'PT': -8,
          'ARIZONA': -7,
          'ALASKA': -9,
          'HAWAII': -10,
        }
        if (isDailightSavingTime(time)) return DST[zone] ? DST[zone] : ST[zone]
        return ST[zone]
      }
      return {
        isDailightSavingTime,
        getUTCOffSet,
      }
})(Diem || {})
