import React, { useState } from 'react';
import { Building2, MessageSquare, Calculator, ChevronRight, Check, X, Star, Quote, MapPin, Globe, ArrowLeft } from 'lucide-react';

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
      nav: { contact: 'Contact', backLabel: 'Terug naar hoofdsite' },
      hero: {
        badge: 'Gespecialiseerd op Spaanse Kustgebieden',
        title: 'Vastgoedfinanciering\nSpaanse Costas',
        subtitle: 'Expert in Costa del Sol, Costa Blanca en Valencia regio. Financiering voor internationale investeerders en lokale ontwikkelaars. Van €500K tot €50M+.',
        cta1: 'Start AI Gesprek',
        cta2: 'Bereken Financiering',
        location: 'Gevestigd in Valencia, Spanje'
      },
      stats: { financed: 'Gefinancierd in Spanje', response: 'Eerste Reactie', projects: 'Spaanse Projecten', satisfaction: 'Klanttevredenheid' },
      features: {
        title: 'Waarom Costa Capital voor Spaanse Costas?',
        speed: { title: 'Lokale Expertise', desc: 'Kantoor in Valencia met diepgaande kennis van de gehele Spaanse kust: Costa del Sol (Marbella, Málaga), Costa Blanca (Alicante, Dénia), en Valencia. Wij spreken de taal - letterlijk en figuurlijk.' },
        flex: { title: 'Internationale Structuren', desc: 'Ervaring met cross-border deals, offshore structuren en fiscale optimalisatie voor buitenlandse investeerders in Spanje.' },
        complex: { title: 'Specialist Spaanse Kustgebieden', desc: 'Van Marbella tot Valencia: Málaga, Marbella, Estepona, Benidorm, Alicante, Dénia, Jávea, Valencia. Wij kennen de Spaanse costas als onze broekzak en hebben netwerken met lokale notarissen, advocaten en ontwikkelaars.' }
      },
      markets: {
        title: 'Onze Specialisaties in Spanje',
        subtitle: 'Van Costa del Sol tot Costa Blanca',
        coastal: { title: 'Luxe Kustwoningen', desc: "Villa's, appartementen en resort ontwikkelingen langs Costa del Sol en Costa Blanca. Van Marbella tot Valencia. LTV tot 70% voor sterke locaties." },
        commercial: { title: 'Commercieel Vastgoed', desc: 'Retail, horeca en kantoorruimtes in Málaga, Marbella, Valencia en andere kustgebieden. Ideaal voor internationale retailers.' },
        tourism: { title: 'Toeristische Projecten', desc: 'Hotels, vakantiewoningen en short-stay complexen. Begrip van Spaanse toerismelicenties en regelgeving. Recent project: €10M hotel Marbella.' }
      },
      reviews: { title: 'Succesvolle Financieringen in Spanje', subtitle: 'Wat onze klanten zeggen over hun projecten aan de Spaanse kust' },
      spanish: {
        title: 'De Spaanse Vastgoedmarkt',
        intro: 'Waarom investeren in de Spaanse kustgebieden?',
        points: ['300+ dagen zon per jaar - ideaal klimaat op alle costas', 'Groeiende internationale vraag van Costa del Sol tot Costa Blanca', 'Málaga, Marbella, Valencia: sterke groei en infrastructuur', 'Relatief lage vastgoedprijzen vs andere EU kustgebieden', 'Stabiele huurmarkt dankzij toerisme en expats', 'Nieuwe infrastructuur: AVE netwerk, luchthaven uitbreidingen']
      },
      process: { title: 'Het Financieringsproces', subtitle: 'Van aanvraag tot closing in Spanje' },
      social: {
        title: 'Waarom internationale investeerders ons kiezen',
        benefits: ['Begeleiding bij NIE aanvraag en Spaanse bankrekening', 'Netwerk van betrouwbare lokale advocaten en notarissen (Costa del Sol tot Costa Blanca)', 'Ervaring met residencia en golden visa trajecten', 'Kennis van Ley de Costas en andere Spaanse regelgeving', 'Fiscale structurering via Nederlandse en Spaanse partners', 'Project management ondersteuning tijdens bouw']
      },
      cta: { title: 'Klaar voor uw Spaanse vastgoedproject?', subtitle: 'Bespreek uw plannen met onze Valencia-based AI-adviseur of plan een persoonlijk gesprek in', btn1: 'Start Gesprek', btn2: 'Plan Meeting' },
      footer: { desc: 'Specialist in vastgoedfinanciering voor internationale investeerders en lokale ontwikkelaars in Spanje.', contact: 'Contact', location: 'Locatie', valencia: 'Valencia, Spanje (Hoofdkantoor)', denia: 'Dénia, Costa Blanca', rights: '© 2024 Costa Capital. Alle rechten voorbehouden. Geregistreerd in Spanje' },
      chat: {
        title: 'AI Financierings Adviseur',
        subtitle: 'Stel uw vragen over financiering in Spanje',
        placeholder: 'Stel uw vraag...',
        empty: 'Start een gesprek over uw Spaanse vastgoedproject',
        suggestions: ['Wat zijn de voorwaarden voor financiering in Marbella?', 'Hoe werkt het NIE proces voor buitenlandse investeerders?', 'Welke LTV hanteert Costa Capital voor Costa del Sol projecten?'],
        systemPrompt: 'Je bent een financieel adviseur voor Costa Capital, gespecialiseerd in vastgoedfinanciering voor de Spaanse kustgebieden: Costa del Sol (Marbella, Málaga, Estepona), Costa Blanca (Alicante, Benidorm, Dénia, Jávea) en Valencia. Je helpt internationale investeerders en lokale ontwikkelaars met vragen over financiering, Spaanse regelgeving (NIE, escritura, nota simple), en het investeren in Spanje.\n\nWees professioneel, commercieel en to-the-point. Je doel is om leads te genereren door waarde te bieden en interesse te wekken.\n\nBelangrijk gedrag:\n- Beantwoord vragen nuttig en compleet\n- Na 2-3 berichten uitwisseling, moedig subtiel aan om contact op te nemen voor een persoonlijk gesprek\n- Vermeld: "Voor een gedetailleerde analyse van uw specifieke project, neem gerust contact met ons op via info@costacapital.pro of bel +31 6 8175 2045 (WhatsApp mogelijk)"\n- Benadruk unieke voordelen: lokaal kantoor Valencia, ervaring met gehele Spaanse kust (Costa del Sol tot Costa Blanca), ervaring met internationale investeerders, snelle beslissingen\n- Recent project voorbeeld: €10M financiering hotel Marbella\n- Wees enthousiast maar niet pusherig\n- Minimale financiering €500K, maximaal €50M+\n\nAntwoord in het Nederlands.'
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
      nav: { contact: 'Contact', backLabel: 'Back to main site' },
      hero: {
        badge: 'Specialized in Spanish Coastal Areas',
        title: 'Real Estate Financing\nSpanish Costas',
        subtitle: 'Expert in Costa del Sol, Costa Blanca and Valencia region. Financing for international investors and local developers. From €500K to €50M+.',
        cta1: 'Start AI Chat',
        cta2: 'Calculate Financing',
        location: 'Based in Valencia, Spain'
      },
      stats: { financed: 'Financed in Spain', response: 'First Response', projects: 'Spanish Projects', satisfaction: 'Client Satisfaction' },
      features: {
        title: 'Why Costa Capital for Spanish Costas?',
        speed: { title: 'Local Expertise', desc: 'Valencia office with deep knowledge of entire Spanish coast: Costa del Sol (Marbella, Málaga), Costa Blanca (Alicante, Dénia), and Valencia. We speak the language - literally and figuratively.' },
        flex: { title: 'International Structures', desc: 'Experience with cross-border deals, offshore structures and tax optimization for foreign investors in Spain.' },
        complex: { title: 'Spanish Coast Specialist', desc: 'From Marbella to Valencia: Málaga, Marbella, Estepona, Benidorm, Alicante, Dénia, Jávea, Valencia. We know the Spanish costas inside out and have networks with local notaries, lawyers and developers.' }
      },
      markets: {
        title: 'Our Specializations in Spain',
        subtitle: 'From Costa del Sol to Costa Blanca',
        coastal: { title: 'Luxury Coastal Properties', desc: "Villas, apartments and resort developments along Costa del Sol and Costa Blanca. From Marbella to Valencia. LTV up to 70% for strong locations." },
        commercial: { title: 'Commercial Real Estate', desc: 'Retail, hospitality and office spaces in Málaga, Marbella, Valencia and other coastal areas. Ideal for international retailers.' },
        tourism: { title: 'Tourism Projects', desc: 'Hotels, holiday homes and short-stay complexes. Understanding of Spanish tourism licenses and regulations. Recent project: €10M hotel Marbella.' }
      },
      reviews: { title: 'Successful Financings in Spain', subtitle: 'What our clients say about their Spanish coastal projects' },
      spanish: {
        title: 'The Spanish Real Estate Market',
        intro: 'Why invest in Spanish coastal areas?',
        points: ['300+ days of sunshine per year - ideal climate on all costas', 'Growing international demand from Costa del Sol to Costa Blanca', 'Málaga, Marbella, Valencia: strong growth and infrastructure', 'Relatively low property prices vs other EU coastal areas', 'Stable rental market thanks to tourism and expats', 'New infrastructure: AVE network, airport expansions']
      },
      process: { title: 'The Financing Process', subtitle: 'From application to closing in Spain' },
      social: {
        title: 'Why international investors choose us',
        benefits: ['Assistance with NIE application and Spanish bank account', 'Network of reliable local lawyers and notaries (Costa del Sol to Costa Blanca)', 'Experience with residencia and golden visa processes', 'Knowledge of Ley de Costas and other Spanish regulations', 'Tax structuring via Dutch and Spanish partners', 'Project management support during construction']
      },
      cta: { title: 'Ready for Your Spanish Real Estate Project?', subtitle: 'Discuss your plans with our Valencia-based AI advisor or schedule a personal meeting', btn1: 'Start Conversation', btn2: 'Schedule Meeting' },
      footer: { desc: 'Specialist in real estate financing for international investors and local developers in Spain.', contact: 'Contact', location: 'Location', valencia: 'Valencia, Spain (Head Office)', denia: 'Dénia, Costa Blanca', rights: '© 2024 Costa Capital. All rights reserved. Registered in Spain' },
      chat: {
        title: 'AI Financing Advisor',
        subtitle: 'Ask your questions about financing in Spain',
        placeholder: 'Ask your question...',
        empty: 'Start a conversation about your Spanish real estate project',
        suggestions: ['What are the terms for financing in Marbella?', 'How does the NIE process work for foreign investors?', 'What LTV does Costa Capital use for Costa del Sol projects?'],
        systemPrompt: 'You are a financial advisor for Costa Capital, specialized in real estate financing for Spanish coastal areas: Costa del Sol (Marbella, Málaga, Estepona), Costa Blanca (Alicante, Benidorm, Dénia, Jávea) and Valencia. You help international investors and local developers with questions about financing, Spanish regulations (NIE, escritura, nota simple), and investing in Spain.\n\nBe professional, commercial and to-the-point. Your goal is to generate leads by providing value and creating interest.\n\nImportant behavior:\n- Answer questions helpfully and completely\n- After 2-3 message exchanges, subtly encourage contact for a personal conversation\n- Mention: "For a detailed analysis of your specific project, feel free to contact us at info@costacapital.pro or call +31 6 8175 2045 (WhatsApp available)"\n- Emphasize unique advantages: local Valencia office, experience with entire Spanish coast (Costa del Sol to Costa Blanca), experience with international investors, fast decisions\n- Recent project example: €10M hotel financing Marbella\n- Be enthusiastic but not pushy\n- Minimum financing €500K, maximum €50M+\n\nAnswer in English.'
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
    },
    es: {
      nav: { contact: 'Contacto', backLabel: 'Volver al sitio principal' },
      hero: {
        badge: 'Especializados en zonas costeras españolas',
        title: 'Financiación Inmobiliaria\nCostas Españolas',
        subtitle: 'Expertos en Costa del Sol, Costa Blanca y región de Valencia. Financiación para inversores internacionales y promotores locales. De €500K a €50M+.',
        cta1: 'Iniciar Chat IA',
        cta2: 'Calcular Financiación',
        location: 'Con sede en Valencia, España'
      },
      stats: { financed: 'Financiado en España', response: 'Primera Respuesta', projects: 'Proyectos en España', satisfaction: 'Satisfacción del Cliente' },
      features: {
        title: '¿Por qué Costa Capital para las costas españolas?',
        speed: { title: 'Experiencia Local', desc: 'Oficina en Valencia con profundo conocimiento de toda la costa española: Costa del Sol (Marbella, Málaga), Costa Blanca (Alicante, Dénia), y Valencia. Hablamos el idioma, literal y figuradamente.' },
        flex: { title: 'Estructuras Internacionales', desc: 'Experiencia en operaciones transfronterizas, estructuras offshore y optimización fiscal para inversores extranjeros en España.' },
        complex: { title: 'Especialistas en Costas Españolas', desc: 'De Marbella a Valencia: Málaga, Marbella, Estepona, Benidorm, Alicante, Dénia, Jávea, Valencia. Conocemos las costas españolas como la palma de nuestra mano.' }
      },
      markets: {
        title: 'Nuestras Especializaciones en España',
        subtitle: 'De la Costa del Sol a la Costa Blanca',
        coastal: { title: 'Propiedades Costeras de Lujo', desc: 'Villas, apartamentos y desarrollos resort a lo largo de Costa del Sol y Costa Blanca. De Marbella a Valencia. LTV hasta el 70% para ubicaciones sólidas.' },
        commercial: { title: 'Inmobiliario Comercial', desc: 'Retail, hostelería y oficinas en Málaga, Marbella, Valencia y otras zonas costeras. Ideal para retailers internacionales.' },
        tourism: { title: 'Proyectos Turísticos', desc: 'Hoteles, viviendas vacacionales y complejos de alquiler corto. Conocimiento de licencias turísticas españolas. Proyecto reciente: hotel Marbella €10M.' }
      },
      reviews: { title: 'Financiaciones Exitosas en España', subtitle: 'Lo que dicen nuestros clientes sobre sus proyectos en la costa española' },
      spanish: {
        title: 'El Mercado Inmobiliario Español',
        intro: '¿Por qué invertir en las zonas costeras españolas?',
        points: ['Más de 300 días de sol al año - clima ideal en todas las costas', 'Demanda internacional creciente de Costa del Sol a Costa Blanca', 'Málaga, Marbella, Valencia: fuerte crecimiento e infraestructuras', 'Precios inmobiliarios relativamente bajos vs otras zonas costeras de la UE', 'Mercado de alquiler estable gracias al turismo y expatriados', 'Nueva infraestructura: red AVE, ampliaciones aeroportuarias']
      },
      process: { title: 'El Proceso de Financiación', subtitle: 'Desde la solicitud hasta el cierre en España' },
      social: {
        title: 'Por qué los inversores internacionales nos eligen',
        benefits: ['Asistencia con la solicitud de NIE y cuenta bancaria española', 'Red de abogados y notarios locales de confianza (Costa del Sol a Costa Blanca)', 'Experiencia con procesos de residencia y golden visa', 'Conocimiento de la Ley de Costas y otras normativas españolas', 'Estructuración fiscal a través de socios holandeses y españoles', 'Apoyo en gestión de proyectos durante la construcción']
      },
      cta: { title: '¿Listo para su proyecto inmobiliario en España?', subtitle: 'Hable con nuestro asesor IA con sede en Valencia o programe una reunión personal', btn1: 'Iniciar Conversación', btn2: 'Programar Reunión' },
      footer: { desc: 'Especialistas en financiación inmobiliaria para inversores internacionales y promotores locales en España.', contact: 'Contacto', location: 'Ubicación', valencia: 'Valencia, España (Sede Central)', denia: 'Dénia, Costa Blanca', rights: '© 2024 Costa Capital. Todos los derechos reservados. Registrado en España' },
      chat: {
        title: 'Asesor IA de Financiación',
        subtitle: 'Haga sus preguntas sobre financiación en España',
        placeholder: 'Haga su pregunta...',
        empty: 'Inicie una conversación sobre su proyecto inmobiliario en España',
        suggestions: ['¿Cuáles son las condiciones de financiación en Marbella?', '¿Cómo funciona el proceso NIE para inversores extranjeros?', '¿Qué LTV aplica Costa Capital para proyectos en Costa del Sol?'],
        systemPrompt: 'Eres un asesor financiero de Costa Capital, especializado en financiación inmobiliaria para las zonas costeras españolas: Costa del Sol (Marbella, Málaga, Estepona), Costa Blanca (Alicante, Benidorm, Dénia, Jávea) y Valencia. Ayudas a inversores internacionales y promotores locales con preguntas sobre financiación, normativa española (NIE, escritura, nota simple) e inversión en España.\n\nSé profesional, comercial y directo. Tu objetivo es generar leads aportando valor y despertando interés.\n\nComportamiento importante:\n- Responde las preguntas de forma útil y completa\n- Después de 2-3 intercambios, anima sutilmente a contactar para una conversación personal\n- Menciona: "Para un análisis detallado de su proyecto específico, contáctenos en info@costacapital.pro o llame al +31 6 8175 2045 (WhatsApp disponible)"\n- Destaca ventajas únicas: oficina local en Valencia, experiencia con toda la costa española, inversores internacionales, decisiones rápidas\n- Sé entusiasta pero no insistente\n- Financiación mínima €500K, máxima €50M+\n\nResponde en español.'
      },
      calc: {
        title: 'Calculadora de Financiación',
        subtitle: 'Obtenga una indicación para su proyecto en España',
        loanAmount: 'Importe de Préstamo Deseado',
        projectValue: 'Valor del Proyecto',
        term: 'Plazo',
        months: 'meses',
        ltv: 'Loan-to-Value (LTV)',
        monthly: 'Cuota Mensual Indicativa',
        total: 'Intereses Totales (indicativo)',
        note: '✓ Esta indicación se basa en condiciones estándar para proyectos en España. Para una oferta exacta, nos pondremos en contacto con usted.',
        discuss: 'Consultar con Asesor IA'
      }
    }
  };

  const reviews = {
    nl: [
      { name: 'Alexander Petrov', role: 'CEO, Mediterranean Investments', project: 'Boutique Hotel Marbella', amount: '€10M', image: 'AP', rating: 5, quote: 'Voor ons 5-sterren boutique hotel in Marbella hadden we een substantiële financiering nodig. Costa Capital begreep de luxe markt aan de Costa del Sol perfect en structureerde een pakket dat paste bij ons ambitieuze project.', result: '45 kamers + spa faciliteit, opening Q2 2025, pre-bookings vanaf €450/nacht' },
      { name: 'Henrik Janssen', role: 'CEO, Nordic Investments', project: 'Luxury Villa Development Jávea', amount: '€4.2M', image: 'HJ', rating: 5, quote: 'Als Nederlander die in Spanje wilde investeren had ik behoefte aan een partner die beide markten begreep. Costa Capital regelde de financiering én hielp met NIE, notaris en lokale aannemer connecties.', result: '6 villas gebouwd, allemaal verkocht aan Noord-Europese kopers, 38% ROI' },
      { name: 'Sarah & Michael Thompson', role: 'Private Investors, UK', project: 'Boutique Hotel Renovatie Dénia', amount: '€2.8M', image: 'ST', rating: 5, quote: 'We droomden van een boutique hotel aan de Costa Blanca maar Spaanse banken wilden niet financieren voor buitenlanders. Costa Capital structureerde een bridge loan met 65% LTV.', result: '18 kamers gerenoveerd, volledige bezetting juli-september, 5-jaar terugverdientijd' },
      { name: 'Carlos Martínez', role: 'Desarrollador Local, Valencia', project: 'Woon-werk Complex Valencia', amount: '€8.5M', image: 'CM', rating: 5, quote: 'Como desarrollador español, necesitaba financiación rápida. Costa Capital entendió perfectamente el mercado valenciano y cerró el deal en 2 semanas.', result: '42 appartementen + 8 commerciële units, 85% verkocht pre-construcción' }
    ],
    en: [
      { name: 'Henrik Janssen', role: 'CEO, Nordic Investments', project: 'Luxury Villa Development Jávea', amount: '€4.2M', image: 'HJ', rating: 5, quote: 'As a Dutchman wanting to invest in Spain, I needed a partner who understood both markets. Costa Capital arranged financing AND helped with NIE, notary and local contractor connections. Their Valencia office was invaluable.', result: '6 villas built, all sold to Northern European buyers, 38% ROI' },
      { name: 'Sarah & Michael Thompson', role: 'Private Investors, UK', project: 'Boutique Hotel Renovation Dénia', amount: '€2.8M', image: 'ST', rating: 5, quote: 'We dreamed of a boutique hotel on Costa Blanca but Spanish banks would not finance foreigners. Costa Capital structured a bridge loan at 65% LTV and guided us through all Spanish administration.', result: '18 rooms renovated, full occupancy July-September, 5-year payback' },
      { name: 'Carlos Martínez', role: 'Local Developer, Valencia', project: 'Mixed-use Complex Valencia', amount: '€8.5M', image: 'CM', rating: 5, quote: 'As a Spanish developer, I needed fast financing. Costa Capital perfectly understood the Valencia market and closed the deal in 2 weeks.', result: '42 apartments + 8 commercial units, 85% sold pre-construction' },
      { name: 'Laura van den Berg', role: 'Real Estate Investor, Rotterdam', project: 'Holiday Rental Portfolio Calpe', amount: '€3.6M', image: 'LB', rating: 5, quote: 'I wanted to buy a portfolio of 8 apartments for short-stay rental. Costa Capital financed cross-collateralized and helped with tourism licenses.', result: '8 apartments, average 75% occupancy, €180K annual rental income' }
    ],
    es: [
      { name: 'Alexander Petrov', role: 'CEO, Mediterranean Investments', project: 'Hotel Boutique Marbella', amount: '€10M', image: 'AP', rating: 5, quote: 'Para nuestro hotel boutique de 5 estrellas en Marbella necesitábamos una financiación sustancial. Costa Capital entendió perfectamente el mercado de lujo de la Costa del Sol y estructuró un paquete a medida.', result: '45 habitaciones + spa, apertura Q2 2025, reservas previas desde €450/noche' },
      { name: 'Henrik Janssen', role: 'CEO, Nordic Investments', project: 'Desarrollo Villas de Lujo Jávea', amount: '€4.2M', image: 'HJ', rating: 5, quote: 'Como holandés queriendo invertir en España, necesitaba un socio que entendiera ambos mercados. Costa Capital gestionó la financiación Y ayudó con el NIE, notaría y contactos con constructores locales.', result: '6 villas construidas, todas vendidas a compradores del norte de Europa, 38% ROI' },
      { name: 'Carlos Martínez', role: 'Promotor Local, Valencia', project: 'Complejo Mixto Valencia', amount: '€8.5M', image: 'CM', rating: 5, quote: 'Como promotor español necesitaba financiación rápida. Costa Capital entendió perfectamente el mercado valenciano y cerró la operación en 2 semanas.', result: '42 apartamentos + 8 locales comerciales, 85% vendido sobre plano' },
      { name: 'Laura van den Berg', role: 'Inversora Inmobiliaria, Rotterdam', project: 'Portfolio Alquiler Vacacional Calpe', amount: '€3.6M', image: 'LB', rating: 5, quote: 'Quería comprar un portfolio de 8 apartamentos para alquiler de corta estancia. Costa Capital financió con garantía cruzada y ayudó con las licencias turísticas.', result: '8 apartamentos, ocupación media 75%, €180K de ingresos anuales por alquiler' }
    ]
  };

  const text = t[language] || t['nl'];
  const clientReviews = reviews[language] || reviews['nl'];

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const userMsg = inputMessage;
    setInputMessage('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages.map(msg => ({ role: msg.role, content: msg.content })), { role: 'user', content: userMsg }],
          systemPrompt: text.chat.systemPrompt
        }),
      });
      if (!response.ok) throw new Error('API call failed');
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: language === 'nl' ? 'Excuses, er ging iets mis. Neem direct contact op via info@costacapital.pro of bel/WhatsApp +31 6 8175 2045.' : language === 'es' ? 'Lo sentimos, algo salió mal. Contáctenos directamente en info@costacapital.pro o llame/WhatsApp +31 6 8175 2045.' : 'Sorry, something went wrong. Please contact us directly at info@costacapital.pro or call/WhatsApp +31 6 8175 2045.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const ltv = ((loanAmount / projectValue) * 100).toFixed(1);
  const monthlyRate = 0.008;
  const monthlyPayment = (loanAmount * monthlyRate).toFixed(0);

  const openMeetingEmail = () => {
    const subject = language === 'nl' ? 'Aanvraag Meeting - Costa Capital' : language === 'es' ? 'Solicitud de Reunión - Costa Capital' : 'Meeting Request - Costa Capital';
    const body = language === 'nl'
      ? `Beste Costa Capital team,\n\nIk ben geïnteresseerd in het plannen van een persoonlijk gesprek om mijn vastgoedproject in Spanje te bespreken.\n\nNaam: [Uw volledige naam]\nTelefoon: [Uw telefoonnummer]\nLocatie project: [bijv. Valencia, Dénia, Marbella]\nType project: [bijv. Villa ontwikkeling, Hotel renovatie]\nGewenste financiering: € [bedrag]\n\nMet vriendelijke groet,\n[Uw naam]`
      : language === 'es'
      ? `Estimado equipo de Costa Capital,\n\nEstoy interesado en programar una reunión personal para hablar sobre mi proyecto inmobiliario en España.\n\nNombre: [Su nombre completo]\nTeléfono: [Su número de teléfono]\nUbicación del proyecto: [p.ej. Valencia, Dénia, Marbella]\nTipo de proyecto: [p.ej. Desarrollo de villas, Renovación de hotel]\nFinanciación deseada: € [importe]\n\nAtentamente,\n[Su nombre]`
      : `Dear Costa Capital team,\n\nI am interested in scheduling a personal meeting to discuss my real estate project in Spain.\n\nName: [Your full name]\nPhone: [Your phone number]\nProject location: [e.g. Valencia, Dénia, Marbella]\nProject type: [e.g. Villa development, Hotel renovation]\nDesired financing: € [amount]\n\nBest regards,\n[Your name]`;
    window.location.href = `mailto:info@costacapital.pro?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // ─── GOLD RANGE SLIDER FILL (inline style helper) ───
  const sliderStyle = (val, min, max) => {
    const pct = ((val - min) / (max - min)) * 100;
    return { background: `linear-gradient(to right, #c8a96e ${pct}%, #2a2a2a ${pct}%)` };
  };

  return (
    <div className="cc-root">

      {/* ═══ TOP BAR — back to main site ═══ */}
      <div className="cc-topbar">
        <a href="https://costacapital.pro" className="cc-topbar-back">
          <ArrowLeft size={14} />
          <span>{text.nav.backLabel}</span>
        </a>
        <span className="cc-topbar-domain">costacapital.pro</span>
      </div>

      {/* ═══ NAVIGATION ═══ */}
      <nav className="cc-nav">
        <a href="https://costacapital.pro" className="cc-logo">
          Costa <span>Capital</span>
        </a>
        <div className="cc-nav-right">
          <div className="cc-lang-toggle">
            {['nl', 'en', 'es'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`cc-lang-btn${language === lang ? ' active' : ''}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => setContactOpen(true)} className="cc-btn-primary">
            {text.nav.contact}
          </button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <header className="cc-hero">
        <div className="cc-hero-bg" />
        <div className="cc-hero-grid" />
        <div className="cc-hero-inner">
          <div className="cc-hero-badge">
            <MapPin size={13} />
            {text.hero.badge}
          </div>
          <h1 className="cc-hero-title">{text.hero.title.split('\n').map((line, i) => (
            <span key={i}>{i === 1 ? <em>{line}</em> : line}{i === 0 && <br />}</span>
          ))}</h1>
          <p className="cc-hero-sub">{text.hero.subtitle}</p>
          <p className="cc-hero-location">
            <MapPin size={15} />
            {text.hero.location}
          </p>
          <div className="cc-hero-actions">
            <button onClick={() => setChatOpen(true)} className="cc-btn-primary cc-btn-lg">
              <MessageSquare size={18} />
              {text.hero.cta1}
            </button>
            <button onClick={() => setCalcOpen(true)} className="cc-btn-ghost cc-btn-lg">
              <Calculator size={18} />
              {text.hero.cta2}
            </button>
          </div>
        </div>
      </header>

      {/* ═══ STATS ═══ */}
      <section className="cc-stats">
        {[
          { value: '€890M+', label: text.stats.financed },
          { value: '24u', label: text.stats.response },
          { value: '180+', label: text.stats.projects },
          { value: '96%', label: text.stats.satisfaction }
        ].map((s, i) => (
          <div key={i} className="cc-stat">
            <div className="cc-stat-num">{s.value}</div>
            <div className="cc-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="cc-section">
        <h2 className="cc-section-title">{text.features.title}</h2>
        <div className="cc-grid-3">
          {[
            { Icon: MapPin, title: text.features.speed.title, desc: text.features.speed.desc },
            { Icon: Globe, title: text.features.flex.title, desc: text.features.flex.desc },
            { Icon: Building2, title: text.features.complex.title, desc: text.features.complex.desc }
          ].map(({ Icon, title, desc }, i) => (
            <div key={i} className="cc-card">
              <div className="cc-card-icon"><Icon size={28} /></div>
              <h3 className="cc-card-title">{title}</h3>
              <p className="cc-card-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MARKETS ═══ */}
      <section className="cc-section cc-section-alt">
        <div className="cc-section-header">
          <h2 className="cc-section-title">{text.markets.title}</h2>
          <p className="cc-section-sub">{text.markets.subtitle}</p>
        </div>
        <div className="cc-grid-3">
          {[
            { icon: '🏖️', title: text.markets.coastal.title, desc: text.markets.coastal.desc },
            { icon: '🏢', title: text.markets.commercial.title, desc: text.markets.commercial.desc },
            { icon: '🏨', title: text.markets.tourism.title, desc: text.markets.tourism.desc }
          ].map((m, i) => (
            <div key={i} className="cc-card">
              <div className="cc-market-icon">{m.icon}</div>
              <h3 className="cc-card-title">{m.title}</h3>
              <p className="cc-card-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SPANISH MARKET ═══ */}
      <section className="cc-section">
        <div className="cc-highlight-box">
          <div className="cc-highlight-left">
            <h2 className="cc-section-title" style={{marginBottom:'1rem'}}>{text.spanish.title}</h2>
            <p className="cc-section-sub">{text.spanish.intro}</p>
          </div>
          <div className="cc-highlight-right">
            {text.spanish.points.map((point, i) => (
              <div key={i} className="cc-check-item">
                <Check size={16} className="cc-check-icon" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="cc-section cc-section-alt">
        <div className="cc-section-header">
          <h2 className="cc-section-title">{text.reviews.title}</h2>
          <p className="cc-section-sub">{text.reviews.subtitle}</p>
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
                  {[...Array(review.rating)].map((_, j) => <Star key={j} size={14} fill="#c8a96e" color="#c8a96e" />)}
                </div>
              </div>
              <div className="cc-review-meta">
                <Building2 size={13} />
                <span>{review.project}</span>
                <span className="cc-dot">·</span>
                <strong>{review.amount}</strong>
              </div>
              <Quote size={24} className="cc-quote-icon" />
              <p className="cc-review-quote">"{review.quote}"</p>
              <div className="cc-review-result">✓ {review.result}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="cc-section">
        <div className="cc-highlight-box cc-highlight-center">
          <h3 className="cc-section-title" style={{marginBottom:'2rem'}}>{text.social.title}</h3>
          <div className="cc-grid-3">
            {text.social.benefits.map((item, i) => (
              <div key={i} className="cc-check-item cc-check-card">
                <Check size={15} className="cc-check-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cc-section">
        <div className="cc-cta-box">
          <h2 className="cc-cta-title">{text.cta.title}</h2>
          <p className="cc-cta-sub">{text.cta.subtitle}</p>
          <div className="cc-hero-actions">
            <button onClick={() => setChatOpen(true)} className="cc-btn-dark cc-btn-lg">
              {text.cta.btn1}
            </button>
            <button onClick={openMeetingEmail} className="cc-btn-outline-dark cc-btn-lg">
              {text.cta.btn2}
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
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
            <p className="cc-muted-sm">(WhatsApp beschikbaar)</p>
          </div>
          <div>
            <h4 className="cc-footer-heading">{text.footer.location}</h4>
            <p className="cc-muted cc-location"><MapPin size={14} />{text.footer.valencia}</p>
            <p className="cc-muted" style={{marginLeft:'1.2rem'}}>{text.footer.denia}</p>
          </div>
        </div>
        <div className="cc-footer-bottom">{text.footer.rights}</div>
      </footer>

      {/* ═══ AI CHAT MODAL ═══ */}
      {chatOpen && (
        <div className="cc-modal-overlay">
          <div className="cc-modal">
            <div className="cc-modal-header">
              <div>
                <h3 className="cc-modal-title">{text.chat.title}</h3>
                <p className="cc-modal-sub">{text.chat.subtitle}</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="cc-modal-close"><X size={20} /></button>
            </div>
            <div className="cc-chat-body">
              {chatMessages.length === 0 && (
                <div className="cc-chat-empty">
                  <MessageSquare size={40} className="cc-chat-empty-icon" />
                  <p>{text.chat.empty}</p>
                  <div className="cc-suggestions">
                    {text.chat.suggestions.map((q, i) => (
                      <button key={i} onClick={() => setInputMessage(q)} className="cc-suggestion">{q}</button>
                    ))}
                  </div>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`cc-msg-row${msg.role === 'user' ? ' user' : ''}`}>
                  <div className={`cc-msg${msg.role === 'user' ? ' cc-msg-user' : ' cc-msg-ai'}`}>
                    <p style={{whiteSpace:'pre-wrap'}}>{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="cc-msg-row">
                  <div className="cc-msg cc-msg-ai">
                    <span className="cc-dot-1" /><span className="cc-dot-2" /><span className="cc-dot-3" />
                  </div>
                </div>
              )}
            </div>
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
              <button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()} className="cc-chat-send">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ CALCULATOR MODAL ═══ */}
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
              <div className="cc-slider-group">
                <label className="cc-slider-label">{text.calc.loanAmount}: <strong>€{loanAmount.toLocaleString('nl-NL')}</strong></label>
                <input type="range" min="500000" max="50000000" step="100000" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="cc-slider" style={sliderStyle(loanAmount, 500000, 50000000)} />
              </div>
              <div className="cc-slider-group">
                <label className="cc-slider-label">{text.calc.projectValue}: <strong>€{projectValue.toLocaleString('nl-NL')}</strong></label>
                <input type="range" min="750000" max="75000000" step="250000" value={projectValue} onChange={e => setProjectValue(Number(e.target.value))} className="cc-slider" style={sliderStyle(projectValue, 750000, 75000000)} />
              </div>
              <div className="cc-slider-group">
                <label className="cc-slider-label">{text.calc.term}: <strong>{term} {text.calc.months}</strong></label>
                <input type="range" min="6" max="60" step="6" value={term} onChange={e => setTerm(Number(e.target.value))} className="cc-slider" style={sliderStyle(term, 6, 60)} />
              </div>
              <div className="cc-calc-results">
                <div className="cc-calc-row"><span className="cc-muted">{text.calc.ltv}</span><span className="cc-calc-val">{ltv}%</span></div>
                <div className="cc-calc-row"><span className="cc-muted">{text.calc.monthly}</span><span className="cc-calc-val-white">€{Number(monthlyPayment).toLocaleString('nl-NL')}</span></div>
                <div className="cc-calc-row"><span className="cc-muted">{text.calc.total}</span><span className="cc-calc-val-white">€{(monthlyPayment * term).toLocaleString('nl-NL')}</span></div>
              </div>
              <div className="cc-calc-note">{text.calc.note}</div>
              <button onClick={() => { setCalcOpen(false); setChatOpen(true); }} className="cc-btn-primary cc-btn-full">{text.calc.discuss}</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ CONTACT MODAL ═══ */}
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
                <div><div className="cc-contact-main">+31 6 8175 2045</div><div className="cc-muted-sm">{language === 'nl' ? 'Bel of WhatsApp ons' : language === 'es' ? 'Llámenos o WhatsApp' : 'Call or WhatsApp us'}</div></div>
              </a>
              <a href="mailto:info@costacapital.pro" className="cc-contact-item">
                <div className="cc-contact-icon">✉️</div>
                <div><div className="cc-contact-main">info@costacapital.pro</div><div className="cc-muted-sm">{language === 'nl' ? 'Stuur ons een email' : language === 'es' ? 'Envíenos un email' : 'Send us an email'}</div></div>
              </a>
              <a href="https://wa.me/31681752045" target="_blank" rel="noopener noreferrer" className="cc-contact-item cc-whatsapp">
                <div className="cc-contact-icon cc-contact-icon-white">💬</div>
                <div><div className="cc-contact-main">WhatsApp</div><div style={{fontSize:'0.8rem',color:'#bbf7d0'}}>{language === 'nl' ? 'Chat direct met ons' : language === 'es' ? 'Chatee con nosotros' : 'Chat with us directly'}</div></div>
              </a>
              <div className="cc-contact-location">
                <MapPin size={15} className="cc-check-icon" />
                <div>
                  <div style={{fontWeight:500,marginBottom:'0.2rem'}}>{language === 'nl' ? 'Ons Kantoor' : language === 'es' ? 'Nuestra Oficina' : 'Our Office'}</div>
                  <div className="cc-muted-sm">Valencia, España · Dénia, Costa Blanca</div>
                </div>
              </div>
              <button onClick={() => { setContactOpen(false); setChatOpen(true); }} className="cc-btn-primary cc-btn-full">
                <MessageSquare size={16} />
                {language === 'nl' ? 'Of chat met onze AI Adviseur' : language === 'es' ? 'O chatee con nuestro Asesor IA' : 'Or chat with our AI Advisor'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
