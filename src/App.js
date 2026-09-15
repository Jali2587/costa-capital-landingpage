import React, { useState, useEffect, useRef } from 'react';
import { Building2, MessageSquare, Calculator, ChevronRight, Check, X, Star, Quote, MapPin, Globe, ArrowLeft, Clock } from 'lucide-react';

const MEMORY_KEY = 'cc_session_memory';
const MEMORY_LANG_KEY = 'cc_session_lang';
const MEMORY_DATE_KEY = 'cc_session_date';

export default function CostaCapitalLanding() {
  const [language, setLanguage] = useState('nl');
  const [chatOpen, setChatOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionMemory, setSessionMemory] = useState(null);
  const [memoryDate, setMemoryDate] = useState(null);
  const [showEligibilityGate, setShowEligibilityGate] = useState(false);
  const [eligibilityStep, setEligibilityStep] = useState(1);
  const [eligibilityResponses, setEligibilityResponses] = useState({});
  const chatBottomRef = useRef(null);

  const [loanAmount, setLoanAmount] = useState(1000000);
  const [projectValue, setProjectValue] = useState(1500000);
  const [term, setTerm] = useState(24);

  // ═══ THREE-STAGE STATE ═══
  const [projectInventory, setProjectInventory] = useState(null);
  const [financingAssessment, setFinancingAssessment] = useState(null);
  const [currentStage, setCurrentStage] = useState('intake');
  const [showAssessmentButton, setShowAssessmentButton] = useState(false);
  const [showOptimizationButton, setShowOptimizationButton] = useState(false);
  const [financingType, setFinancingType] = useState(null);

  // Load memory from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MEMORY_KEY);
      const savedDate = localStorage.getItem(MEMORY_DATE_KEY);
      const savedLang = localStorage.getItem(MEMORY_LANG_KEY);
      if (saved && savedDate) {
        // Only use memory if it's less than 30 days old
        const daysSince = (Date.now() - parseInt(savedDate)) / (1000 * 60 * 60 * 24);
        if (daysSince < 30) {
          setSessionMemory(saved);
          setMemoryDate(new Date(parseInt(savedDate)));
          if (savedLang) setLanguage(savedLang);
        } else {
          // Memory too old — clear it
          localStorage.removeItem(MEMORY_KEY);
          localStorage.removeItem(MEMORY_DATE_KEY);
          localStorage.removeItem(MEMORY_LANG_KEY);
        }
      }
    } catch (e) {
      console.log('localStorage not available');
    }
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Save memory when chat closes
  const handleCloseChat = async () => {
    setChatOpen(false);
    if (chatMessages.length >= 4) {
      try {
        const res = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: chatMessages.map(m => ({ role: m.role, content: m.content })),
            language,
            generateSummary: true
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.summary) {
            localStorage.setItem(MEMORY_KEY, data.summary);
            localStorage.setItem(MEMORY_DATE_KEY, Date.now().toString());
            localStorage.setItem(MEMORY_LANG_KEY, language);
            setSessionMemory(data.summary);
            setMemoryDate(new Date());
          }
        }
      } catch (e) {
        console.log('Memory save failed:', e);
      }
    }
  };

  const clearMemory = () => {
    localStorage.removeItem(MEMORY_KEY);
    localStorage.removeItem(MEMORY_DATE_KEY);
    localStorage.removeItem(MEMORY_LANG_KEY);
    setSessionMemory(null);
    setMemoryDate(null);
    setChatMessages([]);
    // ═══ RESET THREE-STAGE STATE ═══
    setProjectInventory(null);
    setFinancingAssessment(null);
    setCurrentStage('intake');
    setShowAssessmentButton(false);
    setShowOptimizationButton(false);
    setFinancingType(null);
    setEligibilityStep(1);
    setEligibilityResponses({});
  };

  const openChatWithGate = () => {
    setShowEligibilityGate(true);
    setEligibilityStep(1);
    setEligibilityResponses({});
    setFinancingType(null);
    setChatOpen(true);
  };

  const handleEligibilityAnswer = (stepKey, answer) => {
    const newResponses = { ...eligibilityResponses, [stepKey]: answer };
    setEligibilityResponses(newResponses);

    // Check if disqualified (Step 1)
    if (stepKey === 'isLegalEntity' && answer === 'No') {
      setEligibilityStep('rejected_consumer');
      return;
    }

    // Step 1: Legal Entity → Yes → Move to Financing Type
    if (stepKey === 'isLegalEntity' && answer === 'Yes') {
      setEligibilityStep(2);
      return;
    }

    // Step 2: Financing Type selection
    // Map displayed options to internal financing types
    if (stepKey === 'financingType') {
      // Map to internal financing type
      let internalType = 'unknown';
      if (answer === 'Acquisition finance' || answer === 'Financiación de adquisición' || answer === 'Financiering aankoop' || answer === 'Finansowanie akwizycji') {
        internalType = 'acquisition';
      } else if (answer === 'Development finance' || answer === 'Financiación de desarrollo' || answer === 'Financiering ontwikkeling' || answer === 'Finansowanie rozwoju') {
        internalType = 'development';
      } else if (answer === 'Bridge finance' || answer === 'Financiación puente' || answer === 'Overbruggingsfinanciering' || answer === 'Finansowanie przejściowe') {
        internalType = 'bridge';
      } else if (answer === 'Refinancing / restructuring' || answer === 'Refinanciación / reestructuración' || answer === 'Herfinanciering / herstructurering' || answer === 'Refinansowanie / restrukturyzacja') {
        internalType = 'refinancing';
      } else if (answer === 'Not sure yet' || answer === 'No estoy seguro todavía' || answer === 'Weet nog niet zeker' || answer === 'Nie jestem jeszcze pewien') {
        internalType = 'unknown';
      }

      setFinancingType(internalType);
      setShowEligibilityGate(false); // Close gate, ready for chat

      // Add system message for eligibility confirmation
      const confirmMsg = {
        role: 'assistant',
        content: 
          language === 'nl' ? `${text.eligibility.proceed}\n\n✓ Professionele entiteit bevestigd\n✓ Financieringstype: ${answer}`
          : language === 'es' ? `${text.eligibility.proceed}\n\n✓ Entidad profesional confirmada\n✓ Tipo de financiamiento: ${answer}`
          : language === 'pl' ? `${text.eligibility.proceed}\n\n✓ Potwierdzona jednostka prawna\n✓ Typ finansowania: ${answer}`
          : `${text.eligibility.proceed}\n\n✓ Professional entity confirmed\n✓ Financing type: ${answer}`
      };
      setChatMessages([confirmMsg]);
      return;
    }
  };

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
      eligibility: {
        q1: 'Is de borrower een juridische entiteit? (bedrijf, partnership, beleggingsfonds, etc.)',
        q1yes: 'Ja, een juridische entiteit',
        q1no: 'Nee, een privéperson',
        q1reject: 'Costa Capital specialiseert zich in zakelijke vastgoedfinanciering voor professionele en corporate entiteiten. Wij arrangeren geen financiering voor privépersonen of eigenwoningen.',
        q2: 'Wat is het doel van de financiering?',
        q2opt1: 'Acquisitie financiering',
        q2opt2: 'Ontwikkelings financiering',
        q2opt3: 'Overbruggings financiering',
        q2opt4: 'Herfinanciering / herstructurering',
        q2opt5: 'Weet nog niet zeker',
        q2reject: 'Costa Capital arrangeert geen consumentenkrediet of eigenwoningfinancieringen.',
        proceed: 'Prima! Laat me je verbinden met onze financieringsadviseur.'
      },
      chat: {
        title: 'Vastgoedfinanciering Beoordeling',
        subtitle: 'Beoordeel uw financieringsstructuur, kredietwaardigheid en verbetermogelijkheden',
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
      },
      reports: {
        assessmentTitle: 'Financieringsanalyse',
        optimizationTitle: 'Financierbaarheid Optimalisatie',
        projectSummary: 'Projectsamenvatting',
        financingFit: 'Financieringsfit',
        lenderReadiness: 'Kredietwaardigheid Beoordeling',
        lenderReadinessDisclaimer: 'Indicatieve Costa Capital kredietwaardigheid-beoordeling — niet een kredietscore of goedkeuringskans.',
        recommendedStructure: 'Aanbevolen Financieringsstructuur',
        alternativeStructure: 'Alternatieve Structuur',
        keyStrengths: 'Sterke Punten',
        keyConcerns: 'Financieringszorgen',
        missingDocuments: 'Ontbrekende Documenten',
        disclaimer: 'Belangrijk Disclaimer',
        nextStep: 'Volgende Stap',
        optimizationSummary: 'Optimalisatiesamenvatting',
        priorityActions: 'Prioritaire Acties',
        optimizedScenario: 'Potentieel Geoptimaliseerd Scenario',
        lenderPositioning: 'Kreditorenpositionering',
        highImpact: 'HOGE IMPACT',
        mediumImpact: 'MEDIUM IMPACT',
        reason: 'Reden',
        expectedEffect: 'Verwacht Effect'
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
      eligibility: {
        q1: 'Is the borrower a legal entity? (corporation, partnership, investment vehicle, etc.)',
        q1yes: 'Yes, a legal entity',
        q1no: 'No, a private individual',
        q1reject: 'Costa Capital specializes in business-purpose financing for corporate and professional legal entities. We do not arrange financing for private individuals or owner-occupied residential property.',
        q2: 'What is the purpose of the financing?',
        q2opt1: 'Acquisition finance',
        q2opt2: 'Development finance',
        q2opt3: 'Bridge finance',
        q2opt4: 'Refinancing / restructuring',
        q2opt5: 'Not sure yet',
        q2reject: 'Costa Capital does not arrange consumer or owner-occupied residential mortgage finance.',
        proceed: 'Great! Let me connect you with our financing advisor.'
      },
      chat: {
        title: 'Real Estate Financing Assessment',
        subtitle: 'Assess your financing structure, lender readiness and potential improvements',
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
      },
      reports: {
        assessmentTitle: 'Financing Assessment',
        optimizationTitle: 'Financeability Optimization',
        projectSummary: 'Project Summary',
        financingFit: 'Financing Fit',
        lenderReadiness: 'Lender Readiness',
        lenderReadinessDisclaimer: 'Indicative Costa Capital lender-readiness assessment — not a credit score or probability of approval.',
        recommendedStructure: 'Recommended Financing Structure',
        alternativeStructure: 'Alternative Structure',
        keyStrengths: 'Key Strengths',
        keyConcerns: 'Key Financing Concerns',
        missingDocuments: 'Missing Documents / Information',
        disclaimer: 'Important Information',
        nextStep: 'Next Step',
        optimizationSummary: 'Optimization Summary',
        priorityActions: 'Priority Actions',
        optimizedScenario: 'Potential Optimized Structure',
        lenderPositioning: 'Lender Positioning',
        highImpact: 'HIGH IMPACT',
        mediumImpact: 'MEDIUM IMPACT',
        reason: 'Reason',
        expectedEffect: 'Expected Effect'
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
      eligibility: {
        q1: '¿Es el solicitante una entidad legal? (sociedad, partnership, fondo de inversión, etc.)',
        q1yes: 'Sí, una entidad legal',
        q1no: 'No, una persona física',
        q1reject: 'Costa Capital se especializa en financiación empresarial para entidades legales profesionales y corporativas. No financiamos a personas físicas ni propiedades de uso propio.',
        q2: '¿Cuál es el propósito de la financiación?',
        q2opt1: 'Financiación de adquisición',
        q2opt2: 'Financiación de desarrollo',
        q2opt3: 'Financiación puente',
        q2opt4: 'Refinanciación / reestructuración',
        q2opt5: 'No estoy seguro todavía',
        q2reject: 'Costa Capital no ofrece crédito al consumo ni financiación de viviendas de uso propio.',
        proceed: '¡Excelente! Permíteme conectarte con nuestro asesor de financiación.'
      },
      chat: {
        title: 'Evaluación de Financiación Inmobiliaria',
        subtitle: 'Evalúe su estructura de financiación, disposición crediticia y mejoras potenciales',
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
      },
      reports: {
        assessmentTitle: 'Análisis de Financiación',
        optimizationTitle: 'Optimización de Financiabilidad',
        projectSummary: 'Resumen del Proyecto',
        financingFit: 'Ajuste de Financiación',
        lenderReadiness: 'Evaluación de Acreedor',
        lenderReadinessDisclaimer: 'Evaluación indicativa de Costa Capital — no es una puntuación de crédito ni probabilidad de aprobación.',
        recommendedStructure: 'Estructura de Financiación Recomendada',
        alternativeStructure: 'Estructura Alternativa',
        keyStrengths: 'Puntos Fuertes',
        keyConcerns: 'Preocupaciones de Financiación',
        missingDocuments: 'Documentos Faltantes / Información',
        disclaimer: 'Información Importante',
        nextStep: 'Próximo Paso',
        optimizationSummary: 'Resumen de Optimización',
        priorityActions: 'Acciones Prioritarias',
        optimizedScenario: 'Estructura Potencialmente Optimizada',
        lenderPositioning: 'Posicionamiento de Acreedor',
        highImpact: 'ALTO IMPACTO',
        mediumImpact: 'IMPACTO MEDIO',
        reason: 'Razón',
        expectedEffect: 'Efecto Esperado'
      }
    },
    pl: {
      nav: { contact: 'Kontakt', backLabel: 'Powrót na stronę główną' },
      hero: {
        badge: 'Specjalizacja na obszarach wybrzeża Hiszpańskiego',
        title: 'Finansowanie Nieruchomości\nSpańskie Wybrzeża',
        subtitle: 'Eksperci w Costa del Sol, Costa Blanca i regionie Walencji. Finansowanie dla inwestorów międzynarodowych i lokalnych deweloperów. Od €500K do €50M+.',
        cta1: 'Rozpocznij Rozmowę AI',
        cta2: 'Oblicz Finansowanie',
        location: 'Siedziba w Walencji, Hiszpania'
      },
      stats: { financed: 'Sfinansowane w Hiszpanii', response: 'Pierwsza Odpowiedź', projects: 'Projekty w Hiszpanii', satisfaction: 'Zadowolenie Klientów' },
      features: {
        title: 'Dlaczego Costa Capital dla Wybrzeży Hiszpańskich?',
        speed: { title: 'Lokalna Wiedza', desc: 'Biuro w Walencji z głęboką wiedzą o całym wybrzeżu Hiszpańskim: Costa del Sol (Marbella, Málaga), Costa Blanca (Alicante, Dénia) i Walencja. Mówimy tym językiem — dosłownie i w przenośni.' },
        flex: { title: 'Struktury Międzynarodowe', desc: 'Doświadczenie w transakcjach transgranicznych, strukturach offshore i optymalizacji podatkowej dla inwestorów zagranicznych w Hiszpanii.' },
        complex: { title: 'Specjaliści Wybrzeży Hiszpańskich', desc: 'Od Marbelli do Walencji: Málaga, Marbella, Estepona, Benidorm, Alicante, Dénia, Jávea, Walencja. Znamy wybrzeża Hiszpańskie na wylot i mamy sieci lokalni notariusze, prawnicy i deweloperzy.' }
      },
      markets: {
        title: 'Nasze Specjalizacje w Hiszpanii',
        subtitle: 'Od Costa del Sol do Costa Blanca',
        coastal: { title: 'Luksusowe Nieruchomości Przybrzeżne', desc: 'Wille, apartamenty i kompleksy kurortowe wzdłuż Costa del Sol i Costa Blanca. Od Marbelli do Walencji. LTV do 70% dla mocnych lokalizacji.' },
        commercial: { title: 'Nieruchomości Komercyjne', desc: 'Handel detaliczny, hotelarstwo i powierzchnie biurowe w Máladze, Marbelli, Walencji i innych obszarach przybrzeżnych. Idealne dla handlowców międzynarodowych.' },
        tourism: { title: 'Projekty Turystyczne', desc: 'Hotele, domy wakacyjne i kompleksy krótkoterminowe. Zrozumienie licencji turystycznych i regulacji. Projekt ostateczny: hotel Marbella €10M.' }
      },
      reviews: { title: 'Udane Finansowania w Hiszpanii', subtitle: 'Co mówią nasi klienci o swoich projektach na wybrzeżu Hiszpańskim' },
      spanish: {
        title: 'Rynek Nieruchomości Hiszpańskich',
        intro: 'Dlaczego inwestować w obszary przybrzeżne Hiszpanii?',
        points: ['300+ dni słoneczne rocznie — idealny klimat na wszystkich wybrzeżach', 'Rosnący popyt międzynarodowy od Costa del Sol do Costa Blanca', 'Málaga, Marbella, Walencja: silny wzrost i infrastruktura', 'Stosunkowo niskie ceny nieruchomości vs inne wybrzeża UE', 'Stabilny rynek wynajmu dzięki turystyce i expatów', 'Nowa infrastruktura: sieć AVE, rozszerzenia portów lotniczych']
      },
      process: { title: 'Proces Finansowania', subtitle: 'Od wniosku do zamknięcia w Hiszpanii' },
      social: {
        title: 'Dlaczego inwestorzy międzynarodowi nas wybierają',
        benefits: ['Pomoc w aplikacji NIE i koncie bankowym w Hiszpanii', 'Sieć zaufanych lokalnych prawników i notariuszy (Costa del Sol do Costa Blanca)', 'Doświadczenie z procesami residencia i golden visa', 'Znajomość Ley de Costas i innych przepisów hiszpańskich', 'Strukturowanie podatkowe przez partnerów holenderskich i hiszpańskich', 'Wsparcie w zarządzaniu projektami podczas budowy']
      },
      cta: { title: 'Gotowy na Swój Projekt Nieruchomości w Hiszpanii?', subtitle: 'Omów swoje plany z naszym doradcą AI siedzibą w Walencji lub zaplanuj osobistą rozmowę', btn1: 'Rozpocznij Rozmowę', btn2: 'Zaplanuj Spotkanie' },
      footer: { desc: 'Specjaliści finansowania nieruchomości dla inwestorów międzynarodowych i lokalnych deweloperów w Hiszpanii.', contact: 'Kontakt', location: 'Lokalizacja', valencia: 'Walencja, Hiszpania (Główna Siedziba)', denia: 'Dénia, Costa Blanca', rights: '© 2024 Costa Capital. Wszystkie prawa zastrzeżone. Zarejestrowane w Hiszpanii' },
      eligibility: {
        q1: 'Czy pożyczający jest podmiotem prawnym? (korporacja, partnership, fundusz inwestycyjny, itp.)',
        q1yes: 'Tak, podmiot prawny',
        q1no: 'Nie, osoba fizyczna',
        q1reject: 'Costa Capital specjalizuje się w finansowaniu biznesowym dla profesjonalnych i korporacyjnych podmiotów prawnych. Nie finansujemy osób fizycznych ani nieruchomości z przeznaczeniem na mieszkanie.',
        q2: 'Jaki jest cel finansowania?',
        q2opt1: 'Finansowanie akwizycji',
        q2opt2: 'Finansowanie rozwoju',
        q2opt3: 'Finansowanie przejściowe',
        q2opt4: 'Refinansowanie / restrukturyzacja',
        q2opt5: 'Nie jestem jeszcze pewien',
        q2reject: 'Costa Capital nie oferuje kredytu konsumenckiego ani finansowania nieruchomości na użytek własny.',
        proceed: 'Świetnie! Pozwól, że połączę Cię z naszym doradcą finansowym.'
      },
      chat: {
        title: 'Ocena Finansowania Nieruchomości',
        subtitle: 'Oceń swoją strukturę finansowania, zdolność kredytową i potencjalne ulepszenia',
        placeholder: 'Zadaj swoje pytanie...',
        empty: 'Rozpocznij rozmowę o swoim projekcie nieruchomości w Hiszpanii',
        suggestions: ['Jakie są warunki finansowania w Marbelli?', 'Jak działa proces NIE dla inwestorów zagranicznych?', 'Jaki LTV stosuje Costa Capital dla projektów Costa del Sol?'],
        systemPrompt: 'You are a financial advisor for Costa Capital, specialized in real estate financing for Spanish coastal areas: Costa del Sol (Marbella, Málaga, Estepona), Costa Blanca (Alicante, Benidorm, Dénia, Jávea) and Valencia. You help international investors and local developers with questions about financing, Spanish regulations (NIE, escritura, nota simple), and investing in Spain. Answer in Polish (język polski).'
      },
      calc: {
        title: 'Kalkulator Finansowania',
        subtitle: 'Uzyskaj wskazanie dla swojego projektu w Hiszpanii',
        loanAmount: 'Żądana Kwota Pożyczki',
        projectValue: 'Wartość Projektu',
        term: 'Okres',
        months: 'miesięcy',
        ltv: 'Loan-to-Value (LTV)',
        monthly: 'Wskazana Miesięczna Rata',
        total: 'Całkowite Odsetki (wskazanie)',
        note: '✓ To wskazanie opiera się na warunkach standardowych dla projektów w Hiszpanii. Aby uzyskać dokładną ofertę, chętnie się z Tobą skontaktujemy.',
        discuss: 'Omów z Doradcą AI'
      },
      reports: {
        assessmentTitle: 'Analiza Finansowania',
        optimizationTitle: 'Optymalizacja Finansowalności',
        projectSummary: 'Streszczenie Projektu',
        financingFit: 'Dopasowanie Finansowania',
        lenderReadiness: 'Ocena Zdolności Kredytowej',
        lenderReadinessDisclaimer: 'Wskazywająca ocena Costa Capital — nie jest to wynik kredytowy ani prawdopodobieństwo zatwierdzenia.',
        recommendedStructure: 'Zalecana Struktura Finansowania',
        alternativeStructure: 'Strukturą Alternatywna',
        keyStrengths: 'Kluczowe Mocne Punkty',
        keyConcerns: 'Finansowe Obawy',
        missingDocuments: 'Brakujące Dokumenty / Informacje',
        disclaimer: 'Ważne Informacje',
        nextStep: 'Następny Krok',
        optimizationSummary: 'Streszczenie Optymalizacji',
        priorityActions: 'Działania Priorytetowe',
        optimizedScenario: 'Potencjalnie Zoptymalizowana Struktura',
        lenderPositioning: 'Pozycjonowanie Kredytodawcy',
        highImpact: 'WYSOKI WPŁYW',
        mediumImpact: 'ŚREDNI WPŁYW',
        reason: 'Powód',
        expectedEffect: 'Oczekiwany Efekt'
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

  // ═══ CHECK IF ELIGIBILITY CONFIRMED ═══
  const isEligibilityConfirmed = financingType !== null && eligibilityResponses.isLegalEntity === 'Yes';

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const userMsg = inputMessage;
    setInputMessage('');
    const updatedMessages = [...chatMessages, { role: 'user', content: userMsg }];
    setChatMessages(updatedMessages);
    setIsLoading(true);

    try {
      const requestStart = Date.now();

      // ═══ DETERMINE REQUEST MODE & BODY ═══
      let requestBody = {
        language,
      };

      if (currentStage === 'intake') {
        // Stage 1: Include eligibility + financing type
        requestBody = {
          mode: 'intake',
          language,
          eligibility: {
            legalEntity: true,  // Already confirmed by gate
            businessPurpose: true,  // Already confirmed by financing type selection
          },
          financingType: financingType,
          userMessage: userMsg,
          sessionHistory: updatedMessages.slice(0, -1).map(m => ({ role: m.role, content: m.content })),
        };
      } else if (currentStage === 'assessment') {
        // Stage 2: Only inventory
        requestBody = {
          mode: 'assessment',
          language,
          projectInventory: projectInventory,
        };
      } else if (currentStage === 'optimization') {
        // Stage 3: Inventory + assessment
        requestBody = {
          mode: 'optimization',
          language,
          projectInventory: projectInventory,
          financingAssessment: financingAssessment,
        };
      }

      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const requestEnd = Date.now();
      console.log(`[CLIENT] Roundtrip time: ${requestEnd - requestStart}ms`);

      if (!response.ok) throw new Error('API call failed');
      const data = await response.json();

      // ═══ HANDLE RESPONSE BASED ON STAGE ═══
      if (currentStage === 'intake') {
        // Check for inventory complete
        if (data.data?.stage === 'inventory_complete' && data.data?.inventoryComplete === true) {
          setProjectInventory(data.data);
          setCurrentStage('intake'); // Stay in intake, show button
          setShowAssessmentButton(true);

          // Display inventory summary (NOT raw JSON)
          const inventorySummary = `✓ Project inventory collected\n\nBorrower: ${data.data.borrowerEntity || 'N/A'}\nLocation: ${data.data.location || 'N/A'}\nRequested debt: €${data.data.requestedDebt ? data.data.requestedDebt.toLocaleString() : 'N/A'}`;
          
          const newMsg = {
            role: 'assistant',
            content: inventorySummary
          };
          setChatMessages(prev => [...prev, newMsg]);
        } else if (data.data?.conversational === true) {
          // Conversational response
          const newMsg = {
            role: 'assistant',
            content: data.data.response
          };
          setChatMessages(prev => [...prev, newMsg]);
        }
      } else if (currentStage === 'assessment') {
        // Assessment complete
        if (data.data?.stage === 'assessment_complete') {
          setFinancingAssessment(data.data);
          setShowAssessmentButton(false);
          setShowOptimizationButton(true);

          // Display readable assessment (NOT raw JSON)
          const assessmentSummary = `📊 FINANCING ASSESSMENT\n\nFit: ${data.data.financingFit || 'N/A'}\nLender Readiness: ${data.data.lenderReadiness?.score || 'N/A'}/10\nRecommended: ${data.data.recommendedStructure?.type || 'N/A'}\nAmount: ${data.data.recommendedStructure?.amount || 'N/A'}`;

          const newMsg = {
            role: 'assistant',
            content: assessmentSummary
          };
          setChatMessages(prev => [...prev, newMsg]);
        }
      } else if (currentStage === 'optimization') {
        // Optimization complete
        if (data.data?.stage === 'optimization_complete') {
          const optSummary = `🎯 OPTIMIZATION\n\n${data.data.optimizationSummary || 'N/A'}\n\nNext: ${data.data.nextStep || 'Contact us'}`;

          const newMsg = {
            role: 'assistant',
            content: optSummary
          };
          setChatMessages(prev => [...prev, newMsg]);
          setShowOptimizationButton(false);
        }
      }

      // Auto-save memory if backend returned a summary
      if (data.autoSummary) {
        try {
          localStorage.setItem(MEMORY_KEY, data.autoSummary);
          localStorage.setItem(MEMORY_DATE_KEY, Date.now().toString());
          localStorage.setItem(MEMORY_LANG_KEY, language);
          setSessionMemory(data.autoSummary);
          setMemoryDate(new Date());
        } catch (e) {}
      }
    } catch (error) {
      console.error('Error:', error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: language === 'nl'
          ? 'Excuses, er ging iets mis. Neem direct contact op via info@costacapital.pro of bel/WhatsApp +31 6 8175 2045.'
          : language === 'es'
          ? 'Lo sentimos, algo salió mal. Contáctenos directamente en info@costacapital.pro o llame/WhatsApp +31 6 8175 2045.'
          : 'Sorry, something went wrong. Please contact us directly at info@costacapital.pro or call/WhatsApp +31 6 8175 2045.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // ═══ TRIGGER ASSESSMENT ═══
  const triggerAssessment = async () => {
    setCurrentStage('assessment');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'assessment',
          language,
          eligibility: {
            legalEntity: true,
            businessPurpose: true
          },
          financingType: financingType,
          projectInventory: projectInventory,
        }),
      });

      if (!response.ok) throw new Error('Assessment failed');
      const data = await response.json();

      if (data.data?.stage === 'assessment_complete') {
        setFinancingAssessment(data.data);
        setShowAssessmentButton(false);
        setShowOptimizationButton(true);

        // Build professional assessment report message
        const report = data.data;
        let reportContent = `📊 ${text.reports.assessmentTitle}\n\n`;

        if (report.projectSummary) reportContent += `**${text.reports.projectSummary}:**\n${report.projectSummary}\n\n`;
        if (report.financingFit) reportContent += `**${text.reports.financingFit}:**\n${report.financingFit}\n\n`;
        
        if (report.lenderReadiness) {
          reportContent += `**${text.reports.lenderReadiness}:**\n`;
          reportContent += `Score: ${report.lenderReadiness.score || 'N/A'}/10\n`;
          if (report.lenderReadiness.factors && report.lenderReadiness.factors.length > 0) {
            report.lenderReadiness.factors.forEach(f => {
              reportContent += `• ${f.dimension}: ${f.assessment}\n`;
            });
          }
          reportContent += `\n_${text.reports.lenderReadinessDisclaimer}_\n\n`;
        }

        if (report.recommendedStructure) {
          reportContent += `**${text.reports.recommendedStructure}:**\n`;
          const rs = report.recommendedStructure;
          if (rs.type) reportContent += `Type: ${rs.type}\n`;
          if (rs.amount) reportContent += `Amount: ${rs.amount}\n`;
          if (rs.leverage) reportContent += `Leverage: ${rs.leverage}\n`;
          if (rs.term) reportContent += `Term: ${rs.term}\n`;
          if (rs.pricing) reportContent += `Pricing: ${rs.pricing}\n`;
          if (rs.prerequisites) reportContent += `Prerequisites: ${rs.prerequisites}\n`;
          reportContent += '\n';
        }

        if (report.alternativeStructure) {
          reportContent += `**${text.reports.alternativeStructure}:**\n`;
          const alt = report.alternativeStructure;
          if (typeof alt === 'string') {
            reportContent += `${alt}\n\n`;
          } else if (typeof alt === 'object' && alt !== null) {
            Object.entries(alt).forEach(([key, value]) => {
              if (value !== null && value !== undefined && value !== '') {
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
                reportContent += `• ${label}: ${value}\n`;
              }
            });
            reportContent += '\n';
          }
        }

        if (report.targetedLenderReview?.recommended === true) {
          reportContent += `**🔍 Targeted Lender Review:**\n`;
          reportContent += `${report.targetedLenderReview.reason || 'Transaction-specific factors may warrant specialist lender review.'}\n\n`;
          reportContent += `_${report.targetedLenderReview.cta}_\n\n`;
        }

        if (report.strengths && report.strengths.length > 0) {
          reportContent += `**${text.reports.keyStrengths}:**\n`;
          report.strengths.forEach(s => reportContent += `• ${s}\n`);
          reportContent += '\n';
        }

        if (report.concerns && report.concerns.length > 0) {
          reportContent += `**${text.reports.keyConcerns}:**\n`;
          report.concerns.forEach(c => reportContent += `• ${c}\n`);
          reportContent += '\n';
        }

        if (report.missingDocuments && report.missingDocuments.length > 0) {
          reportContent += `**${text.reports.missingDocuments}:**\n`;
          report.missingDocuments.forEach(m => reportContent += `• ${m}\n`);
          reportContent += '\n';
        }

        if (report.disclaimer) {
          reportContent += `**${text.reports.disclaimer}:**\n_${report.disclaimer}_\n\n`;
        }

        if (report.commercialMessage) {
          reportContent += `${report.commercialMessage}\n\n`;
        }

        if (report.nextStep) {
          reportContent += `**${text.reports.nextStep}:**\n${report.nextStep}`;
        }

        setChatMessages(prev => [...prev, { role: 'assistant', content: reportContent }]);
      }
    } catch (error) {
      console.error('Assessment error:', error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Assessment failed. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // ═══ TRIGGER OPTIMIZATION ═══
  const triggerOptimization = async () => {
    setCurrentStage('optimization');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'optimization',
          language,
          eligibility: {
            legalEntity: true,
            businessPurpose: true
          },
          financingType: financingType,
          projectInventory: projectInventory,
          financingAssessment: financingAssessment,
        }),
      });

      if (!response.ok) throw new Error('Optimization failed');
      const data = await response.json();

      if (data.data?.stage === 'optimization_complete') {
        const optReport = data.data;
        let optContent = `🎯 ${text.reports.optimizationTitle}\n\n`;

        if (optReport.optimizationSummary) {
          optContent += `**${text.reports.optimizationSummary}:**\n${optReport.optimizationSummary}\n\n`;
        }

        if (optReport.priorityActions && optReport.priorityActions.length > 0) {
          optContent += `**${text.reports.priorityActions}:**\n`;
          optReport.priorityActions.forEach((action, i) => {
            const impact = action.priority === 'HIGH IMPACT' ? text.reports.highImpact : text.reports.mediumImpact;
            optContent += `${i + 1}. [${impact}] ${action.action}\n`;
            if (action.reason) optContent += `   ${text.reports.reason}: ${action.reason}\n`;
            if (action.expectedEffect) optContent += `   ${text.reports.expectedEffect}: ${action.expectedEffect}\n`;
          });
          optContent += '\n';
        }

        if (optReport.optimizedScenario) {
          optContent += `**${text.reports.optimizedScenario}:**\n`;
          const scenario = optReport.optimizedScenario;
          if (typeof scenario === 'string') {
            optContent += `${scenario}\n\n`;
          } else if (typeof scenario === 'object' && scenario !== null) {
            // Render object properties as readable label/value pairs
            Object.entries(scenario).forEach(([key, value]) => {
              if (value !== null && value !== undefined && value !== '') {
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
                optContent += `• ${label}: ${value}\n`;
              }
            });
            optContent += '\n';
          }
        }

        if (optReport.lenderPositioning) {
          optContent += `**${text.reports.lenderPositioning}:**\n${optReport.lenderPositioning}\n\n`;
        }

        if (optReport.nextStep) {
          optContent += `**${text.reports.nextStep}:**\n${optReport.nextStep}`;
        }

        setChatMessages(prev => [...prev, { role: 'assistant', content: optContent }]);
        setShowOptimizationButton(false);
      }
    } catch (error) {
      console.error('Optimization error:', error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Optimization failed. Please try again.' }]);
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
            {['nl', 'en', 'es', 'pl'].map(lang => (
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
            <button onClick={openChatWithGate} className="cc-btn-primary cc-btn-lg">
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
            <button onClick={openChatWithGate} className="cc-btn-dark cc-btn-lg">
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
              <button onClick={handleCloseChat} className="cc-modal-close"><X size={20} /></button>
            </div>
            <div className="cc-chat-body">
              {/* ELIGIBILITY GATE */}
              {showEligibilityGate && (
                <div style={{padding:'1.5rem',textAlign:'center',background:'rgba(200,169,110,0.03)',border:'1px solid rgba(200,169,110,0.15)',margin:'1rem',borderRadius:'0.5rem'}}>
                  {eligibilityStep === 'rejected_consumer' && (
                    <>
                      <p style={{fontSize:'0.95rem',color:'var(--cc-white)',marginBottom:'1rem'}}>{text.eligibility.q1reject}</p>
                      <p style={{fontSize:'0.8rem',color:'var(--cc-muted)'}}>📧 {language === 'nl' ? 'Meer info:' : language === 'es' ? 'Más información:' : 'More info:'} info@costacapital.pro</p>
                    </>
                  )}
                  {eligibilityStep === 'rejected_residential' && (
                    <>
                      <p style={{fontSize:'0.95rem',color:'var(--cc-white)',marginBottom:'1rem'}}>{text.eligibility.q2reject}</p>
                      <p style={{fontSize:'0.8rem',color:'var(--cc-muted)'}}>📧 {language === 'nl' ? 'Meer info:' : language === 'es' ? 'Más información:' : 'More info:'} info@costacapital.pro</p>
                    </>
                  )}
                  {eligibilityStep === 1 && (
                    <>
                      <p style={{fontSize:'0.85rem',color:'var(--cc-muted)',marginBottom:'1.5rem'}}>{text.eligibility.q1}</p>
                      <div style={{display:'flex',gap:'0.8rem',flexDirection:'column'}}>
                        <button onClick={() => handleEligibilityAnswer('isLegalEntity', 'Yes')} style={{background:'var(--cc-gold)',color:'var(--cc-black)',border:'none',padding:'0.7rem 1.2rem',fontSize:'0.82rem',fontWeight:500,cursor:'pointer',borderRadius:'0.3rem',letterSpacing:'0.1em',textTransform:'uppercase'}}>{text.eligibility.q1yes}</button>
                        <button onClick={() => handleEligibilityAnswer('isLegalEntity', 'No')} style={{background:'var(--cc-surface)',color:'var(--cc-white)',border:'1px solid var(--cc-border)',padding:'0.7rem 1.2rem',fontSize:'0.82rem',fontWeight:500,cursor:'pointer',borderRadius:'0.3rem',letterSpacing:'0.1em',textTransform:'uppercase'}}>{text.eligibility.q1no}</button>
                      </div>
                    </>
                  )}
                  {eligibilityStep === 2 && (
                    <>
                      <p style={{fontSize:'0.85rem',color:'var(--cc-muted)',marginBottom:'1.5rem'}}>{text.eligibility.q2}</p>
                      <div style={{display:'flex',gap:'0.6rem',flexDirection:'column'}}>
                        {[text.eligibility.q2opt1, text.eligibility.q2opt2, text.eligibility.q2opt3, text.eligibility.q2opt4, text.eligibility.q2opt5].map((opt, i) => (
                          <button key={i} onClick={() => handleEligibilityAnswer('financingType', opt)} style={{background:'var(--cc-surface)',color:'var(--cc-white)',border:'1px solid var(--cc-border)',padding:'0.65rem 1rem',fontSize:'0.78rem',fontWeight:500,cursor:'pointer',borderRadius:'0.3rem',letterSpacing:'0.05em',textAlign:'left'}}>{opt}</button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Memory banner */}
              {sessionMemory && chatMessages.length === 0 && (
                <div style={{background:'rgba(200,169,110,0.08)',border:'1px solid rgba(200,169,110,0.2)',padding:'0.8rem 1rem',marginBottom:'0.5rem',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'0.8rem'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'0.5rem',fontSize:'0.78rem',color:'var(--cc-gold)'}}>
                    <Clock size={13} />
                    <span>
                      {language === 'nl' ? `Welkom terug — gesprek van ${memoryDate?.toLocaleDateString('nl-NL') || 'eerder'}` :
                       language === 'es' ? `Bienvenido de nuevo — conversación del ${memoryDate?.toLocaleDateString('es-ES') || 'antes'}` :
                       `Welcome back — conversation from ${memoryDate?.toLocaleDateString('en-GB') || 'before'}`}
                    </span>
                  </div>
                  <button onClick={clearMemory} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.68rem',color:'var(--cc-muted)',letterSpacing:'0.1em',textTransform:'uppercase',padding:'0.2rem 0.4rem',transition:'color 0.2s'}} onMouseOver={e=>e.target.style.color='white'} onMouseOut={e=>e.target.style.color='var(--cc-muted)'}>
                    {language === 'nl' ? 'Wissen' : language === 'es' ? 'Borrar' : 'Clear'}
                  </button>
                </div>
              )}

              {chatMessages.length === 0 && !showEligibilityGate && (
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
                    {msg.content && <p style={{whiteSpace:'pre-wrap'}}>{msg.content}</p>}
                  </div>
                </div>
              ))}

              {/* Assessment Button */}
              {showAssessmentButton && projectInventory && (
                <div style={{padding:'1rem',textAlign:'center'}}>
                  <button onClick={triggerAssessment} disabled={isLoading} style={{background:'var(--cc-gold)',color:'var(--cc-black)',border:'none',padding:'0.8rem 2rem',fontSize:'0.85rem',fontWeight:500,cursor:'pointer',borderRadius:'0.3rem',letterSpacing:'0.05em',textTransform:'uppercase'}}>
                    {isLoading ? (language === 'nl' ? 'Analyseren...' : language === 'es' ? 'Analizando...' : 'Analyzing...') : (language === 'nl' ? 'Genereer Beoordeling' : language === 'es' ? 'Generar Evaluación' : 'Generate Assessment')}
                  </button>
                </div>
              )}

              {/* Optimization Button */}
              {showOptimizationButton && financingAssessment && (
                <div style={{padding:'1rem',textAlign:'center'}}>
                  <button onClick={triggerOptimization} disabled={isLoading} style={{background:'var(--cc-gold)',color:'var(--cc-black)',border:'none',padding:'0.8rem 2rem',fontSize:'0.85rem',fontWeight:500,cursor:'pointer',borderRadius:'0.3rem',letterSpacing:'0.05em',textTransform:'uppercase'}}>
                    {isLoading ? (language === 'nl' ? 'Analyseren...' : language === 'es' ? 'Analizando...' : language === 'pl' ? 'Analizowanie...' : 'Analyzing...') : (language === 'nl' ? 'Verbeter Financierbaarheid' : language === 'es' ? 'Mejorar Financiabilidad' : language === 'pl' ? 'Polepszenie Finansowalności' : 'Improve Financeability')}
                  </button>
                </div>
              )}

              {/* Targeted Lender Review Section */}
              {financingAssessment?.targetedLenderReview?.recommended === true && (
                <div style={{margin:'1rem',padding:'1rem',border:'1px solid var(--cc-border)',borderRadius:'0.3rem',background:'var(--cc-light)'}}>
                  <h4 style={{margin:'0 0 0.5rem 0',fontSize:'0.95rem',fontWeight:600,color:'var(--cc-text)'}}>
                    {language === 'nl' ? 'Gerichte Lenderbeoordeling' : language === 'es' ? 'Revisión de Prestamista Dirigida' : language === 'pl' ? 'Kierunkowe Przeglądy Pożyczkodawcy' : 'Targeted Lender Review'}
                  </h4>
                  <p style={{margin:'0.5rem 0',fontSize:'0.85rem',lineHeight:'1.5',color:'var(--cc-text)'}}>
                    {financingAssessment.targetedLenderReview.reason}
                  </p>
                  <p style={{margin:'0.5rem 0 0 0',fontSize:'0.8rem',color:'var(--cc-muted)'}}>
                    {language === 'nl' ? 'Neem contact op met Costa Capital voor een gericht lenderonderzoek.' : language === 'es' ? 'Póngase en contacto con Costa Capital para una revisión de prestamista dirigida.' : language === 'pl' ? 'Skontaktuj się z Costa Capital w celu przeprowadzenia kierunkowego przeglądu pożyczkodawcy.' : 'Contact Costa Capital for a transaction-specific lender review.'}
                  </p>
                </div>
              )}

              {isLoading && !showAssessmentButton && !showOptimizationButton && (
                <div className="cc-msg-row">
                  <div className="cc-msg cc-msg-ai">
                    <span className="cc-dot-1" /><span className="cc-dot-2" /><span className="cc-dot-3" />
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>
            <div className="cc-modal-footer">
              {isEligibilityConfirmed ? (
                <>
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
                </>
              ) : (
                <div style={{fontSize:'0.8rem',color:'var(--cc-muted)',padding:'0.5rem',textAlign:'center',width:'100%'}}>
                  {language === 'nl' ? 'Beantwoord alstublieft de geschiktheidsvragen om door te gaan.' : language === 'es' ? 'Por favor responda las preguntas de elegibilidad para continuar.' : 'Please answer the eligibility questions to proceed.'}
                </div>
              )}
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
