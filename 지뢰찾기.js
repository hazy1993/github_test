let start = document.querySelector('#exec');//버튼
let table = document.querySelector('#table');//테이블
let flag = false; // 게임 진행여부
let hor = ''; //가로
let ver = ''; //세로
let mine =''; //지뢰
let count = 0;//지뢰 아닌것 발견한 횟수
let td = document.createElement('td');
let tr = document.createElement('tr');

let body = document.body;



start.addEventListener('click',function(e){
    table.innerHTML = ''; //그려진것들을 초기화
    document.querySelector('#result').textContent ='';
    flag = false;
    count = 0;
    let arr = []; //칸
    let cal = []; //줄

    //button click Event
    hor = document.querySelector("#hor").value; //가로의 값 가져온다
    ver = document.querySelector("#ver").value; //세로의 값 가져온다
    mine = document.querySelector("#mine").value; //지뢰 갯수 가져온다
    
    //테일을 그려주는 로직
    for(let i = 0; i < hor;i++){
        tr = document.createElement('tr');
        arr.push([]); //배열에 배열을 집어넣음. 줄 생성
        // cal.push(tr); //이게 실질적인 줄
        for(let j = 0; j< ver;j++){
            td = document.createElement('td')//칸을 만듬
            arr[i].push(0); //'배열 초기값 설정'
            tr.appendChild(td); //줄에 칸을 붙임
            // td.textContent = 1;//화면과 배열 값을 일치시킴
            td.addEventListener('contextmenu',function (e) {//마우스 오른쪽클릭 event
            if(flag){
                return;
            }
                
            e.preventDefault();
            
          
            let pTr =  e.target.parentNode; //부모 tr
            let pTbody =  e.target.parentNode.parentNode; //부모tobody

            //target 이벤트가 발생한 애
            //currentTarget 이벤트가 달린 애
            
            let rowNum = Array.prototype.indexOf.call(pTr.children, e.target); //몇번째 칸인지
            let calNum = Array.prototype.indexOf.call(pTbody.children,pTr); //몇번쨰 줄인지

            let checkMine = '!';
            let target = e.target.textContent;
            let val = arr[calNum][rowNum];

                if(target!==checkMine&&target!=='?'){
                 e.target.textContent =checkMine;
                }else if(target===checkMine){
                    e.target.textContent ='?';
                }else if(target==='?'){
                    e.target.textContent = val;
                }

               

            })
            td.addEventListener('click',function (e) {
                if(flag){
                    return;
                }
             
                let pTr =  e.target.parentNode; //부모 tr
                let pTbody =  e.target.parentNode.parentNode; //부모tobody 
                let rowNum = Array.prototype.indexOf.call(pTr.children, e.target); //몇번째 칸인지
                let calNum = Array.prototype.indexOf.call(pTbody.children,pTr); //몇번쨰 줄인지
                let checkMine = '!';
                let target = e.target.textContent;
                let val = arr[calNum][rowNum];

                
                e.target.classList.add('opened');
                
                
                //console.log(arr);

                if(val==='X'){
                //지뢰일경우

                    for(let i = 0; i < arr.length;i++){
                        for(let j = 0; j < arr.length;j++){
                            
                            if(arr[i][j]==='X'){
                                table.children[i].children[j].textContent = '펑';
                                //지뢰인 경우 전부 펑 터트림
                                table.children[i].children[j].classList.add('opened');
                                //지뢰도 다 밝혀줌
                            }
                        }
                    }

                    document.querySelector('#result').textContent = '실패ㅠㅠㅠ';
                    flag = true;
                    //플레그를 줌으로서 게임이 더 진행되지 않음

                
                }else{//지뢰가 아닌경우

                    if(arr[calNum][rowNum]!==1){
                        count++;
                    }
                    
                    arr[calNum][rowNum] = 1;
              
                    let scop = [
                    arr[calNum][rowNum-1], arr[calNum][rowNum+1],
                ];
                //주변 쥐로 찾아주는 로직
                    if(arr[calNum-1]){
                        scop = scop.concat(arr[calNum-1][rowNum-1],arr[calNum-1][rowNum],arr[calNum-1][rowNum+1]);
                    }
                    if(arr[calNum+1]){
                        scop =scop.concat(arr[calNum+1][rowNum-1],arr[calNum+1][rowNum],arr[calNum+1][rowNum+1]);
                    }
                   let scopMine = scop.filter(function (v) {
                        //필터로 X를 확인후 , length로 길이 체크
                        return v==='X';
                    }).length;

                    e.target.textContent = scopMine|| '';
                    //주변의 숫자를 입력해줌

                    if(scopMine===0){
                        let scop2 =[];

                        
                        if(table.children[calNum-1]){
                            for(let i = -1; i < 2;i++){
                                scop2.push(table.children[calNum-1].children[rowNum+i]);
                                //아래쪽 지뢰 찾기
                            }
                        }

                        if(table.children[calNum+1]){
                            for(let i = -1; i < 2;i++){
                                scop2.push(table.children[calNum+1].children[rowNum+i]);
                                //위쪽 지뢰 찾기
                            }
                        }
                
                        for(let i = -1; i < 2;i+=2){
                                scop2.push(table.children[calNum].children[rowNum+i]);
                                //양옆 지뢰 찾기
                        }
                        

                        // console.log(scop2);
                        scop2.filter((v)=>!!v).forEach(function (e) {

                          pTr =  e.parentNode; //부모 tr
                          pTbody =  e.parentNode.parentNode; //부모tobody 
                          rowNum = Array.prototype.indexOf.call(pTr.children, e); //몇번째 칸인지
                          calNum = Array.prototype.indexOf.call(pTbody.children,pTr); //몇번쨰 줄인지
                            
                           
                            if(arr[calNum][rowNum] !== 1 ){
                                e.click();
                            }
                            
                        });

                    }
                    

                    if(count ===hor*ver-mine){
                        document.querySelector('#result').textContent = '승리^^';
                    }
                }

                
            });
        
        }
         table.appendChild(tr);//테이블에 줄(칸들)을 붙임
    }
    
    //지뢰 로직
    let mines = Array(hor*ver)
        .fill()
        .map(function(e,index){
        return index;
    });

    let shuffle = [];
    //섞은 지뢰를 저장히기위한 배열

    while(shuffle.length < mine){
        shuffle.push(mines.splice(Math.floor(Math.random()*mines.length),1)[0]);  
        //mine의 갯수만큼 꺼낸다. //랜덤으로 //배열타입으로 저장되기에[0]째 요소 꺼냄
    }
    
    while(shuffle.length>0){

        let st = shuffle.shift();
        let h = st%10;
        let v = Math.floor(st/10);
        // console.log("h = "+h +", v" + v)

        arr[v][h] = 'X';
        table.children[v].children[h].textContent = "X";
        
        //화면과 배열값을 맞춰줘야하기애 arr값도 'X'로 맞춰줌
    }
    //  console.log(shuffle);
    //  console.log(arr);

});



    

