$(document).ready(function(){

  M.AutoInit();

$('.btn btn-danger delete').on('click', function(e){
  e.preventDefault();
  var url = $(this).attr('href');
  $.ajax({
     method: 'DELETE',
     url: url
  }).done(function(data){
    console.log(data);
    window.location = '/carinfo';
  })

})

  $('.parallax').parallax();
var ctx = $('#myChart');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels:['Your Impact in lbs CO₂e', 'national average of lbs CO₂e'],
    datasets:[{
      label: 'carbon footprint',
      data: [dataChart, 10],
      backgroundColor: ['red', 'lightblue']
    }]

  },
  options:{
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero: true
        }
      }]
    }
  }

})

})
