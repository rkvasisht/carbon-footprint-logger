console.log(dataChart);

var ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels:['Carbon footprint for your trip', 'national average carbon footprint per day'],
    datasets:[{
      label: 'carbon footprint',
      data: [dataChart, 30],
      backgroundColor: ['red', 'lightblue']
    }]
  },
  options:{
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }





});
