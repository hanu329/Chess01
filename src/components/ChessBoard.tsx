
import '../../public/css/chessboard.css'; // You can style the chess board in ChessBoard.css
import {useState, useEffect,useRef} from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RookMoves1,KnightMoves1,bishopMoves1, blackKingMoves,blackQueenMoves,blackPawnMoves,
  whitePawnMoves,updateMoveObj,isKingSafe,isKingDead} from './KeyMoves';
import { faChessQueen as regularChessQueen } from '@fortawesome/free-regular-svg-icons';
import { faChessPawn as regularChessPawn} from '@fortawesome/free-regular-svg-icons';
import { faChessRook as regularChessRook } from '@fortawesome/free-regular-svg-icons';
import { faChessBishop as regularChessBishop } from '@fortawesome/free-regular-svg-icons';
import { faChessKnight as regularChessKnight } from '@fortawesome/free-regular-svg-icons';
import { faChessKing as regularChessKing } from '@fortawesome/free-regular-svg-icons';

import { faChessRook as solidChessRook } from '@fortawesome/free-solid-svg-icons';
import { faChessBishop as solidChessBishop } from '@fortawesome/free-solid-svg-icons';
import { faChessKnight as solidChessKnight } from '@fortawesome/free-solid-svg-icons';
import { faChessKing as solidChessKing } from '@fortawesome/free-solid-svg-icons';
import { faChessQueen as solidChessQueen } from '@fortawesome/free-solid-svg-icons';
import { faChessPawn as solidChessPawn } from '@fortawesome/free-solid-svg-icons';

const bk1=<FontAwesomeIcon icon={solidChessRook} />
const bk2=<FontAwesomeIcon icon={solidChessKnight} />
const bk3=<FontAwesomeIcon icon={solidChessBishop} />
const bk4=<FontAwesomeIcon icon={solidChessKing} />
const bk5=<FontAwesomeIcon icon={solidChessQueen} />
const bk6=<FontAwesomeIcon icon={solidChessBishop} />
const bk7=<FontAwesomeIcon icon={solidChessKnight} />
const bk8=<FontAwesomeIcon icon={solidChessRook} />
const bp1=<FontAwesomeIcon icon={solidChessPawn} />

const wp1=<FontAwesomeIcon icon={regularChessPawn} />
const wk1=<FontAwesomeIcon icon={regularChessRook} />
const wk2=<FontAwesomeIcon icon={regularChessKnight} />
const wk3=<FontAwesomeIcon icon={regularChessBishop} />
const wk4=<FontAwesomeIcon icon={regularChessKing} />
const wk5=<FontAwesomeIcon icon={regularChessQueen} />
const wk6=<FontAwesomeIcon icon={regularChessBishop} />
const wk7=<FontAwesomeIcon icon={regularChessKnight} />
const wk8=<FontAwesomeIcon icon={regularChessRook} />

const board:any=[];

for(let i=0; i<8; i++){
    for(let j=0; j<8; j++){
      board.push([i,j])
       
    }
}

const blackKey={
  b1:[0,0],
  b2:[0,1],
  b3:[0,2],
  b4:[0,3],
  b5:[0,4],
  b6:[0,5],
  b7:[0,6],
  b8:[0,7]
}

