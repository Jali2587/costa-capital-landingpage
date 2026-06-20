import React, { useState, useRef, useEffect } from 'react';
import {
  Building2, MessageSquare, Calculator, ChevronRight,
  Check, X, Star, Quote, MapPin, Globe, ArrowLeft,
  TrendingUp, Zap, Shield
} from 'lucide-react';

export default function CostaCapitalApp() {
  const [language, setLanguage] = useState('nl');
  const [chatOpen, setChatOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [structuredResult, setStructuredResult] = useState(null);
  const chatEndRef = useRef(null);

  const [loanAmount, setLoanAmount] = useState(1000000);
  const [projectValue, setProjectValue] = useState(1500000);
  const [term, setTerm] = useState(24);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  // ── TRANSLATIONS ─────────────────────────────────────────────
  const t = {
    nl: {
      nav: { contact: 'Contact', backLabel: 'Terug naar hoofdsite' },
      hero: {
        badge: 'Gespecialiseerd in Spaanse Kustgebieden',
        title: 'Vastgoedfinanciering\nSpaanse Costas',
        subtitle: 'Expert in Costa del Sol, Costa Blanca, Valencia en Ibiza. Financiering voor internationale investeerders en lokale ontwikkelaars. Van €350K tot €50M+.',
        cta1: 'Analyseer uw project',
        cta2: 'Bereken Financiering',
        location: 'Gevestigd in Valencia, Spanje'
      },
      stats: [
        { value: '€300M+', label: 'Gefaciliteerd' },
        { value: '100+', label: 'Transacties' },
        { value: '80+', label: 'Lender Partners' },
        { value: '48u', label: 'Eerste Reactie' }
      ],
      features: {
        title: 'Waarom Costa Capital?',
        items: [
          { icon: MapPin, title: 'Lokale Expertise', desc: 'Kantoor in Valencia met diepgaande kennis van de hele Spaanse kust: Costa del Sol, Costa Blanca (Dénia, Jávea, Moraira), Valencia en Ibiza.' },
          { icon: Globe, title: 'Internationale Structuren', desc: 'Ervaring met cross-border deals: Nederlandse BV, Belgische NV, Britse Ltd boven Spaanse SL. Drietalig team.' },
          { icon: TrendingUp, title: 'Tot 80% LTC', desc: 'Via geselecteerde specialist lenders: tot 80% LTC voor development projecten en tot 65% LTV voor acquisities. Per geval beoordeeld.' }
        ]
      },
      markets: {
        title: 'Onze Specialisaties',
        subtitle: 'Van Costa del Sol tot Ibiza',
        items: [
          { icon: '🏖️', title: 'Residentieel & Luxe', desc: "Villa's, appartementen en resort ontwikkelingen. LTV tot 70% voor sterke locaties op Costa del Sol en Costa Blanca." },
          { icon: '🏨', title: 'Hospitality & Toerisme', desc: 'Hotels, boutique properties en short-stay complexen. Kennis van Spaanse toerismelicenties en regelgeving per gemeente.' },
          { icon: '🏗️', title: 'Development Finance', desc: 'Grond + bouw gecombineerd tot 80% LTC via senior + mezzanine structuren. Ontwikkelervaring aanwezig in het team.' }
        ]
      },
      ai: {
        badge: 'AI Financieringstool',
        title: 'Configureer uw project',
        subtitle: 'Beschrijf uw project en ontvang direct een indicatieve financieringsanalyse met concrete opties.',
        cta: 'Start Projectanalyse →'
      },
      social: {
        title: 'Waarom internationale investeerders ons kiezen',
        benefits: [
          'Begeleiding bij NIE aanvraag en Spaanse bankrekening',
          'Netwerk van betrouwbare lokale advocaten en notarissen',
          'Ontwikkelervaring in het team — wij spreken uw taal',
          'Off-market kansen via ons principaalnetwerk',
          'Fiscale structurering via Nederlandse en Spaanse partners',
          'Indicatieve voorwaarden binnen 48 uur'
        ]
      },
      cta: {
        title: 'Klaar voor uw Spaanse vastgoedproject?',
        subtitle: 'Analyseer uw project met onze AI-tool of neem direct contact op',
        btn1: 'Start Analyse', btn2: 'Plan Meeting'
      },
      footer: {
        desc: 'Specialist in vastgoedfinanciering voor internationale investeerders en lokale ontwikkelaars in Spanje.',
        contact: 'Contact', location: 'Locatie',
        valencia: 'Valencia, Spanje (Hoofdkantoor)',
        denia: 'Dénia, Costa Blanca',
        rights: '© 2025 Costa Capital. Alle rechten voorbehouden.'
      },
      chat: {
        title: 'AI Financieringsadviseur',
        subtitle: 'Beschrijf uw project — ontvang een gestructureerde financieringsanalyse',
        placeholder: 'Beschrijf uw project...',
        empty: 'Vertel mij over uw project in Spanje',
        emptyDesc: 'Type, locatie, projectwaarde en gewenste financiering — dan analyseer ik direct de opties.',
        suggestions: [
          'Villa ontwikkeling van 6 stuks in Jávea, grondwaarde €1.2M, bouwkosten €3M, zoek 75% LTC',
          'Bridge loan voor boutique hotel Marbella €2.8M, waarde €4.5M, snel closing gewenst',
          'Refinanciering luxe villa Ibiza €1.8M huidige lening, marktwaarde €3.2M'
        ],
        optionsTitle: 'Financieringsopties voor uw project',
        recommendTitle: 'Aanbeveling',
        nextStepTitle: 'Volgende stap',
        newAnalysis: 'Nieuw project analyseren',
        ltv: 'LTV/LTC', rate: 'Rente', term: 'Looptijd', amount: 'Leenbedrag'
      },
      calc: {
        title: 'Snelle Calculator',
        subtitle: 'Indicatieve berekening voor uw project',
        loanAmount: 'Leenbedrag', projectValue: 'Projectwaarde', term: 'Looptijd',
        months: 'maanden', ltv: 'Loan-to-Value (LTV)',
        monthly: 'Indicatieve maandlast', total: 'Totale rente (indicatief)',
        note: '✓ Indicatief op basis van 9.6% p.a. Voor exacte voorwaarden: 48u analyse via de AI-tool.',
        discuss: 'Analyseer via AI →'
      }
    },
    en: {
      nav: { contact: 'Contact', backLabel: 'Back to main site' },
      hero: {
        badge: 'Specialized in Spanish Coastal Areas',
        title: 'Real Estate Finance\nSpanish Costas',
        subtitle: 'Expert in Costa del Sol, Costa Blanca, Valencia and Ibiza. Financing for international investors and local developers. From €350K to €50M+.',
        cta1: 'Analyse your project',
        cta2: 'Calculate Financing',
        location: 'Based in Valencia, Spain'
      },
      stats: [
        { value: '€300M+', label: 'Facilitated' },
        { value: '100+', label: 'Transactions' },
        { value: '80+', label: 'Lending Partners' },
        { value: '48h', label: 'First Response' }
      ],
      features: {
        title: 'Why Costa Capital?',
        items: [
          { icon: MapPin, title: 'Local Expertise', desc: 'Valencia office with deep knowledge of the entire Spanish coast: Costa del Sol, Costa Blanca (Dénia, Jávea, Moraira), Valencia and Ibiza.' },
          { icon: Globe, title: 'International Structures', desc: 'Experience with cross-border deals: Dutch BV, Belgian NV, UK Ltd above Spanish SL. Trilingual team.' },
          { icon: TrendingUp, title: 'Up to 80% LTC', desc: 'Via selected specialist lenders: up to 80% LTC for development projects and up to 65% LTV for acquisitions. Assessed case by case.' }
        ]
      },
      markets: {
        title: 'Our Specialisations',
        subtitle: 'From Costa del Sol to Ibiza',
        items: [
          { icon: '🏖️', title: 'Residential & Luxury', desc: 'Villas, apartments and resort developments. LTV up to 70% for strong Costa del Sol and Costa Blanca locations.' },
          { icon: '🏨', title: 'Hospitality & Tourism', desc: 'Hotels, boutique properties and short-stay complexes. Knowledge of Spanish tourism licences and local regulations.' },
          { icon: '🏗️', title: 'Development Finance', desc: 'Land + construction combined up to 80% LTC via senior + mezzanine structures. Development expertise in the team.' }
        ]
      },
      ai: {
        badge: 'AI Finance Tool',
        title: 'Configure your project',
        subtitle: 'Describe your project and instantly receive an indicative financing analysis with concrete options.',
        cta: 'Start Project Analysis →'
      },
      social: {
        title: 'Why international investors choose us',
        benefits: [
          'Assistance with NIE application and Spanish bank account',
          'Network of reliable local lawyers and notaries',
          'Development expertise in the team — we speak your language',
          'Off-market opportunities via our principal network',
          'Tax structuring via Dutch and Spanish partners',
          'Indicative terms within 48 hours'
        ]
      },
      cta: {
        title: 'Ready for your Spanish real estate project?',
        subtitle: 'Analyse your project with our AI tool or contact us directly',
        btn1: 'Start Analysis', btn2: 'Schedule Meeting'
      },
      footer: {
        desc: 'Specialist in real estate financing for international investors and local developers in Spain.',
        contact: 'Contact', location: 'Location',
        valencia: 'Valencia, Spain (Head Office)',
        denia: 'Dénia, Costa Blanca',
        rights: '© 2025 Costa Capital. All rights reserved.'
      },
      chat: {
        title: 'AI Finance Advisor',
        subtitle: 'Describe your project — receive a structured financing analysis',
        placeholder: 'Describe your project...',
        empty: 'Tell me about your project in Spain',
        emptyDesc: 'Share the type, location, project value and desired financing — I will analyse the options immediately.',
        suggestions: [
          'Villa development of 6 units in Jávea, land value €1.2M, construction €3M, seeking 75% LTC',
          'Bridge loan for boutique hotel Marbella €2.8M, value €4.5M, fast closing required',
          'Refinance luxury villa Ibiza €1.8M existing loan, market value €3.2M'
        ],
        optionsTitle: 'Financing options for your project',
        recommendTitle: 'Recommendation',
        nextStepTitle: 'Next step',
        newAnalysis: 'Analyse a new project',
        ltv: 'LTV/LTC', rate: 'Rate', term: 'Term', amount: 'Loan Amount'
      },
      calc: {
        title: 'Quick Calculator',
        subtitle: 'Indicative calculation for your project',
        loanAmount: 'Loan Amount', projectValue: 'Project Value', term: 'Term',
        months: 'months', ltv: 'Loan-to-Value (LTV)',
        monthly: 'Indicative monthly payment', total: 'Total interest (indicative)',
        note: '✓ Indicative based on 9.6% p.a. For exact terms: 48h analysis via AI tool.',
        discuss: 'Analyse via AI →'
      }
    },
    es: {
      nav: { contact: 'Contacto', backLabel: 'Volver al sitio principal' },
      hero: {
        badge: 'Especializados en zonas costeras españolas',
        title: 'Financiación Inmobiliaria\nCostas Españolas',
        subtitle: 'Expertos en Costa del Sol, Costa Blanca, Valencia e Ibiza. Financiación para inversores internacionales y promotores locales. De €350K a €50M+.',
        cta1: 'Analizar su proyecto',
        cta2: 'Calcular Financiación',
        location: 'Con sede en Valencia, España'
      },
      stats: [
        { value: '€300M+', label: 'Facilitado' },
        { value: '100+', label: 'Transacciones' },
        { value: '80+', label: 'Socios Prestamistas' },
        { value: '48h', label: 'Primera Respuesta' }
      ],
      features: {
        title: '¿Por qué Costa Capital?',
        items: [
          { icon: MapPin, title: 'Experiencia Local', desc: 'Oficina en Valencia con profundo conocimiento de toda la costa: Costa del Sol, Costa Blanca (Dénia, Jávea, Moraira), Valencia e Ibiza.' },
          { icon: Globe, title: 'Estructuras Internacionales', desc: 'Experiencia en operaciones transfronterizas: BV holandesa, NV belga, Ltd británica sobre SL española. Equipo trilingüe.' },
          { icon: TrendingUp, title: 'Hasta 80% LTC', desc: 'A través de prestamistas especialistas seleccionados: hasta 80% LTC para proyectos de desarrollo y hasta 65% LTV para adquisiciones. Evaluado caso por caso.' }
        ]
      },
      markets: {
        title: 'Nuestras Especializaciones',
        subtitle: 'De la Costa del Sol a Ibiza',
        items: [
          { icon: '🏖️', title: 'Residencial y Lujo', desc: 'Villas, apartamentos y desarrollos resort. LTV hasta el 70% para ubicaciones sólidas en Costa del Sol y Costa Blanca.' },
          { icon: '🏨', title: 'Hostelería y Turismo', desc: 'Hoteles, propiedades boutique y complejos de alquiler corto. Conocimiento de licencias turísticas españolas.' },
          { icon: '🏗️', title: 'Financiación de Desarrollo', desc: 'Suelo + construcción combinado hasta 80% LTC mediante estructuras senior + mezzanine. Experiencia promotora en el equipo.' }
        ]
      },
      ai: {
        badge: 'Herramienta IA de Financiación',
        title: 'Configure su proyecto',
        subtitle: 'Describa su proyecto y reciba al instante un análisis de financiación indicativo con opciones concretas.',
        cta: 'Iniciar Análisis del Proyecto →'
      },
      social: {
        title: 'Por qué los inversores internacionales nos eligen',
        benefits: [
          'Asistencia con la solicitud de NIE y cuenta bancaria española',
          'Red de abogados y notarios locales de confianza',
          'Experiencia promotora en el equipo — hablamos su idioma',
          'Oportunidades off-market a través de nuestra red de principales',
          'Estructuración fiscal a través de socios holandeses y españoles',
          'Condiciones indicativas en 48 horas'
        ]
      },
      cta: {
        title: '¿Listo para su proyecto inmobiliario en España?',
        subtitle: 'Analice su proyecto con nuestra herramienta IA o contáctenos directamente',
        btn1: 'Iniciar Análisis', btn2: 'Programar Reunión'
      },
      footer: {
        desc: 'Especialistas en financiación inmobiliaria para inversores internacionales y promotores locales en España.',
        contact: 'Contacto', location: 'Ubicación',
        valencia: 'Valencia, España (Sede Central)',
        denia: 'Dénia, Costa Blanca',
        rights: '© 2025 Costa Capital. Todos los derechos reservados.'
      },
      chat: {
        title: 'Asesor IA de Financiación',
        subtitle: 'Describa su proyecto — reciba un análisis de financiación estructurado',
        placeholder: 'Describa su proyecto...',
        empty: 'Cuénteme su proyecto en España',
        emptyDesc: 'Comparta el tipo, ubicación, valor del proyecto y financiación deseada — analizaré las opciones de inmediato.',
        suggestions: [
          'Desarrollo de 6 villas en Jávea, valor suelo €1,2M, construcción €3M, busco 75% LTC',
          'Préstamo puente para hotel boutique Marbella €2,8M, valor €4,5M, cierre rápido',
          'Refinanciación villa de lujo Ibiza €1,8M préstamo actual, valor de mercado €3,2M'
        ],
        optionsTitle: 'Opciones de financiación para su proyecto',
        recommendTitle: 'Recomendación',
        nextStepTitle: 'Siguiente paso',
        newAnalysis: 'Analizar un nuevo proyecto',
        ltv: 'LTV/LTC', rate: 'Tasa', term: 'Plazo', amount: 'Importe'
      },
      calc: {
        title: 'Calculadora Rápida',
        subtitle: 'Cálculo indicativo para su proyecto',
        loanAmount: 'Importe del Préstamo', projectValue: 'Valor del Proyecto', term: 'Plazo',
        months: 'meses', ltv: 'Loan-to-Value (LTV)',
        monthly: 'Cuota mensual indicativa', total: 'Intereses totales (indicativo)',
        note: '✓ Indicativo basado en 9,6% p.a. Para condiciones exactas: análisis en 48h vía herramienta IA.',
        discuss: 'Analizar con IA →'
      }
    }
  };

  const reviews = {
    nl: [
      { name: 'Henrik Janssen', role: 'CEO, Nordic Investments', project: 'Villa Development Jávea', amount: '€4.2M', image: 'HJ', rating: 5, quote: 'Als Nederlander die in Spanje wilde investeren had ik een partner nodig die beide markten begreep. Costa Capital regelde de financiering én hielp met NIE, notaris en lokale aannemers.', result: '6 villas gebouwd, allemaal verkocht, 38% ROI' },
      { name: 'Sarah & Michael Thompson', role: 'Private Investors, UK', project: 'Boutique Hotel Dénia', amount: '€2.8M', image: 'ST', rating: 5, quote: 'Spaanse banken wilden niet financieren voor buitenlanders. Costa Capital structureerde een bridge loan met 65% LTV in 2 weken.', result: '18 kamers gerenoveerd, volle bezetting zomer, 5-jaar terugverdientijd' },
      { name: 'Alexander Petrov', role: 'CEO, Mediterranean Investments', project: 'Boutique Hotel Marbella', amount: '€10M', image: 'AP', rating: 5, quote: 'Costa Capital begreep de luxe markt aan de Costa del Sol perfect en structureerde een development facility met gefaseerde drawdowns.', result: '45 kamers + spa, opening Q2 2025' },
      { name: 'Carlos Martínez', role: 'Developer, Valencia', project: 'Mixed-use Complex Valencia', amount: '€8.5M', image: 'CM', rating: 5, quote: 'Snelle beslissingen en echte kennis van de Valenciaanse markt. Deal gesloten in 2 weken.', result: '42 appartementen + 8 units, 85% pre-sold' }
    ],
    en: [
      { name: 'Henrik Janssen', role: 'CEO, Nordic Investments', project: 'Villa Development Jávea', amount: '€4.2M', image: 'HJ', rating: 5, quote: 'As a Dutchman investing in Spain I needed a partner who understood both markets. Costa Capital arranged financing AND helped with NIE, notary and local contractor connections.', result: '6 villas built, all sold to Northern European buyers, 38% ROI' },
      { name: 'Sarah & Michael Thompson', role: 'Private Investors, UK', project: 'Boutique Hotel Dénia', amount: '€2.8M', image: 'ST', rating: 5, quote: 'Spanish banks would not finance foreigners. Costa Capital structured a bridge loan at 65% LTV and completed the deal in 2 weeks.', result: '18 rooms renovated, full occupancy summer, 5-year payback' },
      { name: 'Alexander Petrov', role: 'CEO, Mediterranean Investments', project: 'Boutique Hotel Marbella', amount: '€10M', image: 'AP', rating: 5, quote: 'Costa Capital perfectly understood the luxury Costa del Sol market and structured a development facility with phased drawdowns.', result: '45 rooms + spa, opening Q2 2025' },
      { name: 'Laura van den Berg', role: 'Real Estate Investor, Rotterdam', project: 'Holiday Portfolio Calpe', amount: '€3.6M', image: 'LB', rating: 5, quote: 'Costa Capital financed my portfolio of 8 apartments cross-collateralised and helped with tourism licences.', result: '8 apartments, 75% average occupancy, €180K annual rental income' }
    ],
    es: [
      { name: 'Henrik Janssen', role: 'CEO, Nordic Investments', project: 'Desarrollo Villas Jávea', amount: '€4.2M', image: 'HJ', rating: 5, quote: 'Como holandés invirtiendo en España necesitaba un socio que entendiera ambos mercados. Costa Capital gestionó la financiación Y ayudó con NIE, notaría y constructores.', result: '6 villas construidas, todas vendidas, 38% ROI' },
      { name: 'Sarah & Michael Thompson', role: 'Inversores Privados, UK', project: 'Hotel Boutique Dénia', amount: '€2.8M', image: 'ST', rating: 5, quote: 'Los bancos españoles no financiaban a extranjeros. Costa Capital estructuró un préstamo puente al 65% LTV en 2 semanas.', result: '18 habitaciones renovadas, ocupación plena en verano' },
      { name: 'Carlos Martínez', role: 'Promotor, Valencia', project: 'Complejo Mixto Valencia', amount: '€8.5M', image: 'CM', rating: 5, quote: 'Decisiones rápidas y conocimiento real del mercado valenciano. Operación cerrada en 2 semanas.', result: '42 apartamentos + 8 locales, 85% vendido sobre plano' },
      { name: 'Alexander Petrov', role: 'CEO, Mediterranean Investments', project: 'Hotel Boutique Marbella', amount: '€10M', image: 'AP', rating: 5, quote: 'Costa Capital entendió perfectamente el mercado de lujo de la Costa del Sol y estructuró una facility de desarrollo con disposiciones escalonadas.', result: '45 habitaciones + spa, apertura Q2 2025' }
    ]
  };

  const text = t[language] || t.nl;
  const clientReviews = reviews[language] || reviews.nl;

  // ── CHAT HANDLER ─────────────────────────────────────────────
  const handleSendMessage = async (msg) => {
    const userMsg = msg || inputMessage;
    if (!userMsg.trim() || isLoading) return;
    setInputMessage('');
    setStructuredResult(null);
    const newMessages = [...chatMessages, { role: 'user', content: userMsg }];
    setChatMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          language
        }),
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();

      setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      if (data.structured?.showOptions) {
        setStructuredResult(data.structured);
      }
    } catch {
      const errMsg = language === 'nl'
        ? 'Excuses, er ging iets mis. Neem direct contact op via info@costacapital.pro'
        : language === 'es'
        ? 'Lo sentimos, algo salió mal. Contáctenos en info@costacapital.pro'
        : 'Sorry, something went wrong. Please contact info@costacapital.pro';
      setChatMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setChatMessages([]);
    setStructuredResult(null);
    setInputMessage('');
  };

  // ── CALC ─────────────────────────────────────────────────────
  const ltv = ((loanAmount / projectValue) * 100).toFixed(1);
  const monthlyRate = 0.008;
  const monthlyPayment = Math.round(loanAmount * monthlyRate);

  const sliderStyle = (val, min, max) => {
    const pct = ((val - min) / (max - min)) * 100;
    return { background: `linear-gradient(to right, #f97316 ${pct}%, #334155 ${pct}%)` };
  };

  const openMeetingEmail = () => {
    const subjects = { nl: 'Aanvraag Meeting - Costa Capital', en: 'Meeting Request - Costa Capital', es: 'Solicitud de Reunión - Costa Capital' };
    window.location.href = `mailto:info@costacapital.pro?subject=${encodeURIComponent(subjects[language])}`;
  };

  // ── OPTION CARD COLORS ────────────────────────────────────────
  const optionColors = ['#f97316', '#3b82f6', '#8b5cf6'];

  return (
    <div className="cc-root">

      {/* TOP BAR */}
      <div className="cc-topbar">
        <a href="https://costacapital.pro" className="cc-topbar-back">
          <ArrowLeft size={14} />
          <span>{text.nav.backLabel}</span>
        </a>
        <span className="cc-topbar-domain">costacapital.pro</span>
      </div>

      {/* NAV */}
      <nav className="cc-nav">
        <a href="https://costacapital.pro" className="cc-logo">Costa <span>Capital</span></a>
        <div className="cc-nav-right">
          <div className="cc-lang-toggle">
            {['nl', 'en', 'es'].map(lang => (
              <button key={lang} onClick={() => setLanguage(lang)}
                className={`cc-lang-btn${language === lang ? ' active' : ''}`}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => setContactOpen(true)} className="cc-btn-primary">{text.nav.contact}</button>
        </div>
      </nav>

      {/* HERO */}
      <header className="cc-hero">
        <div className="cc-hero-bg" /><div className="cc-hero-grid" />
        <div className="cc-hero-inner">
          <div className="cc-hero-badge"><MapPin size={13} />{text.hero.badge}</div>
          <h1 className="cc-hero-title">
            {text.hero.title.split('\n').map((line, i) => (
              <span key={i}>{i === 1 ? <em>{line}</em> : line}{i === 0 && <br />}</span>
            ))}
          </h1>
          <p className="cc-hero-sub">{text.hero.subtitle}</p>
          <p className="cc-hero-location"><MapPin size={15} />{text.hero.location}</p>
          <div className="cc-hero-actions">
            <button onClick={() => setChatOpen(true)} className="cc-btn-primary cc-btn-lg">
              <MessageSquare size={18} />{text.hero.cta1}
            </button>
            <button onClick={() => setCalcOpen(true)} className="cc-btn-ghost cc-btn-lg">
              <Calculator size={18} />{text.hero.cta2}
            </button>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="cc-stats">
        {text.stats.map((s, i) => (
          <div key={i} className="cc-stat">
            <div className="cc-stat-num">{s.value}</div>
            <div className="cc-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="cc-section">
        <h2 className="cc-section-title">{text.features.title}</h2>
        <div className="cc-grid-3">
          {text.features.items.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="cc-card">
              <div className="cc-card-icon"><Icon size={28} /></div>
              <h3 className="cc-card-title">{title}</h3>
              <p className="cc-card-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI TOOL PROMO */}
      <section className="cc-section cc-section-dark">
        <div className="cc-ai-promo">
          <div className="cc-ai-promo-badge"><Zap size={13} />{text.ai.badge}</div>
          <h2 className="cc-ai-promo-title">{text.ai.title}</h2>
          <p className="cc-ai-promo-sub">{text.ai.subtitle}</p>
          <button onClick={() => setChatOpen(true)} className="cc-btn-orange cc-btn-lg">
            {text.ai.cta}
          </button>
        </div>
      </section>

      {/* MARKETS */}
      <section className="cc-section cc-section-alt">
        <div className="cc-section-header">
          <h2 className="cc-section-title">{text.markets.title}</h2>
          <p className="cc-section-sub">{text.markets.subtitle}</p>
        </div>
        <div className="cc-grid-3">
          {text.markets.items.map((m, i) => (
            <div key={i} className="cc-card">
              <div className="cc-market-icon">{m.icon}</div>
              <h3 className="cc-card-title">{m.title}</h3>
              <p className="cc-card-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="cc-section">
        <div className="cc-section-header">
          <h2 className="cc-section-title">
            {language === 'nl' ? 'Succesvolle Financieringen' : language === 'es' ? 'Financiaciones Exitosas' : 'Successful Financings'}
          </h2>
        </div>
        <div className="cc-grid-2">
          {clientReviews.map((review, i) => (
            <div key={i} className="cc-card cc-review-card">
              <div className="cc-review-header">
                <div className="cc-review-avatar">{review.image}</div>
                <div>
                  <div className="cc-review-name">{review.name}</div>
                  <div className="cc-review-role">{review.role}</div>
                </div>
                <div className="cc-stars">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} size={14} fill="#f97316" color="#f97316" />)}
                </div>
              </div>
              <div className="cc-review-meta">
                <Building2 size={13} /><span>{review.project}</span>
                <span className="cc-dot">·</span><strong>{review.amount}</strong>
              </div>
              <Quote size={22} className="cc-quote-icon" />
              <p className="cc-review-quote">"{review.quote}"</p>
              <div className="cc-review-result">✓ {review.result}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="cc-section cc-section-alt">
        <div className="cc-highlight-box cc-highlight-center">
          <h3 className="cc-section-title" style={{marginBottom:'2rem'}}>{text.social.title}</h3>
          <div className="cc-grid-3">
            {text.social.benefits.map((item, i) => (
              <div key={i} className="cc-check-item cc-check-card">
                <Check size={15} className="cc-check-icon" /><span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cc-section">
        <div className="cc-cta-box">
          <h2 className="cc-cta-title">{text.cta.title}</h2>
          <p className="cc-cta-sub">{text.cta.subtitle}</p>
          <div className="cc-hero-actions">
            <button onClick={() => setChatOpen(true)} className="cc-btn-dark cc-btn-lg">{text.cta.btn1}</button>
            <button onClick={openMeetingEmail} className="cc-btn-outline-dark cc-btn-lg">{text.cta.btn2}</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cc-footer">
        <div className="cc-footer-grid">
          <div>
            <div className="cc-footer-logo">Costa Capital</div>
            <p className="cc-footer-desc">{text.footer.desc}</p>
          </div>
          <div>
            <h4 className="cc-footer-heading">{text.footer.contact}</h4>
            <p className="cc-muted">info@costacapital.pro</p>
            <p className="cc-muted">+31 6 8175 2045</p>
            <p className="cc-muted-sm">(WhatsApp)</p>
          </div>
          <div>
            <h4 className="cc-footer-heading">{text.footer.location}</h4>
            <p className="cc-muted cc-location"><MapPin size={14} />{text.footer.valencia}</p>
            <p className="cc-muted" style={{marginLeft:'1.2rem'}}>{text.footer.denia}</p>
          </div>
        </div>
        <div className="cc-footer-bottom">{text.footer.rights}</div>
      </footer>

      {/* ═══ AI CHAT MODAL ═══════════════════════════════════════ */}
      {chatOpen && (
        <div className="cc-modal-overlay">
          <div className="cc-modal cc-modal-wide">
            <div className="cc-modal-header">
              <div>
                <h3 className="cc-modal-title">{text.chat.title}</h3>
                <p className="cc-modal-sub">{text.chat.subtitle}</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="cc-modal-close"><X size={20} /></button>
            </div>

            <div className="cc-chat-body">
              {/* EMPTY STATE */}
              {chatMessages.length === 0 && !structuredResult && (
                <div className="cc-chat-empty">
                  <div className="cc-chat-empty-icon-wrap">
                    <Zap size={32} color="#f97316" />
                  </div>
                  <p className="cc-chat-empty-title">{text.chat.empty}</p>
                  <p className="cc-chat-empty-desc">{text.chat.emptyDesc}</p>
                  <div className="cc-suggestions">
                    {text.chat.suggestions.map((q, i) => (
                      <button key={i} onClick={() => handleSendMessage(q)} className="cc-suggestion">{q}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* MESSAGES */}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`cc-msg-row${msg.role === 'user' ? ' user' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="cc-msg-avatar">CC</div>
                  )}
                  <div className={`cc-msg${msg.role === 'user' ? ' cc-msg-user' : ' cc-msg-ai'}`}>
                    <p style={{whiteSpace:'pre-wrap',margin:0}}>{msg.content}</p>
                  </div>
                </div>
              ))}

              {/* LOADING */}
              {isLoading && (
                <div className="cc-msg-row">
                  <div className="cc-msg-avatar">CC</div>
                  <div className="cc-msg cc-msg-ai cc-msg-loading">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              {/* STRUCTURED RESULT CARDS */}
              {structuredResult && (
                <div className="cc-structured">
                  {structuredResult.projectSummary && (
                    <p className="cc-structured-summary">{structuredResult.projectSummary}</p>
                  )}
                  <p className="cc-structured-heading">{text.chat.optionsTitle}</p>
                  <div className="cc-options-grid">
                    {structuredResult.options?.map((opt, i) => (
                      <div key={i} className="cc-option-card" style={{borderTop:`3px solid ${optionColors[i] || '#f97316'}`}}>
                        <div className="cc-option-type" style={{color: optionColors[i] || '#f97316'}}>{opt.type}</div>
                        <div className="cc-option-rows">
                          <div className="cc-option-row">
                            <span className="cc-option-label">{text.chat.amount}</span>
                            <span className="cc-option-val">{opt.loanAmount}</span>
                          </div>
                          <div className="cc-option-row">
                            <span className="cc-option-label">{text.chat.ltv}</span>
                            <span className="cc-option-val">{opt.ltv}</span>
                          </div>
                          <div className="cc-option-row">
                            <span className="cc-option-label">{text.chat.rate}</span>
                            <span className="cc-option-val">{opt.rate}</span>
                          </div>
                          <div className="cc-option-row">
                            <span className="cc-option-label">{text.chat.term}</span>
                            <span className="cc-option-val">{opt.term}</span>
                          </div>
                        </div>
                        {opt.notes && <p className="cc-option-notes">{opt.notes}</p>}
                      </div>
                    ))}
                  </div>

                  {structuredResult.recommendation && (
                    <div className="cc-structured-rec">
                      <Shield size={15} color="#f97316" style={{flexShrink:0,marginTop:2}} />
                      <div>
                        <p className="cc-structured-rec-title">{text.chat.recommendTitle}</p>
                        <p className="cc-structured-rec-text">{structuredResult.recommendation}</p>
                      </div>
                    </div>
                  )}

                  {structuredResult.nextStep && (
                    <div className="cc-structured-next">
                      <p className="cc-structured-next-title">{text.chat.nextStepTitle}</p>
                      <p className="cc-structured-next-text">{structuredResult.nextStep}</p>
                      <a href="mailto:info@costacapital.pro" className="cc-btn-orange cc-btn-sm">
                        info@costacapital.pro →
                      </a>
                    </div>
                  )}

                  <button onClick={resetChat} className="cc-reset-btn">{text.chat.newAnalysis}</button>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* INPUT */}
            <div className="cc-modal-footer">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder={text.chat.placeholder}
                className="cc-chat-input"
                disabled={isLoading}
              />
              <button onClick={() => handleSendMessage()} disabled={isLoading || !inputMessage.trim()} className="cc-chat-send">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ CALCULATOR MODAL ════════════════════════════════════ */}
      {calcOpen && (
        <div className="cc-modal-overlay">
          <div className="cc-modal">
            <div className="cc-modal-header">
              <div>
                <h3 className="cc-modal-title">{text.calc.title}</h3>
                <p className="cc-modal-sub">{text.calc.subtitle}</p>
              </div>
              <button onClick={() => setCalcOpen(false)} className="cc-modal-close"><X size={20} /></button>
            </div>
            <div className="cc-calc-body">
              {[
                { label: text.calc.loanAmount, val: loanAmount, set: setLoanAmount, min: 350000, max: 50000000, step: 50000 },
                { label: text.calc.projectValue, val: projectValue, set: setProjectValue, min: 500000, max: 75000000, step: 100000 },
                { label: text.calc.term, val: term, set: setTerm, min: 6, max: 60, step: 6, suffix: text.calc.months }
              ].map(({ label, val, set, min, max, step, suffix }, i) => (
                <div key={i} className="cc-slider-group">
                  <label className="cc-slider-label">
                    {label}: <strong>{suffix ? `${val} ${suffix}` : `€${val.toLocaleString('nl-NL')}`}</strong>
                  </label>
                  <input type="range" min={min} max={max} step={step} value={val}
                    onChange={e => set(Number(e.target.value))}
                    className="cc-slider" style={sliderStyle(val, min, max)} />
                </div>
              ))}
              <div className="cc-calc-results">
                <div className="cc-calc-row"><span className="cc-muted">{text.calc.ltv}</span><span className="cc-calc-val">{ltv}%</span></div>
                <div className="cc-calc-row"><span className="cc-muted">{text.calc.monthly}</span><span className="cc-calc-val-white">€{monthlyPayment.toLocaleString('nl-NL')}</span></div>
                <div className="cc-calc-row"><span className="cc-muted">{text.calc.total}</span><span className="cc-calc-val-white">€{(monthlyPayment * term).toLocaleString('nl-NL')}</span></div>
              </div>
              <div className="cc-calc-note">{text.calc.note}</div>
              <button onClick={() => { setCalcOpen(false); setChatOpen(true); }} className="cc-btn-primary cc-btn-full">{text.calc.discuss}</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ CONTACT MODAL ═══════════════════════════════════════ */}
      {contactOpen && (
        <div className="cc-modal-overlay">
          <div className="cc-modal cc-modal-sm">
            <div className="cc-modal-header">
              <div>
                <h3 className="cc-modal-title">{language === 'nl' ? 'Neem Contact Op' : language === 'es' ? 'Ponerse en Contacto' : 'Get in Touch'}</h3>
                <p className="cc-modal-sub">{language === 'nl' ? 'Bespreek uw project met ons' : language === 'es' ? 'Hable con nosotros sobre su proyecto' : 'Discuss your project with us'}</p>
              </div>
              <button onClick={() => setContactOpen(false)} className="cc-modal-close"><X size={20} /></button>
            </div>
            <div className="cc-contact-body">
              <a href="tel:+31681752045" className="cc-contact-item">
                <div className="cc-contact-icon">📞</div>
                <div><div className="cc-contact-main">+31 6 8175 2045</div>
                  <div className="cc-muted-sm">{language === 'nl' ? 'Bel of WhatsApp' : language === 'es' ? 'Llame o WhatsApp' : 'Call or WhatsApp'}</div></div>
              </a>
              <a href="mailto:info@costacapital.pro" className="cc-contact-item">
                <div className="cc-contact-icon">✉️</div>
                <div><div className="cc-contact-main">info@costacapital.pro</div>
                  <div className="cc-muted-sm">{language === 'nl' ? 'Reactie binnen 48 uur' : language === 'es' ? 'Respuesta en 48 horas' : 'Response within 48 hours'}</div></div>
              </a>
              <a href="https://wa.me/31681752045" target="_blank" rel="noopener noreferrer" className="cc-contact-item cc-whatsapp">
                <div className="cc-contact-icon cc-contact-icon-white">💬</div>
                <div><div className="cc-contact-main">WhatsApp</div>
                  <div style={{fontSize:'0.8rem',color:'#bbf7d0'}}>{language === 'nl' ? 'Direct chatten' : language === 'es' ? 'Chat directo' : 'Chat directly'}</div></div>
              </a>
              <button onClick={() => { setContactOpen(false); setChatOpen(true); }} className="cc-btn-primary cc-btn-full" style={{marginTop:'0.5rem'}}>
                <MessageSquare size={16} />
                {language === 'nl' ? 'Of analyseer uw project met AI' : language === 'es' ? 'O analice su proyecto con IA' : 'Or analyse your project with AI'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
