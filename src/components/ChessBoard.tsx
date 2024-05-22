
import '../../public/css/chessboard.css'; // You can style the chess board in ChessBoard.css
import {useState, useEffect} from 'react'
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
let a:any={...obj.k1};let c:any={...obj.p1};
let b:any={...obj.k2};let d:any={...obj.p2};


for(const i in a){
  console.log(111)
  
   a[i]=[-1,-1]
   console.log('aa',i,a[i])
}

for(const i in b){

   b[i]=[-1,-1]
}
for(const i in c){

   c[i]=[-1,-1]
}
for(const i in d){

   d[i]=[-1,-1]
}

let nullObj={
  k1:a, 
  p1:c,
  k2:b,
  p2:d
}
console.log('nnn',nullObj)
const ChessBoard = () => {
  const [item, setItem] = useState(obj); 
  const [flag, setFlag]=useState(2)
  const [validStp, setValidStp]:any = useState(null); 
  const [key, setKey] = useState("na"); 
 const [turn, setTurn] =useState(-1)
 

 useEffect(()=>{
  localStorage.setItem("chessObj", JSON.stringify(item)); 
  console.log('item',item)
  
  let ch=isKingSafe(item)
  console.log('ch',ch)
  if(!ch[0]){
    let f=isKingDead(item,turn)
    if(f){
      if(turn==1) alert('white is winner')
        else alert('black is winner')
    }
  }
 
},[item])


const turncheck=()=>{
  if(turn==0 && key.includes('w') || turn==1 && key.includes('b')) return true;

  else return false;
}

const movebk=(a:any, b:any,c:any)=>{
  console.log(c)
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
      console.log('chhhs',ch,key,turn)

      if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
        setItem(newObj)
        {turn==0?setTurn(1):setTurn(0)}
      } 
  }
 setKey('na')
 
 setValidStp(null)
  }

}
const movebk1=(e:any,a:any, b:any,v:any)=>{
  e.stopPropagation();
  if((key.includes('b') && v.includes('b')) ||(key.includes('w') && v.includes('w')) || key=='na'){  
    let res=RookMoves1(item,a,b,v);
      if(res.length>0){
      setKey(v)
      setValidStp(res)
      }
  } 
  else{  
    let newObj= JSON.parse(JSON.stringify(item));
    let res=updateMoveObj(a, b,v, key,newObj)
    //if kingsafe then update else refuse
    setValidStp(null)
    let ch=isKingSafe(res)
      console.log('chhhs',ch,key,turn)
      if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
        setItem(res)
        {turn==0?setTurn(1):setTurn(0)}
      } 
    setKey('na')
  }
}


const movebk2=(e:any, a:any, b:any,v:any)=>{
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
    let res=updateMoveObj(a, b,v, key,newObj)
    setValidStp(null)
    //if kingsafe then update else refuse
    let ch=isKingSafe(res)
      console.log('chhhs',ch,key,turn)

      if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
        setItem(res)
        {turn==0?setTurn(1):setTurn(0)}
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
    let res=updateMoveObj(a, b,v, key,newObj)
    setValidStp(null)
    //if kingsafe then update else refuse
    let ch=isKingSafe(res)
      console.log('chhhs',ch,key,turn)

        if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
          setItem(res)
          {turn==0?setTurn(1):setTurn(0)}
        } 
        
    setKey('na')
  }
}

const movebQueen=(e:any, a:any, b:any,v:any)=>{
 // console.log('init',v)
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
    let res=updateMoveObj(a, b,v, key,newObj)
   
    setValidStp(null)
    //if kingsafe then update else refuse
    let ch=isKingSafe(res)
    //console.log('chhhs',ch,key,turn)

    if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
      setItem(res)
      {turn==0?setTurn(1):setTurn(0)}
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
    let res=updateMoveObj(a, b,v, key,newObj)
    setValidStp(null)
    let ch=isKingSafe(res)

    if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
      setItem(res)
      {turn==0?setTurn(1):setTurn(0)}
    } 
    setKey('na')
  }
}

