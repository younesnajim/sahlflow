import type { SiteCopy } from "./types";

export const en: SiteCopy = {
  locale: "en", dir: "ltr",
  meta: { title: "Sahl — a done-for-you WhatsApp sales system", description: "Turn WhatsApp conversations into qualified sales opportunities. We build, connect, test and run the system for you." },
  nav: {
    links: [{href:"#system",label:"How it works"},{href:"#capabilities",label:"Capabilities"},{href:"#crm",label:"CRM & automation"},{href:"#fit",label:"Is it a fit?"}],
    cta:{label:"Try Sahl",source:"nav"}, switchTo:{href:"/ar",label:"العربية",hrefLang:"ar"}, skipToContent:"Skip to content"
  },
  hero:{
    h1:"Slow replies, missed follow-ups and misunderstood enquiries are costing you clients.",
    sub:"Sahl turns WhatsApp enquiries into a structured sales process: it understands the customer, qualifies them, records the data, and follows up or hands them to your team.",
    cta:{label:"Try Sahl for your business",source:"hero"},
    trust:["Done for you","Built for Arabic","Ongoing management & improvement"]
  },
  video:{eyebrow:"From message to opportunity",title:"A fast reply is only the beginning",placeholder:"7 connected stages move a customer from an inbound message to structured data, a sales opportunity and managed follow-up."},
  problem:{title:"The problem isn't only response speed",lines:["A lead gets a reply — but nobody determines whether they're serious.","The chat ends — and the customer's context and intent disappear with it.","They don't buy today — and there is no structured follow-up to bring them back."]},
  whatYouGet:{
    eyebrow:"A sales system, not just a bot",title:"We do the work — we don't hand you a tool",
    intro:"We don't give you a dashboard and leave you to build everything. We learn how your company sells and configure the system around that journey.",
    items:["Connect WhatsApp and configure the agent around your services, prices and rules.","Build qualification questions, fields and tags for your business.","Organize contacts, opportunities and pipeline stages so your team knows what is happening.","Build follow-up and human handoff, then test the journey before launch.","Understand Arabic voice notes and feed them into the same customer journey.","Monitor, update and improve the existing system after launch."],
    closer:"You explain how you sell. We turn it into a working system for your team."
  },
  howItWorks:{
    eyebrow:"Implementation",title:"From understanding your business to a working system",
    steps:[
      {day:"1",title:"Map the sales journey",body:"We review your services, FAQs, qualification process, team and human handoff points."},
      {day:"2",title:"Build the system",body:"We configure knowledge, agent behavior, fields, qualification, pipeline and follow-up for your business.",highlight:true},
      {day:"3",title:"Connect and test",body:"We test real scenarios and tune responses and handoffs before customers use it."},
      {day:"4",title:"Run and improve",body:"After launch we monitor the system, update knowledge and improve the existing sales journey."}
    ],
    guarantee:"You don't need to learn another system to get started — we implement it with you.",
    cta:{label:"Discuss your business",source:"how-it-works"}
  },
  costs:{eyebrow:"External costs",title:"WhatsApp and third-party fees are separate",disclaimer:"Meta or other provider fees may apply depending on usage. We keep those costs separate from Sahl implementation and management.",columns:{category:"Service",perMessage:"Fee",aed:"Note"},rows:[],freeTier:"",freeLabel:"",footnote:"We explain any applicable external costs before launch."},
  pricing:{
    eyebrow:"Investment",headline:"AED 6,500 implementation & launch + AED 2,000/month",
    founderLabel:"A system built for your business — not a software subscription",
    standard:"One-time implementation, followed by ongoing operation, management and improvement.",
    includedTitle:"Implementation & launch includes",
    included:["WhatsApp connection and workspace setup","Agent behavior and knowledge base","Qualification logic, fields and tags","Contacts, pipeline and opportunities","Follow-up and human handoff","Testing, tuning, training and launch"],
    passthrough:"Meta and applicable third-party fees are separate. New integrations or automation projects outside the agreed scope are quoted separately.",
    lockIn:"Improving the existing system is part of monthly management; a new system or integration is separately scoped.",
    cta:{label:"Try Sahl for your business",source:"pricing"}
  },
  faq:{
    eyebrow:"FAQ",title:"Before we start",
    items:[
      {q:"Is Sahl just a WhatsApp reply bot?",a:"No. Replying is one part. The goal is to turn a conversation into structured data, qualification, a sales opportunity, follow-up and human handoff when needed."},
      {q:"Do I need to learn AI and automation setup?",a:"No. That is the point of the service: we design, connect, test and implement the system for you, then manage and improve it."},
      {q:"Do I own my business data?",a:"Yes. Your business data remains yours and your company's data is isolated from other accounts. We explain the applicable access and export process during implementation."},
      {q:"Does it understand Arabic and voice notes?",a:"It is built for Arabic and can transcribe Arabic voice notes so they enter the same understanding, qualification and automation journey."},
      {q:"What does the AED 2,000 monthly fee cover?",a:"Operation, monitoring, support, knowledge updates and improvements to the existing replies, qualification and follow-up. New systems or integrations are scoped separately."},
      {q:"Can you build automation outside WhatsApp?",a:"Yes. Custom Automation covers projects that connect systems, APIs, databases or multi-stage internal workflows and is priced by scope."}
    ]
  },
  finalCta:{line:"Every customer message can be an opportunity. The key is not losing it between reply and follow-up.",cta:{label:"Discuss your system",source:"final-cta"}},
  footer:{
    tagline:"A done-for-you WhatsApp sales system.",
    links:[{href:"#system",label:"How it works"},{href:"#capabilities",label:"Capabilities"},{href:"#crm",label:"CRM & automation"},{href:"#pricing",label:"Pricing"}],
    whatsappLabel:"Have a question? WhatsApp",legal:"WhatsApp is a trademark of Meta. Sahl is not affiliated with Meta.",rights:"All rights reserved."
  },
  demo:{
    badge:"Demo",title:"See how Sahl handles a real customer conversation",sub:"Write as a customer and see how Sahl understands the enquiry, answers questions, qualifies the lead, and moves the conversation forward.",
    tabs:[{id:"clinic",label:"Clinic"},{id:"brokerage",label:"Real estate"}],placeholder:"Type your message…",send:"Send",thinking:"Typing…",
    limitTitle:"Want this journey for your business?",limitCta:{label:"Talk to us",source:"demo-limit"},error:"Couldn't reply just now. Try again shortly or contact us directly.",remaining:"Messages left in this demo: {n}",leadCardTitle:"What your sales team receives",languageNote:"Note: The clinic name, services, prices, property projects, availability and appointment details in this demo are fictional and provided for demonstration purposes only.",
    opener:{clinic:"Hi, this is Sahl. How can I help you today?",brokerage: "Hi, this is the Marfa Properties assistant 🌿 How can I help you today?"}
  }
};
export default en;
