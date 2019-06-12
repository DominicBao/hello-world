$(document).ready(function(){
  $("#login").click(function(){
     var zhanghao = $("#inputEmail").val();
     var mima = $("#inputPassword").val();
     // alert(zhanghao);
     // alert(mima);
     if(zhanghao == "Dominic"&&mima == "bzf19970903"){
     	// alert("sadasd");
     	window.location.href = "main.html";
     }
     return false;
  });
});