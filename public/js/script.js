$(document).ready(function(){
  $('.deleteForm').on('submit', function(e){
    e.preventDefault();
    console.log('clicked!')
    var updatedInfo =$(this).serialize();
    var url= $(this).attr('action');
