window.onload=function(){
	var wrap=$("wrap");
    // console.log(wrap);
	var arrow=$("arrow");
    var slide=$("slide");
    var lis=slide.children[0].children;
    // console.log(lis);

	wrap.onmouseover=function(){
		animation(arrow,{opacity:100});
	}
	wrap.onmouseout=function(){
		animation(arrow,{opacity:0});
	}
       var json = [
        {   //  1
            width:300,
            top:20,
            left:100,
            opacity:20,
            z:2
        },
        {  // 2
            width:400,
            top:40,
            left:50,
            opacity:40,
            z:3
        },
        {   // 3
            width:500,
            top:60,
            left:0,
            opacity:60,
            z:4
        },
        {  // 4
            width:550,
            top:80,
            left:50,
            opacity:80,
            z:5
        },
        {   //5
            width:800,
            top:100,
            left:200,
            opacity:100,
            z:6
        },
        {   //  6
            width:550,
            top:80,
            left:600,
            opacity:80,
            z:5
        },
        {  // 7
            width:500,
            top:60,
            left:550,
            opacity:60,
            z:4
        },
        {   // 8
            width:400,
            top:40,
            left:600,
            opacity:40,
            z:3
        },
        {  // 9
            width:300,
            top:20,
            left:650,
            opacity:20,
            z:2
        }
    ];
    //函数节流
    var stopflow=true;
    change();
    //两个按钮点击事件
    var as =arrow.children;
    for(var k in as){
        as[k].onclick=function(){
            if(this.className=="prev"){
                //移除第一个放到最后一个
                if(stopflow){
                     change(true);
                     stopflow=false;
                }
               
            }else{
                //把最后一个json删除，并且把最后一个添加到json第一个位置
                if(stopflow){
                     change(false);
                     stopflow=false;
                }
            }
        }
    }

    function change(flag){
        if(flag){
            //把最后一个json删除，并且把最后一个添加到json第一个位置
            json.unshift(json.pop());
        }else{
            //移除第一个放到最后一个
            json.push(json.shift());
        }
        for(var i=0;i<json.length;i++){
            animation(lis[i],{
                width:json[i].width,
                top:json[i].top,
                left:json[i].left,
                opacity:json[i].opacity,
                zIndex:json[i].z
            },function(){stopflow=true;})
        }
    }
}
