window.onload=function(){
	// 获取元素

var js_slider=$("js_slider");
var slider_main=$("slider_main");
var imgs=slider_main.children;
var slider_ctrl=$("slider_ctrl");

// 操作元素
// 创造span
for(var i=0;i<imgs.length;i++){
	var span=document.createElement("span");
	span.className="slider-ctrl-con";
	span.innerHTML=imgs.length-i;
	slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
}

var sctrls=slider_ctrl.children;//得到所有的span
sctrls[1].setAttribute("class","slider-ctrl-con current" );


var scrollWidth=js_slider.clientWidth;
for(var i=1;i<imgs.length;i++){
	imgs[i].style.left=scrollWidth+"px";
}
//遍历所有的按钮
var key=0;//控制播放张数
for(var k in sctrls){
	sctrls[k].onclick=function(){
		if (this.className=="slider-ctrl-prev"){
            animation(imgs[key],{left:scrollWidth});
            --key<0 ? key=imgs.length-1 : key;
            imgs[key].style.left=-scrollWidth+"px";
            animation(imgs[key],{left:0});
            setSquare();
		}else if(this.className=="slider-ctrl-next"){
            autoplay();
		}else{
            var that=this.innerHTML-1;//获得当前点击的span的索引值
            if(that>key){
            	animation(imgs[key],{left:-scrollWidth});
            	imgs[that].style.left=scrollWidth+"px";
            }else if(that<key){
            	animation(imgs[key],{left:scrollWidth});
            	imgs[that].style.left=-scrollWidth+"px";
            }
           key=that;
           animation(imgs[key],{left:0});
           setSquare();
		}
	}
}
//控制当前播放span的函数
function setSquare(){
	for(var i=1;i<sctrls.length-1;i++){
		sctrls[i].className="slider-ctrl-con";
	}
	sctrls[key+1].className="slider-ctrl-con current";
}
//定时器开启，自动播放图片，且下方小方块改变
var timer=null;
timer=setInterval(autoplay, 2000);
function autoplay(){
	animation(imgs[key],{left:-scrollWidth});
	++key>imgs.length-1 ? key=0:key;//先++ 后判断 再执行
	imgs[key].style.left=scrollWidth+"px";
	animation(imgs[key],{left:0});
	setSquare();
}
//鼠标经过停止定时器大盒子
js_slider.onmouseover=function(){
	clearInterval(timer);
}
js_slider.onmouseout=function(){
	clearInterval(timer);
	timer=setInterval(autoplay, 2000);
}
}