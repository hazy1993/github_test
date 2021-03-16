let screen = document.querySelector('#screen');

let status = {

};
let result;
let history =[];

// console.time('time');//시작시간
// console.timeEnd('time');//끝난시간. 시간 체크하는 것
// var start = performance.now(); //정밀한 시간 end;
// var end = performance.now(); //정밀한 시간. end;

let startDate;
let out;
screen.addEventListener('click',function(){


    
   if(screen.classList.contains('waiting')){ //sky - > red
       screen.classList.remove('waiting');//sky;
       screen.classList.add('ready');//red
       screen.textContent = '초록색이 되면 클릭하세요.';//붉은화면

    out = setTimeout(function(){//red - > green
        startDate = new Date();//시작하는 현재 시간.
        screen.classList.remove('ready');//red
        screen.classList.add('now');//green
        screen.textContent = '클릭하세요!'; //초록색 화면
    },1000+(Math.floor(Math.random()*1000)));//랜덤한 시간에 시작
    
   }else if(screen.classList.contains('ready')){//red - > pupple

        screen.classList.remove('ready');//red
        screen.classList.add('out');//pupple
        history =[];
        screen.textContent ='부정클릭입니다. 처음부터다시';
        clearTimeout(out);
       
   }else if(screen.classList.contains('now')){
            screen.classList.remove('now');
            screen.classList.add('waiting');
            screen.click();
            screen.textContent = '초록색이 되면 클릭하세요.';
            let endDate = new Date();//끝난 현재 시간.
            history.push(endDate-startDate);
       
        if(history.length===3){
            result = document.createElement('div').textContent ='다시하려면 클릭!';
            screen.classList.remove('ready');
            screen.classList.add('result');
            screen.textContent = '결과 :'+ ((Math.floor(history.reduce((a,b)=>(a+b),0))/3)/100);
            screen.append(result); 
            history =[];
            clearTimeout(out);
            
        }

   }else if(screen.classList.contains('out')){
        screen.classList.remove('out');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요.';

   }else if(screen.classList.contains('result')){
         screen.classList.remove('result');
         screen.classList.add('waiting');
         screen.textContent = '클릭해서 시작하세요.';
   }

});

