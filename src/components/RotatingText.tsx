'use client'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { motion, AnimatePresence, Transition, type VariantLabels, type Target, type TargetAndTransition } from 'motion/react'
function cn(...c:(string|undefined|null|boolean)[]){return c.filter(Boolean).join(' ')}
export interface RotatingTextRef { next:()=>void; previous:()=>void; jumpTo:(i:number)=>void; reset:()=>void }
export interface RotatingTextProps extends Omit<React.ComponentPropsWithoutRef<typeof motion.span>, 'children'|'transition'|'initial'|'animate'|'exit'> { texts: string[]; transition?: Transition; initial?: boolean|Target|VariantLabels; animate?: boolean|VariantLabels|TargetAndTransition; exit?: Target|VariantLabels; animatePresenceMode?: 'sync'|'wait'; animatePresenceInitial?: boolean; rotationInterval?: number; staggerDuration?: number; staggerFrom?: 'first'|'last'|'center'|'random'|number; loop?: boolean; auto?: boolean; splitBy?: string; onNext?:(i:number)=>void; mainClassName?: string; splitLevelClassName?: string; elementLevelClassName?: string }
const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(({ texts, transition={type:'spring', damping:25, stiffness:300}, initial={y:'100%',opacity:0}, animate={y:0,opacity:1}, exit={y:'-120%',opacity:0}, animatePresenceMode='wait', animatePresenceInitial=false, rotationInterval=2000, staggerDuration=0, staggerFrom='first', loop=true, auto=true, splitBy='characters', onNext, mainClassName, splitLevelClassName, elementLevelClassName, ...rest}, ref)=>{
const [idx,setIdx]=useState(0)
const splitIntoCharacters=(t:string)=>{ if(typeof Intl!=='undefined' && (Intl as any).Segmenter){ const s=new (Intl as any).Segmenter('en',{granularity:'grapheme'}); return Array.from(s.segment(t), (seg:any)=>seg.segment) } return Array.from(t) }
const elements = useMemo(()=>{ const t=texts[idx]; if(splitBy==='characters'){ const words=t.split(' '); return words.map((w,i)=>({ characters: splitIntoCharacters(w), needsSpace: i!==words.length-1 })) } if(splitBy==='words'){ return t.split(' ').map((w,i,arr)=>({ characters:[w], needsSpace:i!==arr.length-1 })) } if(splitBy==='lines'){ return t.split('\n').map((line,i,arr)=>({ characters:[line], needsSpace:i!==arr.length-1 })) } return t.split(splitBy).map((p,i,arr)=>({ characters:[p], needsSpace:i!==arr.length-1 })) },[texts,idx,splitBy])
const getDelay=useCallback((i:number, total:number)=>{ if(staggerFrom==='first') return i*staggerDuration; if(staggerFrom==='last') return (total-1-i)*staggerDuration; if(staggerFrom==='center'){ const c=Math.floor(total/2); return Math.abs(c-i)*staggerDuration } if(staggerFrom==='random'){ const r=Math.floor(Math.random()*total); return Math.abs(r-i)*staggerDuration } return Math.abs((staggerFrom as number)-i)*staggerDuration },[staggerFrom,staggerDuration])
const change=(n:number)=>{ setIdx(n); onNext?.(n) }
const next=useCallback(()=>{ const n = idx===texts.length-1? (loop?0:idx) : idx+1; if(n!==idx) change(n) },[idx,texts.length,loop])
const previous=useCallback(()=>{ const n = idx===0? (loop?texts.length-1:idx) : idx-1; if(n!==idx) change(n) },[idx,texts.length,loop])
const jumpTo=useCallback((i:number)=>{ const v=Math.max(0, Math.min(i, texts.length-1)); if(v!==idx) change(v) },[idx,texts.length])
const reset=useCallback(()=>{ if(idx!==0) change(0) },[idx])
useImperativeHandle(ref,()=>({next,previous,jumpTo,reset}),[next,previous,jumpTo,reset])
useEffect(()=>{ if(!auto) return; const id=setInterval(next, rotationInterval); return ()=>clearInterval(id) },[next, rotationInterval, auto])
return (
<motion.span className={cn('flex flex-wrap whitespace-pre-wrap relative', mainClassName)} {...rest} layout transition={transition}>
<span className="sr-only">{texts[idx]}</span>
<AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
<motion.span key={idx} className={cn(splitBy==='lines'? 'flex flex-col w-full':'flex flex-wrap whitespace-pre-wrap relative')} layout aria-hidden="true">
{elements.map((word, wi, arr)=>{
const prev = arr.slice(0,wi).reduce((s,w)=>s+w.characters.length,0)
return (
<span key={wi} className={cn('inline-flex', splitLevelClassName)}>
{word.characters.map((ch, ci)=> (
<motion.span key={ci} initial={initial} animate={animate} exit={exit} transition={{...transition, delay: getDelay(prev+ci, arr.reduce((s,w)=>s+w.characters.length,0))}} className={cn('inline-block', elementLevelClassName)}>{ch}</motion.span>
))}
{word.needsSpace && <span className="whitespace-pre"> </span>}
</span>
)
})}
</motion.span>
</AnimatePresence>
</motion.span>
)
})
RotatingText.displayName='RotatingText'
export default RotatingText