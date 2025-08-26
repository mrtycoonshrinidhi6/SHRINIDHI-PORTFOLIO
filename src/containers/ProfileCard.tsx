'use client'
import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import profile from '@/assets/profile.jpg'
import '@/components/ProfileCard.css'


interface Props { name?: string; title?: string; handle?: string; status?: string; contactText?: string; onContactClick?: ()=>void }


const DEFAULT_BEHIND = 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)'
const DEFAULT_INNER = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)'


export default function ProfileCard({ name='Shrinidhi H V', title='AI/ML Engineer & Full-Stack Developer', handle='mr-tycoon-shrinidhi', status='Online', contactText='Contact', onContactClick }: Props){
const wrapRef = useRef<HTMLDivElement>(null)
const cardRef = useRef<HTMLDivElement>(null)


const update=(ox:number, oy:number, card:HTMLElement, wrap:HTMLElement)=>{
const w=card.clientWidth, h=card.clientHeight
const px = Math.min(Math.max((100/w)*ox,0),100)
const py = Math.min(Math.max((100/h)*oy,0),100)
const cx = px-50, cy=py-50
const props:any = { '--pointer-x': `${px}%`, '--pointer-y': `${py}%`, '--rotate-x': `${-(cx/5)}deg`, '--rotate-y': `${(cy/4)}deg`, '--behind-gradient': DEFAULT_BEHIND, '--inner-gradient': DEFAULT_INNER }
Object.entries(props).forEach(([k,v])=> wrap.style.setProperty(k, String(v)))
}


const onEnter=()=>{ wrapRef.current?.classList.add('active'); cardRef.current?.classList.add('active') }
const onMove=(e: React.PointerEvent)=>{ const card=cardRef.current!, wrap=wrapRef.current!; const rect=card.getBoundingClientRect(); update(e.clientX-rect.left, e.clientY-rect.top, card, wrap) }
const onLeave=(e: React.PointerEvent)=>{ const card=cardRef.current!, wrap=wrapRef.current!; const rect = (e.target as HTMLElement).getBoundingClientRect(); const sx = rect.width - 70, sy = 60; update(sx, sy, card, wrap); wrap.classList.remove('active'); card.classList.remove('active') }


return (
<div ref={wrapRef} className="pc-card-wrapper">
<section ref={cardRef} className="pc-card" onPointerEnter={onEnter} onPointerMove={onMove} onPointerLeave={onLeave}>
<div className="pc-inside">
<div className="pc-shine"/>
<div className="pc-glare"/>
<div className="pc-content pc-avatar-content">
<Image className="avatar" src={profile} alt="avatar" />
<div className="pc-user-info">
<div className="pc-mini-avatar"><Image src={profile} alt="mini" width={28} height={28}/></div>
<div className="pc-user-text">
<div className="pc-handle">@{handle}</div>
<div className="pc-status">{status}</div>
</div>
<button className="pc-contact-btn" onClick={onContactClick} type="button">Contact Me</button>
</div>
</div>
<div className="pc-content">
<div className="pc-details"><h3>{name}</h3><p>{title}</p></div>
</div>
</div>
</section>
</div>
)
}