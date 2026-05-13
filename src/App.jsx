import React from 'react';
import {
  ArrowRight, Upload, Wand2, Send, CheckCircle2,
  TrendingUp, DollarSign, Play, Star, Menu, X,
  Building2, Eye, Zap, ScanLine, Camera, MapPin,
  Clock, Layers, ChevronRight, Shield, Users,
} from 'lucide-react';

const CTA_URL = 'https://tally.so/r/D4A1E5';
const CTA_TEXT = 'Get Your First Tour Free';
const CTA_SUB  = 'No credit card · Setup in 2 min';

/* ─────────────────────────── Hooks ─── */
function useReveal() {
  React.useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCursor(ref) {
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const fn = e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--cx', `${e.clientX - r.left}px`);
      el.style.setProperty('--cy', `${e.clientY - r.top}px`);
    };
    el.addEventListener('mousemove', fn);
    return () => el.removeEventListener('mousemove', fn);
  }, [ref]);
}

/* ──────────────────── Marquee ─── */
const TICKS = [
  '< 10 min per tour','$750–$1,200 per property','8 photos minimum',
  '3× more inquiries','White-label ready','No equipment needed',
  'Cold email friendly','$199/mo unlimited','Zero technical skills',
  '< 10 min per tour','$750–$1,200 per property','8 photos minimum',
  '3× more inquiries','White-label ready','No equipment needed',
  'Cold email friendly','$199/mo unlimited','Zero technical skills',
];
function Marquee() {
  return (
    <div className="overflow-hidden border-y py-3" style={{ borderColor:'var(--b)' }}>
      <div className="marquee-inner">
        {TICKS.map((t, i) => (
          <span key={i} className="flex items-center gap-3 px-5 label whitespace-nowrap" style={{ color:'var(--m2)' }}>
            {t}<span className="w-1 h-1 rounded-full bg-amber-400/30 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────── Comparison Slider ─── */
function CompareSlider() {
  const [pct, setPct] = React.useState(40);
  const ref = React.useRef(null);
  const drag = React.useRef(false);

  const update = React.useCallback(cx => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    setPct(Math.min(Math.max(((cx - r.left) / r.width) * 100, 4), 96));
  }, []);

  React.useEffect(() => {
    const mv = e => drag.current && update(e.touches ? e.touches[0].clientX : e.clientX);
    const up = () => { drag.current = false; };
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', mv, { passive: true });
    window.addEventListener('touchend', up);
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); window.removeEventListener('touchmove', mv); window.removeEventListener('touchend', up); };
  }, [update]);

  return (
    <div ref={ref} onMouseDown={e=>{drag.current=true;update(e.clientX);}} onTouchStart={e=>{drag.current=true;update(e.touches[0].clientX);}}
      className="relative rounded-2xl overflow-hidden aspect-video select-none cursor-col-resize"
      style={{ border:'1px solid var(--b)' }}>

      {/* BEFORE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6" style={{ background:'linear-gradient(145deg,#08081a,#0d0d24)' }}>
        <div className="grid grid-cols-3 gap-2 mb-3 w-full max-w-xs">
          {[...Array(6)].map((_,i)=>(
            <div key={i} className="aspect-video rounded-lg flex items-center justify-center" style={{ background:'var(--s2)', border:'1px solid var(--b)' }}>
              <Camera className="w-3.5 h-3.5" style={{ color:'var(--m3)' }} />
            </div>
          ))}
        </div>
        <p className="label text-xs" style={{ color:'var(--m2)' }}>12 flat JPEGs · avg 3 sec view</p>
      </div>

      {/* AFTER */}
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
        style={{ clipPath:`inset(0 ${100-pct}% 0 0)` }}>
        <div className="absolute inset-0" style={{ background:'linear-gradient(145deg,rgba(245,166,35,0.07),rgba(100,60,220,0.14))' }} />
        <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at 50% 20%, rgba(245,166,35,0.13) 0%, transparent 60%)' }} />
        <div className="relative text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background:'rgba(245,166,35,0.15)', border:'1px solid var(--ba)' }}>
            <ScanLine className="w-6 h-6 text-amber-400" />
          </div>
          <p className="font-black text-white">Immersive 3D Tour</p>
          <p className="text-xs mt-1" style={{ color:'var(--m1)' }}>8 rooms · 360° · Interactive</p>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {['Living','Kitchen','Master','Bath','Yard'].map((r,i)=>(
            <span key={i} className="text-xs px-2 py-0.5 rounded-full" style={{ background:'rgba(0,0,0,0.7)', color:i===0?'#f5a623':'var(--m2)', border:i===0?'1px solid var(--ba)':'none' }}>{r}</span>
          ))}
        </div>
      </div>

      {/* Handle */}
      <div className="absolute top-0 bottom-0 w-px" style={{ left:`${pct}%`, background:'rgba(245,166,35,0.65)', zIndex:10 }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background:'#f5a623', boxShadow:'0 0 0 4px rgba(245,166,35,0.25),0 4px 20px rgba(0,0,0,0.6)', cursor:'col-resize' }}>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M5 1L1 5l4 4M9 1l4 4-4 4" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>

      <div className="absolute top-3 left-3 label px-2.5 py-1 rounded-full text-xs" style={{ background:'rgba(0,0,0,0.75)', color:'var(--m2)' }}>BEFORE</div>
      <div className="absolute top-3 label px-2.5 py-1 rounded-full text-xs" style={{ left:`${Math.min(pct+2,65)}%`, background:'#f5a623', color:'#000' }}>AFTER</div>
    </div>
  );
}

