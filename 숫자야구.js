let body = document.body;
let list = [1,2,3,4,5,6,7,8,9];
let quest = [];


let result = document.createElement('h1');
result.textContent = '결과';
body.append(result);
let form = document.createElement('form');
body.append(form);
let input = document.createElement('input');
input.maxLength = 4;
input.type = 'text';
form.append(input);
let button = document.createElement('button');
button.textContent = '입력';
form.append(button);
let dream = document.createElement('h1');
dream.textContent = '남은기회 10번';
body.append(dream);

questfun();

let count = 0;
form.addEventListener('submit',function(e){

    e.preventDefault();
    //submit event 제거
   
    let val = input.value;
    //입력 값 받기

    let strike = 0;
    let ball = 0;

    console.log(quest.join(''));
    if(val===quest.join('')){
        result.textContent = '홈런';
        questfun();
    }else{
        var resultArr = val.split('');
        count++;
       
            for(let i = 0; i < resultArr.length;i++){

                for(let j = 0; j < resultArr.length;j++){
    
                    if(resultArr[i]===String(quest[i])){
                        strike++;
                        i++;
                        result.textContent = '스트라이크 :'+strike + '볼 :' + ball;
                }else if(resultArr.indexOf(String(quest[j])) > -1){
                    ball++;
                    i++;
                    result.textContent = '스트라이크 :'+strike + '볼 :' + ball;
                }
                }
            }
          
         if(count < 10){
             //몇번 기회 남았는지 알려줌
            dream.textContent = 10-count + '번 남았습니다.';
         }else{
             //10번 틀릴 경우 정답 출력
            dream.textContent = '정답은' + quest.join('')+'입니다';
         }
    }

})



function questfun(){
    list = [1,2,3,4,5,6,7,8,9];
    quest = [];
 
    for(let i =0; i < 4;i++){
        //list의 랜덤한 숫자 꺼냄 
        let num = list.splice(Math.floor(Math.random()*list.length),1)[0];
        //배열로 뽑히기 때문에 [0]번째 요소 추출
        quest.push(num);
        result.textContent = '정답을 입력해주세요!';
            
    }
}



