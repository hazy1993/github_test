let arr = Array(45)
    .fill()
    .map(function(el,index){
    return index+1;
    })
    //45개의 숫자 생성
let color = ['red','yellow','purple','green','gray']
var shuffle = [];
while(arr.length>0){
  var move =  arr.splice(Math.floor(Math.random()*arr.length),1);
    //숫자를 섞고 꺼낸다
  shuffle.push(move);
  //꺼낸 숫자를 넣는다
}

let bonus = shuffle[shuffle.length-1];
let lotto = shuffle.slice(0,6);
//숫자를 6개 만큼 섞는다
lotto.sort(function(a,b){return a-b});
//정렬한다.

let result = document.getElementById('result');


for(let i = 0; i < lotto.length;i++){
     setTimeout(function(){
        let ball = document.createElement('div');
        ball.style.display = 'inline-block';
        ball.style.border = '3px solid black';
        ball.style.borderRadius = '50px';
        ball.style.width = '70px';
        ball.style.height = '70px';
        ball.style.textAlign ='center';
        ball.style.fontSize = '25px';
        ball.textContent = lotto[i];
        result.appendChild(ball);
        var 배경색;
        ball.style.backgroundColor = color[Math.floor(lotto[i]/10)];


     },1000*i);
     //공을 1초에 1개씩 꺼낸다/
}



setTimeout(function(){
    let bsball = document.createElement('div');
    let bs = document.getElementsByClassName('bonus')[0];
    bsball.style.display = 'inline-block';
    bsball.style.border = '1px solid black';
    bsball.style.borderRadius = '50px';
    bsball.style.width = '70px';
    bsball.style.height = '70px';
    bsball.style.textAlign ='center';

    bsball.style.fontSize = '25px';
    bsball.textContent = bonus;
    
    bsball.style.backgroundColor = color[Math.floor(bonus/10)];
    bs.appendChild(bsball);
},7000);





