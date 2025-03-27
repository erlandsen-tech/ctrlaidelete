// Amnesty causes data for Amnesty International Interactive Experience
import { AmnestyCause } from './types';

export const amnestyCauses: AmnestyCause[] = [
  {
    id: 1,
    name: "Flyktningers rettigheter",
    description: "Amnesty International arbeider for å sikre rettigheter for mennesker på flukt, med fokus på trygge og lovlige fluktveier, bekjempelse av diskriminering og frihetsberøvelse av asylsøkere.",
    status: "Pågående global kampanje",
    goals: "Sikre trygge og lovlige fluktveier, forhindre dødelige grensepasseringer, bekjempe diskriminering av asylsøkere, og sikre familiegjenforening.",
    actions: "Signere opprop, delta i demonstrasjoner, støtte lokale flyktninginitiativ, og spre informasjon om flyktningers situasjon.",
    impact: "Amnestys 'I Welcome'-kampanje har bidratt til å forbedre forholdene for flyktninger i flere land og økt bevisstheten om flyktningers rettigheter.",
    imageUrl: "/images/refugee-rights.png",
    linkUrl: "https://amnesty.no/asylsokere-og-flyktninger"
  },
  {
    id: 2,
    name: "Ytringsfrihet",
    description: "Amnesty kjemper for retten til å uttrykke seg fritt uten frykt for forfølgelse, med fokus på forsvar av journalister, aktivister og samvittighetsfanger.",
    status: "Kontinuerlig arbeid globalt",
    goals: "Beskytte journalister og aktivister, bekjempe sensur og nettbegrensninger, og forsvare varslere og kritiske stemmer.",
    actions: "Delta i skriveaksjoner for fengslede journalister og aktivister, spre informasjon om trusler mot ytringsfriheten, og støtte uavhengige medier.",
    impact: "'Brave'-kampanjen har bidratt til løslatelse av flere samvittighetsfanger og økt beskyttelse for menneskerettighetsforkjempere.",
    imageUrl: "/images/freedom-expression.png",
    linkUrl: "https://amnesty.no/ytringsfrihet"
  },
  {
    id: 3,
    name: "Bedriftsansvar",
    description: "Amnesty arbeider for å holde selskaper ansvarlige for menneskerettighetsbrudd i sine leverandørkjeder og operasjoner globalt.",
    status: "Økende fokus og nye lovgivningsinitiativer",
    goals: "Sikre bindende lovgivning om aktsomhetsvurderinger, støtte lokalsamfunn påvirket av utvinningsindustri, og bekjempe tvangsarbeid.",
    actions: "Signere opprop for bedre lovgivning, kontakte selskaper direkte, og gjøre bevisste forbrukervalg basert på selskapers menneskerettighetsprofil.",
    impact: "Amnestys arbeid mot 'Corporate Capture' har bidratt til økt bevissthet og nye lover om bedrifters ansvar i flere land.",
    imageUrl: "/images/corporate-accountability.png",
    linkUrl: "https://amnesty.no/naeringslivets-ansvar"
  },
  {
    id: 4,
    name: "Avskaffelse av dødsstraff",
    description: "Amnesty har siden 1977 arbeidet for global avskaffelse av dødsstraff gjennom årlige rapporter, mobilisering mot planlagte henrettelser, og juridisk bistand.",
    status: "Over to tredjedeler av verdens land har avskaffet dødsstraff i lov eller praksis",
    goals: "Fullstendig global avskaffelse av dødsstraff i alle land og under alle omstendigheter.",
    actions: "Delta i hastaksjoner mot planlagte henrettelser, signere opprop, og spre informasjon om dødsstraffens ineffektivitet og umenneskelige natur.",
    impact: "Amnestys kampanje har bidratt til at antall land som praktiserer dødsstraff har sunket dramatisk siden 1970-tallet.",
    imageUrl: "/images/death-penalty.png",
    linkUrl: "https://amnesty.no/dodsstraff"
  },
  {
    id: 5,
    name: "Forsamlingsfrihet",
    description: "Amnesty overvåker og beskytter retten til fredelig protest gjennom dokumentasjon av maktmisbruk og forsvar av arresterte demonstranter.",
    status: "Økende utfordringer i mange land",
    goals: "Sikre retten til fredelig protest, bekjempe maktmisbruk mot demonstranter, og motarbeide lover som begrenser forsamlingsfriheten.",
    actions: "Delta i fredelige demonstrasjoner, dokumentere og rapportere overgrep mot demonstranter, og støtte kampanjer mot repressive lover.",
    impact: "'Protect the Protest'-initiativet har bidratt til å synliggjøre og motarbeide globale trender der myndighetene begrenser og kriminaliserer fredelig protest.",
    imageUrl: "/images/freedom-assembly.png",
    linkUrl: "http://amnesty.org/en/what-we-do/freedom-of-expression/"
  },
  {
    id: 6,
    name: "LHBTQ+ rettigheter",
    description: "Amnesty kjemper mot diskriminering basert på seksuell orientering og kjønnsidentitet gjennom kartlegging av diskriminerende lovgivning og forsvar av forfulgte LHBTQ+ personer.",
    status: "Fremgang i noen regioner, tilbakeslag i andre",
    goals: "Dekriminalisering av homoseksualitet globalt, bekjempelse av diskriminerende lover, og beskyttelse av LHBTQ+ aktivister.",
    actions: "Signere opprop, delta i Pride-arrangementer, støtte lokale LHBTQ+ organisasjoner, og spre informasjon om LHBTQ+ rettigheter.",
    impact: "'Love is a Human Right'-kampanjen har bidratt til lovreformer i flere land og økt beskyttelse for LHBTQ+ personer.",
    imageUrl: "/images/lgbtq-rights.png",
    linkUrl: "https://amnesty.no/lhbt"
  },
  {
    id: 7,
    name: "Personvern og overvåkning",
    description: "Amnesty arbeider mot uforholdsmessig og ulovlig masseovervåkning gjennom avsløring av ulovlig overvåkningspraksis og kampanjer mot eksport av overvåkningsteknologi.",
    status: "Økende utfordringer med ny teknologi",
    goals: "Begrense masseovervåkning, regulere bruk av overvåkningsteknologi, og beskytte retten til privatliv i den digitale tidsalderen.",
    actions: "Støtte kampanjer mot masseovervåkning, bruke sikre kommunikasjonsverktøy, og kreve transparens fra myndigheter og teknologiselskaper.",
    impact: "'Ban the Scan'-kampanjen har bidratt til å begrense bruken av ansiktsgjenkjenningsteknologi i flere byer og økt bevisstheten om personvernproblematikk.",
    imageUrl: "/images/privacy-surveillance.png",
    linkUrl: "https://www.amnesty.org/en/tech/surveillance-giants/"
  },
  {
    id: 8,
    name: "Beskyttelse i konfliktsoner",
    description: "Amnesty dokumenterer og bekjemper brudd på menneskerettigheter og humanitær rett i konfliktområder gjennom etterforskning av krigsforbrytelser og dokumentasjon av angrep på sivile.",
    status: "Pågående arbeid i flere konfliktsoner",
    goals: "Beskytte sivile i konflikt, dokumentere krigsforbrytelser for fremtidig rettsforfølgelse, og stoppe våpensalg til parter som begår overgrep.",
    actions: "Støtte nødhjelpsarbeid, signere opprop mot våpensalg til konfliktparter, og spre informasjon om situasjonen i konfliktområder.",
    impact: "'Crisis Response'-teamet har bidratt til å dokumentere krigsforbrytelser i flere konflikter, som senere har ført til rettsforfølgelse.",
    imageUrl: "/images/conflict-protection.png",
    linkUrl: "https://amnesty.no/krig"
  },
  {
    id: 9,
    name: "Kvinners rettigheter",
    description: "Amnesty kjemper for global likestilling og mot kjønnsbasert diskriminering med fokus på bekjempelse av vold mot kvinner og forsvar av seksuelle og reproduktive rettigheter.",
    status: "Fremgang i noen områder, tilbakeslag i andre",
    goals: "Bekjempe vold mot kvinner, sikre seksuelle og reproduktive rettigheter, og fremme likestilling i lovgivning og praksis.",
    actions: "Delta i kampanjer mot kjønnsbasert vold, støtte organisasjoner som arbeider for kvinners rettigheter, og spre informasjon om kjønnsdiskriminering.",
    impact: "'My Body, My Rights'-kampanjen har bidratt til lovreformer i flere land og økt tilgang til prevensjon og trygg abort.",
    imageUrl: "/images/womens-rights.png",
    linkUrl: "https://amnesty.no/kvinners-rettigheter"
  },
  {
    id: 10,
    name: "Urfolks rettigheter",
    description: "Amnesty støtter urfolks kamp for landrettigheter og selvbestemmelse gjennom dokumentasjon av tvangsforflytninger og støtte til urfolks landrettssaker.",
    status: "Økende anerkjennelse, men fortsatt store utfordringer",
    goals: "Sikre urfolks rett til land og ressurser, beskytte urfolksledere mot trusler og forfølgelse, og fremme urfolks rett til selvbestemmelse.",
    actions: "Støtte urfolksorganisasjoner, signere opprop mot prosjekter som truer urfolks landområder, og spre informasjon om urfolks rettigheter og situasjon.",
    impact: "'Indigenous Rights are Human Rights'-initiativet har bidratt til økt beskyttelse for urfolksledere og anerkjennelse av urfolks landrettigheter i flere land.",
    imageUrl: "/images/indigenous-rights.png",
    linkUrl: "https://amnesty.no/urfolk"
  }
];
