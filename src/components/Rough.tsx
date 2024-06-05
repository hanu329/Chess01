import { useState } from "react"
let a11=[1,2,3,4,5]
let b11=[10,2,4,8]
export const Rough=()=>{
const [a1, setA1]=useState(a11)
const [b1, setB1] = useState(b11)
    return <>
    <h3>Rough page herre</h3>
    {
        a1.map((el)=>{
            return b1.map((elem)=>{
                if(el==elem || el==elem){
                    return <h3 key={elem+""+el+2}>{el}</h3>
                }
                else{
                    return <div  key={elem+""+el+2}>{el}</div>
                }
            })
        
        })
    }
    </>
}