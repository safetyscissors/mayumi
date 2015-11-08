/**
 * Created by ati on 11/8/15.
 */
var bgColors = ['#b8d6f0', '#a1e39a','#fda39b','#f0d5ba','#ededed'];
var baseSpeed=5000;
var varSpeed =2000;

function startFunBackground() {
  $('<div/>', {
    'id':'funBgTop',
    'style':'position:fixed; top:0; bottom:0; left:0; right:0; background-color:white; display:none'
  }).prependTo('body');
  $('<div/>', {
    'id':'funBgBack',
    'style':'position:fixed; top:0; bottom:0; left:0; right:0; background-color:white;'
  }).prependTo('body');

  transitionBackground();
}

function transitionBackground(){
  var color=bgColors[Math.floor(5*Math.random())];
  $('#funBgTop').css('background-color',color);
  $('#funBgTop').fadeIn(1500,function(){
    $('#funBgBack').css('background-color',color);
    $('#funBgTop').css('display','none');

    setTimeout(transitionBackground, baseSpeed+Math.floor(Math.random()*varSpeed))
  })
}