$(document).ready(function(){

  M.AutoInit();

$('.delete').on('click', function(e){
  e.preventDefault();
  var url = $(this).attr('href');
  $.ajax({
     method: 'DELETE',
     url: url
  }).done(function(data){
    console.log(done);
    window.location = '/profile/';
  })

})

  $('.parallax').parallax();
var ctx = $('#myChart');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels:['Your Impact in lbs CO₂e', '20% reduction in lbs CO₂e'],
    datasets:[{
      label: 'carbon footprint',
      data: [dataChart, 5],
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