const whiteKey={
  w1:[7,0],
  w2:[7,1],   
  w3:[7,2],
  w4:[7,3],
  w5:[7,4],
  w6:[7,5],
  w7:[7,6],
  w8:[7,7]
}
const blackPawn={
  bp1:[1,0],
  bp2:[1,1],
  bp3:[1,2],
  bp4:[1,3],
  bp5:[1,4],
  bp6:[1,5],
  bp7:[1,6],
  bp8:[1,7]
}
const whitePawn={
  wp1:[6,0],
  wp2:[6,1],
  wp3:[6,2],
  wp4:[6,3],
  wp5:[6,4],
  wp6:[6,5],
  wp7:[6,6],
  wp8:[6,7]
}
const obj={       
  k1:blackKey, 
  p1:blackPawn,
  k2:whiteKey,
  p2:whitePawn
}
//obj.k1.b1, opj.p1.bp1,obj.k2.w1,obj.p2.wp1
const ChessBoard = () => {
  const [item, setItem] = useState(obj); 
  const [flag, setFlag]=useState(2)
  const [validStp, setValidStp]:any = useState(null); 

  const [key, setKey] = useState("na"); 
 const [turn, setTurn] =useState(-1)     
 const [winner,setWinner]=useState('na')
 const [t0,setT0]=useState(-1)
 const [s0,setS0]=useState(-1)
 const [t1,setT1]=useState(-1)
 const [s1,setS1]=useState(-1)
 const [load, setLoad]=useState('')

const [turnText, setTurnText]=useState('na');
let tRef1:any=useRef(0)
let tRef2:any=useRef(0)

const initTimer=()=>{
  setT0(-1)
  setT1(-1)
  setS0(-1)
  setS1(-1)
}
console.log('turnnn',turnText)
const addTurn=()=>{
  console.log(12345)
  if(turn==0) setTurnText('white')
    else if(turn==1) setTurnText('black')
  console.log('turn',turn)
}
console.log('turnnn2',turnText)

 const showTimer=(t:number)=>{
 
  if(t==0){
    clearInterval(tRef2.current)
    tRef1.current= setInterval(()=>{
      setS0((pre:any) => {
        if (pre === 0) {
          setT0((min:any) => {
            if(pre==0 && min==0){
              setWinner('black')
              initTimer();
            }
           min= min>0?min-1:min
            
            return min
          });
          return 59;
        }else if(pre<0){
          clearInterval(tRef2.current)
          clearInterval(tRef1.current)
          return -1
        } 
        else {
          return pre - 1;
        }
      });
     
    }, 1000);
  }else if(t==1){
    clearInterval(tRef1.current)
    tRef2.current= setInterval(()=>{
      setS1((pre:any) => {
        if (pre === 0) {
          setT1((min:any) =>{
            if(pre==0 && min==0){
              setWinner('white')
              initTimer();
            }
            min=min > 0 ? min - 1 : 0
            return min
          } );
          return 59;
        } else if(pre<0){
          clearInterval(tRef2.current)
          clearInterval(tRef1.current)
          return -1
        }
        
        else {
          return pre - 1;
        }
      });
     
    }, 1000);
  }
 
 }

 useEffect(()=>{
  addTurn()
  localStorage.setItem("chessObj", JSON.stringify(item)); 
 
  let ch=isKingSafe(item)
 
  if(!ch[0]){
    let f=isKingDead(item,turn)
    if(f){
     if(turn==1){
 
 setWinner('white')
} 
  else{
    setWinner('black')
}
    }
  }
 console.log('key',key,'validstp',validStp)
},[item,validStp,turn])

console.log('vvv',validStp)
// const vldStpFun=(a:any,b:any,vs:any)=>{
//   console.log('vvldd',vs,a,b)
//   for(let i=0; i<8; i++){
//     for(let j=0; j<8; j++){
//       vs.map((elem:any)=>{
//         elem.map((el:any)=>{
        
//         })
//     })
       
//     }
// }
  
// }

const turncheck=()=>{
  if(turn==0 && key.includes('w') || turn==1 && key.includes('b')) return true;

  else return false;
}

const movebk=(a:any, b:any,c:any)=>{
  console.log('c',c)
 if(!turncheck()) return;
  if(turncheck()){
    let subArr:any=[a,b]
const containsArray = validStp.some((el:any)=> {
  return el.length === subArr.length && el.every((value:any, index:any) => {
    return value === subArr[index];
  });
});
  if(key!='na' && containsArray){
    let newObj= JSON.parse(JSON.stringify(item));
    if(key.includes('bp')) newObj={...newObj, p1:{...newObj.p1, [key]:[a,b]}} 
    else if(key.includes('wp')) newObj={...newObj, p2:{...newObj.p2, [key]:[a,b]}}
    else if(key.length==2 && key.includes('b')) newObj={...newObj, k1:{...newObj.k1, [key]:[a,b]}}
    else  newObj={...newObj, k2:{...newObj.k2, [key]:[a,b]}}
  
   let ch=isKingSafe(newObj)
   
      if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
        setItem(newObj)
        {turn==0?<>{setTurn(1)}{showTimer(1)}</>:<>{setTurn(0)}{showTimer(0)}</>}
      } 
  }
 setKey('na')
 
 setValidStp(null)
  }

}
const validCrosskey=(a:any, b:any)=>{
  
  let  validkey:boolean=false;
  for(let i=0; i<validStp.length; i++){
    if(validStp[i][0]==a && validStp[i][1]==b){
      validkey=true;
      break;
    }
  }
     console.log('jjjrr',a,b,validStp)
    // if(!validkey) return;
    return validkey;
}

const movebk1=(e:any,a:any, b:any,v:any)=>{
  e.stopPropagation();
  //if 
  if((key.includes('b') && v.includes('b')) ||(key.includes('w') && v.includes('w')) || key=='na'){  
    let res=RookMoves1(item,a,b,v);
      if(res.length>0){
      setKey(v)
      setValidStp(res)
      }
  } 
  else{  
    let newObj= JSON.parse(JSON.stringify(item));
    let tt=validCrosskey(a,b)
    if(!tt) return;
    let res=updateMoveObj(a, b,v, key,newObj)
   

    setValidStp(null)
    let ch=isKingSafe(res)
       console.log('chhhs',ch,key,'turnnnn',turn)
      if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
        setItem(res)
        {turn==0?<>{setTurn(1)}{showTimer(1)}</>:<>{setTurn(0)}{showTimer(0)}</>} 
      } 
    setKey('na')
  }
}



const movebk2=(e:any, a:any, b:any,v:any)=>{
  console.log('2222',key,v) 
  e.stopPropagation();
  if((key.includes('b') && v.includes('b')) ||(key.includes('w') && v.includes('w')) || key=='na'){  
    let res=KnightMoves1(item,a,b,v);
      if(res.length>0){
      setKey(v)
      setValidStp(res)
  } 
  } 
  else{  
    let newObj= JSON.parse(JSON.stringify(item));
  let tt=validCrosskey(a,b)
if(!tt) return;
    let res=updateMoveObj(a, b,v, key,newObj)
    setValidStp(null)
    let ch=isKingSafe(res)
      // console.log('chhhs',ch,key,turn)

      if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
        setItem(res)
          {turn==0?<>{setTurn(1)}{showTimer(1)}</>:<>{setTurn(0)}{showTimer(0)}</>}
      } 
    setKey('na')
  }
}
const movebk3=(e:any, a:any, b:any,v:any)=>{
 e.stopPropagation();
  if((key.includes('b') && v.includes('b')) ||(key.includes('w') && v.includes('w')) || key=='na'){  
    let res=bishopMoves1(item,a,b,v);
      if(res.length>0){
      setKey(v)
      setValidStp(res)
  } 
  } 
  else{  
    let newObj= JSON.parse(JSON.stringify(item));
    let tt=validCrosskey(a,b)
    if(!tt) return;
    let res=updateMoveObj(a, b,v, key,newObj)
    setValidStp(null)
    let ch=isKingSafe(res)
      // console.log('chhhs',ch,key,turn)

        if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
          setItem(res)
            {turn==0?<>{setTurn(1)}{showTimer(1)}</>:<>{setTurn(0)}{showTimer(0)}</>}
        } 
        
    setKey('na')
  }
}

