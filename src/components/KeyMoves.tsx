


function isVacant1(a:any, b:any,v:any) {
    let obj1:any=JSON.parse(localStorage.chessObj);
    for (const propKey in obj1) {
        const prop = obj1[propKey];
        for (const key in prop) {
            if((key.includes('b') && v.includes('b')) ||(key.includes('w') && v.includes('w'))){
                if (Array.isArray(prop[key]) && prop[key][0] === a && prop[key][1] === b) {
                    return true;
                }
            }
            
        }
    }
    return false;
}

function isVacantA(obj1:any,a:any, b:any,v:any) {
    //let obj1:any=JSON.parse(localStorage.chessObj);
    for (const propKey in obj1) {
        const prop = obj1[propKey];
        for (const key in prop) {
            if((key.includes('b') && v.includes('b')) ||(key.includes('w') && v.includes('w'))){
                if (Array.isArray(prop[v]) && prop[v][0] == -1 && prop[v][1] == -1) {                   
                    return 2;
                }
                if (Array.isArray(prop[key]) && prop[key][0] === a && prop[key][1] === b) {                   
                    return 1;
                }
            }
            if((key.includes('b') && v.includes('w')) ||(key.includes('w') && v.includes('b'))){
                if (Array.isArray(prop[key]) && prop[key][0] === a && prop[key][1] === b) {
                    return 2;
                }
            }
            
        }
    }
    return 3;
}

export const RookMoves1=(obj1:any,a:any,b:any,c:any)=>{

  let validSteps= [] 
//  console.log(obj1)

    for(let i=a+1; i<8; i++){
      
        if(i>=0&&i<8){
           // //  console.log(i,b,isVacant(i,b))
       if(isVacantA(obj1,i,b,c)==3) validSteps.push([i,b]) 
        else if(isVacantA(obj1,i,b,c)==2){
    validSteps.push([i,b]);  
    break;     
        } 
        else break;
        }

    }
   
    for(let i=a-1; i>=0; i--){
        if(i>=0&&i<8){
            if(isVacantA(obj1,i,b,c)==3) validSteps.push([i,b]) 
                else if(isVacantA(obj1,i,b,c)==2){
                    validSteps.push([i,b]);  
                    break;     
                        }
                        else break;
        }
       }

            for(let i=b+1; i<8; i++){
                if(i>=0&&i<8){
                    if(isVacantA(obj1,a,i,c)==3) validSteps.push([a,i]) 
                        else if(isVacantA(obj1,a,i,c)==2){
                                    validSteps.push([i,b]);  
                                    break;     
                                        }
                                        else break;
                }
                    }
                   
                    for(let i=b-1; i>=0; i--){
                        if(i>=0&&i<8){
                            if(isVacantA(obj1,a,i,c)==3) validSteps.push([a,i]) 
                                else if(isVacantA(obj1,a,i,c)==2){                                   
                                            validSteps.push([i,b]);  
                                            break;     
                                                }
                                                else break;
                        }
                            }
                           
                            //  console.log('rookkk',validSteps)
                           return validSteps;
}

export const KnightMoves1=(obj1:any,a:any, b:any,v:any)=>{
    ////  console.log(a,b,v)
    let validSteps=[];

    if(isVacantA(obj1,a+1,b+2,v)!==1 && a+1<8 && b+2<8) validSteps.push([a+1,b+2])
        //else if(isVacantA(obj1,a+1,b+2,v)==2 && a+1<8 && b+2<8) validSteps.push([a+1,b+2])
        if(isVacantA(obj1,a-1,b+2,v)!==1 &&  a-1>=0 && b+2<8) validSteps.push([a-1,b+2])
            if(isVacantA(obj1,a+1,b-2,v)!==1 &&  a+1<8 && b-2>=0) validSteps.push([a+1,b-2]) //glitch
                if(isVacantA(obj1,a-1,b-2,v)!==1 && a-1>=0 && b-2>=0) validSteps.push([a-1,b-2])
    if(isVacantA(obj1,a+2,b+1,v)!==1 && a+2<8 && b+1<8) validSteps.push([a+2,b+1])
        if(isVacantA(obj1,a+2,b-1,v)!==1 && a+2<8 && b-1>=0) validSteps.push([a+2,b-1])
            if(isVacantA(obj1,a-2,b+1,v)!==1 && a-2>=0 && b+1<8) validSteps.push([a-2,b+1])
                if(isVacantA(obj1,a-2,b-1,v)!==1 && a-2>=0 && b-1>=0) validSteps.push([a-2,b-1])
    return validSteps;
}

