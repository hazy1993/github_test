let body = document.body;
let table = document.createElement('table');
let turn = 'X';
let arr = []; //칸들
let cal = []; //줄들

    for(let i = 0; i < 3;i++){
        let tr = document.createElement('tr'); 
        cal.push(tr);
         arr.push([]);
        for(let j = 0; j < 3; j++){
            var td = document.createElement('td');//칸 let으로 설정시 값 변경 불가
            td.addEventListener('click',service);      
            arr[i].push(td);       
            tr.appendChild(td);
           
        }
        table.appendChild(tr);//줄바꿈
    }
    body.appendChild(table);
 

function service(e){
    console.log(e.target);
    console.log(arr,cal);
    let qCal = cal.indexOf(e.target.parentNode);
    //몇번째 줄인지 확인
    let qArr = arr[qCal].indexOf(e.target);
    //몇번째 칸인지 확인
    let check = e.target.textContent;

    
   if(check!=='O'&&check!=='X'){
        e.target.textContent = turn;
        (turn==='X')?turn='O':turn='X';
   }

   let s ='O';
   let z = 'X';
   let scount = 0;
   let zcount = 0;
   Loop:for(let i =0; i < 3; i++){
        scount = 0;
        zcount = 0;
      for(let j = 0; j <3; j++){
            if(s===arr[i][j].textContent)
                scount++;

             if(z===arr[i][j].textContent)
                zcount++;
                   
             if(zcount===3||scount===3)
                break Loop;    
      } 

   }
 
   console.log(zcount);
   console.log(scount);


};