

interface AnyObject {
    [key: string]: any;
}

const blackKey: AnyObject = {
    b1: [0, 0],
    b2: [0, 1],
    b3: [0, 2],
    b4: [0, 3],
    b5: [0, 4],
    b6: [0, 5],
    b7: [0, 6],
    b8: [0, 7]
};

const whiteKey: AnyObject = {
    w1: [7, 0],
    w2: [7, 1],
    w3: [7, 2],
    w4: [7, 3],
    w5: [7, 4],
    w6: [7, 5],
    w7: [7, 6],
    w8: [7, 7]
};

const blackPawn: AnyObject = {
    bp1: [1, 0],
    bp2: [1, 1],
    bp3: [1, 2],
    bp4: [1, 3],
    bp5: [1, 4],
    bp6: [1, 5],
    bp7: [1, 6],
    bp8: [1, 7]
};

const whitePawn: AnyObject = {
    wp1: [6, 0],
    wp2: [6, 1],
    wp3: [6, 2],
    wp4: [6, 3],
    wp5: [6, 4],
    wp6: [6, 5],
    wp7: [6, 6],
    wp8: [6, 7]
};

const obj: AnyObject = {
    k1: blackKey,
    p1: blackPawn,
    k2: whiteKey,
    p2: whitePawn
};

function isVacant(a:any, b:any) {
    let obj1:any=JSON.parse(localStorage.chessObj);
    for (const propKey in obj1) {
        const prop = obj1[propKey];
        for (const key in prop) {
            if (Array.isArray(prop[key]) && prop[key][0] === a && prop[key][1] === b) {
                return true;
            }
        }
    }
    return false;
}