export const bishopMoves1=(obj1:any,a:any, b:any,v:any)=>{
   // //  console.log(obj1)
    let validSteps=[]
    let c=a;
    let d=b;
   while(c<7 && d<7){
      
      c++;
      d++;
      if(isVacantA(obj1,c,d,v)==3) validSteps.push([c,d]) 
        else if(isVacantA(obj1,c,d,v)==2){
        validSteps.push([c,d])
        break;
        }
        else break;
   }
   let e=a;
   let f=b;
   while(e<7 && f>0){
    
    e++;
    f--;
    if(isVacantA(obj1,e,f,v)==3) validSteps.push([e,f]) 
        else if(isVacantA(obj1,e,f,v)==2){
            validSteps.push([e,f])
            break;
            }
        else break;
   }
   let g=a;
   let h=b;
   while(g>0 && h>0){
    g--;
    h--;
    if(isVacantA(obj1,g,h,v)==3) validSteps.push([g,h]) 
        else if(isVacantA(obj1,g,h,v)==2){
            validSteps.push([g,h])
            break;
            }
        else break;
   
   }
   let k=a;
   let l=b;
   while(k>0 && l<7){
    k--;
    l++;
    if(isVacantA(obj1,k,l,v)==3) validSteps.push([k,l])
        else if(isVacantA(obj1,k,l,v)==2){
            validSteps.push([k,l])
            break;
            }
        else break;

   }
   //  console.log('bishoop',validSteps)
   return validSteps;
}

export const blackQueenMoves=(obj1:any,a:any, b:any,v:any)=>{
    //  console.log('vv',obj1,v)
  
let validSteps=[]
for(let i=a+1; i<8; i++){
    if(i>=0&&i<8){
        if(isVacantA(obj1,i,b,v)==3) validSteps.push([i,b]) 
            else if(isVacantA(obj1,i,b,v)==2){
                validSteps.push([i,b]); break;
        } 
            else break;
    }

}

for(let i=a-1; i>=0; i--){
    
    if(i>=0&&i<8){
        if(isVacantA(obj1,i,b,v)==3) validSteps.push([i,b]) 
            else if(isVacantA(obj1,i,b,v)==2){
                validSteps.push([i,b]); 
                break;
        } 
            else break;
    }
   }

        for(let i=b+1; i<8; i++){
         
            if(i>=0&&i<8){
              
                if(isVacantA(obj1,a,i,v)==3) validSteps.push([a,i]) 
                 
                    else if(isVacantA(obj1,a,i,v)==2){
                        validSteps.push([a,i]); break;
                } 
                    else break;
            }
                }
               
                for(let i=b-1; i>=0; i--){
                    if(i>=0&&i<8){
                        if(isVacantA(obj1,a,i,v)==3) validSteps.push([a,i]) 
                            else if(isVacantA(obj1,a,i,v)==2){
                                validSteps.push([a,i]); break;
                        }  
                            else break;
                    }
                        }
                        let c=a;
                        let d=b;
                       while(c<7 && d<7){
                          
                          c++;
                          d++;
                          if(isVacantA(obj1,c,d,v)==3) validSteps.push([c,d]) 
                            else if(isVacantA(obj1,c,d,v)==2){
                                validSteps.push([c,d]); break;
                        } 
                            else break;
                       }
                       let e=a;
                       let f=b;
                       while(e<7 && f>0){
                        
                        e++;
                        f--;
                        if(isVacantA(obj1,e,f,v)==3) validSteps.push([e,f]) 
                            else if(isVacantA(obj1,e,f,v)==2){
                                validSteps.push([e,f]); break;
                        } 
                            else break;
                       }
                       let g=a;
                       let h=b;
                       while(g>0 && h>0){
                    
                        g--;
                        h--;
                        if(isVacantA(obj1,g,h,v)==3) validSteps.push([g,h]) 
                            else if(isVacantA(obj1,g,h,v)==2){
                                validSteps.push([g,h]); break;
                        } 
                            else break;
                       }
                       let k=a;
                       let l=b;
                       while(k>0 && l<7){
                        k--;
                        l++;
                        if(isVacantA(obj1,k,l,v)==3) validSteps.push([k,l]) 
                            else if(isVacantA(obj1,k,l,v)==2){
                                validSteps.push([k,l]); break;
                        } 
                            else break;
                    
                       }
                      
                     //  //  console.log('validsteps',validSteps)
                         return validSteps;                     

}

