import React, { useMemo, useState } from "react";

// =============================================
// LFC Project – Newcomer Support Hub (Pure Tailwind v4)
// Team: Mr./Mrs. Worldwide
// Notes:
//  - No chatbots, no third‑party widgets, no external UI libs.
//  - Background: world map + grid (top) and blue wave art (bottom).
//  - Multi‑language UI with RTL support for Arabic.
//  - Georgia State themed colors.
// =============================================

const SITE_TITLE = "LFC Project – Newcomer Support Hub";
const TEAM_NAME = "Mr./Mrs. Worldwide";

type Category = "Legal" | "Housing" | "Health" | "Education" | "Employment" | "Emergency" | "Community";

export type Resource = {
  id: string;
  name: string;
  url: string;
  description: string;
  category: Category;
  city?: string;
  languages?: string[];
  tags?: string[];
  isUrgent?: boolean;
};

// ======= Official GSU/On‑Campus Resources =======
const RESOURCES: Resource[] = [
  // EDUCATION / ESL
  {
    id: "alsl-esl",
    name: "GSU English as a Second Language (ESL) Program",
    url: "https://alsl.gsu.edu/esl/",
    description: "Credit‑bearing ESL courses supporting undergraduate and graduate students at Georgia State.",
    category: "Education",
    city: "Atlanta",
    languages: ["English"],
    tags: ["ESL", "courses", "support"],
  },
  {
    id: "iep",
    name: "GSU Intensive English Program (IEP)",
    url: "https://iep.gsu.edu/",
    description: "Academic English program (all levels), conversation practice, and cultural activities.",
    category: "Education",
    city: "Atlanta",
    languages: ["English"],
    tags: ["IEP", "English classes", "conversation"],
  },
  // LEGAL
  {
    id: "immigration-clinic",
    name: "GSU College of Law – Immigration Clinic",
    url: "https://law.gsu.edu/student-experience/experiential-learning/clinics/immigration-clinic/",
    description: "Law clinic assisting non‑citizens in removal proceedings; intake and referrals.",
    category: "Legal",
    city: "Atlanta",
    languages: ["English", "Spanish"],
    tags: ["legal", "immigration", "clinic"],
  },
  // HOUSING
  {
    id: "university-housing",
    name: "GSU University Housing (On‑Campus)",
    url: "https://myhousing.gsu.edu/",
    description: "On‑campus housing info, applications, residence life, and support.",
    category: "Housing",
    city: "Atlanta",
    languages: ["English"],
    tags: ["on‑campus", "housing"],
  },
  {
    id: "offcampus-housing",
    name: "GSU Off‑Campus Housing Portal",
    url: "https://www.georgiastateoffcampus.com/",
    description: "Official portal for rentals, roommates, and off‑campus housing resources.",
    category: "Housing",
    city: "Atlanta",
    languages: ["English"],
    tags: ["off‑campus", "rentals", "roommates"],
  },
  // HEALTH
  {
    id: "student-health-clinic",
    name: "GSU Student Health Clinic",
    url: "https://health.gsu.edu/",
    description: "Primary care services for enrolled students; appointments, immunizations, referrals.",
    category: "Health",
    city: "Atlanta",
    languages: ["English"],
    tags: ["clinic", "primary care", "appointments"],
  },
  {
    id: "counseling-center",
    name: "GSU Counseling Center (24/7 after‑hours crisis line)",
    url: "https://counseling.gsu.edu/",
    description: "Individual counseling, groups, psychiatry, and crisis support for students.",
    category: "Health",
    city: "Atlanta",
    languages: ["English"],
    tags: ["mental health", "counseling", "crisis"],
    isUrgent: true,
  },
  // EMPLOYMENT
  {
    id: "career-services",
    name: "GSU University Career Services",
    url: "https://career.gsu.edu/students/",
    description: "Career counseling, Handshake jobs, resume reviews, and workshops.",
    category: "Employment",
    city: "Atlanta",
    languages: ["English"],
    tags: ["jobs", "Handshake", "resume"],
  },
  // COMMUNITY / WELCOME
  {
    id: "isss",
    name: "GSU International Student & Scholar Services (ISSS)",
    url: "https://isss.gsu.edu/",
    description: "Immigration advising for F‑1/J‑1, orientations, cultural programs, and student orgs.",
    category: "Community",
    city: "Atlanta",
    languages: ["English"],
    tags: ["orientation", "advising", "events"],
  },
];

