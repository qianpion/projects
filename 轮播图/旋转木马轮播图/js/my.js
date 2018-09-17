//$函数
function $(id){return document.getElementById(id);}

//目标显示和隐藏
function show(obj){obj.style.display="block";}
function hide(obj){obj.style.display="none";}

//页面滚动效果
function scroll(){
	if(window.pageYOffset !=null){
		return{
            left:window.pageXOffset,
            top:window.pageYOffset
		}
	}else if(document.compatMode=="CSS1Compat"){
         return{
         	left:document.documentElement.scrollLeft,
         	top:document.documentElement.scrollTop
         }
	}return{
		left:document.body.scrollLeft,
        top:document.body.scrollTop
	}
}

// 可视区域大小
function client(){
	if(window.innerWidth !=null){
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else if(document.compatMode==="CSS1Compat"){
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
	return{
		width:document.body.clientWidth,
		height:document.body.clientHeight
	}
}

// 动画效果
    // 匀速动画函数
    // function animate(obj,json){
    //     clearInterval(obj.timer);
    //     obj.timer=setInterval(function(){
    //     	var (var attr in json){
    //     		var current=parseInt(getStyle(obj,attr));
    //     		var speed=current<json[attr] ? 15 :-15;
    //     		// var result=json[attr]-current;
    //     		obj.style[attr]=current+speed+"px";
    //     		// if(Math.abs)
    //     	}
    //     },10)
        // var current=parseInt(getStyle(obj,attr));
        // var speed=current<tatget ? 15 : -15;
        // obj.timer=setInterval(function(){
        // 	var result=target-current;
        // 	obj.style[attr]=current+speed+"px";
        // 	if(Math.abs(result)<=15){
        // 		clearInterval(obj.timer);
        // 		obj.style[attr]=target+"px";
        // 	}
        // },10)
    // }
//封装多个属性运动框架
function animation(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var flag=true;//用来判断是否停止定时器
		//遍历json(属性：值)
		for(var attr in json){
			var current=0;
			if(attr=="opacity"){
				current=Math.round(parseInt(getStyle(obj,attr)*100))||0;
			}else{
				current=parseInt(getStyle(obj,attr));
			}
			var step=(json[attr]-current)/10;
			step=step>0 ? Math.ceil(step) : Math.floor(step);
			// 判断透明度
			if(attr=="opacity"){//判断用户有没有输入opacity
				if("opacity" in obj.style){//判断浏览器是否支持opacity
					obj.style.opacity=(current+step)/100;
				}else{//不支持obj.style.filter=alpha(opacity=30)
					obj.style.filter="alpha(opacity="+(current+step)*10+")";
				}
			}else if(attr=="zIndex"){
                 obj.style.zIndex=json[attr];
			}else{
				obj.style[attr]=current+step+"px";
			}
			
			if(current !=json[attr]){
				flag=false;
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
		
		   // var step=(target-obj.offsetLeft)/10;
		   // step=step>0 ?Math.ceil(step) : Math.floor(step);
		   // obj.style.left=offsetLeft+step+"px";
		   // if(obj.offsetLeft==target){
		   // 	clearInterval(obj.timer);
		// }
	}, 30)
}
//返回当前样式的函数
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return window.getComputedStyle(obj,null)[attr];
	}
}

// 