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
        title: 'Vastgoedfinanciering\nSpaanse Kust',
        subtitle: 'Expert in Costa del Sol, Costa Blanca en Valencia regio. Financiering voor internationale investeerders en lokale ontwikkelaars. Van €500K tot €50M+.',
        cta1: 'Start AI Gesprek',
        cta2: 'Bereken Financiering',
        location: 'Kantoren in Valencia & Marbella'
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
          title: 'Nationale Dekking',
          desc: 'Kantoren in Valencia en Marbella met uitgebreide kennis van alle kustgebieden: Costa del Sol, Costa Blanca, Costa Brava. Van Málaga tot Alicante.'
        },
        flex: {
          title: 'Internationale Structuren',
          desc: 'Ervaring met cross-border deals, offshore structuren en fiscale optimalisatie voor buitenlandse investeerders in Spanje.'
        },
        complex: {
          title: 'Luxe Segment Specialist',
          desc: 'Marbella, Puerto Banús, Benidorm, Valencia. Wij begrijpen de high-end markt en hebben netwerken met lokale notarissen, advocaten en ontwikkelaars aan alle Costa\'s.'
        }
      },
      markets: {
        title: 'Onze Specialisaties aan de Spaanse Kust',
        subtitle: 'Van Costa del Sol tot Costa Blanca',
        coastal: {
          title: 'Luxe Kustwoningen',
          desc: 'Exclusieve villa\'s en penthouses in Marbella, Puerto Banús, Estepona, Altea, Jávea. LTV tot 70% voor prime locaties.'
        },
        commercial: {
          title: 'Commercieel Vastgoed',
          desc: 'Retail, horeca en kantoorruimtes in Valencia, Málaga en Alicante. Ideaal voor internationale retailers en hospitality groups.'
        },
        tourism: {
          title: 'Toeristische Projecten',
          desc: 'Hotels, resorts en short-stay complexen aan alle Costa\'s. Expertise in toerismelicenties en exploitatie financiering.'
        }
      },
      reviews: {
        title: 'Succesvolle Financieringen aan de Spaanse Kust',
        subtitle: 'Wat onze klanten zeggen over hun projecten van Marbella tot Valencia'
      },
      spanish: {
        title: 'De Spaanse Kustmarkt',
        intro: 'Waarom investeren aan de Spaanse Costa\'s?',
        points: [
          '300+ dagen zon per jaar - het beste klimaat van Europa',
          'Costa del Sol: #1 luxe vastgoedmarkt met Marbella & Puerto Banús',
          'Costa Blanca: Sterke groei met Valencia als economisch centrum',
          'Stabiele vraag van Noord-Europese kopers en investeerders',
          'Excellente connectiviteit: 5 internationale luchthavens',
          'Golden Visa mogelijkheden vanaf €500K investering'
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
        subtitle: 'Bespreek uw plannen met onze Valencia-based AI-adviseur of plan een persoonlijk gesprek in',
        btn1: 'Start Gesprek',
        btn2: 'Plan Meeting'
      },
      footer: {
        desc: 'Specialist in vastgoedfinanciering voor internationale investeerders en lokale ontwikkelaars aan de Spaanse kust.',
        contact: 'Contact',
        location: 'Locatie',
        valencia: 'Valencia (Hoofdkantoor)',
        denia: 'Marbella, Costa del Sol',
        rights: '© 2024 Costa Capital. Alle rechten voorbehouden. Geregistreerd in Spanje'
      },
      chat: {
        title: 'AI Financierings Adviseur',
        subtitle: 'Stel uw vragen over financiering in Spanje',
        placeholder: 'Stel uw vraag...',
        empty: 'Start een gesprek over uw Spaanse vastgoedproject',
        suggestions: [
          'Wat zijn de voorwaarden voor een €10M project in Marbella?',
          'Hoe werkt financiering voor luxe villa\'s Costa del Sol?',
          'Welke LTV hanteert Costa Capital voor prime locaties?'
        ],
        systemPrompt: 'Je bent een financieel adviseur voor Costa Capital, gespecialiseerd in vastgoedfinanciering voor de gehele Spaanse kust, van Costa del Sol (Marbella, Estepona, Mijas) tot Costa Blanca (Valencia, Alicante, Benidorm) en alles ertussen. Je helpt internationale investeerders en lokale ontwikkelaars met vragen over financiering van €500K tot €50M+.\n\nJe hebt expertise in:\n- Luxe vastgoed (Marbella, Puerto Banús premium segment)\n- Grote projecten (recentelijk €10M Marbella project)\n- Spaanse regelgeving (NIE, escritura, nota simple)\n- Golden Visa trajecten\n- Cross-border structuren\n\nWees professioneel, commercieel en to-the-point. Je doel is om leads te genereren door waarde te bieden en interesse te wekken.\n\nBelangrijk gedrag:\n- Beantwoord vragen nuttig en compleet\n- Na 2-3 berichten uitwisseling, moedig subtiel aan om contact op te nemen voor een persoonlijk gesprek\n- Vermeld: "Voor een gedetailleerde analyse van uw specifieke project, neem gerust contact met ons op via info@costacapital.pro of bel +31 6 8175 2045 (WhatsApp mogelijk)"\n- Benadruk unieke voordelen: kantoren in Valencia EN Marbella, ervaring met grote deals (€10M+), kennis van alle Costa\'s\n- Wees enthousiast maar niet pusherig\n- Minimale financiering €500K, we doen projecten tot €50M+\n- Recente referentie: €10M project in Marbella\n\nAntwoord in het Nederlands.'
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
        title: 'Real Estate Financing\nSpanish Coast',
        subtitle: 'Expert in Costa del Sol, Costa Blanca and Valencia region. Financing for international investors and local developers. From €500K to €50M+.',
        cta1: 'Start AI Chat',
        cta2: 'Calculate Financing',
        location: 'Offices in Valencia & Marbella'
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
          title: 'National Coverage',
          desc: 'Offices in Valencia and Marbella with extensive knowledge of all coastal areas: Costa del Sol, Costa Blanca, Costa Brava. From Málaga to Alicante.'
        },
        flex: {
          title: 'International Structures',
          desc: 'Experience with cross-border deals, offshore structures and tax optimization for foreign investors in Spain.'
        },
        complex: {
          title: 'Luxury Segment Specialist',
          desc: 'Marbella, Puerto Banús, Benidorm, Valencia. We understand the high-end market and have networks with local notaries, lawyers and developers across all Costas.'
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
        subtitle: 'Discuss your plans with our Valencia-based AI advisor or schedule a personal meeting in',
        btn1: 'Start Conversation',
        btn2: 'Schedule Meeting'
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
    },
    ru: {
      nav: {
        contact: 'Контакты'
      },
      hero: {
        badge: 'Специализация на испанском рынке недвижимости',
        title: 'Финансирование\nнедвижимости\nИспания и Европа',
        subtitle: 'Эксперт в регионе Коста Бланка и Валенсии. Финансирование для международных инвесторов и местных застройщиков. От €500K до €50M+.',
        cta1: 'Начать AI чат',
        cta2: 'Рассчитать финансирование',
        location: 'Офис в Валенсии, Испания'
      },
      stats: {
        financed: 'Профинансировано в Испании',
        response: 'Первый ответ',
        projects: 'Испанских проектов',
        satisfaction: 'Удовлетворенность клиентов'
      },
      features: {
        title: 'Почему Costa Capital для Испании?',
        speed: {
          title: 'Местная экспертиза',
          desc: 'Офис в Валенсии с глубоким знанием испанского рынка, законодательства и местной банковской системы. Мы говорим на языке - буквально и фигурально.'
        },
        flex: {
          title: 'Международные структуры',
          desc: 'Опыт трансграничных сделок, оффшорных структур и налоговой оптимизации для иностранных инвесторов в Испании.'
        },
        complex: {
          title: 'Специалист по Коста Бланка',
          desc: 'Валенсия, Аликанте, Бенидорм, Дения, Хавеа. Мы знаем Коста Бланка как свои пять пальцев и имеем сеть местных нотариусов, юристов и застройщиков.'
        }
      },
      markets: {
        title: 'Наши специализации в Испании',
        subtitle: 'От прибрежной недвижимости до городского развития',
        coastal: {
          title: 'Жилая недвижимость Коста Бланка',
          desc: 'Роскошные виллы, апартаменты и курортные комплексы вдоль Коста Бланка. LTV до 70% для сильных локаций.'
        },
        commercial: {
          title: 'Коммерческая недвижимость',
          desc: 'Розничная торговля, гостиничный бизнес и офисные помещения в Валенсии и окрестностях. Идеально для международных ритейлеров.'
        },
        tourism: {
          title: 'Туристические проекты',
          desc: 'Отели, дома для отдыха и краткосрочные комплексы. Понимание испанских туристических лицензий и регулирования.'
        }
      },
      reviews: {
        title: 'Успешное финансирование в Испании',
        subtitle: 'Что говорят наши клиенты о своих проектах на Коста Бланка'
      },
      spanish: {
        title: 'Рынок недвижимости Испании',
        intro: 'Почему инвестировать в регион Валенсии?',
        points: [
          '300+ солнечных дней в году - идеальный климат',
          'Растущий международный спрос на прибрежную недвижимость',
          'Валенсия: третий город Испании, сильный рост',
          'Относительно низкие цены на недвижимость по сравнению с другими прибрежными районами ЕС',
          'Стабильный рынок аренды благодаря туризму',
          'Новая инфраструктура: высокоскоростной поезд AVE, расширение аэропорта'
        ]
      },
      process: {
        title: 'Процесс финансирования',
        subtitle: 'От заявки до закрытия сделки в Испании'
      },
      social: {
        title: 'Почему международные инвесторы выбирают нас',
        benefits: [
          'Помощь с получением NIE и открытием испанского банковского счета',
          'Сеть надежных местных юристов и нотариусов',
          'Опыт работы с процессами residencia и golden visa',
          'Знание Ley de Costas и других испанских норм',
          'Налоговое структурирование через голландских и испанских партнеров',
          'Поддержка управления проектами во время строительства'
        ]
      },
      cta: {
        title: 'Готовы к своему испанскому проекту?',
        subtitle: 'Обсудите ваши планы с нашим AI-консультантом из Валенсии или запланируйте личную встречу',
        btn1: 'Начать разговор',
        btn2: 'Запланировать встречу'
      },
      footer: {
        desc: 'Специалист по финансированию недвижимости для международных инвесторов и местных застройщиков в Испании.',
        contact: 'Контакты',
        location: 'Местоположение',
        valencia: 'Валенсия, Испания (Главный офис)',
        denia: 'Дения, Коста Бланка',
        rights: '© 2024 Costa Capital. Все права защищены. Зарегистрировано в Испании'
      },
      chat: {
        title: 'AI Финансовый консультант',
        subtitle: 'Задайте вопросы о финансировании в Испании',
        placeholder: 'Задайте ваш вопрос...',
        empty: 'Начните разговор о вашем испанском проекте недвижимости',
        suggestions: [
          'Каковы условия финансирования в Валенсии?',
          'Как работает процесс NIE для иностранных инвесторов?',
          'Какой LTV использует Costa Capital для проектов на Коста Бланка?'
        ],
        systemPrompt: 'Вы финансовый консультант Costa Capital, специализирующийся на финансировании недвижимости на испанском рынке, особенно в Валенсии и на Коста Бланка. Вы помогаете международным инвесторам и местным застройщикам с вопросами о финансировании, испанских нормах (NIE, escritura, nota simple) и инвестициях в Испанию.\n\nБудьте профессиональны, коммерчески настроены и конкретны. Ваша цель - генерировать лиды, предоставляя ценность и создавая интерес.\n\nВажное поведение:\n- Отвечайте на вопросы полезно и полно\n- После 2-3 обменов сообщениями тактично поощряйте контакт для личной беседы\n- Укажите: "Для детального анализа вашего конкретного проекта, свяжитесь с нами по адресу info@costacapital.pro или позвоните +31 6 8175 2045 (доступен WhatsApp)"\n- Подчеркивайте уникальные преимущества: местный офис в Валенсии, опыт работы с международными инвесторами, быстрые решения\n- Будьте энтузиастичны, но не навязчивы\n- Минимальное финансирование €500K, максимальное €50M+\n\nОтвечайте на русском языке.'
      },
      calc: {
        title: 'Калькулятор финансирования',
        subtitle: 'Получите расчет для вашего испанского проекта',
        loanAmount: 'Желаемая сумма кредита',
        projectValue: 'Стоимость проекта',
        term: 'Срок',
        months: 'месяцев',
        ltv: 'Кредит к стоимости (LTV)',
        monthly: 'Ориентировочный ежемесячный платеж',
        total: 'Общие проценты (ориентировочно)',
        note: '✓ Этот расчет основан на стандартных условиях для испанских проектов. Для точного предложения мы с радостью свяжемся с вами.',
        discuss: 'Обсудить с AI консультантом'
      }
    },
    de: {
      nav: {
        contact: 'Kontakt'
      },
      hero: {
        badge: 'Spezialisiert auf den spanischen Immobilienmarkt',
        title: 'Immobilienfinanzierung\nSpanien & Europa',
        subtitle: 'Experte in der Region Costa Blanca und Valencia. Finanzierung für internationale Investoren und lokale Entwickler. Von €500K bis €50M+.',
        cta1: 'KI-Chat starten',
        cta2: 'Finanzierung berechnen',
        location: 'Ansässig in Valencia, Spanien'
      },
      stats: {
        financed: 'Finanziert in Spanien',
        response: 'Erste Antwort',
        projects: 'Spanische Projekte',
        satisfaction: 'Kundenzufriedenheit'
      },
      features: {
        title: 'Warum Costa Capital für Spanien?',
        speed: {
          title: 'Lokale Expertise',
          desc: 'Büro in Valencia mit fundiertem Wissen über den spanischen Markt, Gesetzgebung und lokales Bankensystem. Wir sprechen die Sprache - buchstäblich und im übertragenen Sinne.'
        },
        flex: {
          title: 'Internationale Strukturen',
          desc: 'Erfahrung mit grenzüberschreitenden Geschäften, Offshore-Strukturen und Steueroptimierung für ausländische Investoren in Spanien.'
        },
        complex: {
          title: 'Costa Blanca Spezialist',
          desc: 'Valencia, Alicante, Benidorm, Dénia, Jávea. Wir kennen die Costa Blanca wie unsere Westentasche und haben Netzwerke mit lokalen Notaren, Anwälten und Entwicklern.'
        }
      },
      markets: {
        title: 'Unsere Spezialisierungen in Spanien',
        subtitle: 'Von Küstenimmobilien bis zur Stadtentwicklung',
        coastal: {
          title: 'Costa Blanca Wohnimmobilien',
          desc: 'Luxusvillen, Apartments und Resort-Entwicklungen entlang der Costa Blanca. LTV bis zu 70% für starke Standorte.'
        },
        commercial: {
          title: 'Gewerbeimmobilien',
          desc: 'Einzelhandel, Gastronomie und Büroflächen in Valencia Stadt und Umgebung. Ideal für internationale Einzelhändler.'
        },
        tourism: {
          title: 'Tourismusprojekte',
          desc: 'Hotels, Ferienhäuser und Kurzzeitvermietungskomplexe. Verständnis für spanische Tourismuslizenzen und Vorschriften.'
        }
      },
      reviews: {
        title: 'Erfolgreiche Finanzierungen in Spanien',
        subtitle: 'Was unsere Kunden über ihre Projekte an der Costa Blanca sagen'
      },
      spanish: {
        title: 'Der spanische Immobilienmarkt',
        intro: 'Warum in die Region Valencia investieren?',
        points: [
          '300+ Sonnentage im Jahr - ideales Klima',
          'Wachsende internationale Nachfrage nach Küstenimmobilien',
          'Valencia: drittgrößte Stadt Spaniens, starkes Wachstum',
          'Relativ niedrige Immobilienpreise im Vergleich zu anderen EU-Küstenregionen',
          'Stabiler Mietmarkt dank Tourismus',
          'Neue Infrastruktur: AVE-Hochgeschwindigkeitszug, Flughafenerweiterung'
        ]
      },
      process: {
        title: 'Der Finanzierungsprozess',
        subtitle: 'Von der Anfrage bis zum Abschluss in Spanien'
      },
      social: {
        title: 'Warum internationale Investoren uns wählen',
        benefits: [
          'Unterstützung bei NIE-Antrag und spanischem Bankkonto',
          'Netzwerk zuverlässiger lokaler Anwälte und Notare',
          'Erfahrung mit Residencia- und Golden-Visa-Verfahren',
          'Kenntnisse über Ley de Costas und andere spanische Vorschriften',
          'Steuerliche Strukturierung über niederländische und spanische Partner',
          'Projektmanagement-Unterstützung während der Bauphase'
        ]
      },
      cta: {
        title: 'Bereit für Ihr spanisches Immobilienprojekt?',
        subtitle: 'Besprechen Sie Ihre Pläne mit unserem KI-Berater aus Valencia oder vereinbaren Sie ein persönliches Gespräch',
        btn1: 'Gespräch beginnen',
        btn2: 'Meeting planen'
      },
      footer: {
        desc: 'Spezialist für Immobilienfinanzierung für internationale Investoren und lokale Entwickler in Spanien.',
        contact: 'Kontakt',
        location: 'Standort',
        valencia: 'Valencia, Spanien (Hauptsitz)',
        denia: 'Dénia, Costa Blanca',
        rights: '© 2024 Costa Capital. Alle Rechte vorbehalten. Registriert in Spanien'
      },
      chat: {
        title: 'KI-Finanzberater',
        subtitle: 'Stellen Sie Ihre Fragen zur Finanzierung in Spanien',
        placeholder: 'Stellen Sie Ihre Frage...',
        empty: 'Beginnen Sie ein Gespräch über Ihr spanisches Immobilienprojekt',
        suggestions: [
          'Was sind die Konditionen für eine Finanzierung in Valencia?',
          'Wie funktioniert der NIE-Prozess für ausländische Investoren?',
          'Welchen LTV wendet Costa Capital für Costa Blanca-Projekte an?'
        ],
        systemPrompt: 'Sie sind ein Finanzberater für Costa Capital, spezialisiert auf Immobilienfinanzierung für den spanischen Markt, insbesondere Valencia und Costa Blanca. Sie helfen internationalen Investoren und lokalen Entwicklern bei Fragen zur Finanzierung, spanischen Vorschriften (NIE, escritura, nota simple) und Investitionen in Spanien.\n\nSeien Sie professionell, geschäftsorientiert und auf den Punkt. Ihr Ziel ist es, Leads zu generieren, indem Sie Mehrwert bieten und Interesse wecken.\n\nWichtiges Verhalten:\n- Beantworten Sie Fragen hilfreich und vollständig\n- Nach 2-3 Nachrichtenaustauschen ermutigen Sie subtil zur Kontaktaufnahme für ein persönliches Gespräch\n- Erwähnen Sie: "Für eine detaillierte Analyse Ihres spezifischen Projekts kontaktieren Sie uns gerne unter info@costacapital.pro oder rufen Sie +31 6 8175 2045 an (WhatsApp verfügbar)"\n- Betonen Sie einzigartige Vorteile: lokales Büro in Valencia, Erfahrung mit internationalen Investoren, schnelle Entscheidungen\n- Seien Sie enthusiastisch, aber nicht aufdringlich\n- Mindestfinanzierung €500K, maximal €50M+\n\nAntworten Sie auf Deutsch.'
      },
      calc: {
        title: 'Finanzierungsrechner',
        subtitle: 'Erhalten Sie eine Indikation für Ihr spanisches Projekt',
        loanAmount: 'Gewünschter Darlehensbetrag',
        projectValue: 'Projektwert',
        term: 'Laufzeit',
        months: 'Monate',
        ltv: 'Beleihungswert (LTV)',
        monthly: 'Indikative monatliche Rate',
        total: 'Gesamtzinsen (indikativ)',
        note: '✓ Diese Indikation basiert auf Standardkonditionen für spanische Projekte. Für ein genaues Angebot kontaktieren wir Sie gerne persönlich.',
        discuss: 'Mit KI-Berater besprechen'
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
        name: 'David & Emma Richardson',
        role: 'Private Investors, UK',
        project: 'Luxury Penthouse Marbella',
        amount: '€10M',
        image: 'DR',
        rating: 5,
        quote: 'Voor ons €10M penthouse project in Marbella Golden Mile hadden we complexe financiering nodig. Costa Capital structureerde een oplossing met 65% LTV en bridge financing tijdens de verbouwing. Hun Marbella kantoor kende alle lokale spelers.',
        result: 'Penthouse opgeleverd, €15M marktwaarde, 50% ROI binnen 18 maanden'
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
        project: 'Boutique Hotel Estepona',
        amount: '€5.8M',
        image: 'LB',
        rating: 5,
        quote: 'Ik wilde een boutique hotel aan Costa del Sol kopen en renoveren. Costa Capital financierde het hele project inclusief renovatie met een construction loan. Hun kennis van toerisme licenties was cruciaal.',
        result: '24 kamers, 85% gemiddelde bezetting, €420K jaarlijkse omzet'
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
    ],
    ru: [
      {
        name: 'Хенрик Янсен',
        role: 'CEO, Nordic Investments',
        project: 'Роскошные виллы в Хавее',
        amount: '€4.2M',
        image: 'HJ',
        rating: 5,
        quote: 'Как голландец, желающий инвестировать в Испанию, мне нужен был партнер, понимающий обе рынки. Costa Capital организовала финансирование И помогла с NIE, нотариусом и связями с местными подрядчиками. Их офис в Валенсии был бесценен.',
        result: '6 вилл построено, все проданы северо-европейским покупателям, 38% ROI'
      },
      {
        name: 'Сара и Майкл Томпсон',
        role: 'Частные инвесторы, Великобритания',
        project: 'Реновация бутик-отеля в Дении',
        amount: '€2.8M',
        image: 'ST',
        rating: 5,
        quote: 'Мы мечтали о бутик-отеле на Коста Бланка, но испанские банки не финансировали иностранцев. Costa Capital структурировала bridge loan с 65% LTV и провела нас через всю испанскую администрацию.',
        result: '18 номеров отремонтировано, полная загрузка июль-сентябрь, окупаемость за 5 лет'
      },
      {
        name: 'Карлос Мартинес',
        role: 'Местный застройщик, Валенсия',
        project: 'Многофункциональный комплекс Валенсия',
        amount: '€8.5M',
        image: 'CM',
        rating: 5,
        quote: 'Как испанскому застройщику мне было нужно быстрое финансирование. Costa Capital отлично понял валенсийский рынок и закрыл сделку за 2 недели. Их опыт работы с международными инвесторами привлек голландских покупателей.',
        result: '42 квартиры + 8 коммерческих помещений, 85% продано на стадии строительства'
      },
      {
        name: 'Лаура ван ден Берг',
        role: 'Инвестор в недвижимость, Роттердам',
        project: 'Портфель краткосрочной аренды в Кальпе',
        amount: '€3.6M',
        image: 'LB',
        rating: 5,
        quote: 'Я хотела купить портфель из 8 апартаментов для краткосрочной аренды. Costa Capital профинансировала с перекрестным залогом и помогла с туристическими лицензиями. Их знание регулирования Airbnb в Валенсии было решающим.',
        result: '8 апартаментов, средняя загрузка 75%, €180K годового дохода от аренды'
      }
    ],
    de: [
      {
        name: 'Henrik Janssen',
        role: 'CEO, Nordic Investments',
        project: 'Luxusvilla-Entwicklung Jávea',
        amount: '€4.2M',
        image: 'HJ',
        rating: 5,
        quote: 'Als Niederländer, der in Spanien investieren wollte, brauchte ich einen Partner, der beide Märkte versteht. Costa Capital hat die Finanzierung arrangiert UND bei NIE, Notar und lokalen Bauunternehmer-Verbindungen geholfen. Ihr Büro in Valencia war von unschätzbarem Wert.',
        result: '6 Villen gebaut, alle an nordeuropäische Käufer verkauft, 38% ROI'
      },
      {
        name: 'Sarah & Michael Thompson',
        role: 'Privatinvestoren, UK',
        project: 'Boutique-Hotel Renovierung Dénia',
        amount: '€2.8M',
        image: 'ST',
        rating: 5,
        quote: 'Wir träumten von einem Boutique-Hotel an der Costa Blanca, aber spanische Banken finanzierten keine Ausländer. Costa Capital strukturierte einen Überbrückungskredit mit 65% LTV und führte uns durch die gesamte spanische Verwaltung.',
        result: '18 Zimmer renoviert, volle Auslastung Juli-September, 5-jährige Amortisation'
      },
      {
        name: 'Carlos Martínez',
        role: 'Lokaler Entwickler, Valencia',
        project: 'Mischnutzungskomplex Valencia',
        amount: '€8.5M',
        image: 'CM',
        rating: 5,
        quote: 'Als spanischer Entwickler brauchte ich schnelle Finanzierung. Costa Capital verstand den valencianischen Markt perfekt und schloss das Geschäft in 2 Wochen ab. Ihre Erfahrung mit internationalen Investoren zog niederländische Käufer an.',
        result: '42 Wohnungen + 8 Gewerbeeinheiten, 85% vor Fertigstellung verkauft'
      },
      {
        name: 'Laura van den Berg',
        role: 'Immobilieninvestorin, Rotterdam',
        project: 'Ferienvermietungs-Portfolio Calpe',
        amount: '€3.6M',
        image: 'LB',
        rating: 5,
        quote: 'Ich wollte ein Portfolio von 8 Apartments für Kurzzeitvermietung kaufen. Costa Capital finanzierte cross-collateralisiert und half bei Tourismuslizenzen. Ihr Wissen über Airbnb-Vorschriften in Valencia war entscheidend.',
        result: '8 Apartments, durchschnittlich 75% Auslastung, €180K jährliche Mieteinnahmen'
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

  // Email template functie
  const openMeetingEmail = () => {
    const subject = language === 'nl' 
      ? 'Aanvraag Meeting - Costa Capital'
      : language === 'en'
      ? 'Meeting Request - Costa Capital'
      : language === 'ru'
      ? 'Запрос на встречу - Costa Capital'
      : 'Meeting-Anfrage - Costa Capital';
    
    const body = language === 'nl'
      ? `Beste Costa Capital team,

Ik ben geïnteresseerd in het plannen van een persoonlijk gesprek om mijn vastgoedproject in Spanje te bespreken.

MIJN GEGEVENS:
Naam: [Uw volledige naam]
Telefoon: [Uw telefoonnummer]
Email: [Uw email adres]

PROJECTINFORMATIE:
Locatie: [bijv. Valencia, Alicante, Dénia, Jávea]
Type project: [bijv. Villa ontwikkeling, Hotel renovatie, Commercieel vastgoed]
Geschatte projectwaarde: € [bedrag]
Gewenste financiering: € [bedrag]
Gewenste startdatum: [datum]

VOORKEUR MEETING:
Gewenste datum/tijd: [uw voorkeur]
Locatie voorkeur: [Online videocall / Persoonlijk in Valencia / Op locatie project]

AANVULLENDE INFORMATIE:
[Vertel ons meer over uw project of specifieke vragen]

Met vriendelijke groet,
[Uw naam]`
      : language === 'en'
      ? `Dear Costa Capital team,

I am interested in scheduling a personal meeting to discuss my real estate project in Spain.

MY DETAILS:
Name: [Your full name]
Phone: [Your phone number]
Email: [Your email address]

PROJECT INFORMATION:
Location: [e.g. Valencia, Alicante, Dénia, Jávea]
Project type: [e.g. Villa development, Hotel renovation, Commercial real estate]
Estimated project value: € [amount]
Desired financing: € [amount]
Desired start date: [date]

MEETING PREFERENCE:
Preferred date/time: [your preference]
Location preference: [Online video call / In person in Valencia / At project location]

ADDITIONAL INFORMATION:
[Tell us more about your project or specific questions]

Best regards,
[Your name]`
      : language === 'ru'
      ? `Уважаемая команда Costa Capital,

Я заинтересован в планировании личной встречи для обсуждения моего проекта недвижимости в Испании.

МОИ ДАННЫЕ:
Имя: [Ваше полное имя]
Телефон: [Ваш номер телефона]
Email: [Ваш email адрес]

ИНФОРМАЦИЯ О ПРОЕКТЕ:
Местоположение: [напр. Валенсия, Аликанте, Дения, Хавеа]
Тип проекта: [напр. Строительство вилл, Реновация отеля, Коммерческая недвижимость]
Примерная стоимость проекта: € [сумма]
Желаемое финансирование: € [сумма]
Желаемая дата начала: [дата]

ПРЕДПОЧТЕНИЕ ПО ВСТРЕЧЕ:
Предпочтительная дата/время: [ваше предпочтение]
Предпочтение по местоположению: [Онлайн видеозвонок / Лично в Валенсии / На месте проекта]

ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ:
[Расскажите нам больше о вашем проекте или конкретных вопросах]

С уважением,
[Ваше имя]`
      : `Sehr geehrtes Costa Capital Team,

Ich bin daran interessiert, ein persönliches Gespräch zu vereinbaren, um mein Immobilienprojekt in Spanien zu besprechen.

MEINE DATEN:
Name: [Ihr vollständiger Name]
Telefon: [Ihre Telefonnummer]
Email: [Ihre E-Mail-Adresse]

PROJEKTINFORMATIONEN:
Standort: [z.B. Valencia, Alicante, Dénia, Jávea]
Projekttyp: [z.B. Villenentwicklung, Hotelrenovierung, Gewerbeimmobilien]
Geschätzter Projektwert: € [Betrag]
Gewünschte Finanzierung: € [Betrag]
Gewünschtes Startdatum: [Datum]

MEETING-PRÄFERENZ:
Bevorzugtes Datum/Uhrzeit: [Ihre Präferenz]
Standortpräferenz: [Online-Videoanruf / Persönlich in Valencia / Am Projektstandort]

ZUSÄTZLICHE INFORMATIONEN:
[Erzählen Sie uns mehr über Ihr Projekt oder spezifische Fragen]

Mit freundlichen Grüßen,
[Ihr Name]`;

    const mailtoLink = `mailto:info@costacapital.pro?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

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
              className={`px-3 py-2 rounded-md font-semibold transition text-sm ${
                language === 'nl' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              NL
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-2 rounded-md font-semibold transition text-sm ${
                language === 'en' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('de')}
              className={`px-3 py-2 rounded-md font-semibold transition text-sm ${
                language === 'de' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              DE
            </button>
            <button
              onClick={() => setLanguage('ru')}
              className={`px-3 py-2 rounded-md font-semibold transition text-sm ${
                language === 'ru' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              РУ
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
            <button 
              onClick={openMeetingEmail}
              className="bg-orange-700 hover:bg-orange-800 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
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
                  {language === 'nl' ? 'Neem Contact Op' : language === 'en' ? 'Get in Touch' : language === 'de' ? 'Kontakt aufnehmen' : 'Связаться с нами'}
                </h3>
                <p className="text-sm text-slate-400">
                  {language === 'nl' ? 'Bespreek uw project met ons' : language === 'en' ? 'Discuss your project with us' : language === 'de' ? 'Besprechen Sie Ihr Projekt mit uns' : 'Обсудите ваш проект с нами'}
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
                  {language === 'nl' ? 'Direct Contact' : language === 'en' ? 'Direct Contact' : language === 'de' ? 'Direkter Kontakt' : 'Прямой контакт'}
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
                        {language === 'nl' ? 'Bel of WhatsApp ons' : language === 'en' ? 'Call or WhatsApp us' : language === 'de' ? 'Anrufen oder WhatsApp' : 'Позвоните или WhatsApp'}
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
                        {language === 'nl' ? 'Stuur ons een email' : language === 'en' ? 'Send us an email' : language === 'de' ? 'Senden Sie uns eine E-Mail' : 'Отправьте нам email'}
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
                        {language === 'nl' ? 'Chat direct met ons' : language === 'en' ? 'Chat with us directly' : language === 'de' ? 'Chatten Sie direkt mit uns' : 'Общайтесь с нами напрямую'}
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
                      {language === 'nl' ? 'Ons Kantoor' : language === 'en' ? 'Our Office' : language === 'de' ? 'Unser Büro' : 'Наш офис'}
                    </div>
                    <div>Valencia, Spanien</div>
                    <div className="text-slate-400 mt-1">
                      {language === 'nl' 
                        ? 'Lokaal team met internationale ervaring'
                        : language === 'en'
                        ? 'Local team with international experience'
                        : language === 'de'
                        ? 'Lokales Team mit internationaler Erfahrung'
                        : 'Местная команда с международным опытом'}
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
                {language === 'nl' ? 'Of chat met onze AI Adviseur' : language === 'en' ? 'Or chat with our AI Advisor' : language === 'de' ? 'Oder chatten Sie mit unserem KI-Berater' : 'Или пообщайтесь с нашим AI консультантом'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