const movebQueen=(e:any, a:any, b:any,v:any)=>{
 e.stopPropagation();
  if((key.includes('b') && v.includes('b')) ||(key.includes('w') && v.includes('w')) || key=='na'){  
    let res=blackQueenMoves(item,a,b,v);
      if(res.length>0){
      setKey(v)
      setValidStp(res)
  } 
  } 
  else{  
    let newObj= JSON.parse(JSON.stringify(item));
    let tt=validCrosskey(a,b)
    if(!tt) return;
    let res=updateMoveObj(a, b,v, key,newObj)
   
    setValidStp(null)
    let ch=isKingSafe(res)
    if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
      setItem(res)
        {turn==0?<>{setTurn(1)}{showTimer(1)}</>:<>{setTurn(0)}{showTimer(0)}</>}
    } 
    setKey('na')
  }
}
const movebKing=(e:any, a:any, b:any,v:any)=>{
 e.stopPropagation();

  if((key.includes('b') && v.includes('b')) ||(key.includes('w') && v.includes('w')) || key=='na'){  
    let res=blackKingMoves(item,a,b,v);
      if(res.length>0){
      setKey(v)
      setValidStp(res)
  } 
  } 
  else{  
    let newObj= JSON.parse(JSON.stringify(item));
    let tt=validCrosskey(a,b)
    if(!tt) return;
    let res=updateMoveObj(a, b,v, key,newObj)
    setValidStp(null)
    let ch=isKingSafe(res)

    if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
      setItem(res)
        {turn==0?<>{setTurn(1)}{showTimer(1)}</>:<>{setTurn(0)}{showTimer(0)}</>}
    } 
    setKey('na')
  }
}

