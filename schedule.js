Tabletop.init({
  key: '1p0NWLPnTqrDy4-vN-XaI6PPNIjZ2aEtGAeFTWIu63cw',
  callback: organizeData,
  simpleSheet: true
})

function buildSchedule(data) {
  console.log("Build Schedule Data", data)
  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  days.forEach(function daysTable(day){
    var events = data[day]
    var schedule = ich.table_template({'rows': events, 'day': day, 'date': new Date(events[0].date).toLocaleDateString()})
    document.getElementById('schedule').innerHTML += schedule
  })

}

function organizeData(data) {
  console.log("organizing!")
  var newData = {}
  data.forEach(function(row) {
    dayOver(row.date)
    if (!dayOver(row.date)) row.past = true
    if (!newData[row.day]) {
      newData[row.day] = []
    }
    newData[row.day].push(row)
  })
  buildSchedule(newData)
}

function dayOver(day) {
  var today = new Date()
  var date = new Date(day)
  // is past event
  if (today > date) return true
  // still to come
  else return false
}