export const blackKingMoves=(obj1:any,a:any, b:any,c:any)=>{
     console.log(obj1)
   let validSteps=[]; 
   if(!isVacant1(a-1,b,c) && a-1>=0) validSteps.push([a-1,b])
   if(!isVacant1(a+1,b,c) && a+1<8) validSteps.push([a+1,b])
    if(!isVacant1(a-1,b-1,c) && a-1>=0 && b-1>=0)validSteps.push([a-1,b-1])
        if(!isVacant1(a-1,b+1,c) && a-1>=0 && b+1<8)validSteps.push([a-1,b+1])
            if(!isVacant1(a+1,b-1,c) && a+1<8 && b-1>=0)validSteps.push([a+1,b-1])
            if(!isVacant1(a+1,b+1,c) && a+1<8 && b+1<8)validSteps.push([a+1,b+1])  
                if(!isVacant1(a,b-1,c) && b-1>=0)validSteps.push([a,b-1])
                    if(!isVacant1(a,b+1,c) && b+1<8)validSteps.push([a,b+1])
                     
        return validSteps;
}

export const blackPawnMoves=(obj1:any,a:any, b:any,c:any)=>{
    //  console.log(obj1)
let validSteps=[]
   if(isVacantA(obj1,a+1,b,c)==3 && a+1<8) validSteps.push([a+1,b])
      if(isVacantA(obj1,a+1,b-1,c)==2 && a+1<8 && b-1>=0) validSteps.push([a+1,b-1])
        if(isVacantA(obj1,a+1,b+1,c)==2 && a+1<8 && b+1<8) validSteps.push([a+1,b+1])
 // //  console.log('blackpawn',validSteps)
    return validSteps;
}

export const whitePawnMoves=(obj1:any,a:any, b:any,c:any)=>{
    let validSteps=[]
    //  console.log(obj1)
    if(isVacantA(obj1,a-1,b,c)==3 && a-1>=0) validSteps.push([a-1,b])
        if(isVacantA(obj1,a-1,b-1,c)==2 && a-1<8 && b-1>=0) validSteps.push([a-1,b-1])
            if(isVacantA(obj1,a-1,b+1,c)==2 && a+1<8 && b+1<8) validSteps.push([a-1,b+1])
               
        return validSteps;
}
 


export const updateMoveObj=(a:any, b:any,v:any, key:any,  boardObj:any)=>{
//v should be romoved and key should be modified
    if(key.includes('bp')){
        let newobj:any=[]
        if(v.includes('wp')){
              newobj={...boardObj,
                p1:{...boardObj.p1,
               [key]:[a,b],
           },
            p2:{...boardObj.p2,
                [v]:[-1,-1]
            }               
          }
        }
        else if(v.includes('w') && !v.includes('wp')){
      
             newobj={...boardObj,
                p1:{...boardObj.p1,
               [key]:[a,b],
           },
        
            k2:{...boardObj.k2,
                [v]:[-1,-1]
            }
           }   
           //  console.log(newobj)    
          }
       //   delete newobj['k2'][v]
         //  console.log('updaatemove',newobj)
        return newobj;
    }
    else if(key.includes('b') && !key.includes('bp')){
        let newobj:any=[]
        if(v.includes('wp')){
              newobj={...boardObj,
                k1:{...boardObj.k1,
               [key]:[a,b],
           },
            p2:{...boardObj.p2,
                [v]:[-1,-1]
            }               
          }
        }
        else if(v.includes('w') && !v.includes('wp')){
      
             newobj={...boardObj,
                k1:{...boardObj.k1,
               [key]:[a,b],
           },
            k2:{...boardObj.k2,
                [v]:[-1,-1]
            }
           }   
           //  console.log(newobj)    
          }
         // delete newobj['k2'][v]
         //  console.log('updaatemove',newobj)
        return newobj;
    }

   else if(key.includes('wp')){
        let newobj:any=[]
        if(v.includes('bp')){
              newobj={...boardObj,
                p2:{...boardObj.p2,
               [key]:[a,b],
           },
            p1:{...boardObj.p1,
                [v]:[-1,-1]
            }               
          }
        }
        else if(v.includes('b') && !v.includes('bp')){     
             newobj={...boardObj,
                p2:{...boardObj.p2,
               [key]:[a,b],
           },
            k1:{...boardObj.k1,
                [v]:[-1,-1]
            }
           }   
          }

          
          //  console.log(newobj)
        return newobj;
    }   
    else if(key.includes('w') && !key.includes('wp')){
        let newobj:any=[]
        if(v.includes('bp')){
              newobj={...boardObj,
                k2:{...boardObj.k2,
               [key]:[a,b],
           },
            p1:{...boardObj.p1,
                [v]:[-1,-1]
            }               
          }
        }
        else if(v.includes('b') && !v.includes('bp')){     
             newobj={...boardObj,
                k2:{...boardObj.k2,
               [key]:[a,b],
           },
            k1:{...boardObj.k1,
                [v]:[-1,-1]
            }
           }   
          }

          
          //  console.log(newobj)
        return newobj;
    }   
}

