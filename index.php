<!DOCTYPE html>
<html lang="en">

<?php
	$PAGETITLE='mayumi';
	include 'client/template/head.php';
?>
<body><?php include 'client/template/menu.php'; ?>

<div class="container">
  <div class="row visible-lg">
    <div class="col-lg-12" style="height:100px">
    </div>
  </div>
  <div class="row">
    <div class="col-lg-8 col-lg-offset-2"><h2>
      <div id="inputText" contenteditable="true" class="panel panel-default panel-body">
        <b>The car drove to the mall.</b>
      </div>
<!--        <b>Hello!</b><br>
        This is grammar processing.<br><br>
        Try me!
</div>
-->
    </h2></div>
  </div>

<!-- ------------------------------ MAIN BOT ----------------------------------------- -->
  <div class="row">
    <div class="col-lg-2">
      <div class="visible-lg person" style="right:0">
          <img src="client/img/pinkgirl.png" width="90px">
          </div>
    </div>
    <div class="col-lg-8">
      <div id="outputText" class="panel panel-default panel-body">
      </div>
      <div class="speechBubble visible-lg"></div>
    </div>
  </div>

<!-- ------------------------------ DIVIDER ----------------------------------------- -->
  <div class="row">
    <div class="col-lg-8 col-lg-offset-2">
      <hr></hr>
    </div>
  </div>

<!-- ------------------------------ BOT 1 ----------------------------------------- -->
  <div class="row">
    <div class="col-sm-12 hidden-lg">bot 1</div>

    <div class="col-lg-8 col-lg-offset-2">
      <div id="bot1Output" class="panel panel-default panel-body">
        Thinking...
      </div>
      <div class="rightSpeechBubble visible-lg"></div>
    </div>
    <div class="col-lg-2">
      <div class="visible-lg person" style="left:0">
          <img src="client/img/coolguy.png" width="100px">
          </div>
    </div>
  </div>

  <div class="row visible-lg" style="margin-bottom:20px"></div>

<!-- ------------------------------ BOT 2 ----------------------------------------- -->
  <div class="row">
    <div class="col-sm-12 hidden-lg">bot 2</div>

    <div class="col-lg-2">
      <div class="visible-lg person" style="right:50px">
          <img src="client/img/ponytail.png" width="110px">
          </div>
    </div>
    <div class="col-lg-8">
      <div id="bot2Output" class="panel panel-default panel-body">
        Thinking...
      </div>
      <div class="speechBubble visible-lg"></div>
    </div>
  </div>

  <div class="row visible-lg" style="margin-bottom:20px"></div>

<!-- ------------------------------ BOT 3 ----------------------------------------- -->
  <div class="row">
    <div class="col-sm-12 hidden-lg">bot 3</div>

    <div class="col-lg-2 col-lg-offset-10">
      <div class="visible-lg person" style="left:-30px">
        <img src="client/img/girl.png" width="80px">
      </div>
    </div>
    <div class="col-lg-8 col-lg-offset-2">
      <div id="bot3Output" class="panel panel-default panel-body">
        Thinking...
      </div>
      <div class="rightSpeechBubble visible-lg"></div>
    </div>
  </div>

  <div class="row visible-lg" style="margin-bottom:20px"></div>

</div>



<?php include 'client/template/javascriptSource.php'; ?>
<script>
  $('document').ready(function(e){
    $('#inputText').get(0).focus();
    textUpdate();
    startFunBackground();
    $('#inputText').on('keyup', textUpdate);
  });

  var lastChanged=0;
  function textUpdate(){
    //start timer. only submit after the user stops making changes.
    lastChanged=(new Date()).getTime();
    setTimeout(function(){
      if(lastChanged+800 < (new Date()).getTime()){
         //do the change. prevent future timeouts from doing this one.
         lastChanged=(new Date()).getTime();

        $('#outputText').html($('#inputText').html());
        $('#bot1Output').html(heuristicEngine($('#inputText').html()));
      }
    }, 1000);
  }

</script>
</body>
</html
