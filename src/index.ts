import express from 'express'

const app = express()

let reqCount = 0;

function middleware(req:any,res:any,next:any){
    reqCount++;
    next()
}

app.use(middleware)

app.get("/",(req,res)=>{
    res.send("ashutosh sahni")
})

app.get("/",(req,res)=>{
    res.json({
        reqCount
    })
})

app.listen(3000,()=>console.log("server up running"))