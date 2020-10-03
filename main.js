function actionGopY() {
	var name = document.getElementById("name");
	if (name.value == ""){
		alert("Vui lòng nhập tên của bạn");
		return;
	}
	var res =document.getElementById("res");
	if (res.value == ""){
		alert("Vui lòng nhập thông tin phản hồi");
		return;
	}

	$("#modalPhanHoi").modal("hide");
	document.getElementById("noti").innerHTML = "<strong>Thành công!</strong> Cảm ơn <strong style='color: red'>" + name.value + "</strong> đã bớt chút thời gian góp ý để hoàn thiện sản phẩm hơn."
	document.getElementById("noti").style.display = "block";
	$("#noti").delay(5000).slideUp(200);

}

$(document).ready(function(){
	$("#intro").hover(function(){
		document.getElementById("intro").innerHTML = document.getElementById("intro").innerHTML;
	});
	loadAboutInfoMe();
});

function loadAboutInfoMe(){
	var arr = ["<strong>Trương Quang Kiên</strong></br>", "Thành viên <strong>D19 - Team 1</strong></br>", "Định hướng <strong>Back-End</strong></br>", "Ưu điểm hòa đồng dễ gần</br>", "Nhược điểm rụt rè với môi trường mới</br>", "Rất mong được giao lưu học hỏi với mọi người."];
	var a = document.getElementById("aboutInfoMe");
	var index = 0;
	var id = setInterval(load, 750);
	var text = "";
	function load(){
		if (index >= arr.length){
			clearInterval(id);
			var b = document.getElementById("skillMe");
			b.hidden = false;
			b.scrollIntoView();
			loadProgress();
		}
		else{
			a.innerHTML =  text + "<div class='animated fadeInDown'>" + arr[index] + "</div>";
			text += arr[index];
			index += 1;
		}
	}
}

function loadProgress(){
	var arr = document.getElementsByClassName("progress-bar");
	for (var i = 0; i < arr.length; i++) {
		loadPg(arr[i], i);
	}
	function loadPg(progress, i){
		var maxW = parseInt(progress.innerHTML);
		var w = (i % 2 == 0 ? 100 : 1);
		var id = setInterval(load, 25);
		function load(){
			if ((i % 2 == 0 && w < maxW) || (i % 2 == 1 && w > maxW)){
				clearInterval(id);
				document.getElementById("miniGameBtnStart").disabled = false;
			}
			else{
				progress.style.width = w + "%";
				progress.innerHTML = w + "%";
				w += (i % 2 == 0 ? -1 : 1);
			}
		}
	}
	
}

function miniGameStart(){
	var btn = document.getElementById("miniGameBtnStart");
	var form = document.getElementById("miniGameForm");
	btn.style.display = "none";
	form.hidden = false;
}

var miniGameA;
var miniGameB;
var miniGameX;
var miniGameResult = -1;
var miniGameTimeStart;

function miniGameSelect(){
	var selected = document.getElementById("idSelect");
	var question = document.getElementById("question");
	var label = document.getElementById("labelQuestion");
	if (selected.value == 0){
		miniGameResult = -1;
		label.innerHTML = "Question:";
		question.value = "Please Select Level To Hiện Question";
		return;
	}
	miniGameTimeStart = Math.floor(Date.now() / 1000);
	var temp = 1;
	for (var i = 0; i < selected.value; i++){
		temp *= 10;
	}
	miniGameA = getRndInteger(temp / 10, temp);
	miniGameB = getRndInteger(temp / 10, temp);
	miniGameX = "+";
	miniGameResult = miniGameA + miniGameB;
	if (selected.value == 4){
		miniGameX = "*";
		miniGameResult = miniGameA * miniGameB;
	}
	label.innerHTML = "Thực hiện phép toán sau: ";
	question.value =  miniGameA + " " + miniGameX + " " + miniGameB + " = ?";
	console.log("Result minigame: " + miniGameResult);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function miniGameSubmit(){
	var miniGameNoti = document.getElementById("miniGameNoti");
	var answer = document.getElementById("answer");
	if (miniGameResult == -1){
		miniGameNoti.innerHTML = "<div class='alert alert-danger animated shake'><strong>Error! </strong> Bạn chưa chọn Level<button type='button' class='close' data-dismiss='alert'>&times;</button></div>";
		return;
	}
	if (answer.value.length < 1){
		miniGameNoti.innerHTML = "<div class='alert alert-danger animated shake'><strong>Error</strong> Bạn chưa nhập câu trả lời!<button type='button' class='close' data-dismiss='alert'>&times;</button></div>";
		return;
	}
	if (parseInt(answer.value) != miniGameResult){
		miniGameNoti.innerHTML = "<div class='alert alert-danger animated shake'><strong>Warning! </strong>Câu trả lời của bạn chưa đúng, Thử đáp án khác đi nhé!<button type='button' class='close' data-dismiss='alert'>&times;</button></div>";
		return;
	}
	if (parseInt(answer.value) == miniGameResult){
		miniGameNoti.innerHTML = "<div class='alert alert-success animated bounceIn'><strong>Success! </strong>Câu trả lời chính xác!, Tiếp tục trả lời câu trả lời Level cao hơn nào (Thời gian trả lời: <strong>" + (Math.floor(Date.now() / 1000) - miniGameTimeStart) + " giây</strong>).<button type='button' class='close' data-dismiss='alert'>&times;</button></div>";
			miniGameLoadNewQuestion();
		return;
	}
}

function miniGameLoadNewQuestion(){
	var miniGameNoti = document.getElementById("miniGameNoti");
	var answer = document.getElementById("answer");
	var selected = document.getElementById("idSelect");
	var question = document.getElementById("question");
	if (selected.value == 4){
		document.getElementsByClassName("card-body")[0].innerHTML = "<div class='alert alert-success animated bounceIn'><strong>Wow!</strong> Bạn là 1 thiên tài! <button type='button' class='close' data-dismiss='alert'>&times;</button></div>";
		//miniGameNoti.innerHTML = "<div class='alert alert-success'><strong>Wow! </strong>Bạn quả là 1 thiên tài! <button type='button' class='close' data-dismiss='alert'>&times;</button></div>";
		return;
	}
	var options = document.getElementsByTagName("option");
	options[parseInt(selected.value) + 1].selected = "true";
	miniGameTimeStart = Math.floor(Date.now() / 1000);
	miniGameSelect();
	answer.value = "";
}