export const GrossValidArr=(obj1:any)=>{
   // //  console.log('ggg',obj1)
    let bKA=[]
    let bPA=[]
    let wKA=[]
    let wPA=[]
    //find position of each then invoke it for each
    //let obj1:any=JSON.parse(localStorage.chessObj);
    let bK1=obj1.k1.b1;
    let bK2=obj1.k1.b2;
    let bK3=obj1.k1.b3;
    let bK4=obj1.k1.b4;
    let bK5=obj1.k1.b5;
    let bK6=obj1.k1.b6;
    let bK7=obj1.k1.b7;
    let bK8=obj1.k1.b8;

    let bP1=obj1.p1.bp1;
    let bP2=obj1.p1.bp2;
    let bP3=obj1.p1.bp3;
    let bP4=obj1.p1.bp4;
    let bP5=obj1.p1.bp5;
    let bP6=obj1.p1.bp6;
    let bP7=obj1.p1.bp7;
    let bP8=obj1.p1.bp8;

    ////
    let wK1=obj1.k2.w1;
    let wK2=obj1.k2.w2;
    let wK3=obj1.k2.w3;
    let wK4=obj1.k2.w4;
    let wK5=obj1.k2.w5;
    let wK6=obj1.k2.w6;
    let wK7=obj1.k2.w7;
    let wK8=obj1.k2.w8;

    let wP1=obj1.p2.wp1;
    let wP2=obj1.p2.wp2;
    let wP3=obj1.p2.wp3;
    let wP4=obj1.p2.wp4;
    let wP5=obj1.p2.wp5;
    let wP6=obj1.p2.wp6;
    let wP7=obj1.p2.wp7;
    let wP8=obj1.p2.wp8;
    ////
   let bk1= RookMoves1(obj1,bK1[0],bK1[1],'b1')
   let bk8= RookMoves1(obj1,bK8[0],bK8[1],'b8')
   let bk2= KnightMoves1(obj1,bK2[0],bK2[1],'b2')
   let bk7= KnightMoves1(obj1,bK7[0],bK7[1],'b7')
   let bk3= bishopMoves1(obj1,bK3[0],bK3[1],'b3')
   let bk6= bishopMoves1(obj1,bK6[0],bK6[1],'b6')
   let bk4= blackKingMoves(obj1,bK4[0],bK4[1],'b4')
   let bk5= blackQueenMoves(obj1,bK5[0],bK5[1],'b5')
   
   let bp1=blackPawnMoves(obj1,bP1[0],bP1[1],'bp1')
   let bp2=blackPawnMoves(obj1,bP2[0],bP2[1],'bp2')
   let bp3=blackPawnMoves(obj1,bP3[0],bP3[1],'bp3')
   let bp4=blackPawnMoves(obj1,bP4[0],bP4[1],'bp4')
   let bp5=blackPawnMoves(obj1,bP5[0],bP5[1],'bp5')
   let bp6=blackPawnMoves(obj1,bP6[0],bP6[1],'bp6')
   let bp7=blackPawnMoves(obj1,bP7[0],bP7[1],'bp7')
   let bp8=blackPawnMoves(obj1,bP8[0],bP8[1],'bp8')
  
////
let wk1= RookMoves1(obj1,wK1[0],wK1[1],'w1')
let wk8= RookMoves1(obj1,wK8[0],wK8[1],'w8')
let wk2= KnightMoves1(obj1,wK2[0],wK2[1],'w2')
let wk7= KnightMoves1(obj1,wK7[0],wK7[1],'w7')
let wk3= bishopMoves1(obj1,wK3[0],wK3[1],'w3')
let wk6= bishopMoves1(obj1,wK6[0],wK6[1],'w6')
let wk4= blackKingMoves(obj1,wK4[0],wK4[1],'w4')
let wk5= blackQueenMoves(obj1,wK5[0],wK5[1],'w5') //[-1,-1]

  
let wp1=whitePawnMoves(obj1,wP1[0],wP1[1],'wp1')
let wp2=whitePawnMoves(obj1,wP2[0],wP2[1],'wp2')
let wp3=whitePawnMoves(obj1,wP3[0],wP3[1],'wp3')
let wp4=whitePawnMoves(obj1,wP4[0],wP4[1],'wp4')
let wp5=whitePawnMoves(obj1,wP5[0],wP5[1],'wp5')
let wp6=whitePawnMoves(obj1,wP6[0],wP6[1],'wp6')
let wp7=whitePawnMoves(obj1,wP7[0],wP7[1],'wp7')
let wp8=whitePawnMoves(obj1,wP8[0],wP8[1],'wp8')
   bKA.push(bk1,bk2,bk3,bk4,bk5,bk6,bk7,bk8)
   bPA.push(bp1,bp2,bp3,bp4,bp5,bp6,bp7,bp8)
   wKA.push(wk1,wk2,wk3,wk4,wk5,wk6,wk7,wk8)
   wPA.push(wp1,wp2,wp3,wp4,wp5,wp6,wp7,wp8)
 //  //  console.log('aaaa',[bKA,bPA,wKA,wPA])
   return [bKA,bPA,wKA,wPA]
}