const movebPawn=(e:any,a:any, b:any,v:any)=>{

  console.log('nntr',turn,v,key,a,b)
  //
  e.stopPropagation();
 
  let f=1;
  if(validStp){
    validStp.map((el:any)=>{
      if(el[0]==a && el[1]==b){
        f=2
        //if turn is valid then combat
       combat(a,b,v,key)
       return;
      }
   })
  }
 if(f==2){
  return;
 }
  let res;
    if(v.includes("bp")) res=blackPawnMoves(item,a,b,v);
    else res= whitePawnMoves(item,a,b,v)
      setKey(v);    
       setValidStp(res);
       console.log('ress',a,b,res)
      // vldStpFun(a,b,res)
    
       
}
const combat=(a:any, b:any,v:any, key:any)=>{
  
  let newObj= JSON.parse(JSON.stringify(item)); 
  let tt=validCrosskey(a,b)
  if(!tt) return;
  var res=updateMoveObj(a, b,v, key,newObj)
  let ch=isKingSafe(res)
     if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
      setItem(res)
        {turn==0?<>{setTurn(1)}{showTimer(1)}</>:<>{setTurn(0)}{showTimer(0)}</>}
    } 
   //setFlag(2)
   setValidStp(null) 
  setKey('na')
}


 const renderUi=()=>{
   return <div className='contDiv'> 
  
 {board && item && board.map((el:any)=>{


            let subArr1=[el[0],el[1]] 
  const containsArray1 = validStp && validStp.some((el:any)=> {
   return el.length === subArr1.length && el.every((value:any, index:any) => {
     return value === subArr1[index];
   });
 });



     
             return <>


             {validStp==null? <ToggleDiv onClick={()=>movebk(el[0],el[1],'c')} key={el[0]+""+el[1]+1} id={el[0]+""+el[1]+2} bg={el[0]+el[1]} className='toggleDiv1' style={{}}>
       <div id={el[0]+""+el[1]} className='tdDiv'> 
           {el[0]==item.k1.b1[0] && el[1]==item.k1.b1[1] &&flag==3? <div onClick={(e)=>movebk1(e,el[0],el[1],'b1')} className='chessKey'>{bk1}</div>:
           el[0]==item.k1.b1[0] && el[1]==item.k1.b1[1] && flag==2? <div className="chessKey"></div>:
           el[0]==item.k1.b2[0] && el[1]==item.k1.b2[1]&& flag==3?<div onClick={(e)=>movebk2(e,el[0],el[1],'b2')} className="chessKey">{bk2}</div>:
           el[0]==item.k1.b2[0] && el[1]==item.k1.b2[1]&& flag==2?<div className="chessKey"></div>:
           el[0]==item.k1.b3[0] && el[1]==item.k1.b3[1]  && flag==3?<div onClick={(e)=>movebk3(e,el[0],el[1],'b3')} className="chessKey">{bk3}</div>:
           el[0]==item.k1.b3[0] && el[1]==item.k1.b3[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k1.b4[0] && el[1]==item.k1.b4[1]  && flag==3?<div onClick={(e)=>movebKing(e,el[0],el[1],'b4')} className="chessKey">{bk4}</div>:
           el[0]==item.k1.b4[0] && el[1]==item.k1.b4[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k1.b5[0] && el[1]==item.k1.b5[1]  && flag==3?<div onClick={(e)=>movebQueen(e,el[0],el[1],'b5')} className="chessKey">{bk5}</div>:
           el[0]==item.k1.b5[0] && el[1]==item.k1.b5[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k1.b6[0] && el[1]==item.k1.b6[1]  && flag==3?<div onClick={(e)=>movebk3(e,el[0],el[1],'b6')} className="chessKey">{bk6}</div>:
           el[0]==item.k1.b6[0] && el[1]==item.k1.b6[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k1.b7[0] && el[1]==item.k1.b7[1]  && flag==3?<div onClick={(e)=>movebk2(e,el[0],el[1],'b7')} className="chessKey">{bk7}</div>:
           el[0]==item.k1.b7[0] && el[1]==item.k1.b7[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k1.b8[0] && el[1]==item.k1.b8[1]  && flag==3?<div onClick={(e)=>movebk1(e,el[0],el[1],'b8')} className="chessKey">{bk8}</div>:
           el[0]==item.k1.b8[0] && el[1]==item.k1.b8[1] && flag==2?<div className="chessKey"></div>:
         
           el[0]==item.p1.bp1[0] && el[1]==item.p1.bp1[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp1')} className='chessKey'>{bp1}</div>:
           el[0]==item.p1.bp1[0] && el[1]==item.p1.bp1[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.p1.bp2[0] && el[1]==item.p1.bp2[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp2')} className="chessKey">{bp1}</div>:
           el[0]==item.p1.bp2[0] && el[1]==item.p1.bp2[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.p1.bp3[0] && el[1]==item.p1.bp3[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp3')} className="chessKey">{bp1}</div>:
           el[0]==item.p1.bp3[0] && el[1]==item.p1.bp3[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.p1.bp4[0] && el[1]==item.p1.bp4[1] && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp4')} className="chessKey">{bp1}</div>:
           el[0]==item.p1.bp4[0] && el[1]==item.p1.bp4[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.p1.bp5[0] && el[1]==item.p1.bp5[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp5')} className="chessKey">{bp1}</div>:
           el[0]==item.p1.bp5[0] && el[1]==item.p1.bp5[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.p1.bp6[0] && el[1]==item.p1.bp6[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp6')} className="chessKey">{bp1}</div>:
           el[0]==item.p1.bp6[0] && el[1]==item.p1.bp6[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.p1.bp7[0] && el[1]==item.p1.bp7[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp7')} className="chessKey">{bp1}</div>:
           el[0]==item.p1.bp7[0] && el[1]==item.p1.bp7[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.p1.bp8[0] && el[1]==item.p1.bp8[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp8')} className="chessKey">{bp1}</div>:          
           el[0]==item.p1.bp8[0] && el[1]==item.p1.bp8[1] && flag==2?<div className="chessKey"></div>:   
           //handle white
          el[0]==item.p2.wp1[0] && el[1]==item.p2.wp1[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp1')} className="chessKey">{wp1}</div>:
          el[0]==item.p2.wp1[0] && el[1]==item.p2.wp1[1]&& flag==2?<div className="chessKey"></div>:
           el[0]==item.p2.wp2[0] && el[1]==item.p2.wp2[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp2')} className="chessKey">{wp1}</div>:
           el[0]==item.p2.wp2[0] && el[1]==item.p2.wp2[1]&& flag==2?<div className="chessKey"></div>:
           el[0]==item.p2.wp3[0] && el[1]==item.p2.wp3[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp3')} className="chessKey">{wp1}</div>:
           el[0]==item.p2.wp3[0] && el[1]==item.p2.wp3[1]&& flag==2?<div className="chessKey"></div>:
           el[0]==item.p2.wp4[0] && el[1]==item.p2.wp4[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp4')} className="chessKey">{wp1}</div>:
           el[0]==item.p2.wp4[0] && el[1]==item.p2.wp4[1]&& flag==2?<div className="chessKey"></div>:
           el[0]==item.p2.wp5[0] && el[1]==item.p2.wp5[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp5')} className="chessKey">{wp1}</div>:
           el[0]==item.p2.wp5[0] && el[1]==item.p2.wp5[1]&& flag==2?<div className="chessKey"></div>:
           el[0]==item.p2.wp6[0] && el[1]==item.p2.wp6[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp6')} className="chessKey">{wp1}</div>:
           el[0]==item.p2.wp6[0] && el[1]==item.p2.wp6[1]&& flag==2?<div className="chessKey"></div>:
           el[0]==item.p2.wp7[0] && el[1]==item.p2.wp7[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp7')} className="chessKey">{wp1}</div>:
           el[0]==item.p2.wp7[0] && el[1]==item.p2.wp7[1]&& flag==2?<div className="chessKey"></div>:
           el[0]==item.p2.wp8[0] && el[1]==item.p2.wp8[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp8')} className="chessKey">{wp1}</div>:  
           el[0]==item.p2.wp8[0] && el[1]==item.p2.wp8[1] && flag==2?<div className="chessKey"></div>:   

           el[0]==item.k2.w1[0] && el[1]==item.k2.w1[1] && flag==3 ? <div onClick={(e)=>movebk1(e,el[0],el[1],'w1')} className="chessKey">{wk1}</div>:          
           el[0]==item.k2.w1[0] && el[1]==item.k2.w1[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k2.w2[0] && el[1]==item.k2.w2[1] && flag==3 ?<div onClick={(e)=>movebk2(e,el[0],el[1],'w2')} className="chessKey">{wk2}</div>:
           el[0]==item.k2.w2[0] && el[1]==item.k2.w2[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k2.w3[0] && el[1]==item.k2.w3[1] && flag==3 ?<div onClick={(e)=>movebk3(e,el[0],el[1],'w3')} className="chessKey">{wk3}</div>:
           el[0]==item.k2.w3[0] && el[1]==item.k2.w3[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k2.w4[0] && el[1]==item.k2.w4[1] && flag==3 ?<div onClick={(e)=>movebKing(e,el[0],el[1],'w4')} className="chessKey">{wk4}</div>:
           el[0]==item.k2.w4[0] && el[1]==item.k2.w4[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k2.w5[0] && el[1]==item.k2.w5[1] && flag==3 ?<div onClick={(e)=>movebQueen(e,el[0],el[1],'w5')} className="chessKey">{wk5}</div>:
           el[0]==item.k2.w5[0] && el[1]==item.k2.w5[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k2.w6[0] && el[1]==item.k2.w6[1] && flag==3 ?<div onClick={(e)=>movebk3(e,el[0],el[1],'w6')} className="chessKey">{wk6}</div>:
           el[0]==item.k2.w6[0] && el[1]==item.k2.w6[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k2.w7[0] && el[1]==item.k2.w7[1] && flag==3?<div onClick={(e)=>movebk2(e,el[0],el[1],'w7')} className="chessKey">{wk7}</div>:
           el[0]==item.k2.w7[0] && el[1]==item.k2.w7[1] && flag==2?<div className="chessKey"></div>:
           el[0]==item.k2.w8[0] && el[1]==item.k2.w8[1] && flag==3 ?<div onClick={(e)=>movebk1(e,el[0],el[1],'w8')} className="chessKey">{wk8}</div>:
           el[0]==item.k2.w8[0] && el[1]==item.k2.w8[1] && flag==2?<div className="chessKey"></div>:
           
          ""}   
        
              
              </div>  
             </ToggleDiv> : <>
          {containsArray1===true?<ToggleDiv onClick={()=>movebk(el[0],el[1],'c')} key={el[0]+""+el[1]+100} id={el[0]+""+el[1]+2} bg={el[0]+el[1]} className='toggleDiv1 validSd' style={{}}>
          <div id={el[0]+""+el[1]} className='tdDiv'> 
        
              {el[0]==item.k1.b1[0] && el[1]==item.k1.b1[1] &&flag==3? <div onClick={(e)=>movebk1(e,el[0],el[1],'b1')} className='chessKey'>{bk1}<span className='point1'></span></div>:
              el[0]==item.k1.b1[0] && el[1]==item.k1.b1[1] && flag==2? <div className="chessKey"></div>:
              el[0]==item.k1.b2[0] && el[1]==item.k1.b2[1]&& flag==3?<div onClick={(e)=>movebk2(e,el[0],el[1],'b2')} className="chessKey">{bk2}<span className='point1'></span></div>:
              el[0]==item.k1.b2[0] && el[1]==item.k1.b2[1]&& flag==2?<div className="chessKey"></div>:
              el[0]==item.k1.b3[0] && el[1]==item.k1.b3[1]  && flag==3?<div onClick={(e)=>movebk3(e,el[0],el[1],'b3')} className="chessKey">{bk3}<span className='point1'></span></div>:
              el[0]==item.k1.b3[0] && el[1]==item.k1.b3[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k1.b4[0] && el[1]==item.k1.b4[1]  && flag==3?<div onClick={(e)=>movebKing(e,el[0],el[1],'b4')} className="chessKey">{bk4}<span className='point1'></span></div>:
              el[0]==item.k1.b4[0] && el[1]==item.k1.b4[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k1.b5[0] && el[1]==item.k1.b5[1]  && flag==3?<div onClick={(e)=>movebQueen(e,el[0],el[1],'b5')} className="chessKey">{bk5}<span className='point1'></span></div>:
              el[0]==item.k1.b5[0] && el[1]==item.k1.b5[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k1.b6[0] && el[1]==item.k1.b6[1]  && flag==3?<div onClick={(e)=>movebk3(e,el[0],el[1],'b6')} className="chessKey">{bk6}<span className='point1'></span></div>:
              el[0]==item.k1.b6[0] && el[1]==item.k1.b6[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k1.b7[0] && el[1]==item.k1.b7[1]  && flag==3?<div onClick={(e)=>movebk2(e,el[0],el[1],'b7')} className="chessKey">{bk7}<span className='point1'></span></div>:
              el[0]==item.k1.b7[0] && el[1]==item.k1.b7[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k1.b8[0] && el[1]==item.k1.b8[1]  && flag==3?<div onClick={(e)=>movebk1(e,el[0],el[1],'b8')} className="chessKey">{bk8}<span className='point1'></span></div>:
              el[0]==item.k1.b8[0] && el[1]==item.k1.b8[1] && flag==2?<div className="chessKey"></div>:
            
              el[0]==item.p1.bp1[0] && el[1]==item.p1.bp1[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp1')} className='chessKey'>{bp1}<span className='point1'></span></div>:
              el[0]==item.p1.bp1[0] && el[1]==item.p1.bp1[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.p1.bp2[0] && el[1]==item.p1.bp2[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp2')} className="chessKey">{bp1}<span className='point1'></span></div>:
              el[0]==item.p1.bp2[0] && el[1]==item.p1.bp2[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.p1.bp3[0] && el[1]==item.p1.bp3[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp3')} className="chessKey">{bp1}<span className='point1'></span></div>:
              el[0]==item.p1.bp3[0] && el[1]==item.p1.bp3[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.p1.bp4[0] && el[1]==item.p1.bp4[1] && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp4')} className="chessKey">{bp1}<span className='point1'></span></div>:
              el[0]==item.p1.bp4[0] && el[1]==item.p1.bp4[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.p1.bp5[0] && el[1]==item.p1.bp5[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp5')} className="chessKey">{bp1}<span className='point1'></span></div>:
              el[0]==item.p1.bp5[0] && el[1]==item.p1.bp5[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.p1.bp6[0] && el[1]==item.p1.bp6[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp6')} className="chessKey">{bp1}<span className='point1'></span></div>:
              el[0]==item.p1.bp6[0] && el[1]==item.p1.bp6[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.p1.bp7[0] && el[1]==item.p1.bp7[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp7')} className="chessKey">{bp1}<span className='point1'></span></div>:
              el[0]==item.p1.bp7[0] && el[1]==item.p1.bp7[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.p1.bp8[0] && el[1]==item.p1.bp8[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp8')} className="chessKey">{bp1}<span className='point1'></span></div>:          
              el[0]==item.p1.bp8[0] && el[1]==item.p1.bp8[1] && flag==2?<div className="chessKey"></div>:   
              //handle white
             el[0]==item.p2.wp1[0] && el[1]==item.p2.wp1[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp1')} className="chessKey">{wp1}<span className='point1'></span></div>:
             el[0]==item.p2.wp1[0] && el[1]==item.p2.wp1[1]&& flag==2?<div className="chessKey"></div>:
              el[0]==item.p2.wp2[0] && el[1]==item.p2.wp2[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp2')} className="chessKey">{wp1}<span className='point1'></span></div>:
              el[0]==item.p2.wp2[0] && el[1]==item.p2.wp2[1]&& flag==2?<div className="chessKey"></div>:
              el[0]==item.p2.wp3[0] && el[1]==item.p2.wp3[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp3')} className="chessKey">{wp1}<span className='point1'></span></div>:
              el[0]==item.p2.wp3[0] && el[1]==item.p2.wp3[1]&& flag==2?<div className="chessKey"></div>:
              el[0]==item.p2.wp4[0] && el[1]==item.p2.wp4[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp4')} className="chessKey">{wp1}<span className='point1'></span></div>:
              el[0]==item.p2.wp4[0] && el[1]==item.p2.wp4[1]&& flag==2?<div className="chessKey"></div>:
              el[0]==item.p2.wp5[0] && el[1]==item.p2.wp5[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp5')} className="chessKey">{wp1}<span className='point1'></span></div>:
              el[0]==item.p2.wp5[0] && el[1]==item.p2.wp5[1]&& flag==2?<div className="chessKey"></div>:
              el[0]==item.p2.wp6[0] && el[1]==item.p2.wp6[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp6')} className="chessKey">{wp1}<span className='point1'></span></div>:
              el[0]==item.p2.wp6[0] && el[1]==item.p2.wp6[1]&& flag==2?<div className="chessKey"></div>:
              el[0]==item.p2.wp7[0] && el[1]==item.p2.wp7[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp7')} className="chessKey">{wp1}<span className='point1'></span></div>:
              el[0]==item.p2.wp7[0] && el[1]==item.p2.wp7[1]&& flag==2?<div className="chessKey"></div>:
              el[0]==item.p2.wp8[0] && el[1]==item.p2.wp8[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp8')} className="chessKey">{wp1}<span className='point1'></span></div>:  
              el[0]==item.p2.wp8[0] && el[1]==item.p2.wp8[1] && flag==2?<div className="chessKey"></div>:   
   
              el[0]==item.k2.w1[0] && el[1]==item.k2.w1[1] && flag==3 ? <div onClick={(e)=>movebk1(e,el[0],el[1],'w1')} className="chessKey">{wk1}<span className='point1'></span></div>:          
              el[0]==item.k2.w1[0] && el[1]==item.k2.w1[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k2.w2[0] && el[1]==item.k2.w2[1] && flag==3 ?<div onClick={(e)=>movebk2(e,el[0],el[1],'w2')} className="chessKey">{wk2}<span className='point1'></span></div>:
              el[0]==item.k2.w2[0] && el[1]==item.k2.w2[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k2.w3[0] && el[1]==item.k2.w3[1] && flag==3 ?<div onClick={(e)=>movebk3(e,el[0],el[1],'w3')} className="chessKey">{wk3}<span className='point1'></span></div>:
              el[0]==item.k2.w3[0] && el[1]==item.k2.w3[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k2.w4[0] && el[1]==item.k2.w4[1] && flag==3 ?<div onClick={(e)=>movebKing(e,el[0],el[1],'w4')} className="chessKey">{wk4}<span className='point1'></span></div>:
              el[0]==item.k2.w4[0] && el[1]==item.k2.w4[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k2.w5[0] && el[1]==item.k2.w5[1] && flag==3 ?<div onClick={(e)=>movebQueen(e,el[0],el[1],'w5')} className="chessKey">{wk5}<span className='point1'></span></div>:
              el[0]==item.k2.w5[0] && el[1]==item.k2.w5[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k2.w6[0] && el[1]==item.k2.w6[1] && flag==3 ?<div onClick={(e)=>movebk3(e,el[0],el[1],'w6')} className="chessKey">{wk6}<span className='point1'></span></div>:
              el[0]==item.k2.w6[0] && el[1]==item.k2.w6[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k2.w7[0] && el[1]==item.k2.w7[1] && flag==3 ?<div onClick={(e)=>movebk2(e,el[0],el[1],'w7')} className="chessKey">{wk7}<span className='point1'></span></div>:
              el[0]==item.k2.w7[0] && el[1]==item.k2.w7[1] && flag==2?<div className="chessKey"></div>:
              el[0]==item.k2.w8[0] && el[1]==item.k2.w8[1] && flag==3 ?<div onClick={(e)=>movebk1(e,el[0],el[1],'w8')} className="chessKey">{wk8}<span className='point1'></span></div>:
              el[0]==item.k2.w8[0] && el[1]==item.k2.w8[1] && flag==2?<div className="chessKey"></div>:<span className='point2'></span>           
             }   
           
           
                 </div> 
                </ToggleDiv> :<ToggleDiv onClick={()=>movebk(el[0],el[1],'c')} key={el[0]+""+el[1]+100} id={el[0]+""+el[1]+2} bg={el[0]+el[1]} className='toggleDiv1' style={{}}>
      <div id={el[0]+""+el[1]} className='tdDiv'> 
          {el[0]==item.k1.b1[0] && el[1]==item.k1.b1[1] &&flag==3? <div onClick={(e)=>movebk1(e,el[0],el[1],'b1')} className='chessKey'>{bk1}</div>:
          el[0]==item.k1.b1[0] && el[1]==item.k1.b1[1] && flag==2? <div className="chessKey"></div>:
          el[0]==item.k1.b2[0] && el[1]==item.k1.b2[1]&& flag==3?<div onClick={(e)=>movebk2(e,el[0],el[1],'b2')} className="chessKey">{bk2}</div>:
          el[0]==item.k1.b2[0] && el[1]==item.k1.b2[1]&& flag==2?<div className="chessKey"></div>:
          el[0]==item.k1.b3[0] && el[1]==item.k1.b3[1]  && flag==3?<div onClick={(e)=>movebk3(e,el[0],el[1],'b3')} className="chessKey">{bk3}</div>:
          el[0]==item.k1.b3[0] && el[1]==item.k1.b3[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k1.b4[0] && el[1]==item.k1.b4[1]  && flag==3?<div onClick={(e)=>movebKing(e,el[0],el[1],'b4')} className="chessKey">{bk4}</div>:
          el[0]==item.k1.b4[0] && el[1]==item.k1.b4[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k1.b5[0] && el[1]==item.k1.b5[1]  && flag==3?<div onClick={(e)=>movebQueen(e,el[0],el[1],'b5')} className="chessKey">{bk5}</div>:
          el[0]==item.k1.b5[0] && el[1]==item.k1.b5[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k1.b6[0] && el[1]==item.k1.b6[1]  && flag==3?<div onClick={(e)=>movebk3(e,el[0],el[1],'b6')} className="chessKey">{bk6}</div>:
          el[0]==item.k1.b6[0] && el[1]==item.k1.b6[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k1.b7[0] && el[1]==item.k1.b7[1]  && flag==3?<div onClick={(e)=>movebk2(e,el[0],el[1],'b7')} className="chessKey">{bk7}</div>:
          el[0]==item.k1.b7[0] && el[1]==item.k1.b7[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k1.b8[0] && el[1]==item.k1.b8[1]  && flag==3?<div onClick={(e)=>movebk1(e,el[0],el[1],'b8')} className="chessKey">{bk8}</div>:
          el[0]==item.k1.b8[0] && el[1]==item.k1.b8[1] && flag==2?<div className="chessKey"></div>:
        
          el[0]==item.p1.bp1[0] && el[1]==item.p1.bp1[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp1')} className='chessKey'>{bp1}</div>:
          el[0]==item.p1.bp1[0] && el[1]==item.p1.bp1[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.p1.bp2[0] && el[1]==item.p1.bp2[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp2')} className="chessKey">{bp1}</div>:
          el[0]==item.p1.bp2[0] && el[1]==item.p1.bp2[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.p1.bp3[0] && el[1]==item.p1.bp3[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp3')} className="chessKey">{bp1}</div>:
          el[0]==item.p1.bp3[0] && el[1]==item.p1.bp3[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.p1.bp4[0] && el[1]==item.p1.bp4[1] && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp4')} className="chessKey">{bp1}</div>:
          el[0]==item.p1.bp4[0] && el[1]==item.p1.bp4[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.p1.bp5[0] && el[1]==item.p1.bp5[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp5')} className="chessKey">{bp1}</div>:
          el[0]==item.p1.bp5[0] && el[1]==item.p1.bp5[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.p1.bp6[0] && el[1]==item.p1.bp6[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp6')} className="chessKey">{bp1}</div>:
          el[0]==item.p1.bp6[0] && el[1]==item.p1.bp6[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.p1.bp7[0] && el[1]==item.p1.bp7[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp7')} className="chessKey">{bp1}</div>:
          el[0]==item.p1.bp7[0] && el[1]==item.p1.bp7[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.p1.bp8[0] && el[1]==item.p1.bp8[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp8')} className="chessKey">{bp1}</div>:          
          el[0]==item.p1.bp8[0] && el[1]==item.p1.bp8[1] && flag==2?<div className="chessKey"></div>:   
          //handle white
         el[0]==item.p2.wp1[0] && el[1]==item.p2.wp1[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp1')} className="chessKey">{wp1}</div>:
         el[0]==item.p2.wp1[0] && el[1]==item.p2.wp1[1]&& flag==2?<div className="chessKey"></div>:
          el[0]==item.p2.wp2[0] && el[1]==item.p2.wp2[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp2')} className="chessKey">{wp1}</div>:
          el[0]==item.p2.wp2[0] && el[1]==item.p2.wp2[1]&& flag==2?<div className="chessKey"></div>:
          el[0]==item.p2.wp3[0] && el[1]==item.p2.wp3[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp3')} className="chessKey">{wp1}</div>:
          el[0]==item.p2.wp3[0] && el[1]==item.p2.wp3[1]&& flag==2?<div className="chessKey"></div>:
          el[0]==item.p2.wp4[0] && el[1]==item.p2.wp4[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp4')} className="chessKey">{wp1}</div>:
          el[0]==item.p2.wp4[0] && el[1]==item.p2.wp4[1]&& flag==2?<div className="chessKey"></div>:
          el[0]==item.p2.wp5[0] && el[1]==item.p2.wp5[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp5')} className="chessKey">{wp1}</div>:
          el[0]==item.p2.wp5[0] && el[1]==item.p2.wp5[1]&& flag==2?<div className="chessKey"></div>:
          el[0]==item.p2.wp6[0] && el[1]==item.p2.wp6[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp6')} className="chessKey">{wp1}</div>:
          el[0]==item.p2.wp6[0] && el[1]==item.p2.wp6[1]&& flag==2?<div className="chessKey"></div>:
          el[0]==item.p2.wp7[0] && el[1]==item.p2.wp7[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp7')} className="chessKey">{wp1}</div>:
          el[0]==item.p2.wp7[0] && el[1]==item.p2.wp7[1]&& flag==2?<div className="chessKey"></div>:
          el[0]==item.p2.wp8[0] && el[1]==item.p2.wp8[1] && flag==3 ?<div onClick={(e)=>movebPawn(e,el[0],el[1],'wp8')} className="chessKey">{wp1}</div>:  
          el[0]==item.p2.wp8[0] && el[1]==item.p2.wp8[1] && flag==2?<div className="chessKey"></div>:   

          el[0]==item.k2.w1[0] && el[1]==item.k2.w1[1] && flag==3 ? <div onClick={(e)=>movebk1(e,el[0],el[1],'w1')} className="chessKey">{wk1}</div>:          
          el[0]==item.k2.w1[0] && el[1]==item.k2.w1[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k2.w2[0] && el[1]==item.k2.w2[1] && flag==3 ?<div onClick={(e)=>movebk2(e,el[0],el[1],'w2')} className="chessKey">{wk2}</div>:
          el[0]==item.k2.w2[0] && el[1]==item.k2.w2[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k2.w3[0] && el[1]==item.k2.w3[1] && flag==3 ?<div onClick={(e)=>movebk3(e,el[0],el[1],'w3')} className="chessKey">{wk3}</div>:
          el[0]==item.k2.w3[0] && el[1]==item.k2.w3[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k2.w4[0] && el[1]==item.k2.w4[1] && flag==3 ?<div onClick={(e)=>movebKing(e,el[0],el[1],'w4')} className="chessKey">{wk4}</div>:
          el[0]==item.k2.w4[0] && el[1]==item.k2.w4[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k2.w5[0] && el[1]==item.k2.w5[1] && flag==3 ?<div onClick={(e)=>movebQueen(e,el[0],el[1],'w5')} className="chessKey">{wk5}</div>:
          el[0]==item.k2.w5[0] && el[1]==item.k2.w5[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k2.w6[0] && el[1]==item.k2.w6[1] && flag==3 ?<div onClick={(e)=>movebk3(e,el[0],el[1],'w6')} className="chessKey">{wk6}</div>:
          el[0]==item.k2.w6[0] && el[1]==item.k2.w6[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k2.w7[0] && el[1]==item.k2.w7[1] && flag==3 ?<div onClick={(e)=>movebk2(e,el[0],el[1],'w7')} className="chessKey">{wk7}</div>:
          el[0]==item.k2.w7[0] && el[1]==item.k2.w7[1] && flag==2?<div className="chessKey"></div>:
          el[0]==item.k2.w8[0] && el[1]==item.k2.w8[1] && flag==3 ?<div onClick={(e)=>movebk1(e,el[0],el[1],'w8')} className="chessKey">{wk8}</div>:
          el[0]==item.k2.w8[0] && el[1]==item.k2.w8[1] && flag==2?<div className="chessKey"></div>:<span className='point3'></span>
          
         }   
       
             
             </div> 
             
            </ToggleDiv> 
         
            }
               </>
                 
             }
             </>  
 })}
             </div>
  
}

const startblack=()=>{
   setTurn(1)
   setTimeout(()=>{
    setLoad('')
    {t1>0?showTimer(1):''}
    setFlag(3)
    setItem(obj)
    setWinner('na')
   },3000)
   setLoad('something')
}
const startWhite=()=>{
  setTimeout(()=>{
    setLoad('')
  
    {t1>0?showTimer(0):''}
    setFlag(3)
    setItem(obj)
    setWinner('na')
  
  },3000)
  setTurn(0)
  setLoad('something')
}
// console.log('tt111',t1)
const timerFun=(e:any)=>{
  let v=e.target.value;
if(v=='na' || v=='wt'){
  setT0(-1); setT1(-1);
} 
  else if(v=='10'){
    setT0(10); setT1(10);
    setS0(0); setS1(0);

  } 
else if(v=='20'){
  setT0(20); setT1(20);
  setS0(0); setS1(0);
}
  else if(v=='30'){
    setT0(30); setT1(30);
    setS0(0); setS1(0);
  } 
}
{
  console.log('tt',turnText)
}
    return <div>
     <div className='container'>
     <FontAwesomeIcon icon={regularChessKing} className='k1'  />
     <h1 className="head"> Chess</h1>
     <FontAwesomeIcon icon={solidChessKing} className='k2' />
     </div>
     <select style={{borderRadius:'2vw',outline:'none'}} onChange={(e)=>timerFun(e)}>
     <option value='wt'>no Timer</option>
        <option value='10'>10 min</option>
       <option value='20'> 20 min</option>
       <option value='30'> 30 min</option>
        
     </select>
     
     <span>
   
   <button onClick={startWhite} className='restartBtn'>start with white</button>
   <span style={{color: turn==0?'white':'black'}}>{turnText=='na'?'no trun':turnText+"'s turn"}</span>
   <button onClick={startblack} className='restartBtn'>start with black</button>
   </span>
    
      <div className='mainDiv' >
        
      <div>
        {t1>=0?<span className='s1' style={{position:'relative',top:'20%',left:'47%'}}> 
        {t1<10?'0'+t1:t1}:{s1<10?'0'+s1:s1}
      </span>:''}
      
   
         {load!=''?<div>
          <img src="chess1.png" alt="img here" width='50px' height='50px' className='initImg'/> <span className='spn'>welcome to chess...</span>
         </div>:renderUi()}
         {t0>=0? <span className='s2' style={{position:'relative',bottom:'20%', left:'47%'}}>
        {t0<10?'0'+t0:t0}:{s0<10?'0'+s0:s0}
      </span>:''}
        
         </div>
        <div style={{width:"30%"}}>
    
        </div>
        
      </div>
 
   <div>
      {winner=='white'?<div className='winner'>white is winner</div>:winner=='black'?<div className='winner'>black is winner</div>:""}
     </div>
     {/* <span>
     {t0==0 || t1==0?{timeWinner()}:''}
     </span> */}
     
    </div>
};
//here adding data 
export default ChessBoard;



interface ToggleDivProps {
    bg: number; 
    style:any;
  }
  
  const ToggleDiv = styled.div<ToggleDivProps>`
    background-color: ${props => (props.bg) %2==0 ? 'green' : 'wheat'};
   
  `;


 
 