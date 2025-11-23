import React, { useState } from 'react';
import { Building2, MessageSquare, Calculator, ChevronRight, Check, X, Star, Quote, MapPin, Globe } from 'lucide-react';

export default function CostaCapitalLanding() {
  const [language, setLanguage] = useState('nl');
  const [chatOpen, setChatOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [projectValue, setProjectValue] = useState(1500000);
  const [term, setTerm] = useState(24);

  const t = {
    nl: {
      nav: {
        contact: 'Contact'
      },
      hero: {
        badge: 'Gespecialiseerd in Spaanse Vastgoedmarkt',
        title: 'Vastgoedfinanciering\nSpanje & Europa',
        subtitle: 'Expert in de Costa Blanca en Valencia regio. Financiering voor internationale investeerders en lokale ontwikkelaars. Van €500K tot €50M+.',
        cta1: 'Start AI Gesprek',
        cta2: 'Bereken Financiering',
        location: 'Gevestigd in Valencia, Spanje'
      },
      stats: {
        financed: 'Gefinancierd in Spanje',
        response: 'Eerste Reactie',
        projects: 'Spaanse Projecten',
        satisfaction: 'Klanttevredenheid'
      },
      features: {
        title: 'Waarom Costa Capital voor Spanje?',
        speed: {
          title: 'Lokale Expertise',
          desc: 'Kantoor in Valencia met diepgaande kennis van de Spaanse markt, wetgeving en lokale banking systeem. Wij spreken de taal - letterlijk en figuurlijk.'
        },
        flex: {
          title: 'Internationale Structuren',
          desc: 'Ervaring met cross-border deals, offshore structuren en fiscale optimalisatie voor buitenlandse investeerders in Spanje.'
        },
        complex: {
          title: 'Costa Blanca Specialist',
          desc: 'Valencia, Alicante, Benidorm, Dénia, Jávea. Wij kennen de Costa Blanca als onze broekzak en hebben netwerken met lokale notarissen, advocaten en ontwikkelaars.'
        }
      },
      markets: {
        title: 'Onze Specialisaties in Spanje',
        subtitle: 'Van kustwoningen tot stedelijke ontwikkeling',
        coastal: {
          title: 'Costa Blanca Residentieel',
          desc: 'Luxe villas, appartementen en resort ontwikkelingen langs de Costa Blanca. LTV tot 70% voor sterke locaties.'
        },
        commercial: {
          title: 'Commercieel Vastgoed',
          desc: 'Retail, horeca en kantoorruimtes in Valencia stad en omgeving. Ideaal voor internationale retailers.'
        },
        tourism: {
          title: 'Toeristische Projecten',
          desc: 'Hotels, vakantiewoningen en short-stay complexen. Begrip van Spaanse toerismelicenties en regelgeving.'
        }
      },
      reviews: {
        title: 'Succesvolle Financieringen in Spanje',
        subtitle: 'Wat onze klanten zeggen over hun projecten aan de Costa Blanca'
      },
      spanish: {
        title: 'De Spaanse Vastgoedmarkt',
        intro: 'Waarom investeren in de Valenciana regio?',
        points: [
          '300+ dagen zon per jaar - ideaal klimaat',
          'Groeiende internationale vraag naar kustwoningen',
          'Valencia: derde stad van Spanje, sterk groeiend',
          'Relatief lage vastgoedprijzen vs andere EU kustgebieden',
          'Stabiele huurmarkt dankzij toerisme',
          'Nieuwe infrastructuur: AVE, uitbreiding luchthaven'
        ]
      },
      process: {
        title: 'Het Financieringsproces',
        subtitle: 'Van aanvraag tot closing in Spanje'
      },
      social: {
        title: 'Waarom internationale investeerders ons kiezen',
        benefits: [
          'Begeleiding bij NIE aanvraag en Spaanse bankrekening',
          'Netwerk van betrouwbare lokale advocaten en notarissen',
          'Ervaring met residencia en golden visa trajecten',
          'Kennis van Ley de Costas en andere Spaanse regelgeving',
          'Fiscale structurering via Nederlandse en Spaanse partners',
          'Project management ondersteuning tijdens bouw'
        ]
      },
      cta: {
        title: 'Klaar voor uw Spaanse vastgoedproject?',
        subtitle: 'Bespreek uw plannen met onze Valencia-based AI-adviseur of plan een persoonlijk gesprek in Valencia',
        btn1: 'Start Gesprek',
        btn2: 'Plan Meeting Valencia'
      },
      footer: {
        desc: 'Specialist in vastgoedfinanciering voor internationale investeerders en lokale ontwikkelaars in Spanje.',
        contact: 'Contact',
        location: 'Locatie',
        valencia: 'Valencia, Spanje (Hoofdkantoor)',
        denia: 'Dénia, Costa Blanca',
        rights: '© 2024 Costa Capital. Alle rechten voorbehouden. Geregistreerd in Spanje'
      },
      chat: {
        title: 'AI Financierings Adviseur',
        subtitle: 'Stel uw vragen over financiering in Spanje',
        placeholder: 'Stel uw vraag...',
        empty: 'Start een gesprek over uw Spaanse vastgoedproject',
        suggestions: [
          'Wat zijn de voorwaarden voor financiering in Valencia?',
          'Hoe werkt het NIE proces voor buitenlandse investeerders?',
          'Welke LTV hanteert Costa Capital voor Costa Blanca projecten?'
        ],
        systemPrompt: 'Je bent een financieel adviseur voor Costa Capital, gespecialiseerd in vastgoedfinanciering voor de Spaanse markt, met name Valencia en Costa Blanca. Je helpt internationale investeerders en lokale ontwikkelaars met vragen over financiering, Spaanse regelgeving (NIE, escritura, nota simple), en het investeren in Spanje. \n\nWees professioneel, commercieel en to-the-point. Je doel is om leads te genereren door waarde te bieden en interesse te wekken.\n\nBelangrijk gedrag:\n- Beantwoord vragen nuttig en compleet\n- Na 2-3 berichten uitwisseling, moedig subtiel aan om contact op te nemen voor een persoonlijk gesprek\n- Vermeld: "Voor een gedetailleerde analyse van uw specifieke project, neem gerust contact met ons op via info@costacapital.pro of bel +31 6 8175 2045 (WhatsApp mogelijk)"\n- Benadruk unieke voordelen: lokaal kantoor Valencia, ervaring met internationale investeerders, snelle beslissingen\n- Wees enthousiast maar niet pusherig\n- Minimale financiering €500K, maximaal €50M+\n\nAntwoord in het Nederlands.'
      },
      calc: {
        title: 'Financiering Calculator',
        subtitle: 'Krijg een indicatie voor uw Spaanse project',
        loanAmount: 'Gewenste Leenbedrag',
        projectValue: 'Projectwaarde',
        term: 'Looptijd',
        months: 'maanden',
        ltv: 'Loan-to-Value (LTV)',
        monthly: 'Indicatieve maandlast',
        total: 'Totale rente (indicatief)',
        note: '✓ Deze indicatie is gebaseerd op standaard voorwaarden voor Spaanse projecten. Voor een exacte offerte contacteren wij u graag.',
        discuss: 'Bespreek met AI Adviseur'
      }
    },
    en: {
      nav: {
        contact: 'Contact'
      },
      hero: {
        badge: 'Specialized in Spanish Real Estate Market',
        title: 'Real Estate Financing\nSpain & Europe',
        subtitle: 'Expert in Costa Blanca and Valencia region. Financing for international investors and local developers. From €500K to €50M+.',
        cta1: 'Start AI Chat',
        cta2: 'Calculate Financing',
        location: 'Based in Valencia, Spain'
      },
      stats: {
        financed: 'Financed in Spain',
        response: 'First Response',
        projects: 'Spanish Projects',
        satisfaction: 'Client Satisfaction'
      },
      features: {
        title: 'Why Costa Capital for Spain?',
        speed: {
          title: 'Local Expertise',
          desc: 'Valencia office with deep knowledge of Spanish market, legislation and local banking system. We speak the language - literally and figuratively.'
        },
        flex: {
          title: 'International Structures',
          desc: 'Experience with cross-border deals, offshore structures and tax optimization for foreign investors in Spain.'
        },
        complex: {
          title: 'Costa Blanca Specialist',
          desc: 'Valencia, Alicante, Benidorm, Dénia, Jávea. We know Costa Blanca inside out and have networks with local notaries, lawyers and developers.'
        }
      },
      markets: {
        title: 'Our Specializations in Spain',
        subtitle: 'From coastal properties to urban development',
        coastal: {
          title: 'Costa Blanca Residential',
          desc: 'Luxury villas, apartments and resort developments along Costa Blanca. LTV up to 70% for strong locations.'
        },
        commercial: {
          title: 'Commercial Real Estate',
          desc: 'Retail, hospitality and office spaces in Valencia city and surroundings. Ideal for international retailers.'
        },
        tourism: {
          title: 'Tourism Projects',
          desc: 'Hotels, holiday homes and short-stay complexes. Understanding of Spanish tourism licenses and regulations.'
        }
      },
      reviews: {
        title: 'Successful Financings in Spain',
        subtitle: 'What our clients say about their Costa Blanca projects'
      },
      spanish: {
        title: 'The Spanish Real Estate Market',
        intro: 'Why invest in the Valencia region?',
        points: [
          '300+ days of sunshine per year - ideal climate',
          'Growing international demand for coastal properties',
          'Valencia: third city of Spain, strong growth',
          'Relatively low property prices vs other EU coastal areas',
          'Stable rental market thanks to tourism',
          'New infrastructure: AVE high-speed rail, airport expansion'
        ]
      },
      process: {
        title: 'The Financing Process',
        subtitle: 'From application to closing in Spain'
      },
      social: {
        title: 'Why international investors choose us',
        benefits: [
          'Assistance with NIE application and Spanish bank account',
          'Network of reliable local lawyers and notaries',
          'Experience with residencia and golden visa processes',
          'Knowledge of Ley de Costas and other Spanish regulations',
          'Tax structuring via Dutch and Spanish partners',
          'Project management support during construction'
        ]
      },
      cta: {
        title: 'Ready for Your Spanish Real Estate Project?',
        subtitle: 'Discuss your plans with our Valencia-based AI advisor or schedule a personal meeting in Valencia',
        btn1: 'Start Conversation',
        btn2: 'Schedule Valencia Meeting'
      },
      footer: {
        desc: 'Specialist in real estate financing for international investors and local developers in Spain.',
        contact: 'Contact',
        location: 'Location',
        valencia: 'Valencia, Spain (Head Office)',
        denia: 'Dénia, Costa Blanca',
        rights: '© 2024 Costa Capital. All rights reserved. Registered in Spain'
      },
      chat: {
        title: 'AI Financing Advisor',
        subtitle: 'Ask your questions about financing in Spain',
        placeholder: 'Ask your question...',
        empty: 'Start a conversation about your Spanish real estate project',
        suggestions: [
          'What are the terms for financing in Valencia?',
          'How does the NIE process work for foreign investors?',
          'What LTV does Costa Capital use for Costa Blanca projects?'
        ],
        systemPrompt: 'You are a financial advisor for Costa Capital, specialized in real estate financing for the Spanish market, particularly Valencia and Costa Blanca. You help international investors and local developers with questions about financing, Spanish regulations (NIE, escritura, nota simple), and investing in Spain.\n\nBe professional, commercial and to-the-point. Your goal is to generate leads by providing value and creating interest.\n\nImportant behavior:\n- Answer questions helpfully and completely\n- After 2-3 message exchanges, subtly encourage contact for a personal conversation\n- Mention: "For a detailed analysis of your specific project, feel free to contact us at info@costacapital.pro or call +31 6 8175 2045 (WhatsApp available)"\n- Emphasize unique advantages: local Valencia office, experience with international investors, fast decisions\n- Be enthusiastic but not pushy\n- Minimum financing €500K, maximum €50M+\n\nAnswer in English.'
      },
      calc: {
        title: 'Financing Calculator',
        subtitle: 'Get an indication for your Spanish project',
        loanAmount: 'Desired Loan Amount',
        projectValue: 'Project Value',
        term: 'Term',
        months: 'months',
        ltv: 'Loan-to-Value (LTV)',
        monthly: 'Indicative Monthly Payment',
        total: 'Total Interest (indicative)',
        note: '✓ This indication is based on standard terms for Spanish projects. For an exact quote, we would be happy to contact you.',
        discuss: 'Discuss with AI Advisor'
      }
    }
  };

  const reviews = {
    nl: [
      {
        name: 'Henrik Janssen',
        role: 'CEO, Nordic Investments',
        project: 'Luxury Villa Development Jávea',
        amount: '€4.2M',
        image: 'HJ',
        rating: 5,
        quote: 'Als Nederlander die in Spanje wilde investeren had ik behoefte aan een partner die beide markten begreep. Costa Capital regelde de financiering én help met NIE, notaris en lokale aannemer connecties. Hun Valencia kantoor was onmisbaar.',
        result: '6 villas gebouwd, allemaal verkocht aan Noord-Europese kopers, 38% ROI'
      },
      {
        name: 'Sarah & Michael Thompson',
        role: 'Private Investors, UK',
        project: 'Boutique Hotel Renovatie Dénia',
        amount: '€2.8M',
        image: 'ST',
        rating: 5,
        quote: 'We droomden van een boutique hotel aan de Costa Blanca maar Spaanse banken wilden niet financieren voor buitenlanders. Costa Capital structureerde een bridge loan met 65% LTV en begeleidde ons door alle Spaanse administratie.',
        result: '18 kamers gerenoveerd, volledige bezetting juli-september, 5-jaar terugverdientijd'
      },
      {
        name: 'Carlos Martínez',
        role: 'Desarrollador Local, Valencia',
        project: 'Woon-werk Complex Valencia',
        amount: '€8.5M',
        image: 'CM',
        rating: 5,
        quote: 'Como desarrollador español, necesitaba financiación rápida. Costa Capital entendió perfectamente el mercado valenciano y cerró el deal en 2 semanas. Su experiencia con inversores internacionales atrajo compradores holandeses.',
        result: '42 appartementen + 8 commerciële units, 85% verkocht pre-construcción'
      },
      {
        name: 'Laura van den Berg',
        role: 'Vastgoedinvesteerder, Rotterdam',
        project: 'Holiday Rental Portfolio Calpe',
        amount: '€3.6M',
        image: 'LB',
        rating: 5,
        quote: 'Ik wilde een portfolio van 8 appartementen kopen voor short-stay verhuur. Costa Capital financierde cross-collateralized en help met toerismelicenties. Hun kennis van Airbnb regelgeving in Valencia was cruciaal.',
        result: '8 appartementen, gemiddeld 75% bezetting, €180K jaarlijkse huurinkomsten'
      }
    ],
    en: [
      {
        name: 'Henrik Janssen',
        role: 'CEO, Nordic Investments',
        project: 'Luxury Villa Development Jávea',
        amount: '€4.2M',
        image: 'HJ',
        rating: 5,
        quote: 'As a Dutchman wanting to invest in Spain, I needed a partner who understood both markets. Costa Capital arranged financing AND helped with NIE, notary and local contractor connections. Their Valencia office was invaluable.',
        result: '6 villas built, all sold to Northern European buyers, 38% ROI'
      },
      {
        name: 'Sarah & Michael Thompson',
        role: 'Private Investors, UK',
        project: 'Boutique Hotel Renovation Dénia',
        amount: '€2.8M',
        image: 'ST',
        rating: 5,
        quote: 'We dreamed of a boutique hotel on Costa Blanca but Spanish banks would not finance foreigners. Costa Capital structured a bridge loan at 65% LTV and guided us through all Spanish administration.',
        result: '18 rooms renovated, full occupancy July-September, 5-year payback'
      },
      {
        name: 'Carlos Martínez',
        role: 'Local Developer, Valencia',
        project: 'Mixed-use Complex Valencia',
        amount: '€8.5M',
        image: 'CM',
        rating: 5,
        quote: 'As a Spanish developer, I needed fast financing. Costa Capital perfectly understood the Valencia market and closed the deal in 2 weeks. Their experience with international investors attracted Dutch buyers.',
        result: '42 apartments + 8 commercial units, 85% sold pre-construction'
      },
      {
        name: 'Laura van den Berg',
        role: 'Real Estate Investor, Rotterdam',
        project: 'Holiday Rental Portfolio Calpe',
        amount: '€3.6M',
        image: 'LB',
        rating: 5,
        quote: 'I wanted to buy a portfolio of 8 apartments for short-stay rental. Costa Capital financed cross-collateralized and helped with tourism licenses. Their knowledge of Airbnb regulations in Valencia was crucial.',
        result: '8 apartments, average 75% occupancy, €180K annual rental income'
      }
    ]
  };

  const text = t[language];
  const clientReviews = reviews[language];

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMsg = inputMessage;
    setInputMessage('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...chatMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content: userMsg }
          ],
          systemPrompt: text.chat.systemPrompt
        }),
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: language === 'nl' 
          ? 'Excuses, er ging iets mis. Neem direct contact op via info@costacapital.pro of bel/WhatsApp +31 6 8175 2045.' 
          : 'Sorry, something went wrong. Please contact us directly at info@costacapital.pro or call/WhatsApp +31 6 8175 2045.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const ltv = ((loanAmount / projectValue) * 100).toFixed(1);
  const monthlyRate = 0.008;
  const monthlyPayment = (loanAmount * monthlyRate).toFixed(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Building2 className="w-8 h-8 text-orange-400" />
          <span className="text-2xl font-bold">Costa Capital</span>
          <span className="text-sm text-slate-400 hidden sm:inline">• Valencia</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setLanguage('nl')}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                language === 'nl' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              NL
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                language === 'en' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
          <button 
            onClick={() => setContactOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition"
          >
            {text.nav.contact}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
          <span className="text-orange-400 text-sm font-semibold flex items-center gap-2 justify-center">
            <MapPin className="w-4 h-4" />
            {text.hero.badge}
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent whitespace-pre-line">
          {text.hero.title}
        </h1>
        <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
          {text.hero.subtitle}
        </p>
        <p className="text-orange-400 font-semibold mb-12 flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5" />
          {text.hero.location}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setChatOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
          >
            <MessageSquare className="w-5 h-5" />
            {text.hero.cta1}
          </button>
          <button 
            onClick={() => setCalcOpen(true)}
            className="bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition"
          >
            <Calculator className="w-5 h-5" />
            {text.hero.cta2}
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '€890M+', label: text.stats.financed },
            { value: '24u', label: text.stats.response },
            { value: '180+', label: text.stats.projects },
            { value: '96%', label: text.stats.satisfaction }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">{text.features.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: MapPin,
              title: text.features.speed.title,
              description: text.features.speed.desc
            },
            {
              icon: Globe,
              title: text.features.flex.title,
              description: text.features.flex.desc
            },
            {
              icon: Building2,
              title: text.features.complex.title,
              description: text.features.complex.desc
            }
          ].map((feature, i) => (
            <div key={i} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition">
              <feature.icon className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Markets Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{text.markets.title}</h2>
          <p className="text-xl text-slate-400">{text.markets.subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: text.markets.coastal.title,
              desc: text.markets.coastal.desc,
              icon: '🏖️'
            },
            {
              title: text.markets.commercial.title,
              desc: text.markets.commercial.desc,
              icon: '🏢'
            },
            {
              title: text.markets.tourism.title,
              desc: text.markets.tourism.desc,
              icon: '🏨'
            }
          ].map((market, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-xl p-8 hover:border-orange-500/50 transition">
              <div className="text-5xl mb-4">{market.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{market.title}</h3>
              <p className="text-slate-300">{market.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spanish Market Highlights */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{text.spanish.title}</h2>
              <p className="text-xl text-slate-300 mb-6">{text.spanish.intro}</p>
            </div>
            <div className="grid gap-4">
              {text.spanish.points.map((point, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-4">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{text.reviews.title}</h2>
          <p className="text-xl text-slate-400">{text.reviews.subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {clientReviews.map((review, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-orange-500/30 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {review.image}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{review.name}</div>
                    <div className="text-sm text-slate-400">{review.role}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-orange-400 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span className="font-semibold">{review.project}</span>
                  <span className="text-slate-500">•</span>
                  <span className="font-bold">{review.amount}</span>
                </div>
              </div>
              
              <Quote className="w-8 h-8 text-orange-500/20 mb-2" />
              <p className="text-slate-300 mb-4 italic">"{review.quote}"</p>
              
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <p className="text-sm text-orange-400 font-semibold">
                  ✓ {review.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-8 text-center">{text.social.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {text.social.benefits.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800/30 rounded-lg p-4">
                <Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">{text.cta.title}</h2>
          <p className="text-xl mb-8 opacity-90">
            {text.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setChatOpen(true)}
              className="bg-white text-orange-600 hover:bg-slate-100 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              {text.cta.btn1}
            </button>
            <button className="bg-orange-700 hover:bg-orange-800 px-8 py-4 rounded-lg font-semibold text-lg transition">
              {text.cta.btn2}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-slate-800">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-orange-400" />
              <span className="text-xl font-bold">Costa Capital</span>
            </div>
            <p className="text-slate-400">
              {text.footer.desc}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{text.footer.contact}</h4>
            <p className="text-slate-400">info@costacapital.pro</p>
            <p className="text-slate-400">+31 6 8175 2045</p>
            <p className="text-xs text-slate-500 mt-2">(WhatsApp beschikbaar)</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{text.footer.location}</h4>
            <p className="text-slate-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {text.footer.valencia}
            </p>
            <p className="text-slate-400 ml-6">{text.footer.denia}</p>
          </div>
        </div>
        <div className="text-center text-slate-500 text-sm pt-8 border-t border-slate-800">
          {text.footer.rights}
        </div>
      </footer>

      {/* AI Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-slate-700">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <div>
                <h3 className="text-xl font-bold">{text.chat.title}</h3>
                <p className="text-sm text-slate-400">{text.chat.subtitle}</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center text-slate-400 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{text.chat.empty}</p>
                  <div className="mt-6 grid gap-2">
                    {text.chat.suggestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInputMessage(q);
                        }}
                        className="text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-left transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-4 ${
                    msg.role === 'user' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-slate-700 text-slate-100'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={text.chat.placeholder}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculator Modal */}
      {calcOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl w-full max-w-2xl border border-slate-700">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <div>
                <h3 className="text-xl font-bold">{text.calc.title}</h3>
                <p className="text-sm text-slate-400">{text.calc.subtitle}</p>
              </div>
              <button onClick={() => setCalcOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {text.calc.loanAmount}: €{loanAmount.toLocaleString('nl-NL')}
                </label>
                <input
                  type="range"
                  min="500000"
                  max="50000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {text.calc.projectValue}: €{projectValue.toLocaleString('nl-NL')}
                </label>
                <input
                  type="range"
                  min="750000"
                  max="75000000"
                  step="250000"
                  value={projectValue}
                  onChange={(e) => setProjectValue(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {text.calc.term}: {term} {text.calc.months}
                </label>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="6"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">{text.calc.ltv}</span>
                  <span className="font-bold text-orange-400">{ltv}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{text.calc.monthly}</span>
                  <span className="font-bold">€{Number(monthlyPayment).toLocaleString('nl-NL')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{text.calc.total}</span>
                  <span className="font-bold">€{(monthlyPayment * term).toLocaleString('nl-NL')}</span>
                </div>
              </div>
              
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <p className="text-sm text-orange-400">
                  {text.calc.note}
                </p>
              </div>
              
              <button 
                onClick={() => {
                  setCalcOpen(false);
                  setChatOpen(true);
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold transition"
              >
                {text.calc.discuss}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {contactOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl w-full max-w-md border border-slate-700">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <div>
                <h3 className="text-xl font-bold">
                  {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
                </h3>
                <p className="text-sm text-slate-400">
                  {language === 'nl' ? 'Bespreek uw project met ons' : 'Discuss your project with us'}
                </p>
              </div>
              <button onClick={() => setContactOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-400" />
                  {language === 'nl' ? 'Direct Contact' : 'Direct Contact'}
                </h4>
                
                <div className="space-y-4">
                  <a 
                    href="tel:+31681752045"
                    className="flex items-center gap-3 bg-slate-700 hover:bg-slate-600 p-4 rounded-lg transition group"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                      📞
                    </div>
                    <div>
                      <div className="font-semibold">+31 6 8175 2045</div>
                      <div className="text-sm text-slate-400">
                        {language === 'nl' ? 'Bel of WhatsApp ons' : 'Call or WhatsApp us'}
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:info@costacapital.pro"
                    className="flex items-center gap-3 bg-slate-700 hover:bg-slate-600 p-4 rounded-lg transition group"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                      ✉️
                    </div>
                    <div>
                      <div className="font-semibold">info@costacapital.pro</div>
                      <div className="text-sm text-slate-400">
                        {language === 'nl' ? 'Stuur ons een email' : 'Send us an email'}
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://wa.me/31681752045"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-green-600 hover:bg-green-700 p-4 rounded-lg transition group"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition">
                      💬
                    </div>
                    <div>
                      <div className="font-semibold">WhatsApp</div>
                      <div className="text-sm text-green-200">
                        {language === 'nl' ? 'Chat direct met ons' : 'Chat with us directly'}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-300">
                    <div className="font-semibold mb-1">
                      {language === 'nl' ? 'Ons Kantoor' : 'Our Office'}
                    </div>
                    <div>Valencia, Spanje</div>
                    <div className="text-slate-400 mt-1">
                      {language === 'nl' 
                        ? 'Lokaal team met internationale ervaring'
                        : 'Local team with international experience'}
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setContactOpen(false);
                  setChatOpen(true);
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                {language === 'nl' ? 'Of chat met onze AI Adviseur' : 'Or chat with our AI Advisor'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