export const isKingSafe=(obj1:any)=>{
  // let obj1:any=JSON.parse(localStorage.chessObj);
 
   let wK=obj1.k2.w4;
   let bK=obj1.k1.b4;
   let grossArr=GrossValidArr(obj1);
   //  console.log('grossArr',grossArr,obj1)

   //does grssarr contains wk or bk if yes true
  let c=1;

   grossArr.map((elem:any)=>{
      elem.map((el:any)=>{
        if(el.length>0){
            el.map((e:any)=>{
                if(e[0]==bK[0] && e[1]==bK[1]){
                    //  console.log('eee',e[0],e[1])
                    c=2
                    return;
                } else if(e[0]==wK[0] && e[1]==wK[1]){
                 c=3;
                 return;
                } 
                
         })
            if(c==2 || c==3) return
        }
      
      })
      if(c==2 || c==3) return
   })
   if(c==2 || c==3){
    return [false,c];
   }
   

   return [true];
}



 export const isKingSafe1=(obj1:any,turn:any)=>{
     // 
    let bK=obj1.k1.b4;  //b4={queenO}
    let wK=obj1.k2.w4;
    let grossArr= GrossValidArr(obj1);

    let arr1=grossArr[0]  
    let arr2=grossArr[1] 

    let arr3=grossArr[2]  //all black keys
    let arr4=grossArr[3]  //all black pawns
    //  console.log('gross',grossArr,bK, obj1)
    let flag=true;
    
    if(turn==1){
       arr3.map((elem:any)=>{  
           if(elem.length>0){     
            elem.map((el:any)=>{
                if(el.length>0){                 
                     if(el[0]==bK[0] && el[1]==bK[1]){   //bk=[1,2] el for knight=[1,2]             
                            flag=false;
                            return;
                        }    
                }
            })
           }
       })
       arr4.map((elem:any)=>{      
        if(elem.length>0){
         elem.map((el:any)=>{
             if(el.length>0){           
                if(el[0]==bK[0] && el[1]==bK[1]){
                   flag=false;
                   return;
                    }  
             }
         })
        }
    })
    }

    if(turn==0){
        arr1.map((elem:any)=>{  
            if(elem.length>0){     
             elem.map((el:any)=>{
                 if(el.length>0){                 
                      if(el[0]==wK[0] && el[1]==wK[1]){   //bk=[1,2] el for knight=[1,2]             
                             flag=false;
                             return;
                         }    
                 }
             })
            }
        })
        arr2.map((elem:any)=>{      
         if(elem.length>0){
          elem.map((el:any)=>{
              if(el.length>0){           
                 if(el[0]==wK[0] && el[1]==wK[1]){
                    flag=false;
                    return;
                     }  
              }
          })
         }
     })
     }
    //  console.log('flag',flag)
    return flag;
 }
 

 const getV=(a:any,b:any,obj:any,turn:any)=>{
    if(turn==1){
        let obj1=obj.k2;
        let obj2=obj.p2;
        let key;
        for(let i in obj1){
         if(obj1[i][0]==a && obj1[i][1]==b){
             key=i;
             break;
         }
        }
        for(let i in obj2){
         if(obj2[i][0]==a && obj2[i][1]==b){
             key=i;
             break;
         }
        }
        //  console.log(key);
        return key  
    }
  else{
    let obj1=obj.k1;
    let obj2=obj.p1;
    let key;
    for(let i in obj1){
     if(obj1[i][0]==a && obj1[i][1]==b){
         key=i;
         break;
     }
    }
    for(let i in obj2){
     if(obj2[i][0]==a && obj2[i][1]==b){
         key=i;
         break;
     }
    }
    //  console.log(key);
    return key
  }
 }

