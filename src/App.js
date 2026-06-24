import React, { useState, useRef, useEffect } from 'react';
import {
  Building2, MessageSquare, Calculator, ChevronRight,
  Check, X, Star, Quote, MapPin, Globe, ArrowLeft,
  TrendingUp, Zap, Shield
} from 'lucide-react';

export default function CostaCapitalApp() {
  const [language, setLanguage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    if (['nl', 'en', 'es', 'pl'].includes(lang)) return lang;
    return 'en';
  });
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
        badge: 'Onafhankelijk intermediair · Spaanse Middellandse Zeekust',
        title: 'De beste kansen in Spanje\nblijven onbenut —',
        titleEm: 'zonder de juiste kapitaalpartner.',
        subtitle: 'Costa Capital structureert financiering voor ontwikkelaars en projecteigenaren in Spanje — én introduceert de juiste private lender of investeerder bij elke deal. Onafhankelijk. Lokaal. Direct.',
        cta1: 'Analyseer uw project',
        cta2: 'Bereken Financiering',
        location: 'Gevestigd in Dénia, Costa Blanca'
      },
      stats: [
        { value: '€50M+', label: 'Gestructureerde Deals' },
        { value: '48u', label: 'Eerste Reactie' },
        { value: '25+', label: 'Actieve Lenders' },
        { value: '4', label: 'Regio\'s' }
      ],
      features: {
        title: 'Waarom Costa Capital?',
        items: [
          { icon: MapPin, title: 'Lokaal Verankerd', desc: 'Gevestigd in Dénia aan de Costa Blanca. Dagelijkse kennis van welke projecten wel en niet financierbaar zijn — geen spreadsheet vervangt dat.' },
          { icon: Globe, title: 'Beide Kanten van de Tafel', desc: 'Wij structureren de financiering én introduceren de juiste lender of investeerder. Nederlandse BV, Belgische NV, UK Ltd boven Spaanse SL — wij kennen de structuren.' },
          { icon: TrendingUp, title: 'Tot 80% LTC', desc: 'Via geselecteerde private lenders en family offices: tot 80% LTC voor development projecten en tot 70% LTV voor acquisities op de Costa del Sol.' }
        ]
      },
      markets: {
        title: 'Wat Wij Structureren',
        subtitle: 'Financiering én investeerdersintroducties',
        items: [
          { icon: '🏗️', title: 'Ontwikkelaarsfinanciering', desc: 'Senior en mezzanine financiering voor residentiële, commerciële en gemengde projecten. Wij structureren het dossier en plaatsen het bij de juiste lender. Tot 80% LTC.' },
          { icon: '🌉', title: 'Brugfinanciering', desc: 'Kortlopende financiering voor snelle acquisities en aankoop-renovatie-verkoop strategieën. 6–24 maanden, 8–15% p.j., rente vaak opgeteld.' },
          { icon: '🏛️', title: 'Investeerdersintroductie', desc: 'Wij introduceren private lenders en family offices direct bij vooraf beoordeelde projecten. Typisch rendement 8–14% p.j. op gesecurde posities.' }
        ]
      },
      ai: {
        badge: 'AI Financieringstool',
        title: 'Weet wat mogelijk is voordat u vraagt',
        subtitle: 'Beschrijf uw project en ontvang direct een indicatieve financieringsanalyse met concrete opties. Of registreer u als lender voor toegang tot onze deal flow.',
        cta: 'Start Projectanalyse →'
      },
      social: {
        title: 'Waarom ontwikkelaars en investeerders Costa Capital kiezen',
        benefits: [
          'Onafhankelijk — wij werken voor u, niet voor een specifieke lender',
          'Lenderklaar dossier — wij structureren het volledig voor u',
          'Netwerk van 25+ actieve private lenders in Europa',
          'Ervaring met Nederlandse BV, Belgische NV, UK Ltd structuren',
          'Begeleiding bij NIE, notaris en Spaanse juridische basis',
          'Indicatieve voorwaarden binnen 48 uur'
        ]
      },
      cta: {
        title: 'Heeft u een project of zoekt u deal flow in Spanje?',
        subtitle: 'Analyseer uw project met onze AI-tool of neem direct contact op met Jaap',
        btn1: 'Start Analyse', btn2: 'Neem Contact Op'
      },
      footer: {
        desc: 'Onafhankelijk vastgoedfinancieringsintermediair op de Spaanse Middellandse Zeekust. Financiering structureren én investeerders introduceren bij uw project.',
        contact: 'Contact', location: 'Locatie',
        denia: 'Dénia, Costa Blanca (Hoofdkantoor)',
        entity: 'JLMX B.V. (Nederland) · Costa Capital (Spanje)',
        rights: '© 2026 Costa Capital · JLMX B.V. Alle rechten voorbehouden.'
      },
      chat: {
        title: 'AI Financieringsassistent',
        subtitle: 'Project financieren of investeren in Spanje? Ik help u verder.',
        placeholder: 'Beschrijf uw project of situatie...',
        empty: 'Heeft u een project of bent u een investeerder?',
        emptyDesc: 'Vertel me over uw project in Spanje of wat voor investeringskansen u zoekt — dan analyseer ik direct de opties.',
        suggestions: [
          'Ik zoek brugfinanciering voor een villa aankoop in Marbella, aankoopprijs €1.2M',
          'Ik wil een ontwikkelingsproject financieren in Valencia, grond + bouw €4M totaal',
          'Ik ben een private lender en zoek vastgoedkansen in Spanje met 10%+ rendement'
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
        badge: 'Independent intermediary · Spanish Mediterranean Coast',
        title: 'The best opportunities in Spain\nstay unrealised —',
        titleEm: 'without the right capital partner.',
        subtitle: 'Costa Capital structures financing for developers and project owners in Spain — and introduces the right private lender or investor to each deal. Independent. Local. Direct.',
        cta1: 'Analyse your project',
        cta2: 'Calculate Financing',
        location: 'Based in Dénia, Costa Blanca'
      },
      stats: [
        { value: '€50M+', label: 'Deals Structured' },
        { value: '48h', label: 'First Response' },
        { value: '25+', label: 'Active Lenders' },
        { value: '4', label: 'Regions' }
      ],
      features: {
        title: 'Why Costa Capital?',
        items: [
          { icon: MapPin, title: 'Locally Rooted', desc: 'Based in Dénia on the Costa Blanca. Daily knowledge of which projects are and aren\'t financeable — no spreadsheet replaces that.' },
          { icon: Globe, title: 'Both Sides of the Table', desc: 'We structure the financing AND introduce the right lender or investor. Dutch BV, Belgian NV, UK Ltd above Spanish SL — we know the structures.' },
          { icon: TrendingUp, title: 'Up to 80% LTC', desc: 'Via selected private lenders and family offices: up to 80% LTC for development projects and up to 70% LTV for acquisitions on the Costa del Sol.' }
        ]
      },
      markets: {
        title: 'What We Structure',
        subtitle: 'Financing and investor introductions',
        items: [
          { icon: '🏗️', title: 'Developer Finance', desc: 'Senior and mezzanine financing for residential, commercial and mixed-use projects. We structure the dossier and place it with the right lender. Up to 80% LTC.' },
          { icon: '🌉', title: 'Bridge Finance', desc: 'Short-term financing for fast acquisitions and buy-renovate-sell strategies. 6–24 months, 8–15% p.a., interest often rolled up.' },
          { icon: '🏛️', title: 'Investor Introduction', desc: 'We introduce private lenders and family offices directly to pre-assessed projects. Typical return 8–14% p.a. on secured positions.' }
        ]
      },
      ai: {
        badge: 'AI Finance Tool',
        title: 'Know what\'s possible before you ask',
        subtitle: 'Describe your project and instantly receive an indicative financing analysis with concrete options. Or register as a lender to access our deal flow.',
        cta: 'Start Project Analysis →'
      },
      social: {
        title: 'Why developers and investors choose Costa Capital',
        benefits: [
          'Independent — we work for you, not for a specific lender',
          'Lender-ready dossier — we structure it completely for you',
          'Network of 25+ active private lenders across Europe',
          'Experience with Dutch BV, Belgian NV, UK Ltd structures',
          'Guidance on NIE, notary and Spanish legal basics',
          'Indicative terms within 48 hours'
        ]
      },
      cta: {
        title: 'Do you have a project or are you looking for deal flow in Spain?',
        subtitle: 'Analyse your project with our AI tool or contact Jaap directly',
        btn1: 'Start Analysis', btn2: 'Get in Touch'
      },
      footer: {
        desc: 'Independent real estate finance intermediary on the Spanish Mediterranean coast. Structuring financing and introducing investors to your project.',
        contact: 'Contact', location: 'Location',
        denia: 'Dénia, Costa Blanca (Head Office)',
        entity: 'JLMX B.V. (Netherlands) · Costa Capital (Spain)',
        rights: '© 2026 Costa Capital · JLMX B.V. All rights reserved.'
      },
      chat: {
        title: 'AI Financing Assistant',
        subtitle: 'Financing a project or investing in Spain? I can help.',
        placeholder: 'Describe your project or situation...',
        empty: 'Do you have a project or are you an investor?',
        emptyDesc: 'Tell me about your project in Spain or what investment opportunities you are looking for — I will analyse the options immediately.',
        suggestions: [
          'I need bridge financing for a villa purchase in Marbella, purchase price €1.2M',
          'I want to finance a development project in Valencia, land + construction €4M total',
          'I am a private lender looking for real estate opportunities in Spain with 10%+ return'
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
        badge: 'Intermediario independiente · Costa Mediterránea Española',
        title: 'Las mejores oportunidades en España\nse pierden —',
        titleEm: 'sin el socio de capital adecuado.',
        subtitle: 'Costa Capital estructura financiación para promotores y propietarios de proyectos en España — e introduce al prestamista privado o inversor adecuado en cada operación. Independientes. Locales. Directos.',
        cta1: 'Analizar su proyecto',
        cta2: 'Calcular Financiación',
        location: 'Con sede en Dénia, Costa Blanca'
      },
      stats: [
        { value: '€50M+', label: 'Operaciones Estructuradas' },
        { value: '48h', label: 'Primera Respuesta' },
        { value: '25+', label: 'Prestamistas Activos' },
        { value: '4', label: 'Regiones' }
      ],
      features: {
        title: '¿Por qué Costa Capital?',
        items: [
          { icon: MapPin, title: 'Arraigados Localmente', desc: 'Con sede en Dénia en la Costa Blanca. Conocimiento diario de qué proyectos son financiables y cuáles no — ninguna hoja de cálculo lo reemplaza.' },
          { icon: Globe, title: 'A Ambos Lados de la Mesa', desc: 'Estructuramos la financiación E introducimos al prestamista o inversor adecuado. BV holandesa, NV belga, Ltd británica sobre SL española — conocemos las estructuras.' },
          { icon: TrendingUp, title: 'Hasta 80% LTC', desc: 'A través de prestamistas privados y family offices seleccionados: hasta 80% LTC para proyectos de desarrollo y hasta 70% LTV para adquisiciones en la Costa del Sol.' }
        ]
      },
      markets: {
        title: 'Qué Estructuramos',
        subtitle: 'Financiación e introducciones de inversores',
        items: [
          { icon: '🏗️', title: 'Financiación Promotores', desc: 'Deuda senior y mezzanine para proyectos residenciales, comerciales y mixtos. Estructuramos el dossier y lo colocamos con el prestamista adecuado. Hasta 80% LTC.' },
          { icon: '🌉', title: 'Préstamo Puente', desc: 'Financiación a corto plazo para adquisiciones rápidas y estrategias compra-reforma-venta. 6–24 meses, 8–15% anual, interés frecuentemente capitalizado.' },
          { icon: '🏛️', title: 'Introducción de Inversores', desc: 'Introducimos prestamistas privados y family offices directamente en proyectos previamente evaluados. Rentabilidad típica 8–14% anual en posiciones garantizadas.' }
        ]
      },
      ai: {
        badge: 'Herramienta IA de Financiación',
        title: 'Sepa qué es posible antes de preguntar',
        subtitle: 'Describa su proyecto y reciba al instante un análisis de financiación indicativo con opciones concretas. O regístrese como prestamista para acceder a nuestro flujo de operaciones.',
        cta: 'Iniciar Análisis del Proyecto →'
      },
      social: {
        title: 'Por qué promotores e inversores eligen Costa Capital',
        benefits: [
          'Independientes — trabajamos para usted, no para un prestamista específico',
          'Dossier listo para prestamistas — lo estructuramos completamente',
          'Red de más de 25 prestamistas privados activos en Europa',
          'Experiencia con estructuras BV holandesa, NV belga, Ltd británica',
          'Orientación sobre NIE, notaría y bases jurídicas españolas',
          'Condiciones indicativas en 48 horas'
        ]
      },
      cta: {
        title: '¿Tiene un proyecto o busca flujo de operaciones en España?',
        subtitle: 'Analice su proyecto con nuestra herramienta IA o contacte directamente con Jaap',
        btn1: 'Iniciar Análisis', btn2: 'Ponerse en Contacto'
      },
      footer: {
        desc: 'Intermediario independiente de financiación inmobiliaria en la costa mediterránea española. Estructuramos financiación e introducimos inversores en su proyecto.',
        contact: 'Contacto', location: 'Ubicación',
        denia: 'Dénia, Costa Blanca (Sede Central)',
        entity: 'JLMX B.V. (Países Bajos) · Costa Capital (España)',
        rights: '© 2026 Costa Capital · JLMX B.V. Todos los derechos reservados.'
      },
      chat: {
        title: 'Asistente de Financiación IA',
        subtitle: '¿Financiar un proyecto o invertir en España? Le ayudo.',
        placeholder: 'Describa su proyecto o situación...',
        empty: '¿Tiene un proyecto o es usted un inversor?',
        emptyDesc: 'Cuénteme sobre su proyecto en España o qué oportunidades de inversión busca — analizaré las opciones de inmediato.',
        suggestions: [
          'Necesito financiación puente para comprar una villa en Marbella, precio €1,2M',
          'Quiero financiar un proyecto de desarrollo en Valencia, suelo + construcción €4M total',
          'Soy prestamista privado y busco oportunidades inmobiliarias en España con +10% de rentabilidad'
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
    },
    pl: {
      nav: { contact: 'Kontakt', backLabel: 'Powrót do głównej strony' },
      hero: {
        badge: 'Niezależny pośrednik · Hiszpańskie Wybrzeże Śródziemnomorskie',
        title: 'Najlepsze okazje w Hiszpanii\npozostają niewykorzystane —',
        titleEm: 'bez właściwego partnera kapitałowego.',
        subtitle: 'Costa Capital strukturyzuje finansowanie dla deweloperów i właścicieli projektów w Hiszpanii — i wprowadza właściwego prywatnego pożyczkodawcę lub inwestora do każdej transakcji. Niezależnie. Lokalnie. Bezpośrednio.',
        cta1: 'Analizuj swój projekt',
        cta2: 'Oblicz Finansowanie',
        location: 'Siedziba w Dénia, Costa Blanca'
      },
      stats: [
        { value: '€50M+', label: 'Ustrukturyzowane Transakcje' },
        { value: '48h', label: 'Pierwsza Odpowiedź' },
        { value: '25+', label: 'Aktywnych Pożyczkodawców' },
        { value: '4', label: 'Regiony' }
      ],
      features: {
        title: 'Dlaczego Costa Capital?',
        items: [
          { icon: MapPin, title: 'Lokalnie Zakorzenieni', desc: 'Siedziba w Dénia na Costa Blanca. Codzienna wiedza o tym, które projekty są finansowalne, a które nie — żaden arkusz kalkulacyjny tego nie zastąpi.' },
          { icon: Globe, title: 'Po Obu Stronach Stołu', desc: 'Strukturyzujemy finansowanie I wprowadzamy właściwego pożyczkodawcę lub inwestora. Holenderska BV, belgijska NV, brytyjska Ltd powyżej hiszpańskiej SL — znamy struktury.' },
          { icon: TrendingUp, title: 'Do 80% LTC', desc: 'Przez wybranych prywatnych pożyczkodawców i family offices: do 80% LTC dla projektów deweloperskich i do 70% LTV dla akwizycji na Costa del Sol.' }
        ]
      },
      markets: {
        title: 'Co Strukturyzujemy',
        subtitle: 'Finansowanie i wprowadzanie inwestorów',
        items: [
          { icon: '🏗️', title: 'Finansowanie Deweloperskie', desc: 'Dług senior i mezzanine dla projektów mieszkaniowych, komercyjnych i mieszanych. Strukturyzujemy dossier i plasujemy u właściwego pożyczkodawcy. Do 80% LTC.' },
          { icon: '🌉', title: 'Kredyt Pomostowy', desc: 'Krótkoterminowe finansowanie szybkich akwizycji i strategii kup-odnów-sprzedaj. 6–24 miesiące, 8–15% rocznie, odsetki często kapitalizowane.' },
          { icon: '🏛️', title: 'Wprowadzanie Inwestorów', desc: 'Wprowadzamy prywatnych pożyczkodawców i family offices bezpośrednio do wcześniej ocenionych projektów. Typowy zwrot 8–14% rocznie na zabezpieczonych pozycjach.' }
        ]
      },
      ai: {
        badge: 'Narzędzie AI do Finansowania',
        title: 'Wiedz co jest możliwe zanim zapytasz',
        subtitle: 'Opisz swój projekt i natychmiast otrzymaj indykatywną analizę finansowania z konkretnymi opcjami. Lub zarejestruj się jako pożyczkodawca, aby uzyskać dostęp do naszego przepływu transakcji.',
        cta: 'Rozpocznij Analizę Projektu →'
      },
      social: {
        title: 'Dlaczego deweloperzy i inwestorzy wybierają Costa Capital',
        benefits: [
          'Niezależni — pracujemy dla Ciebie, nie dla konkretnego pożyczkodawcy',
          'Dossier gotowe dla pożyczkodawców — strukturyzujemy je całkowicie',
          'Sieć ponad 25 aktywnych prywatnych pożyczkodawców w Europie',
          'Doświadczenie z holenderską BV, belgijską NV, brytyjską Ltd',
          'Wskazówki dotyczące NIE, notariusza i hiszpańskich podstaw prawnych',
          'Warunki indykatywne w ciągu 48 godzin'
        ]
      },
      cta: {
        title: 'Masz projekt lub szukasz przepływu transakcji w Hiszpanii?',
        subtitle: 'Przeanalizuj swój projekt narzędziem AI lub skontaktuj się bezpośrednio z Jaapem',
        btn1: 'Rozpocznij Analizę', btn2: 'Skontaktuj Się'
      },
      footer: {
        desc: 'Niezależny pośrednik finansowania nieruchomości na hiszpańskim wybrzeżu śródziemnomorskim. Strukturyzujemy finansowanie i wprowadzamy inwestorów do Twojego projektu.',
        contact: 'Kontakt', location: 'Lokalizacja',
        denia: 'Dénia, Costa Blanca (Siedziba Główna)',
        entity: 'JLMX B.V. (Holandia) · Costa Capital (Hiszpania)',
        rights: '© 2026 Costa Capital · JLMX B.V. Wszelkie prawa zastrzeżone.'
      },
      chat: {
        title: 'Asystent Finansowy AI',
        subtitle: 'Finansowanie projektu lub inwestowanie w Hiszpanii? Pomogę.',
        placeholder: 'Opisz swój projekt lub sytuację...',
        empty: 'Masz projekt czy jesteś inwestorem?',
        emptyDesc: 'Opowiedz mi o swoim projekcie w Hiszpanii lub jakich okazji inwestycyjnych szukasz — od razu przeanalizuję opcje.',
        suggestions: [
          'Potrzebuję kredytu pomostowego na zakup willi w Marbelli, cena zakupu €1,2M',
          'Chcę sfinansować projekt deweloperski w Walencji, grunt + budowa €4M łącznie',
          'Jestem prywatnym pożyczkodawcą i szukam okazji nieruchomościowych w Hiszpanii z 10%+ zwrotem'
        ],
        optionsTitle: 'Opcje finansowania dla Twojego projektu',
        recommendTitle: 'Rekomendacja',
        nextStepTitle: 'Następny krok',
        newAnalysis: 'Analizuj nowy projekt',
        ltv: 'LTV/LTC', rate: 'Oprocentowanie', term: 'Okres', amount: 'Kwota Kredytu'
      },
      calc: {
        title: 'Szybki Kalkulator',
        subtitle: 'Indykatywne obliczenie dla Twojego projektu',
        loanAmount: 'Kwota Kredytu', projectValue: 'Wartość Projektu', term: 'Okres',
        months: 'miesięcy', ltv: 'Loan-to-Value (LTV)',
        monthly: 'Indykatywna rata miesięczna', total: 'Łączne odsetki (indykatywnie)',
        note: '✓ Indykatywnie na podstawie 9,6% rocznie. Dla dokładnych warunków: analiza 48h przez narzędzie AI.',
        discuss: 'Analizuj przez AI →'
      }
    }
  };

  const reviews = {
    nl: [
      { name: 'Henrik Janssen', role: 'CEO, Nordic Investments', project: 'Villa Ontwikkeling Jávea', amount: '€4.2M', image: 'HJ', rating: 5, quote: 'Als Nederlander die in Spanje wilde investeren had ik een partner nodig die beide markten begreep. Costa Capital structureerde de financiering én introduceerde ons bij de juiste private lender.', result: '6 villa\'s gebouwd, allemaal verkocht, 38% ROI' },
      { name: 'Sarah & Michael Thompson', role: 'Private Investors, UK', project: 'Boutique Hotel Dénia', amount: '€2.8M', image: 'ST', rating: 5, quote: 'Spaanse banken wilden niet financieren voor buitenlanders. Costa Capital structureerde een bridge loan met 65% LTV in 2 weken en introduceerde ons direct bij de lender.', result: '18 kamers gerenoveerd, volle bezetting zomer' },
      { name: 'Alexander Petrov', role: 'CEO, Mediterranean Investments', project: 'Boutique Hotel Marbella', amount: '€10M', image: 'AP', rating: 5, quote: 'Costa Capital begreep de luxe markt aan de Costa del Sol perfect en structureerde een development facility met gefaseerde drawdowns.', result: '45 kamers + spa, opening Q2 2025' },
      { name: 'Carlos Martínez', role: 'Desarrollador, Valencia', project: 'Complejo Mixto Valencia', amount: '€8.5M', image: 'CM', rating: 5, quote: 'Snelle beslissingen en echte kennis van de Valenciaanse markt. Deal gesloten in 2 weken.', result: '42 appartementen + 8 units, 85% pre-sold' }
    ],
    en: [
      { name: 'Henrik Janssen', role: 'CEO, Nordic Investments', project: 'Villa Development Jávea', amount: '€4.2M', image: 'HJ', rating: 5, quote: 'As a Dutchman investing in Spain I needed a partner who understood both markets. Costa Capital structured the financing AND introduced us to the right private lender directly.', result: '6 villas built, all sold, 38% ROI' },
      { name: 'Sarah & Michael Thompson', role: 'Private Investors, UK', project: 'Boutique Hotel Dénia', amount: '€2.8M', image: 'ST', rating: 5, quote: 'Spanish banks would not finance foreigners. Costa Capital structured a bridge loan at 65% LTV and introduced us to the lender in 2 weeks.', result: '18 rooms renovated, full occupancy summer' },
      { name: 'Alexander Petrov', role: 'CEO, Mediterranean Investments', project: 'Boutique Hotel Marbella', amount: '€10M', image: 'AP', rating: 5, quote: 'Costa Capital perfectly understood the luxury Costa del Sol market and structured a development facility with phased drawdowns.', result: '45 rooms + spa, opening Q2 2025' },
      { name: 'Laura van den Berg', role: 'Real Estate Investor, Rotterdam', project: 'Holiday Portfolio Calpe', amount: '€3.6M', image: 'LB', rating: 5, quote: 'Costa Capital structured financing for my portfolio of 8 apartments and introduced the lender directly. The whole process was transparent from day one.', result: '8 apartments, 75% average occupancy, €180K annual rental income' }
    ],
    es: [
      { name: 'Henrik Janssen', role: 'CEO, Nordic Investments', project: 'Desarrollo Villas Jávea', amount: '€4.2M', image: 'HJ', rating: 5, quote: 'Como holandés invirtiendo en España necesitaba un socio que entendiera ambos mercados. Costa Capital estructuró la financiación E introdujo al prestamista adecuado directamente.', result: '6 villas construidas, todas vendidas, 38% ROI' },
      { name: 'Sarah & Michael Thompson', role: 'Inversores Privados, UK', project: 'Hotel Boutique Dénia', amount: '€2.8M', image: 'ST', rating: 5, quote: 'Los bancos españoles no financiaban a extranjeros. Costa Capital estructuró un préstamo puente al 65% LTV y nos introdujo con el prestamista en 2 semanas.', result: '18 habitaciones renovadas, ocupación plena en verano' },
      { name: 'Carlos Martínez', role: 'Promotor, Valencia', project: 'Complejo Mixto Valencia', amount: '€8.5M', image: 'CM', rating: 5, quote: 'Decisiones rápidas y conocimiento real del mercado valenciano. Operación cerrada en 2 semanas.', result: '42 apartamentos + 8 locales, 85% vendido sobre plano' },
      { name: 'Alexander Petrov', role: 'CEO, Mediterranean Investments', project: 'Hotel Boutique Marbella', amount: '€10M', image: 'AP', rating: 5, quote: 'Costa Capital entendió perfectamente el mercado de lujo de la Costa del Sol y estructuró una facility de desarrollo con disposiciones escalonadas.', result: '45 habitaciones + spa, apertura Q2 2025' }
    ],
    pl: [
      { name: 'Henrik Janssen', role: 'CEO, Nordic Investments', project: 'Deweloperka Willi Jávea', amount: '€4.2M', image: 'HJ', rating: 5, quote: 'Jako Holender inwestujący w Hiszpanii potrzebowałem partnera rozumiejącego oba rynki. Costa Capital ustrukturyzował finansowanie I wprowadził nas do właściwego prywatnego pożyczkodawcy.', result: '6 willi wybudowanych, wszystkie sprzedane, 38% ROI' },
      { name: 'Sarah & Michael Thompson', role: 'Prywatni Inwestorzy, UK', project: 'Boutique Hotel Dénia', amount: '€2.8M', image: 'ST', rating: 5, quote: 'Hiszpańskie banki nie finansowały obcokrajowców. Costa Capital ustrukturyzował kredyt pomostowy przy 65% LTV i wprowadził nas do pożyczkodawcy w 2 tygodnie.', result: '18 pokoi wyremontowanych, pełne obłożenie latem' },
      { name: 'Alexander Petrov', role: 'CEO, Mediterranean Investments', project: 'Boutique Hotel Marbella', amount: '€10M', image: 'AP', rating: 5, quote: 'Costa Capital doskonale rozumiał rynek luksusowy Costa del Sol i ustrukturyzował facility deweloperską z etapowymi wypłatami.', result: '45 pokoi + spa, otwarcie Q2 2025' },
      { name: 'Laura van den Berg', role: 'Inwestor Nieruchomości, Rotterdam', project: 'Portfolio Wakacyjne Calpe', amount: '€3.6M', image: 'LB', rating: 5, quote: 'Costa Capital ustrukturyzował finansowanie mojego portfolio 8 apartamentów i bezpośrednio wprowadził pożyczkodawcę. Cały proces był transparentny od pierwszego dnia.', result: '8 apartamentów, 75% średnie obłożenie, €180K rocznych przychodów' }
    ]
  };

  const text = t[language] || t.en;
  const clientReviews = reviews[language] || reviews.en;

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
        : language === 'pl'
        ? 'Przepraszamy, coś poszło nie tak. Skontaktuj się z nami: info@costacapital.pro'
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
    const subjects = {
      nl: 'Aanvraag Contact - Costa Capital',
      en: 'Contact Request - Costa Capital',
      es: 'Solicitud de Contacto - Costa Capital',
      pl: 'Prośba o Kontakt - Costa Capital'
    };
    window.location.href = `mailto:info@costacapital.pro?subject=${encodeURIComponent(subjects[language])}`;
  };

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
            {['nl', 'en', 'es', 'pl'].map(lang => (
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
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
            <em>{text.hero.titleEm}</em>
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
            {language === 'nl' ? 'Succesvolle Transacties' : language === 'es' ? 'Transacciones Exitosas' : language === 'pl' ? 'Udane Transakcje' : 'Successful Transactions'}
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
            <p className="cc-muted cc-location"><MapPin size={14} />{text.footer.denia}</p>
            <p className="cc-muted" style={{marginLeft:'1.2rem',fontSize:'0.78rem'}}>{text.footer.entity}</p>
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

              {isLoading && (
                <div className="cc-msg-row">
                  <div className="cc-msg-avatar">CC</div>
                  <div className="cc-msg cc-msg-ai cc-msg-loading">
                    <span /><span /><span />
                  </div>
                </div>
              )}

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
                <h3 className="cc-modal-title">
                  {language === 'nl' ? 'Neem Contact Op' : language === 'es' ? 'Ponerse en Contacto' : language === 'pl' ? 'Skontaktuj Się' : 'Get in Touch'}
                </h3>
                <p className="cc-modal-sub">
                  {language === 'nl' ? 'Bespreek uw project met Jaap Meelker' : language === 'es' ? 'Hable con Jaap Meelker sobre su proyecto' : language === 'pl' ? 'Omów swój projekt z Jaapem Meelkerem' : 'Discuss your project with Jaap Meelker'}
                </p>
              </div>
              <button onClick={() => setContactOpen(false)} className="cc-modal-close"><X size={20} /></button>
            </div>
            <div className="cc-contact-body">
              <a href="tel:+31681752045" className="cc-contact-item">
                <div className="cc-contact-icon">📞</div>
                <div>
                  <div className="cc-contact-main">+31 6 8175 2045</div>
                  <div className="cc-muted-sm">
                    {language === 'nl' ? 'Bel of WhatsApp' : language === 'es' ? 'Llame o WhatsApp' : language === 'pl' ? 'Zadzwoń lub WhatsApp' : 'Call or WhatsApp'}
                  </div>
                </div>
              </a>
              <a href="mailto:info@costacapital.pro" className="cc-contact-item">
                <div className="cc-contact-icon">✉️</div>
                <div>
                  <div className="cc-contact-main">info@costacapital.pro</div>
                  <div className="cc-muted-sm">
                    {language === 'nl' ? 'Reactie binnen 48 uur' : language === 'es' ? 'Respuesta en 48 horas' : language === 'pl' ? 'Odpowiedź w 48 godzin' : 'Response within 48 hours'}
                  </div>
                </div>
              </a>
              <a href="https://wa.me/31681752045" target="_blank" rel="noopener noreferrer" className="cc-contact-item cc-whatsapp">
                <div className="cc-contact-icon cc-contact-icon-white">💬</div>
                <div>
                  <div className="cc-contact-main">WhatsApp</div>
                  <div style={{fontSize:'0.8rem',color:'#bbf7d0'}}>
                    {language === 'nl' ? 'Direct chatten' : language === 'es' ? 'Chat directo' : language === 'pl' ? 'Czat bezpośredni' : 'Chat directly'}
                  </div>
                </div>
              </a>
              <button onClick={() => { setContactOpen(false); setChatOpen(true); }} className="cc-btn-primary cc-btn-full" style={{marginTop:'0.5rem'}}>
                <MessageSquare size={16} />
                {language === 'nl' ? 'Of analyseer uw project met AI' : language === 'es' ? 'O analice su proyecto con IA' : language === 'pl' ? 'Lub analizuj projekt z AI' : 'Or analyse your project with AI'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
