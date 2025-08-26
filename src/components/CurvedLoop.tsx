'use client'
import { useRef, useEffect, useState, useMemo, useId, FC, PointerEvent } from 'react'


interface CurvedLoopProps { marqueeText?: string; speed?: number; className?: string; curveAmount?: number; direction?: 'left'|'right'; interactive?: boolean }


const CurvedLoop: FC<CurvedLoopProps> = ({ marqueeText = '', speed=2, className, curveAmount=400, direction='left', interactive=true })=>{
const text = useMemo(()=>{ const hasTrailing=/\s|\u00A0$/.test(marqueeText); return (hasTrailing? marqueeText.replace(/\s+$/,''): marqueeText) + '\u00A0' },[marqueeText])
const measureRef = useRef<SVGTextElement|null>(null)
const textPathRef = useRef<SVGTextPathElement|null>(null)
const [spacing, setSpacing] = useState(0)
const [offset, setOffset] = useState(0)
const uid = useId()
const pathId = `curve-${uid}`
const pathD = `M-100,40 Q500,${40+curveAmount} 1540,40`
const dragRef = useRef(false)
const lastXRef = useRef(0)
const dirRef = useRef<'left'|'right'>(direction)
const velRef = useRef(0)
const totalText = spacing? Array(Math.ceil(1800/spacing)+2).fill(text).join('') : text
const ready = spacing>0
useEffect(()=>{ if(measureRef.current) setSpacing(measureRef.current.getComputedTextLength()) },[text,className])
useEffect(()=>{ if(!spacing) return; if(textPathRef.current){ const initial=-spacing; textPathRef.current.setAttribute('startOffset', initial+'px'); setOffset(initial) } },[spacing])
useEffect(()=>{ if(!spacing || !ready) return; let f=0; const step=()=>{ if(!dragRef.current && textPathRef.current){ const delta = dirRef.current==='right'? speed : -speed; const cur = parseFloat(textPathRef.current.getAttribute('startOffset')||'0'); let n = cur+delta; const wrap=spacing; if(n<=-wrap) n+=wrap; if(n>0) n-=wrap; textPathRef.current.setAttribute('startOffset', n+'px'); setOffset(n) } f=requestAnimationFrame(step) }; f=requestAnimationFrame(step); return ()=> cancelAnimationFrame(f) },[spacing,speed,ready])
const onPointerDown=(e:PointerEvent)=>{ if(!interactive) return; dragRef.current=true; lastXRef.current=e.clientX; velRef.current=0; (e.target as HTMLElement).setPointerCapture(e.pointerId) }
const onPointerMove=(e:PointerEvent)=>{ if(!interactive || !dragRef.current || !textPathRef.current) return; const dx=e.clientX-lastXRef.current; lastXRef.current=e.clientX; velRef.current=dx; const cur=parseFloat(textPathRef.current.getAttribute('startOffset')||'0'); let n=cur+dx; const wrap=spacing; if(n<=-wrap) n+=wrap; if(n>0) n-=wrap; textPathRef.current.setAttribute('startOffset', n+'px'); setOffset(n) }
const endDrag=()=>{ if(!interactive) return; dragRef.current=false; dirRef.current = velRef.current>0? 'right':'left' }
const cursor = interactive? (dragRef.current? 'grabbing':'grab') : 'auto'
return (
<div className="flex items-center justify-center w-full" style={{visibility: ready? 'visible':'hidden', cursor}} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerLeave={endDrag}>
<svg className="select-none w-full overflow-visible block aspect-[100/12] text-[6rem] font-bold uppercase leading-none" viewBox="0 0 1440 120">
<text ref={measureRef} xmlSpace="preserve" style={{visibility:'hidden', opacity:0, pointerEvents:'none'}}>{text}</text>
<defs>
<path id={pathId} d={pathD} fill="none" stroke="transparent" />
</defs>
{ready && (
<text xmlSpace="preserve" className={`fill-white ${className??''}`}>
<textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset+"px"} xmlSpace="preserve">{totalText}</textPath>
</text>
)}
</svg>
</div>
)
}
export default CurvedLoop