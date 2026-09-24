"use client";

import { useEffect, useRef, useState } from "react";

type Locale = "ar" | "en";
const START = { enquiries: 42, hot: 7, followups: 18 };
const CAPS = { enquiries: 64, hot: 11, followups: 30 };
const EVENTS = {
  en: ["Voice note understood, need captured","Lead tagged hot, deal created","Follow-up sent to warm lead","Owner alerted on WhatsApp","Handed to team with full context"],
  ar: ["فهم رسالة صوتية وسجّل الطلب","عميل جاهز، تم إنشاء صفقة","رسالة متابعة لعميل مهتم","تنبيه المالك على واتساب","تحويل للفريق مع كامل التفاصيل"],
};
const labels = {
  en:{title:"Sahl — example",badge:"EXAMPLE",enquiries:"Enquiries answered today",reply:"Reply time",replyValue:"Seconds, not hours",hot:"Hot leads flagged",followups:"Follow-ups sent",activity:"Recent activity",now:"just now",ago:"s ago"},
  ar:{title:"سهل — مثال توضيحي",badge:"مثال",enquiries:"استفسارات تم الرد عليها اليوم",reply:"وقت الرد",replyValue:"ثوانٍ، مو ساعات",hot:"عملاء جاهزين للشراء",followups:"رسائل متابعة تم إرسالها",activity:"آخر النشاطات",now:"الآن",ago:"ث مضت"},
};

export function HeroMetrics({ locale }: { locale: Locale }) {
  const t=labels[locale], reduced=useRef(false);
  const [values,setValues]=useState({enquiries:0,hot:0,followups:0});
  const [feed,setFeed]=useState([0,1,2].map((event,i)=>({event,age:i===0?0:i===1?3:10,id:i})));
  useEffect(()=>{
    reduced.current=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduced.current){setValues(START);return;}
    const began=performance.now();
    let raf=0;
    const count=(now:number)=>{
      const p=Math.min(1,(now-began)/1500);
      const ease=1-Math.pow(1-p,3);
      setValues({enquiries:Math.round(START.enquiries*ease),hot:Math.round(START.hot*ease),followups:Math.round(START.followups*ease)});
      if(p<1) raf=requestAnimationFrame(count);
    };
    raf=requestAnimationFrame(count);
    let stopped=false, metricTimer:number;
    const tickMetric=()=>{
      metricTimer=window.setTimeout(()=>{
        setValues(v=>{
          if(v.enquiries>=CAPS.enquiries||v.hot>=CAPS.hot||v.followups>=CAPS.followups)return {...START};
          const r=Math.random();
          const key:r extends never?never:"enquiries"|"hot"|"followups" = r<.58?"enquiries":r<.88?"followups":"hot";
          return {...v,[key]:Math.min(CAPS[key],v[key]+1)};
        });
        if(!stopped)tickMetric();
      },3000+Math.random()*5000);
    };
    const startTimer=window.setTimeout(tickMetric,1600);
    let nextEvent=3;
    const feedTimer=window.setInterval(()=>{
      setFeed(old=>[{event:nextEvent++%EVENTS[locale].length,age:0,id:Date.now()},...old.slice(0,2).map((x,i)=>({...x,age:i===0?3:10}))]);
    },4000);
    return()=>{stopped=true;cancelAnimationFrame(raf);clearTimeout(startTimer);clearTimeout(metricTimer);clearInterval(feedTimer)};
  },[locale]);
  const bar=(value:number,start:number,cap:number)=>`${Math.min(100,Math.max(12,48+((value-start)/(cap-start))*42))}%`;
  const time=(age:number)=>age===0?t.now:`${age}${t.ago}`;
  return <div className="hero-metrics mx-auto w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-[0_24px_70px_rgba(14,26,20,.10)]">
    <div className="flex items-center gap-3 border-b border-line px-5 py-4 sm:px-7">
      <div className="flex gap-1.5" aria-hidden="true"><i className="size-2.5 rounded-full bg-[#ff5f57]"/><i className="size-2.5 rounded-full bg-[#febc2e]"/><i className="size-2.5 rounded-full bg-[#28c840]"/></div>
      <strong className="text-body">{t.title}</strong><span className="rounded bg-surface-sunken px-2 py-1 text-[10px] font-extrabold text-muted">{t.badge}</span>
      <span className="hero-status ms-auto size-2.5 rounded-full bg-primary-light" aria-label={locale==="ar"?"النظام يعمل":"System active"}/>
    </div>
    <div className="grid gap-px bg-line sm:grid-cols-2">
      <Metric label={t.enquiries} value={String(values.enquiries)} progress={bar(values.enquiries,START.enquiries,CAPS.enquiries)}/>
      <Metric label={t.reply} value={t.replyValue} progress="76%"/>
      <Metric label={t.hot} value={String(values.hot)} progress={bar(values.hot,START.hot,CAPS.hot)}/>
      <Metric label={t.followups} value={String(values.followups)} progress={bar(values.followups,START.followups,CAPS.followups)}/>
    </div>
    <div className="bg-surface px-5 py-4 sm:px-7">
      <p className="mb-2 text-label font-extrabold text-muted">{t.activity}</p>
      <div className="divide-y divide-line" aria-live="off">{feed.map(x=><div key={x.id} className="hero-feed flex items-center gap-3 py-2.5 text-body"><span className="size-2 shrink-0 rounded-full bg-primary-light"/><span className="font-medium">{EVENTS[locale][x.event]}</span><span className="ms-auto shrink-0 text-label text-muted">{time(x.age)}</span></div>)}</div>
    </div>
  </div>;
}
function Metric({label,value,progress}:{label:string,value:string,progress:string}){
  return <div className="bg-surface p-5 sm:p-6"><p className="text-label font-medium text-muted">{label}</p><p className="numeric mt-1 text-[clamp(1.55rem,3vw,2.35rem)] font-extrabold leading-tight">{value}</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-sunken"><div className="hero-progress h-full rounded-full bg-primary-light" style={{width:progress}}/></div></div>;
}
