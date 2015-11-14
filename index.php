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
        <b>Hello!</b><br>
        This is grammar processing.<br><br>
        Try me!
      </div>
    </h2></div>
  </div>

  <div class="row">
      <div class="col-lg-2">
        <div class="visible-lg" style="position:absolute; top:50px;right:0">
            <img src="client/img/girl.png" width="100px">
            </div>
      </div>
      <div class="col-lg-8">
        <div id="outputText" class="panel panel-default panel-body">
        </div>
        <div class="speechBubble visible-lg"></div>
      </div>
  </div>
</div>

<div class="row">
  <div class="col-lg-12">
  </div>
</div>

<?php include 'client/template/javascriptSource.php'; ?>
<script>
  $('document').ready(function(e){
    $('#inputText').get(0).focus();
    textUpdate();
    startFunBackground();
    $('#inputText').on('keyup', textUpdate);
  });

  function textUpdate(){
    $('#outputText').html($('#inputText').html());
  }


</script>
</body>
</html
