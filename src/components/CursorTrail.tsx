'use client'
import { useEffect } from 'react'


export default function CursorTrail(){
useEffect(() => {
const dots: HTMLDivElement[] = []
for (let i=0; i<12; i++){
const d = document.createElement('div')
d.style.cssText = 'position:fixed;width:8px;height:8px;border-radius:50%;background:rgba(99,102,241,.5);pointer-events:none;z-index:50;filter:blur(1px);'
document.body.appendChild(d)
dots.push(d)
}
let x=0,y=0
const coords: {x:number,y:number}[] = Array(12).fill(0).map(()=>({x:0,y:0}))
const onMove = (e: MouseEvent) => { x=e.clientX; y=e.clientY }
window.addEventListener('mousemove', onMove)
let raf=0
const loop=()=>{
coords[0]={x,y}
for (let i=1;i<coords.length;i++){
coords[i].x += (coords[i-1].x - coords[i].x)*0.25
coords[i].y += (coords[i-1].y - coords[i].y)*0.25
}
dots.forEach((d,i)=>{
d.style.transform = `translate(${coords[i].x-4}px,${coords[i].y-4}px)`
d.style.opacity = String(1 - i/12)
})
raf = requestAnimationFrame(loop)
}
raf = requestAnimationFrame(loop)
return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); dots.forEach(d=>d.remove()) }
},[])
return null
}