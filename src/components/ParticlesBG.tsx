'use client'
import { useEffect, useRef } from 'react'


export default function ParticlesBG(){
const ref = useRef<HTMLCanvasElement>(null)
useEffect(()=>{
const c = ref.current!; const ctx = c.getContext('2d')!
let w= c.width = window.innerWidth, h = c.height = window.innerHeight
const onResize=()=>{ w=c.width=window.innerWidth; h=c.height=window.innerHeight }
window.addEventListener('resize', onResize)
const pts = Array.from({length:80},()=>({ x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-0.5)*0.6, vy:(Math.random()-0.5)*0.6 }))
let raf=0
const loop=()=>{
ctx.clearRect(0,0,w,h)
for (const p of pts){
p.x+=p.vx; p.y+=p.vy
if (p.x<0||p.x>w) p.vx*=-1
if (p.y<0||p.y>h) p.vy*=-1
}
for (let i=0;i<pts.length;i++){
for (let j=i+1;j<pts.length;j++){
const a=pts[i], b=pts[j]
const dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy)
if (d<120){
ctx.globalAlpha = 1 - d/120
ctx.strokeStyle = 'rgba(99,102,241,0.35)'
ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke()
ctx.globalAlpha = 1
}
}
}
pts.forEach(p=>{ ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.fillRect(p.x,p.y,1.5,1.5) })
raf = requestAnimationFrame(loop)
}
raf = requestAnimationFrame(loop)
return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
},[])
return <canvas ref={ref} className="fixed inset-0 -z-10"/>
}