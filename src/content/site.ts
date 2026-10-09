export const siteConfig = {
  name: "Nodera Studio",
  shortName: "Nodera",
  // Temporary contact values until final public channels are confirmed.
  email: "hello@noderastudio.com",
  inquirySubject: "Project inquiry",
  instagram: "https://instagram.com/nodera.web",
  instagramLabel: "@nodera.web",
  location: "Serbia / Remote",
};

const technologies = ["Next.js", "GSAP", "Supabase", "Resend"];

export const siteContent = {
  sr: {
    skipLink: "Pređi na sadržaj",
    navigation: { work: "Radovi", services: "Usluge", about: "Proces", inquiry: "Upit", label: "Glavna navigacija", backToTop: "Nodera Studio — nazad na vrh", language: "Izaberi jezik" },
    hero: {
      kicker: "Nezavisni web development studio",
      lines: ["Sajtovi", "built to", "perform."],
      system: "Nodera / Sistem",
      surface: "Clean launch. Built to keep moving.",
      copy: "Custom sajtovi, e-commerce, posebne funkcionalnosti i podrška za biznise kojima web treba da bude brži, jasniji i lakši za korišćenje.",
    },
    servicesIntro: { label: "Usluge", title: "Nije template pipeline.", copy: "Gradim nove sajtove, unapređujem postojeće i rešavam tehnički posao koji ih održava u pokretu." },
    services: [
      { id: "01", title: "Web development", short: "Custom sajtovi građeni oko biznisa, ne oko šablona.", detail: "Responsive interfejsi, content sistemi, struktura spremna za launch i frontend detalji zbog kojih brend deluje promišljeno." },
      { id: "02", title: "E-commerce", short: "Prodavnice koje izgledaju jasno, rade brzo i olakšavaju kupovinu.", detail: "Tokovi proizvoda, custom funkcije, integracije, bolji checkout i sitni detalji koji uklanjaju trenje." },
      { id: "03", title: "Održavanje & podrška", short: "Sajt nastavlja da se razvija i posle launch-a.", detail: "Ispravke, ažuriranja, brzina, pristupačnost, tehnička podrška i kontinuirani development kada roadmap poraste." },
      { id: "04", title: "Custom development", short: "Funkcionalnosti, integracije i izmene za postojeće sajtove.", detail: "Od pažljivog redizajna do posebnih funkcionalnosti, postojeći sajt postaje sposobniji bez nepotrebnog početka ispočetka." },
    ],
    work: {
      label: "Featured Work", featured: "Izdvojeni projekat", mobileAlt: "Yummi Art responsive makeup iskustvo",
      project: {
        title: "Yummi Art", type: "Beauty studio / Web sajt", year: "2026",
        description: "Custom web sajt i booking iskustvo za beauty studio, izgrađeni oko snažnog vizuelnog pravca, glatkog motiona i praktične svakodnevne funkcionalnosti.",
        technologies,
        milestones: [
          { id: "01", title: "Visual direction", copy: "Snažan vizuelni sistem zasnovan na upečatljivim fotografijama, editorial tipografiji i scroll kompoziciji." },
          { id: "02", title: "Scroll choreography", copy: "Pinned transformacije povezuju fotografije, tipografiju i detalje u jednu kontinuiranu sekvencu." },
          { id: "03", title: "Responsive experience", copy: "Isti vizuelni identitet i jezik interakcije pažljivo se prilagođavaju desktop i mobile ekranima." },
          { id: "04", title: "Booking & funkcionalnost", copy: "Vođeni booking flow povezuje usluge sa live dostupnošću, rasporedom i automatizovanom komunikacijom." },
        ],
      },
    },
    existing: { title: "Već imaš sajt?", copy: "Mogu da unapredim ono što već postoji: redizajn, performanse, custom funkcionalnosti, ispravke, integracije i kontinuirani development bez forsiranja kompletne nove izrade." },
    about: {
      label: "O studiju / Proces", statement: "Nodera Studio je moj nezavisni studio za custom web development, sa visokim standardom kvaliteta za nove projekte i kontinuirani rad.", current: "Trenutna faza", scopeLabel: "Flexible scope", scope: "Novi sajt, postojeći projekat, jedna funkcionalnost ili stalna podrška. Mogu da se uključim tamo gde posao zaista počinje.",
      process: [
        { id: "01", title: "Otkriće", text: "Razumevanje biznisa, postojećeg sajta, korisnika i onoga što novi rad treba da unapredi." },
        { id: "02", title: "Pravac", text: "Definisanje vizuelnog i tehničkog pravca pre nego što implementacija dobije brzinu." },
        { id: "03", title: "Izrada", text: "Pretvaranje pravca u responsive komponente, motion, integracije i production stranice." },
        { id: "04", title: "Dorade", text: "Fino podešavanje performansi, UX-a, pristupačnosti, browser ponašanja i detalja koje ljudi osećaju." },
        { id: "05", title: "Launch", text: "Objava kroz čist release proces, sa metapodacima, osnovnom analitikom i praktičnom predajom." },
        { id: "06", title: "Podrška", text: "Dalje unapređivanje sajta kada se roadmap promeni ili biznis poraste." },
      ],
    },
    contact: { rail: "PROJECT INQUIRY / WEB SAJTOVI / E-COMMERCE / ODRŽAVANJE / FUNKCIJE / PERFORMANSE /", kicker: "Kontakt", title: "Hajde da napravimo nešto vredno posete.", panel: "Project inquiry / Nodera", status: "Otvoreno / 01" },
    form: {
      name: "Ime", email: "Email", company: "Kompanija / Brend", need: "Šta ti je potrebno?", select: "Izaberi opciju", message: "Reci mi nešto o projektu", placeholder: "Šta gradiš, šta već postoji i šta želiš da unaprediš?", send: "Pošalji upit", sending: "Šaljem…", sent: "Upit je poslat", another: "Pošalji novi upit", check: "Proveri označena polja.", fallback: "Možeš mi pisati i direktno", success: "Hvala — tvoj upit je poslat. Odgovoriću ti u najkraćem roku.", genericError: "Došlo je do problema pri slanju upita.",
      types: { "new-website": "Novi web sajt", "e-commerce": "E-commerce", "improve-existing": "Unapređenje postojećeg sajta", "custom-development": "Custom funkcionalnost / development", maintenance: "Održavanje / stalna podrška", "something-else": "Nešto drugo" },
      errors: { name: "Unesi svoje ime.", email: "Unesi ispravnu email adresu.", company: "Naziv može imati najviše 120 karaktera.", inquiryType: "Izaberi šta ti je potrebno.", message: "Poruka može imati najviše 4.000 karaktera." },
    },
  },
  en: {
    skipLink: "Skip to content",
    navigation: { work: "Work", services: "Services", about: "Process", inquiry: "Inquiry", label: "Primary navigation", backToTop: "Nodera Studio — back to top", language: "Choose language" },
    hero: { kicker: "Independent web development studio", lines: ["Websites", "built to", "perform."], system: "Nodera / System", surface: "Designed to launch clean. Built to keep moving.", copy: "Custom websites, e-commerce builds, feature work, and support for businesses that need the web to be faster, clearer, and easier to use." },
    servicesIntro: { label: "Services", title: "Not a template pipeline.", copy: "I build new websites, improve existing ones, and handle the technical work that keeps them moving." },
    services: [
      { id: "01", title: "Web Development", short: "Custom websites built around the business, not a template.", detail: "Responsive interfaces, content systems, launch-ready structure, and frontend craft that makes the brand feel considered." },
      { id: "02", title: "E-commerce", short: "Stores that feel sharp, fast, and easier to buy from.", detail: "Product flows, custom features, integrations, checkout improvements, and the small details that remove friction." },
      { id: "03", title: "Maintenance & Support", short: "The website keeps improving after it goes live.", detail: "Fixes, updates, speed work, accessibility passes, technical support, and ongoing development when the roadmap grows." },
      { id: "04", title: "Custom Development", short: "Features, integrations, and modifications for existing sites.", detail: "From careful redesigns to bespoke functionality, I help existing websites become more capable without starting over." },
    ],
    work: {
      label: "Featured Work", featured: "Featured project", mobileAlt: "Yummi Art responsive makeup experience",
      project: { title: "Yummi Art", type: "Beauty Studio / Website", year: "2026", description: "A custom website and booking experience for a beauty studio, built around strong visuals, smooth motion, and practical day-to-day functionality.", technologies, milestones: [
        { id: "01", title: "Visual Direction", copy: "A bold visual system built around strong imagery, editorial typography, and scroll-led composition." },
        { id: "02", title: "Scroll Choreography", copy: "Pinned transformations coordinate imagery, typography, and detail through one continuous sequence." },
        { id: "03", title: "Responsive Experience", copy: "The same visual identity and interaction language adapt carefully across desktop and mobile." },
        { id: "04", title: "Booking & Functionality", copy: "A guided flow connects services to live availability, with scheduling and automated communication behind it." },
      ] },
    },
    existing: { title: "Already have a website?", copy: "I can improve what is already there: redesigns, performance work, custom features, fixes, integrations, and ongoing development without forcing a rebuild." },
    about: {
      label: "About / Process", statement: "Nodera Studio is my independent studio for custom web development, with close attention to quality across new builds and ongoing work.", current: "Current step", scopeLabel: "Flexible scope", scope: "New builds, existing websites, one feature, or ongoing support. I can join the project wherever the work starts.",
      process: [
        { id: "01", title: "Discover", text: "Clarify the business, the current website, the users, and what the work needs to improve." },
        { id: "02", title: "Direction", text: "Choose the visual and technical direction before implementation starts moving fast." },
        { id: "03", title: "Build", text: "Turn the direction into responsive components, motion, integrations, and production pages." },
        { id: "04", title: "Refine", text: "Tune performance, UX, accessibility, browser behavior, and the details people actually feel." },
        { id: "05", title: "Launch", text: "Ship with a clean release path, metadata, analytics basics, and practical handoff." },
        { id: "06", title: "Support", text: "Keep improving the site after launch when the roadmap changes or the business grows." },
      ],
    },
    contact: { rail: "PROJECT INQUIRY / WEBSITES / E-COMMERCE / MAINTENANCE / FEATURES / PERFORMANCE /", kicker: "Contact", title: "Let’s build something worth visiting.", panel: "Project inquiry / Nodera", status: "Open / 01" },
    form: {
      name: "Name", email: "Email", company: "Company / Brand", need: "What do you need?", select: "Select an option", message: "Tell me about the project", placeholder: "Tell me what you’re building, what already exists, and what you’d like to improve.", send: "Send inquiry", sending: "Sending…", sent: "Inquiry sent", another: "Send another inquiry", check: "Please check the highlighted fields.", fallback: "You can also email me directly", success: "Thanks — your inquiry is on its way. I’ll get back to you as soon as possible.", genericError: "Something went wrong while sending your inquiry.",
      types: { "new-website": "New website", "e-commerce": "E-commerce", "improve-existing": "Improve an existing website", "custom-development": "Custom feature / development", maintenance: "Maintenance / ongoing support", "something-else": "Something else" },
      errors: { name: "Please enter your name.", email: "Please enter a valid email address.", company: "Company or brand must be 120 characters or fewer.", inquiryType: "Please choose what you need.", message: "Project details must be 4,000 characters or fewer." },
    },
  },
} as const;