const CATEGORIES = ["All", "Legal", "Housing", "Health", "Education", "Employment", "Emergency", "Community"] as const;

// ======= i18n (expand as needed) =======
const I18N: Record<string, Record<string, string>> = {
  en: {
    title: SITE_TITLE,
    subtitle: "Trusted links for immigration, housing, health, school, and jobs.",
    searchPlaceholder: "Search by name, tag, or keyword…",
    category: "Category",
    language: "Language",
    city: "City",
    clearFilters: "Clear filters",
    quickHelp: "Quick help",
    safetyNotice: "If you are in immediate danger, call 911.",
    print: "Print one‑pager",
    share: "Share",
    resources: "Resources",
    byStudents: `Built by students · Team ${TEAM_NAME}`,
  },
  es: {
    title: SITE_TITLE,
    subtitle: "Enlaces confiables sobre inmigración, vivienda, salud, escuela y trabajo.",
    searchPlaceholder: "Buscar por nombre, etiqueta o palabra clave…",
    category: "Categoría",
    language: "Idioma",
    city: "Ciudad",
    clearFilters: "Limpiar filtros",
    quickHelp: "Ayuda rápida",
    safetyNotice: "Si está en peligro inmediato, llame al 911.",
    print: "Imprimir una página",
    share: "Compartir",
    resources: "Recursos",
    byStudents: `Creado por estudiantes · Equipo ${TEAM_NAME}`,
  },
  am: {
    title: SITE_TITLE,
    subtitle: "ለአዲስ መጡት መረጃ፣ መኖሪያ፣ ጤና፣ ትምህርት እና ሥራ አገናኝዎች",
    searchPlaceholder: "በስም ወይም ቁልፍ ቃል ፈልግ…",
    category: "ምድብ",
    language: "ቋንቋ",
    city: "ከተማ",
    clearFilters: "ማጣሪያ አጥፋ",
    quickHelp: "ፈጣን እርዳታ",
    safetyNotice: "አስቸኳይ ጊዜ 911 ይደውሉ",
    print: "አንድ‑ገጽ አትም",
    share: "አካፍል",
    resources: "ሀብቶች",
    byStudents: `በተማሪዎች የተገነባ · ቡድን ${TEAM_NAME}`,
  },
  ar: {
    title: SITE_TITLE,
    subtitle: "روابط موثوقة للهجرة والسكن والصحة والدراسة والعمل.",
    searchPlaceholder: "ابحث بالاسم أو الكلمة المفتاحية…",
    category: "الفئة",
    language: "اللغة",
    city: "المدينة",
    clearFilters: "مسح المرشحات",
    quickHelp: "مساعدة سريعة",
    safetyNotice: "في حالة الطوارئ اتصل بـ 911.",
    print: "طباعة صفحة واحدة",
    share: "مشاركة",
    resources: "الموارد",
    byStudents: `مشروع طلابي · الفريق ${TEAM_NAME}`,
  },
  zh: {
    title: SITE_TITLE,
    subtitle: "关于移民、住房、健康、学校与工作的可靠链接。",
    searchPlaceholder: "按名称、标签或关键词搜索…",
    category: "类别",
    language: "语言",
    city: "城市",
    clearFilters: "清除筛选",
    quickHelp: "快速帮助",
    safetyNotice: "如遇紧急情况请拨打 911。",
    print: "打印一页",
    share: "分享",
    resources: "资源",
    byStudents: `学生创建 · 团队 ${TEAM_NAME}`,
  },
  hi: {
    title: SITE_TITLE,
    subtitle: "आप्रवासन, आवास, स्वास्थ्य, पढ़ाई और नौकरी के विश्वसनीय लिंक।",
    searchPlaceholder: "नाम या कीवर्ड से खोजें…",
    category: "श्रेणी",
    language: "भाषा",
    city: "शहर",
    clearFilters: "फ़िल्टर साफ़ करें",
    quickHelp: "त्वरित सहायता",
    safetyNotice: "आपातकाल में 911 डायल करें।",
    print: "एक‑पृष्ठ प्रिंट",
    share: "शेयर",
    resources: "संसाधन",
    byStudents: `छात्रों द्वारा निर्मित · टीम ${TEAM_NAME}`,
  },
  fr: {
    title: SITE_TITLE,
    subtitle: "Liens fiables pour l’immigration, le logement, la santé, l’école et l’emploi.",
    searchPlaceholder: "Rechercher par nom ou mot‑clé…",
    category: "Catégorie",
    language: "Langue",
    city: "Ville",
    clearFilters: "Effacer les filtres",
    quickHelp: "Aide rapide",
    safetyNotice: "En cas d’urgence, composez le 911.",
    print: "Imprimer une page",
    share: "Partager",
    resources: "Ressources",
    byStudents: `Créé par des étudiants · Équipe ${TEAM_NAME}`,
  },
  pt: {
    title: SITE_TITLE,
    subtitle: "Links confiáveis sobre imigração, moradia, saúde, estudos e trabalho.",
    searchPlaceholder: "Pesquisar por nome ou palavra‑chave…",
    category: "Categoria",
    language: "Idioma",
    city: "Cidade",
    clearFilters: "Limpar filtros",
    quickHelp: "Ajuda rápida",
    safetyNotice: "Em emergência, ligue 911.",
    print: "Imprimir uma página",
    share: "Compartilhar",
    resources: "Recursos",
    byStudents: `Feito por estudantes · Equipe ${TEAM_NAME}`,
  },
  ko: {
    title: SITE_TITLE,
    subtitle: "이민, 주거, 건강, 학교, 취업에 관한 신뢰할 수 있는 링크.",
    searchPlaceholder: "이름 또는 키워드로 검색…",
    category: "분류",
    language: "언어",
    city: "도시",
    clearFilters: "필터 초기화",
    quickHelp: "빠른 도움",
    safetyNotice: "긴급 상황에는 911.",
    print: "한 페이지 인쇄",
    share: "공유",
    resources: "자료",
    byStudents: `학생 제작 · 팀 ${TEAM_NAME}`,
  },
  vi: {
    title: SITE_TITLE,
    subtitle: "Liên kết đáng tin cậy về nhập cư, nhà ở, y tế, học tập và việc làm.",
    searchPlaceholder: "Tìm theo tên hoặc từ khóa…",
    category: "Danh mục",
    language: "Ngôn ngữ",
    city: "Thành phố",
    clearFilters: "Xóa lọc",
    quickHelp: "Trợ giúp nhanh",
    safetyNotice: "Khẩn cấp gọi 911.",
    print: "In một trang",
    share: "Chia sẻ",
    resources: "Tài nguyên",
    byStudents: `Sinh viên thực hiện · Nhóm ${TEAM_NAME}`,
  },
  ru: {
    title: SITE_TITLE,
    subtitle: "Надёжные ссылки по иммиграции, жилью, здоровью, учёбе и работе.",
    searchPlaceholder: "Поиск по имени или ключевому слову…",
    category: "Категория",
    language: "Язык",
    city: "Город",
    clearFilters: "Сбросить фильтры",
    quickHelp: "Быстрая помощь",
    safetyNotice: "В экстренной ситуации звоните 911.",
    print: "Печать одной страницы",
    share: "Поделиться",
    resources: "Ресурсы",
    byStudents: `Создано студентами · Команда ${TEAM_NAME}`,
  },
};