const movebPawn=(e:any,a:any, b:any,v:any)=>{
  //
  e.stopPropagation();
  let f=1;
  //console.log('pawn',a,b,validStp,key,v)
  if(validStp){
    validStp.map((el:any)=>{
      if(el[0]==a && el[1]==b){
        f=2
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
      // setFlag(2)
       setValidStp(res);
}
//console.log('validdd',validStp)
const combat=(a:any, b:any,v:any, key:any)=>{
  
  let newObj= JSON.parse(JSON.stringify(item)); 
  var res=updateMoveObj(a, b,v, key,newObj)
  //if kingsafe then update else refuse
  let ch=isKingSafe(res)
     // console.log('chhhs',ch,key,turn)
     if(!ch[0] && ch[1]==2 && key.includes('w') || !ch[0] && ch[1]==3 && key.includes('b') || ch[0]){
      setItem(res)
      {turn==0?setTurn(1):setTurn(0)}
    } 
   //setFlag(2)
   setValidStp(null) 
  setKey('na')
}

console.log('item',item)
 const renderUi=()=>{
   return <div className='contDiv'>
 {board && item && board.map((el:any)=>{
             return  <ToggleDiv onClick={()=>movebk(el[0],el[1],'c')} key={el[0]+""+el[1]+1} id={el[0]+""+el[1]+2} bg={el[0]+el[1]} className='toggleDiv1' style={{}}>
             <div id={el[0]+""+el[1]} > 
           {el[0]==item.k1.b1[0] && el[1]==item.k1.b1[1] &&flag==3? <div onClick={(e)=>movebk1(e,el[0],el[1],'b1')} className="chessKey">{bk1}</div>:
           el[0]==item.k1.b1[0] && el[1]==item.k1.b1[1] && flag==2? <div className="chessKey"></div>:
           el[0]==item.k1.b2[0] && el[1]==item.k1.b2[1]&& flag==3?<div onClick={(e)=>movebk2(e,el[0],el[1],'b2')} className="chessKey">{bk2}</div>:
           el[0]==item.k1.b2[0] && el[1]==item.k1.b2[1]&& flag==2 && flag==2?<div className="chessKey"></div>:
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
         
           el[0]==item.p1.bp1[0] && el[1]==item.p1.bp1[1]  && flag==3?<div onClick={(e)=>movebPawn(e,el[0],el[1],'bp1')} className="chessKey">{bp1}</div>:
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
           el[0]==item.k2.w8[0] && el[1]==item.k2.w8[1] && flag==2?<div className="chessKey"></div>:
           
          ""}   
        
              
              </div> 
             </ToggleDiv>    
    })}
   </div> 
 }

 const restartFun=()=>{

  setItem(obj)
  setTurn(-1)
  setFlag(3)
  console.log('reee',obj,item)
 }
const startblack=()=>{
   setTurn(1)
   setFlag(3)
   setItem(obj)
}
const startWhite=()=>{
  setTurn(0)
  setFlag(3)
  setItem(obj)
}
    return <div>
     <div className='container'>
     <FontAwesomeIcon icon={regularChessKing} className='k1'  />
     <h1 className="head"> Chess</h1>
     <FontAwesomeIcon icon={solidChessKing} className='k2' />
     </div>
     <span className='span'><b style={{color:'yellow'}}>suggestion:</b> start with white</span>
      <div className='mainDiv' >
      <div>
         {renderUi()}
         </div>
        <div style={{width:"30%"}}></div>
        
      </div>
   <div> <button onClick={restartFun} className='restartBtn'>restart</button>
   <button onClick={startWhite} className='restartBtn'>start with white</button>
   <button onClick={startblack} className='restartBtn'>start with black</button>
   </div>
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

 