function isVacant1(a:any, b:any,v:any) {
    console.log('vhere',v)
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

function isVacant2(a:any, b:any,v:any) {
    let obj1:any=JSON.parse(localStorage.chessObj);
    console.log('iii',a,b,v)
    for (const propKey in obj1) {
        const prop = obj1[propKey];
        for (const key in prop) {
            // if(key=='b6'){
            //     console.log('comp',prop[key][0],prop[key][1],a,b,v,key,)
            //    // debugger;
            // }
            if((key.includes('b') && v.includes('b')) ||(key.includes('w') && v.includes('w'))){
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

export const RookMoves1=(a:any,b:any,c:any)=>{

  let validSteps= [] 
  let k=1; 
   let z='bp'+(b+1);  
   let obj1:any=JSON.parse(localStorage.chessObj);

    for(let i=a+1; i<8; i++){
      
        if(i>=0&&i<8){
           // console.log(i,b,isVacant(i,b))
       if(isVacant2(i,b,c)==3) validSteps.push([i,b]) 
        else if(k==1 && isVacant2(i,b,c)==2){
    k=2;
    validSteps.push([i,b]);  
    break;     
        } 
        }

    }
   
    for(let i=a-1; i>=0; i--){
        if(i>=0&&i<8){
            if(isVacant2(i,b,c)==3) validSteps.push([i,b]) 
                else if(k==1 && isVacant2(i,b,c)==2){
            k=2;
                    validSteps.push([i,b]);  
                    break;     
                        }
        }
       }

            for(let i=b+1; i<8; i++){
                if(i>=0&&i<8){
                    if(isVacant2(a,i,c)==3) validSteps.push([a,i]) 
                        else if(k==1 && isVacant2(a,i,c)==2){
                            k=2;
                                    validSteps.push([i,b]);  
                                    break;     
                                        }
                }
                    }
                   
                    for(let i=b-1; i>=0; i--){
                        if(i>=0&&i<8){
                            if(isVacant2(a,i,c)==3) validSteps.push([a,i]) 
                                else if(k==1 && isVacant2(a,i,c)==2){
                                    k=2;
                                            validSteps.push([i,b]);  
                                            break;     
                                                }
                        }
                            }
                            debugger;
                            console.log('vnew',validSteps)
                           return validSteps;
}

export const KnightMoves1=(a:any, b:any,v:any)=>{
    console.log(a,b,v)
    let validSteps=[];

    if(!isVacant1(a+1,b+2,v) && a+1<8 && b+2<8) validSteps.push([a+1,b+2])
        if(!isVacant1(a-1,b+2,v) &&  a-1>=0 && b+2<8) validSteps.push([a-1,b+2])
            if(!isVacant1(a+1,b-2,v) &&  a+1<8 && b-2>=0) validSteps.push([a+1,b-2])
                if(!isVacant1(a-1,b-2,v) && a-1>=0 && b-2>=0) validSteps.push([a-1,b-2])
    if(!isVacant1(a+2,b+1,v) && a+2<8 && b+1<8) validSteps.push([a+2,b+1])
        if(!isVacant1(a+2,b-1,v) && a+2<8 && b-1>=0) validSteps.push([a+2,b-1])
            if(!isVacant1(a-2,b+1,v) && a-2>=0 && b+1<8) validSteps.push([a-2,b+1])
                if(!isVacant1(a-2,b-1,v) && a-2>=0 && b-1>=0) validSteps.push([a-2,b-1])
    return validSteps;
}

export const bishopMoves1=(a:any, b:any,v:any)=>{
    let validSteps=[]
    let c=a;
    let d=b;
   while(c<7 && d<7){
      
      c++;
      d++;
      if(isVacant2(c,d,v)==3) validSteps.push([c,d]) 
        else if(isVacant2(c,d,v)==2){
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
    if(isVacant2(e,f,v)==3) validSteps.push([e,f]) 
        else if(isVacant2(e,f,v)==2){
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
    if(isVacant2(g,h,v)==3) validSteps.push([g,h]) 
        else if(isVacant2(g,h,v)==2){
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
    if(isVacant2(k,l,v)==3) validSteps.push([k,l])
        else if(isVacant2(k,l,v)==2){
            validSteps.push([k,l])
            break;
            }
        else break;

   }
   console.log('validStep',validSteps)
   return validSteps;
}

export const blackQueenMoves=(a:any, b:any,v:any)=>{
let validSteps=[]
for(let i=a+1; i<8; i++){
    if(i>=0&&i<8){
        if(isVacant2(i,b,v)==3) validSteps.push([i,b]) 
            else  if(isVacant2(i,b,v)==2){
                validSteps.push([i,b]); break;
        } 
            else break;
    }

}

for(let i=a-1; i>=0; i--){
    
    if(i>=0&&i<8){
        if(isVacant2(i,b,v)==3) validSteps.push([i,b]) 
            else if(isVacant2(i,b,v)==2){
                validSteps.push([i,b]); 
                break;
        } 
            else break;
    }
   }

        for(let i=b+1; i<8; i++){
         
            if(i>=0&&i<8){
              
                if(isVacant2(a,i,v)==3) validSteps.push([a,i]) 
                 
                    else if(isVacant2(a,i,v)==2){
                        validSteps.push([a,i]); break;
                } 
                    else break;
            }
                }
               
                for(let i=b-1; i>=0; i--){
                    if(i>=0&&i<8){
                        if(isVacant2(a,i,v)==3) validSteps.push([a,i]) 
                            else if(isVacant2(a,i,v)==2){
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
                          if(isVacant2(c,d,v)==3) validSteps.push([c,d]) 
                            else if(isVacant2(c,d,v)==2){
                                validSteps.push([c,d]); break;
                        } 
                            else break;
                       }
                       let e=a;
                       let f=b;
                       while(e<7 && f>0){
                        
                        e++;
                        f--;
                        if(isVacant2(e,f,v)==3) validSteps.push([e,f]) 
                            else if(isVacant2(e,f,v)==2){
                                validSteps.push([e,f]); break;
                        } 
                            else break;
                       }
                       let g=a;
                       let h=b;
                       while(g>0 && h>0){
                        g--;
                        h--;
                        if(isVacant2(g,h,v)==3) validSteps.push([g,h]) 
                            else if(isVacant2(g,h,v)==2){
                                validSteps.push([g,h]); break;
                        } 
                            else break;
                       }
                       let k=a;
                       let l=b;
                       while(k>0 && l<7){
                        k--;
                        l++;
                        if(isVacant2(k,l,v)==3) validSteps.push([k,l]) 
                            else if(isVacant2(k,l,v)==2){
                                validSteps.push([k,l]); break;
                        } 
                            else break;
                    
                       }
                       debugger;
                       console.log('validsteps',validSteps)
                         return validSteps;                     

}

export const blackKingMoves=(a:any, b:any)=>{
console.log('a',a,b)
   let validSteps=[]; 
   if(!isVacant(a-1,b) && a-1>=0) validSteps.push([a-1,b])
   if(!isVacant(a+1,b) && a+1<8) validSteps.push([a+1,b])
    if(!isVacant(a-1,b-1) && a-1>=0 && b-1>=0)validSteps.push([a-1,b-1])
        if(!isVacant(a-1,b+1) && a-1>=0 && b+1<8)validSteps.push([a-1,b+1])
            if(!isVacant(a+1,b-1) && a+1<8 && b-1>=0)validSteps.push([a+1,b-1])
            if(!isVacant(a+1,b+1) && a+1<8 && b+1<8)validSteps.push([a+1,b+1])  
                if(!isVacant(a,b-1) && b-1>=0)validSteps.push([a,b-1])
                    if(!isVacant(a,b+1) && b+1<8)validSteps.push([a,b+1])
                        console.log('kingsteps',validSteps)
        return validSteps;
}

export const blackPawnMoves=(a:any, b:any)=>{
  
let validSteps=[]
   if(!isVacant(a+1,b) && a+1<8) validSteps.push([a+1,b])
      if(isVacant(a+1,b-1) && a+1<8 && b-1>=0) validSteps.push([a+1,b-1])
        if(isVacant(a+1,b+1) && a+1<8 && b+1<8) validSteps.push([a+1,b+1])
 // console.log('blackpawn',validSteps)
    return validSteps;
}

export const whitePawnMoves=(a:any, b:any)=>{
    let validSteps=[]
    if(!isVacant(a-1,b) && a-1>=0) validSteps.push([a-1,b])
        if(isVacant(a-1,b-1) && a-1<8 && b-1>=0) validSteps.push([a-1,b-1])
            if(isVacant(a-1,b+1) && a+1<8 && b+1<8) validSteps.push([a-1,b+1])
                console.log('wp',validSteps)
        return validSteps;
}

// const combat=(a:any, b:any, c:any,d:any)=>{
    
//     console.log(a,b,c,d)
// }

export const updateMoveObj=(a:any, b:any,v:any, key:any,  boardObj:any)=>{
debugger;
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
           console.log(newobj)    
          }
         console.log('updaatemove',newobj)
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
           console.log(newobj)    
          }
         console.log('updaatemove',newobj)
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

          
          console.log(newobj)
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

          
          console.log(newobj)
        return newobj;
    }   
}