export default function App() {
  const [lang, setLang] = useState<keyof typeof I18N>("en");
  const isRTL = lang === "ar";
  const t = I18N[lang];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("All");
  const [city, setCity] = useState<string>("All");
  const [languageFilter, setLanguageFilter] = useState<string>("All");

  const cities = useMemo(() => {
    const set = new Set<string>();
    RESOURCES.forEach(r => r.city && set.add(r.city));
    return ["All", ...Array.from(set)];
  }, []);

  const languages = useMemo(() => {
    const set = new Set<string>();
    RESOURCES.forEach(r => r.languages?.forEach(l => set.add(l)));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter(r => {
      const matchCategory = category === "All" || r.category === category;
      const matchCity = city === "All" || r.city === city;
      const matchLang = languageFilter === "All" || (r.languages || []).includes(languageFilter);
      const hay = `${r.name} ${r.description} ${(r.tags || []).join(" ")}`.toLowerCase();
      const matchQuery = q === "" || hay.includes(q);
      return matchCategory && matchCity && matchLang && matchQuery;
    });
  }, [query, category, city, languageFilter]);

  const sharePage = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: t.title, text: t.subtitle, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch {}
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen text-gray-900 relative bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.45),transparent_60%)]">
      {/* Decorative world background (top grid + stylized map) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <svg className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-10" width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#g)"/>
          <g opacity="0.25" stroke="currentColor">
            {Array.from({length:40}).map((_,i)=> (
              <path key={i} d={`M0 ${i*24} H1600`} />
            ))}
            {Array.from({length:40}).map((_,i)=> (
              <path key={`v${i}`} d={`M${i*40} 0 V900`} />
            ))}
          </g>
          {/* simplified continents silhouettes */}
          <g opacity="0.15" fill="currentColor" transform="translate(100,120) scale(1.2)">
            <path d="M160 120c40-30 90-40 140-32 28 4 50 18 70 34 20 16 38 35 60 44 30 12 64 6 94 12 28 6 54 24 72 48 16 22 24 52 14 78-12 32-46 50-80 58-46 10-96 4-138-18-30-16-56-40-88-52-44-18-94-12-138-28-30-12-62-38-60-72 2-30 30-48 54-72Z"/>
            <path d="M580 200c20-18 52-26 78-20 28 6 48 26 62 48 12 20 22 44 18 68-4 26-22 48-46 58-26 10-56 6-80-8-22-12-38-32-44-56-8-28 0-58 12-82Z"/>
            <path d="M860 260c24-14 60-10 82 8 24 18 34 48 30 76-4 24-20 46-42 56-26 12-58 10-82-4-22-12-36-34-40-58-4-30 12-60 52-78Z"/>
          </g>
        </svg>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-blue-600/90 text-white backdrop-blur border-b border-blue-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-lg">🌍</span>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <span className="ml-2 px-2 py-0.5 rounded bg-white/20 text-white text-xs">{TEAM_NAME}</span>
          <div className="ml-auto flex items-center gap-2">
            <select value={lang} onChange={e=>setLang(e.target.value as any)} className="border rounded px-2 py-1 text-sm text-blue-900">
              {Object.keys(I18N).map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
            <button onClick={()=>window.print()} className="border rounded px-3 py-1 text-sm bg-white/10 hover:bg-white/20">{t.print}</button>
            <button onClick={sharePage} className="rounded px-3 py-1 text-sm text-blue-700 bg-white hover:bg-gray-100">{t.share}</button>
          </div>
        </div>
        {/* International ribbon */}
        <div className="overflow-hidden border-t border-blue-700 bg-blue-600/80">
          <div className="whitespace-nowrap py-1 text-sm animate-[scroll_30s_linear_infinite]">
            <span className="mx-3">🌍</span> 🇪🇹 🇺🇸 🇲🇽 🇨🇴 🇨🇳 🇮🇳 🇫🇷 🇪🇸 🇧🇷 🇰🇷 🇯🇵 🇨🇦 🇳🇬 🇵🇭 🇻🇳 🇸🇦 🇹🇷 🇺🇦 🇮🇷 🇵🇹 🇩🇪 🇬🇭 🇵🇰 🇸🇴 🇺🇬 🇵🇪 🇷🇺 🇵🇱 🇦🇷 🇦🇫 🇿🇦 🇪🇬 🇲🇦 🇮🇹 🇬🇷 🇹🇭 🇲🇲 🇳🇵 🇧🇩 🇻🇪 🇹🇳 🇲🇾 🇸🇬 🇦🇪 🇮🇶 🇨🇿 🇸🇪 🇳🇴 🇩🇰 🇵🇹
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-3xl font-bold leading-tight">{t.subtitle}</p>
            <div className="mt-3 text-sm text-gray-700">A project by <span className="font-semibold">{TEAM_NAME}</span>.</div>
            <div className="mt-4 flex gap-3 items-center text-sm text-gray-700">
              <span>🛡️</span> <span>Privacy‑friendly: we link directly to official or trusted organizations.</span>
            </div>
            <div className="mt-2 flex gap-3 items-center text-sm text-gray-700">
              <span>👥</span> <span>Curated by campus volunteers.</span>
            </div>
          </div>
          <div className="rounded-lg p-4 bg-white/70 border">
            <div className="font-semibold flex items-center gap-2">🆘 {t.quickHelp}</div>
            <div className="mt-2 flex gap-2 flex-wrap text-sm">
              <span className="px-2 py-1 rounded bg-gray-200">📞 911</span>
              <span className="px-2 py-1 rounded bg-gray-200">📞 988</span>
              <span className="px-2 py-1 rounded bg-gray-200">🏠 Shelter</span>
              <span className="px-2 py-1 rounded bg-gray-200">❤️ Health</span>
            </div>
            <p className="text-xs text-gray-700 mt-2">{t.safetyNotice}</p>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <input
              className="w-full border rounded px-9 py-2 bg-white/80"
              placeholder={t.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔎</span>
          </div>
          <select value={category} onChange={(e)=>setCategory(e.target.value as any)} className="border rounded px-2 py-2 w-44 bg-white/80">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={city} onChange={(e)=>setCity(e.target.value)} className="border rounded px-2 py-2 w-40 bg-white/80">
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={languageFilter} onChange={(e)=>setLanguageFilter(e.target.value)} className="border rounded px-2 py-2 w-44 bg-white/80">
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <button
            onClick={()=>{setQuery("");setCategory("All");setCity("All");setLanguageFilter("All");}}
            className="px-3 py-2 rounded border bg-white/80"
          >
            {t.clearFilters}
          </button>
        </div>
      </section>

      {/* RESULTS */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-600 py-10">No resources match your filters yet. Try clearing filters.</div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(r => (
              <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="block">
                <div className={`h-full rounded-lg border p-4 bg-white/80 hover:shadow transition ${r.isUrgent ? "border-red-500" : ""}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-lg">
                      {r.category === "Legal" && "🛡️"}
                      {r.category === "Housing" && "🏠"}
                      {r.category === "Health" && "❤️"}
                      {r.category === "Education" && "🎓"}
                      {r.category === "Employment" && "👥"}
                      {r.category === "Emergency" && "🆘"}
                      {r.category === "Community" && "📍"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold leading-tight">{r.name}</h3>
                        {r.isUrgent && <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs">Urgent</span>}
                      </div>
                      <p className="text-sm text-gray-700 mt-1 line-clamp-3">{r.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-gray-100">{r.category}</span>
                        {r.city && <span className="px-2 py-0.5 rounded bg-gray-100">{r.city}</span>}
                        {(r.languages || []).slice(0,3).map(l => (
                          <span key={l} className="px-2 py-0.5 rounded border">{l}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      {/* Bottom artwork (blue waves) to avoid plain white */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] opacity-30">
        <svg viewBox="0 0 1440 320" className="w-full h-full">
          <path fill="#1d4ed8" fillOpacity="0.35" d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,208C672,224,768,224,864,208C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#2563eb" fillOpacity="0.35" d="M0,288L60,272C120,256,240,224,360,224C480,224,600,256,720,261.3C840,267,960,245,1080,240C1200,235,1320,245,1380,250.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      {/* FOOTER */}
      <footer className="border-t py-8 text-sm text-gray-700 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p>&copy; {new Date().getFullYear()} {SITE_TITLE}. Student project by {TEAM_NAME}. Not legal advice.</p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded border">Open‑source</span>
            <span className="px-2 py-0.5 rounded border">Accessible</span>
            <span className="px-2 py-0.5 rounded border">Mobile‑first</span>
            <span className="px-2 py-0.5 rounded border">International</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