/* ──────────────────── Tour Mockup ─── */
const ROOMS = ['Living Room','Kitchen','Master Bedroom','Bathroom','Backyard'];
function TourMockup() {
  const [room, setRoom] = React.useState(0);
  const [scanning, setScanning] = React.useState(false);

  React.useEffect(()=>{
    const t = setInterval(()=>{
      setScanning(true);
      setTimeout(()=>{ setRoom(r=>(r+1)%ROOMS.length); setScanning(false); }, 550);
    }, 2700);
    return ()=>clearInterval(t);
  },[]);

  return (
    <div className="relative w-full max-w-[420px] ml-auto float">
      <div className="absolute -inset-8 rounded-3xl pointer-events-none opacity-25"
        style={{ background:'radial-gradient(ellipse,rgba(245,166,35,0.3) 0%,transparent 70%)', filter:'blur(24px)' }} />

      <div className="relative rounded-2xl overflow-hidden card-glow" style={{ background:'var(--s1)' }}>
        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor:'var(--b)' }}>
          <div className="flex gap-1.5">
            {['rgba(255,96,96,0.5)','rgba(255,200,50,0.5)','rgba(80,200,80,0.5)'].map((c,i)=>(
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background:c }} />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="pulse w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            <span className="label text-xs" style={{ color:'var(--m1)' }}>Nema · Live Tour</span>
          </div>
          <div className="label text-xs px-2 py-0.5 rounded" style={{ background:'var(--s2)', color:'var(--m2)' }}>SHARE</div>
        </div>

        {/* Viewport */}
        <div className="aspect-video relative overflow-hidden" style={{ background:'linear-gradient(145deg,#0c0c20,#14102c)' }}>
          <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at 40% 35%,rgba(245,166,35,0.1) 0%,transparent 65%)' }} />
          {scanning && <div className="scan-line" />}

          {/* Room label */}
          <div key={room} className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold glass">
            <MapPin className="w-3 h-3 text-amber-400" />{ROOMS[room]}
          </div>

          {/* Mini floor plan */}
          <div className="absolute bottom-3 right-3 w-20 h-14 rounded-lg overflow-hidden" style={{ background:'rgba(0,0,0,0.65)', border:'1px solid var(--ba)', backdropFilter:'blur(8px)' }}>
            <div className="absolute inset-1 opacity-50">
              <svg viewBox="0 0 80 56" fill="none" className="w-full h-full">
                <rect x="4" y="4" width="72" height="48" stroke="#f5a623" strokeWidth="0.8" rx="1"/>
                <line x1="4" y1="28" x2="40" y2="28" stroke="#f5a623" strokeWidth="0.5"/>
                <line x1="40" y1="4" x2="40" y2="52" stroke="#f5a623" strokeWidth="0.5"/>
                <line x1="40" y1="36" x2="76" y2="36" stroke="#f5a623" strokeWidth="0.5"/>
                <circle cx={[14,54,60,14,60][room]} cy={[16,16,44,40,44][room]} r="3.5" fill="#f5a623"/>
              </svg>
            </div>
          </div>

          {/* Room dots */}
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {ROOMS.map((_,i)=>(
              <button key={i} onClick={()=>setRoom(i)} className="rounded-full transition-all duration-300"
                style={{ width:i===room?18:6, height:6, background:i===room?'#f5a623':'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3" style={{ borderTop:'1px solid var(--b)' }}>
          {[{i:<Layers className="w-3.5 h-3.5"/>,v:`${room+1}/5`,l:'Rooms'},{i:<Eye className="w-3.5 h-3.5"/>,v:'360°',l:'View'},{i:<Clock className="w-3.5 h-3.5"/>,v:'9 min',l:'Built'}].map((s,idx)=>(
            <div key={idx} className="flex items-center gap-2 px-4 py-3 border-r last:border-r-0" style={{ borderColor:'var(--b)' }}>
              <span style={{ color:'var(--m3)' }}>{s.i}</span>
              <div><p className="text-xs font-black leading-none">{s.v}</p><p className="text-xs leading-none mt-0.5" style={{ color:'var(--m2)' }}>{s.l}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating price badge */}
      <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl border shadow-2xl"
        style={{ background:'var(--s2)', borderColor:'var(--ba)', boxShadow:'0 20px 60px rgba(0,0,0,0.7)' }}>
        <p className="text-sm font-black"><span className="gold-text">$1,000</span> invoiced</p>
        <p className="text-xs mt-0.5" style={{ color:'var(--m2)' }}>per property · keep 100%</p>
      </div>
    </div>
  );
}

/* ──────────────────── Revenue Calc ─── */
function RevenueCalc() {
  const [clients, setClients] = React.useState(5);
  const [rate, setRate] = React.useState(950);
  const monthly = clients * rate;

  return (
    <div className="rounded-2xl p-7 border" style={{ background:'var(--s1)', borderColor:'var(--b)' }}>
      <p className="label text-xs mb-6" style={{ color:'var(--m2)' }}>Revenue Calculator</p>
      {[
        { label:'Clients / month', min:1, max:20, step:1, val:clients, set:setClients, fmt:v=>v },
        { label:'Rate per property', min:500, max:2000, step:50, val:rate, set:setRate, fmt:v=>`$${v.toLocaleString()}` },
      ].map((s,i)=>(
        <div key={i} className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color:'var(--m1)' }}>{s.label}</span>
            <span className="font-black">{s.fmt(s.val)}</span>
          </div>
          <div className="relative h-1.5 rounded-full" style={{ background:'var(--s3)' }}>
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ background:'var(--gold)', width:`${((s.val-s.min)/(s.max-s.min))*100}%` }} />
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={e=>s.set(+e.target.value)} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
          </div>
        </div>
      ))}
      <div className="rounded-xl p-5 mb-4" style={{ background:'var(--s2)', border:'1px solid var(--b)' }}>
        <p className="label text-xs mb-1" style={{ color:'var(--m2)' }}>Monthly Revenue</p>
        <p key={monthly} className="text-4xl font-black gold-text num-pop">${monthly.toLocaleString()}</p>
        <p className="text-xs mt-1.5" style={{ color:'var(--m2)' }}>After $199/mo Nema Pro = <strong className="text-white">${(monthly-199).toLocaleString()}</strong> profit</p>
      </div>
      <a href={CTA_URL} className="block w-full py-3 text-center rounded-xl font-bold text-sm bg-amber-400 text-black hover:bg-amber-300 transition-colors">
        {CTA_TEXT}
      </a>
    </div>
  );
}

/* ──────────────────── Competitor Comparison ─── */
function CompareTable() {
  const rows = [
    { f:'Setup time',           nema:'< 10 min',    mat:'1–2 days',      pro:'Photographer visit' },
    { f:'Cost per property',    nema:'$49',          mat:'$1,500–$3,000', pro:'$400–$800' },
    { f:'Equipment needed',     nema:'None',         mat:'$3,000 camera', pro:'DSLR + software' },
    { f:'Turnaround',           nema:'Under 1 hr',   mat:'48–72 hrs',     pro:'24–48 hrs' },
    { f:'White-label',          nema:'✓ Included',   mat:'✗ No',          pro:'✗ Paid add-on' },
    { f:'Sell as a service',    nema:'✓ Built for it',mat:'✗ No',         pro:'✗ No' },
  ];
  return (
    <div className="overflow-x-auto rounded-2xl border" style={{ borderColor:'var(--b)' }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background:'var(--s2)', borderBottom:'1px solid var(--b)' }}>
            <th className="text-left px-5 py-4 label" style={{ color:'var(--m2)' }}>Feature</th>
            <th className="px-5 py-4 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full label" style={{ background:'rgba(245,166,35,0.12)', color:'var(--gold)', border:'1px solid var(--ba)' }}>
                <Building2 className="w-3 h-3" /> Nema
              </span>
            </th>
            <th className="px-5 py-4 text-center label" style={{ color:'var(--m2)' }}>Matterport</th>
            <th className="px-5 py-4 text-center label" style={{ color:'var(--m2)' }}>Photography</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} style={{ borderBottom:'1px solid var(--b)', background:i%2===0?'var(--s1)':'transparent' }}>
              <td className="px-5 py-4 font-medium" style={{ color:'var(--m1)' }}>{r.f}</td>
              <td className="px-5 py-4 text-center font-bold text-amber-400">{r.nema}</td>
              <td className="px-5 py-4 text-center" style={{ color:'var(--m2)' }}>{r.mat}</td>
              <td className="px-5 py-4 text-center" style={{ color:'var(--m2)' }}>{r.pro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ──────────────────── Primary CTA Button ─── */
function PrimaryBtn({ size = 'md' }) {
  const cls = size === 'lg'
    ? 'px-9 py-5 text-lg rounded-2xl gap-2.5'
    : 'px-6 py-3.5 text-sm rounded-xl gap-2';
  return (
    <a href={CTA_URL} className={`inline-flex items-center font-black bg-amber-400 text-black hover:bg-amber-300 transition-colors btn-glow ${cls}`}>
      {CTA_TEXT} <ArrowRight className={size==='lg'?'w-5 h-5':'w-4 h-4'} />
    </a>
  );
}

/* ═══════════════════════════════════════ APP ═══ */
export default function App() {
  const [open, setOpen] = React.useState(false);
  const heroRef = React.useRef(null);
  useReveal();
  useCursor(heroRef);

  const steps = [
    { icon:<Upload className="w-5 h-5"/>, n:'01', title:'Upload Listing Photos',
      body:'Drop in any standard property images — MLS exports, phone shots, whatever the agent has. Minimum 8 photos. No special equipment required.' },
    { icon:<Wand2 className="w-5 h-5"/>, n:'02', title:'AI Builds the Tour',
      body:"Nema reads room geometry, lighting, and spatial context to produce a fully guided 3D walkthrough in under 10 minutes." },
    { icon:<Send className="w-5 h-5"/>, n:'03', title:'Deliver & Invoice',
      body:'Send the agent a shareable link. They embed it in their listing. You invoice $750–$1,200. Repeat across your city.' },
  ];

  const testimonials = [
    { q:'"Sent 12 cold emails on Monday. By Friday I had 3 clients at $900 each. Nema is genuinely insane."', who:'Early beta user · Dubai', stars:5 },
    { q:'"Made $4,200 in my first two weeks. Agents were already searching for something exactly like this."', who:'Creator · London', stars:5 },
    { q:'"The white-label feature means agents think I built this myself. That\'s worth the subscription alone."', who:'Side-hustler · Toronto', stars:5 },
  ];

  return (
    <div style={{ background:'var(--bg)', color:'var(--t)' }} className="min-h-screen overflow-x-hidden">

      {/* ─ Nav ─ */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b backdrop-blur-2xl" style={{ borderColor:'var(--b)', background:'rgba(4,4,12,0.8)' }}>
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-black">nema</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color:'var(--m2)' }}>
            {[['#compare','vs. Alternatives'],['#how','Process'],['#business','Opportunity'],['#pricing','Pricing']].map(([h,l])=>(
              <a key={h} href={h} className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={CTA_URL} className="text-sm font-semibold px-4 py-2 rounded-lg hover:text-white transition-colors" style={{ color:'var(--m2)' }}>Log in</a>
            <PrimaryBtn />
          </div>

          <button className="md:hidden p-1.5" style={{ color:'var(--m1)' }} onClick={()=>setOpen(o=>!o)}>
            {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>

        {open && (
          <div className="md:hidden px-5 py-5 border-t flex flex-col gap-4 text-sm font-medium" style={{ borderColor:'var(--b)', background:'var(--s1)' }}>
            {[['#compare','vs. Alternatives'],['#how','Process'],['#business','Opportunity'],['#pricing','Pricing']].map(([h,l])=>(
              <a key={h} href={h} onClick={()=>setOpen(false)} style={{ color:'var(--m1)' }}>{l}</a>
            ))}
            <a href={CTA_URL} className="mt-2 py-3 text-center rounded-xl bg-amber-400 text-black font-black">{CTA_TEXT}</a>
          </div>
        )}
      </nav>

      {/* ─ Hero ─ */}
      <section ref={heroRef} className="cursor-glow relative overflow-hidden pt-28 pb-16 px-5 md:pt-40 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] opacity-20"
            style={{ background:'radial-gradient(ellipse,rgba(245,166,35,0.35) 0%,transparent 65%)', filter:'blur(90px)' }} />
        </div>

        <div className="max-w-7xl mx-auto relative grid md:grid-cols-2 gap-12 md:gap-6 items-center">
          {/* Left col */}
          <div>
            {/* Trust badge — ABOVE fold, research-backed */}
            <div data-reveal className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border mb-6"
              style={{ background:'rgba(245,166,35,0.07)', borderColor:'rgba(245,166,35,0.25)', color:'var(--gold)' }}>
              <span className="pulse w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              50+ creators already earning with Nema
            </div>

            <h1 data-reveal data-d="1" className="display mb-5">
              Turn 8 photos into<br />
              <span className="gold-text">$1,000.</span>
            </h1>

            <p data-reveal data-d="2" className="text-lg leading-relaxed mb-8 max-w-md" style={{ color:'var(--m1)' }}>
              Nema generates immersive 3D property tours from standard listing photos in under 10 minutes. Sell to real estate agents. Keep all the profit.
            </p>

            {/* Single primary CTA — research says ONE CTA */}
            <div data-reveal data-d="3" className="mb-8">
              <PrimaryBtn size="lg" />
              <p className="text-xs mt-3" style={{ color:'var(--m2)' }}>{CTA_SUB}</p>
            </div>

            {/* Social proof — specific numbers, above fold */}
            <div data-reveal data-d="4" className="flex items-center gap-4 p-4 rounded-xl border" style={{ background:'var(--s1)', borderColor:'var(--b)' }}>
              <div className="flex -space-x-2 shrink-0">
                {['#f5a623','#a78bfa','#34d399','#60a5fa','#f87171'].map((c,i)=>(
                  <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black"
                    style={{ background:c, borderColor:'var(--bg)', color:'#000' }}>
                    {['M','K','A','R','J'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">{[...Array(5)].map((_,i)=><Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400"/>)}</div>
                <p className="text-xs" style={{ color:'var(--m1)' }}><strong className="text-white">$47,200</strong> earned by beta users in the first month</p>
              </div>
            </div>
          </div>

          {/* Right col */}
          <div data-reveal data-d="2">
            <TourMockup />
          </div>
        </div>
      </section>

      {/* ─ Marquee ─ */}
      <Marquee />

      {/* ─ Stats ─ */}
      <section className="py-14 px-5 border-b" style={{ borderColor:'var(--b)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v:'$1,000',  l:'avg. per property sold' },
            { v:'9 min',   l:'to generate a full tour' },
            { v:'3×',      l:'more listing inquiries' },
            { v:'$2,500',  l:'saved vs. Matterport' },
          ].map((s,i)=>(
            <div key={i} data-reveal data-d={String(i)}>
              <p className="text-3xl md:text-4xl font-black text-white mb-1">{s.v}</p>
              <p className="text-sm" style={{ color:'var(--m2)' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─ Comparison slider ─ */}
      <section className="py-20 px-5" style={{ background:'var(--s1)', borderBottom:'1px solid var(--b)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8" data-reveal>
            <p className="label text-xs mb-2" style={{ color:'var(--m2)' }}>Drag to see the difference</p>
            <h2 className="h2">Flat photo vs. Nema tour.</h2>
          </div>
          <div data-reveal data-d="1"><CompareSlider /></div>
        </div>
      </section>

      {/* ─ vs. Alternatives ─ */}
      <section id="compare" className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12" data-reveal>
            <p className="label text-xs mb-3" style={{ color:'var(--m2)' }}>vs. Alternatives</p>
            <h2 className="h1 mb-3">Matterport charges $2,500.<br /><span className="gold-text">Nema charges $49.</span></h2>
            <p style={{ color:'var(--m1)' }}>Same immersive result. No equipment. No scheduling. No waiting.</p>
          </div>
          <div data-reveal data-d="1"><CompareTable /></div>
        </div>
      </section>

      {/* ─ How it works ─ */}
      <section id="how" className="py-24 px-5 border-y" style={{ borderColor:'var(--b)', background:'var(--s1)' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div data-reveal>
            <p className="label text-xs mb-4" style={{ color:'var(--m2)' }}>How It Works</p>
            <h2 className="h1 mb-4">Photos in. <span className="gold-text">$1,000 out.</span></h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color:'var(--m1)' }}>Three steps. Under 10 minutes. No technical skills.</p>
            <PrimaryBtn />
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-10 w-px" style={{ background:'linear-gradient(to bottom,var(--ba),transparent)' }} />
            <div className="space-y-10">
              {steps.map((s,i)=>(
                <div key={i} data-reveal data-d={String(i+1)} className="flex gap-6 pl-14 relative">
                  <div className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center border"
                    style={{ background:i===0?'var(--gold)':'var(--s2)', color:i===0?'#000':'var(--m1)', borderColor:'var(--ba)' }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="label text-xs mb-2" style={{ color:'var(--m2)' }}>{s.n}</p>
                    <h3 className="h2 mb-2">{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color:'var(--m1)' }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─ Business opportunity ─ */}
      <section id="business" className="py-24 px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div data-reveal>
            <p className="label text-xs mb-4" style={{ color:'var(--m2)' }}>The Opportunity</p>
            <h2 className="h1 mb-4">
              Cold email agents.<br />
              <span className="gold-text">Charge $1,000.</span><br />
              Keep everything.
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color:'var(--m1)' }}>
              Agents spend $5k–$15k/month on marketing. A virtual tour that closes deals faster is an easy yes — you produce it in minutes.
            </p>
            <ul className="space-y-3 mb-9">
              {[
                'Zero equipment — works from any existing photos',
                '5 clients/month = $5,000+ in revenue',
                'White-label — looks like your own product',
                'Cold email templates included in Pro',
                'Agents see 3× more inquiries on immersive listings',
              ].map((p,i)=>(
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color:'var(--m1)' }}>
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />{p}
                </li>
              ))}
            </ul>

            {/* Testimonials — specific, researched placement */}
            <div className="space-y-4">
              {testimonials.map((t,i)=>(
                <div key={i} data-reveal data-d={String(i+1)} className="rounded-xl p-5 border lift"
                  style={{ background:'var(--s1)', borderColor:'var(--b)' }}>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(t.stars)].map((_,j)=><Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400"/>)}
                  </div>
                  <p className="text-sm leading-relaxed mb-2" style={{ color:'var(--m1)' }}>{t.q}</p>
                  <p className="label text-xs" style={{ color:'var(--m2)' }}>{t.who}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal data-d="1">
            <RevenueCalc />
          </div>
        </div>
      </section>

      {/* ─ Pricing ─ */}
      <section id="pricing" className="py-24 px-5 border-y" style={{ borderColor:'var(--b)', background:'var(--s1)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-14" data-reveal>
            <p className="label text-xs mb-3" style={{ color:'var(--m2)' }}>Pricing</p>
            <h2 className="h1 mb-3">One client pays your subscription.<br /><span className="gold-text">Every other client is pure profit.</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name:'Pay-as-you-go', sub:'Try it out',
                price:'$49', per:'/property', highlight:false,
                features:['5 photos minimum','Standard 3D tour','Shareable link','48 hr delivery'],
                cta:'Start Free',
              },
              {
                name:'Pro', sub:'For active resellers',
                price:'$199', per:'/mo', highlight:true,
                features:['Unlimited properties','Premium guided tours','White-label branding','Priority processing','Cold email templates','Analytics dashboard'],
                cta: CTA_TEXT,
              },
              {
                name:'Agency', sub:'For teams',
                price:'$499', per:'/mo', highlight:false,
                features:['Everything in Pro','5 team seats','API access','Custom domain','Dedicated account manager'],
                cta:'Contact Us',
              },
            ].map((p,i)=>(
              <div key={i} data-reveal data-d={String(i+1)}
                className="rounded-2xl border p-7 flex flex-col lift relative"
                style={{ background:p.highlight?'linear-gradient(145deg,rgba(245,166,35,0.06),var(--s2))':'var(--s2)', borderColor:p.highlight?'var(--gold)':'var(--b)', boxShadow:p.highlight?'0 0 0 1px rgba(245,166,35,0.12),0 30px 70px rgba(245,166,35,0.07)':'none' }}>
                {p.highlight && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-black label px-3 py-0.5 rounded-full">Most Popular</div>}
                <div className="mb-5">
                  <p className="text-base font-black">{p.name}</p>
                  <p className="text-xs mt-0.5" style={{ color:'var(--m2)' }}>{p.sub}</p>
                </div>
                <div className="mb-6">
                  <span className={`text-4xl font-black ${p.highlight?'gold-text':'text-white'}`}>{p.price}</span>
                  <span className="text-sm ml-1" style={{ color:'var(--m2)' }}>{p.per}</span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f,j)=>(
                    <li key={j} className="flex items-center gap-2.5 text-sm" style={{ color:p.highlight?'var(--m1)':'var(--m2)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color:p.highlight?'var(--gold)':'var(--m3)' }} />{f}
                    </li>
                  ))}
                </ul>
                <a href={CTA_URL} className="block w-full py-3 text-center rounded-xl font-bold text-sm transition-colors"
                  style={p.highlight?{ background:'var(--gold)', color:'#000' }:{ border:'1px solid var(--b)', color:'var(--m1)' }}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─ Final CTA ─ */}
      <section className="py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="relative rounded-3xl overflow-hidden border px-8 py-20 md:py-28 text-center"
            style={{ borderColor:'var(--ba)', background:'var(--s1)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% -10%,rgba(245,166,35,0.12) 0%,transparent 60%)' }} />
            <div className="absolute inset-0 pointer-events-none opacity-15"
              style={{ backgroundImage:'linear-gradient(var(--b) 1px,transparent 1px),linear-gradient(90deg,var(--b) 1px,transparent 1px)', backgroundSize:'56px 56px' }} />
            <div className="relative">
              <p data-reveal className="label text-xs mb-5" style={{ color:'var(--m2)' }}>Limited Early Access</p>
              <h2 data-reveal data-d="1" className="display mb-5">
                The real estate industry<br />
                <span className="gold-text">is ready to be disrupted.</span>
              </h2>
              <p data-reveal data-d="2" className="text-lg max-w-lg mx-auto mb-9" style={{ color:'var(--m1)' }}>
                Be the person in your market who offers what every agent wants but can't afford. Limited to 50 early users.
              </p>
              <div data-reveal data-d="3">
                <PrimaryBtn size="lg" />
                <p className="text-xs mt-3" style={{ color:'var(--m2)' }}>{CTA_SUB}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─ Footer ─ */}
      <footer className="border-t py-10 px-5" style={{ borderColor:'var(--b)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="font-black">nema</span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color:'var(--m2)' }}>
            <a href="https://instagram.com/nema.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://tiktok.com/@nemamarketing.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
            <a href={CTA_URL} className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs" style={{ color:'var(--m3)' }}>© 2025 Nema. All rights reserved.</p>
        </div>
      </footer>

      {/* ─ Sticky mobile CTA — research: 50%+ traffic is mobile ─ */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-4 border-t" style={{ borderColor:'var(--b)', background:'rgba(4,4,12,0.95)', backdropFilter:'blur(20px)' }}>
        <a href={CTA_URL} className="block w-full py-4 text-center rounded-xl font-black text-base bg-amber-400 text-black btn-glow">
          {CTA_TEXT} →
        </a>
        <p className="text-center text-xs mt-2" style={{ color:'var(--m2)' }}>{CTA_SUB}</p>
      </div>

    </div>
  );
}
