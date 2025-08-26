'use client'
import React, { ReactNode, useLayoutEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'


export interface ScrollStackItemProps { itemClassName?: string; children: ReactNode }
export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName='' }) => (
<div className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()} style={{ backfaceVisibility:'hidden', transformStyle:'preserve-3d' }}>{children}</div>
)


interface ScrollStackProps { className?: string; children: ReactNode; itemDistance?: number; itemScale?: number; itemStackDistance?: number; stackPosition?: string; scaleEndPosition?: string; baseScale?: number; scaleDuration?: number; rotationAmount?: number; blurAmount?: number; onStackComplete?: ()=>void }


const ScrollStack: React.FC<ScrollStackProps> = ({ children, className='', itemDistance=100, itemScale=.03, itemStackDistance=30, stackPosition='20%', scaleEndPosition='10%', baseScale=.85, scaleDuration=.5, rotationAmount=0, blurAmount=0, onStackComplete })=>{
const scrollerRef = useRef<HTMLDivElement>(null)
const stackCompletedRef = useRef(false)
const animationFrameRef = useRef<number|null>(null)
const lenisRef = useRef<Lenis|null>(null)
const cardsRef = useRef<HTMLElement[]>([])
const lastTransformsRef = useRef(new Map<number, any>())
const isUpdatingRef = useRef(false)
const calcProgress = useCallback((st:number, start:number, end:number)=>{ if(st<start) return 0; if(st> end) return 1; return (st-start)/(end-start) },[])
const parsePct = useCallback((v:string|number, ch:number)=> typeof v==='string' && v.includes('%')? (parseFloat(v)/100)*ch : parseFloat(v as string),[])
const update=useCallback(()=>{
const sc = scrollerRef.current; if(!sc || !cardsRef.current.length || isUpdatingRef.current) return; isUpdatingRef.current=true
const st=sc.scrollTop, ch=sc.clientHeight, stackPos=parsePct(stackPosition,ch), endPos=parsePct(scaleEndPosition,ch)
const endEl = sc.querySelector('.scroll-stack-end') as HTMLElement; const endTop = endEl? endEl.offsetTop: 0
cardsRef.current.forEach((card,i)=>{
const top=card.offsetTop; const trigStart=top-stackPos-(itemStackDistance*i); const trigEnd=top-endPos; const pinStart=trigStart; const pinEnd=endTop - ch/2
const prog = calcProgress(st,trigStart,trigEnd); const targetScale = baseScale + (i*itemScale); const scale = 1 - prog*(1-targetScale); const rot = rotationAmount? i*rotationAmount*prog: 0
let blur=0; if(blurAmount){ let topIdx=0; for(let j=0;j<cardsRef.current.length;j++){ const jt=cardsRef.current[j].offsetTop; const js=jt-stackPos-(itemStackDistance*j); if(st>=js) topIdx=j } if(i<topIdx){ const depth=topIdx-i; blur=Math.max(0, depth*blurAmount) } }
let ty=0; const pinned = st>=pinStart && st<=pinEnd; if(pinned){ ty = st - top + stackPos + (itemStackDistance*i) } else if(st>pinEnd){ ty = pinEnd - top + stackPos + (itemStackDistance*i) }
const newT = { translateY: Math.round(ty*100)/100, scale: Math.round(scale*1000)/1000, rotation: Math.round(rot*100)/100, blur: Math.round(blur*100)/100 }
const last=lastTransformsRef.current.get(i)
const changed = !last || Math.abs(last.translateY-newT.translateY)>.1 || Math.abs(last.scale-newT.scale)>.001 || Math.abs(last.rotation-newT.rotation)>.1 || Math.abs(last.blur-newT.blur)>.1
if(changed){ card.style.transform = `translate3d(0, ${newT.translateY}px, 0) scale(${newT.scale}) rotate(${newT.rotation}deg)`; card.style.filter = newT.blur>0? `blur(${newT.blur}px)` : '' ; lastTransformsRef.current.set(i,newT) }
if(i===cardsRef.current.length-1){ const inView = st>=pinStart && st<=pinEnd; if(inView && !stackCompletedRef.current){ stackCompletedRef.current=true; onStackComplete?.() } else if(!inView && stackCompletedRef.current){ stackCompletedRef.current=false } }
})
isUpdatingRef.current=false
},[itemScale,itemStackDistance,stackPosition,scaleEndPosition,baseScale,rotationAmount,blurAmount,onStackComplete,calcProgress,parsePct])
const onScroll=useCallback(()=>update(),[update])
const setup=useCallback(()=>{ const sc=scrollerRef.current; if(!sc) return; const len=new Lenis({ wrapper: sc, content: sc.querySelector('.scroll-stack-inner') as HTMLElement, duration:1.2, easing:(t)=> Math.min(1, 1.001 - Math.pow(2,-10*t)), smoothWheel:true, touchMultiplier:2, infinite:false, gestureOrientation:'vertical', wheelMultiplier:1, lerp:.1, syncTouch:true, syncTouchLerp:.075 }) as unknown as Lenis; len.on('scroll', onScroll); const raf=(time:number)=>{ (len as any).raf(time); animationFrameRef.current=requestAnimationFrame(raf) }; animationFrameRef.current=requestAnimationFrame(raf); lenisRef.current=len as any; return len },[onScroll])
useLayoutEffect(()=>{ const sc=scrollerRef.current; if(!sc) return; const cards = Array.from(sc.querySelectorAll('.scroll-stack-card')) as HTMLElement[]; cardsRef.current=cards; const cache=lastTransformsRef.current; cards.forEach((c,i)=>{ if(i<cards.length-1) c.style.marginBottom = `${itemDistance}px`; c.style.willChange='transform, filter'; c.style.transformOrigin='top center'; c.style.backfaceVisibility='hidden'; c.style.transform='translateZ(0)'; (c.style as any).webkitTransform='translateZ(0)' }) ; setup(); update(); return ()=>{ if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); if(lenisRef.current) (lenisRef.current as any).destroy(); cardsRef.current=[]; cache.clear(); } },[itemDistance,itemScale,itemStackDistance,stackPosition,scaleEndPosition,baseScale,scaleDuration,rotationAmount,blurAmount,onStackComplete,setup,update])
return (
<div className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()} ref={scrollerRef} style={{ overscrollBehavior:'contain', WebkitOverflowScrolling:'touch', scrollBehavior:'smooth', WebkitTransform:'translateZ(0)', transform:'translateZ(0)', willChange:'scroll-position' }}>
<div className="scroll-stack-inner pt-[20vh] px-4 md:px-20 pb-[50rem] min-h-screen">{children}<div className="scroll-stack-end w-full h-px"/></div>
</div>
)
}
export default ScrollStack