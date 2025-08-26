'use client'
import { ElementType, useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react'
import { gsap } from 'gsap'


interface TextTypeProps { className?: string; showCursor?: boolean; hideCursorWhileTyping?: boolean; cursorCharacter?: string|React.ReactNode; cursorBlinkDuration?: number; cursorClassName?: string; text: string|string[]; as?: ElementType; typingSpeed?: number; initialDelay?: number; pauseDuration?: number; deletingSpeed?: number; loop?: boolean; textColors?: string[]; variableSpeed?: {min:number; max:number}; onSentenceComplete?:(s:string,i:number)=>void; startOnVisible?: boolean; reverseMode?: boolean }


const TextType = ({ text, as:Component='div', typingSpeed=50, initialDelay=0, pauseDuration=2000, deletingSpeed=30, loop=true, className='', showCursor=true, hideCursorWhileTyping=false, cursorCharacter='|', cursorClassName='', cursorBlinkDuration=.5, textColors=[], variableSpeed, onSentenceComplete, startOnVisible=false, reverseMode=false, ...props }: TextTypeProps & React.HTMLAttributes<HTMLElement>)=>{
const [displayedText,setDisplayedText] = useState('')
const [currentCharIndex,setCurrentCharIndex]=useState(0)
const [isDeleting,setIsDeleting]=useState(false)
const [currentTextIndex,setCurrentTextIndex]=useState(0)
const [isVisible,setIsVisible]=useState(!startOnVisible)
const cursorRef=useRef<HTMLSpanElement>(null)
const containerRef=useRef<HTMLElement>(null)
const textArray = useMemo(()=> (Array.isArray(text)? text: [text]), [text])
const getRandomSpeed = useCallback(()=>{ if(!variableSpeed) return typingSpeed; const {min,max}=variableSpeed; return Math.random()*(max-min)+min },[variableSpeed, typingSpeed])
const getCurrentTextColor = ()=>{ if(textColors.length===0) return '#ffffff'; return textColors[currentTextIndex % textColors.length] }


useEffect(()=>{ if(!startOnVisible || !containerRef.current) return; const obs = new IntersectionObserver((entries)=> entries.forEach(e=>{ if(e.isIntersecting) setIsVisible(true) }), {threshold:.1}); obs.observe(containerRef.current); return ()=>obs.disconnect() },[startOnVisible])
useEffect(()=>{ if(showCursor && cursorRef.current){ gsap.set(cursorRef.current,{opacity:1}); gsap.to(cursorRef.current,{opacity:0, duration: cursorBlinkDuration, repeat:-1, yoyo:true, ease:'power2.inOut'}) } },[showCursor, cursorBlinkDuration])
useEffect(()=>{ if(!isVisible) return; let t: any; const currentText=textArray[currentTextIndex]; const processed = reverseMode? currentText.split('').reverse().join(''): currentText; const tick=()=>{ if(isDeleting){ if(displayedText===''){ setIsDeleting(false); if(currentTextIndex===textArray.length-1 && !loop) return; onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex); setCurrentTextIndex(p=> (p+1)%textArray.length); setCurrentCharIndex(0); t=setTimeout(()=>{}, pauseDuration) } else { t=setTimeout(()=> setDisplayedText(p=> p.slice(0,-1)), deletingSpeed) } } else { if(currentCharIndex<processed.length){ t=setTimeout(()=>{ setDisplayedText(p=> p + processed[currentCharIndex]); setCurrentCharIndex(p=> p+1) }, variableSpeed? getRandomSpeed(): typingSpeed) } else if(textArray.length>1){ t=setTimeout(()=> setIsDeleting(true), pauseDuration) } } }
if(currentCharIndex===0 && !isDeleting && displayedText===''){ t=setTimeout(tick, initialDelay) } else { tick() }
return ()=> clearTimeout(t)
},[currentCharIndex,displayedText,isDeleting,typingSpeed,deletingSpeed,pauseDuration,textArray,currentTextIndex,loop,initialDelay,isVisible,reverseMode,variableSpeed,onSentenceComplete])


const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting)
return createElement(Component, { ref: containerRef as any, className:`inline-block whitespace-pre-wrap tracking-tight ${className}`, ...props }, (
<span className="inline" style={{ color: getCurrentTextColor() }}>{displayedText}</span>
), showCursor && (
<span ref={cursorRef} className={`ml-1 inline-block opacity-100 ${shouldHideCursor? 'hidden':''} ${cursorClassName}`}>{cursorCharacter}</span>
))
}
export default TextType