export const isKingDead=(obj1:any,turn:Number)=>{
  

  
    let grossArr= GrossValidArr(obj1);
 
    let arr1=grossArr[0]
    let arr2=grossArr[1]
 
    let arr3=grossArr[2]
    let arr4=grossArr[3]
let flag=1
   // //  console.log('ggaa',grossArr)
    if(turn==1){
        //move all black keys while checking if king is safe from each white key 
        let c=0;
        arr1.map((elem:any)=>{ //black
           c++;
           let key='b'+c  //b4
        
            if(elem.length>0){
                elem.map((el:any)=>{
              
if(el.length>0){
    let v=getV(el[0],el[1],obj1,turn)
    let newObj;
    if(v) newObj=updateMoveObj(el[0], el[1],v, key,obj1)
        else newObj={...obj1, k1:{...obj1.k1, [key]:[el[0],el[1]]}}
 
    //  console.log('ooo',newObj)
  let ch=isKingSafe1(newObj,turn);
  
  if(ch){
    flag=2
    
  }

}
                })
            }
            
        })

        let d=0;
        arr2.map((elem:any)=>{
           d++;
           let key='bp'+d
            if(elem.length>0){
                elem.map((el:any)=>{
if(el.length>0){
    let v=getV(el[0],el[1],obj1,turn)
    //  console.log('coo',v)
    let newObj;
    if(v) newObj=updateMoveObj(el[0], el[1],v, key,obj1)
        else newObj={...obj1, k1:{...obj1.k1, [key]:[el[0],el[1]]}}
  let ch=isKingSafe1(newObj,turn);
  if(ch){
    
    flag=2
  }

}
                })
            }
            
        })
    }

    if(turn==0){
        //move all black keys while checking if king is safe from each white key 
        let c=0;
        arr3.map((elem:any)=>{ //black
           c++;
           let key='w'+c  //b4
        
            if(elem.length>0){
                elem.map((el:any)=>{
              
if(el.length>0){
    let v=getV(el[0],el[1],obj1,turn)
    //  console.log('coo',v)
    let newObj;
    if(v) newObj=updateMoveObj(el[0], el[1],v, key,obj1)
        else newObj={...obj1, k2:{...obj1.k2, [key]:[el[0],el[1]]}}
 
    //  console.log('ooo',newObj)
  let ch=isKingSafe1(newObj,turn);
  
  if(ch){
    
    flag=2
    
  }

}
                })
            }
            
        })

        let d=0;
        arr4.map((elem:any)=>{
           d++;
           let key='wp'+d
            if(elem.length>0){
                elem.map((el:any)=>{
if(el.length>0){
    let v=getV(el[0],el[1],obj1,turn)
    //  console.log('coo',v)
    let newObj;
    if(v) newObj=updateMoveObj(el[0], el[1],v, key,obj1)
        else newObj={...obj1, k2:{...obj1.k2, [key]:[el[0],el[1]]}}
  let ch=isKingSafe1(newObj,turn);
  if(ch){
    
    flag=2
  }

}
                })
            }
            
        })
    }
    //  console.log('finalflag',flag)
    if(flag==1) return true  //i.e king is dead
    else return false;
 }

