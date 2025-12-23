import { LINKS_NAMES, STACK_NAMES } from "@/utils/constants/shared-constants";
import type { ExperienceType } from "@/utils/types/experiences.types";
import type {
  CertificationType,
  HackathonType,
  ResumeType,
} from "@/utils/types/home.types";
import type { ProjectType } from "@/utils/types/projects.types";

export const experiences: ExperienceType[] = [
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714483586/jagnani73/experiences/covalent_klcbpk.png",
    description:
      "CovalentHQ is a blockchain data provider offering comprehensive and transparent access to blockchain data in a unified API. I was given the ownership of a range of open-source products called GoldRush as a way of increasing the API consumption. GoldRush includes a GoldRush Decoder, which is expandable for contributors to add decoders that convert raw log events to structured, human-readable data. GoldRush also includes a GoldRush Kit which is a 'Smart Component' UI library for plug-n-play visualized data of over 200 chains.",
    designation: "Product Engineer",
    duration: "June 2023 - Present",
    org: "CovalentHQ",
    slug: "covalent",
    tag: "full-time",
    url: "https://www.covalenthq.com",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/hashmail_al48gr.png",
    description:
      "Hashmail is a comprehensive web3 mailbox client that centralizes all your different wallet addresses. As the owner and successful launch of two versions, I am proud to say that the main application of Hashmail has thousands of active users and has successfully integrated thousands of wallet addresses. Additionally, I have developed a proxy server that streamlines the process of sending and receiving emails and supports API integration with other applications.",
    designation: "Founding Engineer",
    duration: "July 2022 - June 2023",
    org: "Hashmail",
    slug: "hashmail",
    tag: "full-time",
    url: "https://hashmail.dev",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/quinence_c4lnln.png",
    org: "Quinence",
    url: "https://www.instagram.com/nwcsrmist/",
    designation: "Software Development Consultant",
    tag: "internship",
    description:
      "Quinence is another FinTech firm based on web3. In Quinence, I got the opportunity to explore web3 in-depth, NFTs, marketplaces, blockchain, smart contracts, and the latest buzz I got involved with. In Quinence, I was the engineering owner of two client-based projects. One was creating a metaverse. The other was an NFT marketplace, with filters, sorting, profile pages, and more.",
    duration: "January 2022 - April 2022",
    slug: "quinence",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/nwc_rlg3cg.png",
    org: "Networking & Communications Association",
    url: "https://www.instagram.com/nwcsrmist/",
    designation: "Founding Vice President",
    tag: "campus club",
    description:
      "I was on the founding board of the Networking and Communications Association. It is a student representative association delegated by my school's Networking and Communications Department. I had the opportunity to host some successful social events while laying the foundation of multiple internal projects.",
    duration: "September 2021 - January 2022",
    slug: "nwc",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472674/jagnani73/experiences/wealth42_xjniil.png",
    org: "wealth42",
    url: "https://wealth42.com",
    designation: "Software Development Intern",
    tag: "internship",
    description:
      "wealth42 was a delightful experience. It is a FinTech firm. I was the lead developer in over three projects, including the main website. I gained insights on class-based architectural systems, form implementation of directed graphs, and mail scraping. The main website was live and released features rolling. This made me develop things on a direct user feedback system. We had implemented our tracking that enhanced this aspect.",
    duration: "August 2021 - December 2021",
    slug: "wealth42",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/mlh_vd3dib.png",
    org: "Major League Hacking",
    url: "https://mlh.io/",
    designation: "Pre-Fellowship",
    tag: "fellowship",
    description:
      "Major League Hacking or MLH hosts numerous hackathons every weekend across the globe. They had recently started their fellowship program. I had applied to a track called explorer, which then converted to the Pre-fellowship. During my tenure, I interacted with people around the world and developed a CLI reminder application with them. We were split into pods, and every pod had a dedicated mentor.",
    duration: "July 2021 - August 2021",
    slug: "mlh",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/gcsrm_qqr7f5.png",
    org: "GitHub Community SRM",
    url: "https://githubtech.tech",
    designation: "Founding Administrator",
    tag: "campus club",
    description:
      "GitHub Community SRM is one of my most passionate steps toward OSS. It is an initiative undertaken by a group of students of SRMIST, including myself, with the sole purpose of starting the OSS revolution in SRMIST. We aim to consolidate all the projects and papers created in SRMIST under the banner of the SRMISTKTR GitHub Organisation. I've been an integral part of establishing this community, conducting events, and making the portal to facilitate this.",
    duration: "May 2021 - Present",
    slug: "gcsrm",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/slashpay_flui0b.png",
    org: "Slash",
    url: "https://www.slashpay.app/",
    designation: "Web Development Consultant",
    tag: "internship",
    description:
      "Slash was my first FinTech firm. As a hiring challenge, I created a landing website with some hidden easter eggs. Slash exposed me to the industrial lifestyle and deadlines. I made a dashboard that effectively was an analytics preview for the merchant, stock and orders management, and customer interaction. I also got the opportunity to look into the mass generation of static pages.",
    duration: "March 2021 - July 2021",
    slug: "slash",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/envision_amzz9a.png",
    org: "Team Envision",
    url: "https://envision.aaruush.org/",
    designation: "Committee Head",
    tag: "campus club",
    description:
      "Team Envision is the technical club of SRMIST's student-run, official Annual Techno-Management Fest, AARUUSH. Undertaking various platforms for the social cause, here I was a significant part of creating projects that supported the community—created portals that provisioned certificate distribution and events, the primary website for AARUUSH, and more.",
    duration: "July 2020 - Janurary 2022",
    slug: "envision",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472673/jagnani73/experiences/srmkzilla_kqrrks.png",
    org: "SRMKZILLA",
    url: "https://srmkzilla.net/",
    designation: "Lead - Technical",
    tag: "campus club",
    description:
      "SRMKZILLA, an official Mozilla Campus Club in SRMIST, has always been about spreading open-source. In SRMKZILLA, I got to work and experience various day-to-day management products, such as a mass mailer or a recruiting portal. I was a part of multiple projects representing the organization and worked with the companies to develop the same. In SRMKZILLA, I was trusted with the technical teams' management, including leading projects and organizing events.",
    duration: "June 2020 - November 2021",
    slug: "srmkzilla",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/collate_rtcny4.jpg",
    org: "Collate Innovations",
    url: "https://githubsrm.tech/",
    designation: "Full Stack Developer",
    tag: "internship",
    description:
      "In my first internship, Collate Innovations, I was exposed to the industrial application of ReactJS. Before this internship, I had worked on various projects, including some hackathon-winning ones. This internship taught me how to manage client expectations, how users look at an application, and what essentially UX is. Collate Innovations is an ed-tech platform that taught me how the workings of the industry happen.",
    duration: "June 2020 - September 2020",
    slug: "collate",
  },
  {
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/dscommunity_unp27a.png",
    org: "Data Science Community SRM",
    url: "https://www.dscommunity.in/",
    designation: "Web Development Lead",
    tag: "campus club",
    description:
      "I started in Data Science Community SRM as a part of the founding team. The experience of creating a community and being a part of something from the core up was humbling. I was the lead developer in the community and took up various accessibility projects and management roles.",
    duration: "December 2019 - December 2020",
    slug: "dscommunity",
  },
];

export const projects: ProjectType[] = [
  {
    slug: "nudge-lab",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473693/jagnani73/projects/nudge-lab/preview3_j50aqp.png",
    name: "NudgeLab",
    tag: "website",
    description:
      "NudgeLab is a hack which at its core is a no-code, platform independent nudge management service. It is a platform that wraps over the existing architecture of any infrastructure and through an admin panel, creates campaign based and trigger based nudges. A project wherein I worked completely on the backend and no frontend, except debugging. I created a CDN based approach for the campaign nudges and HTTP polling for the trigger based ones.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/nudge-lab",
      },
    ],
    stack: [STACK_NAMES.NODE, STACK_NAMES.EXPRESS, STACK_NAMES.NEXT],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473687/jagnani73/projects/nudge-lab/preview1_r2k59y.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473684/jagnani73/projects/nudge-lab/preview2_rdp0vp.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473690/jagnani73/projects/nudge-lab/preview4_dzkwog.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473698/jagnani73/projects/nudge-lab/preview5_wd9hvv.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473699/jagnani73/projects/nudge-lab/preview6_n74him.png",
    ],
  },
  {
    slug: "hospitatva",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473718/jagnani73/projects/hospitatva/preview5_vqlet8.png",
    name: "Hospitatva",
    tag: "website",
    description:
      "Hospitatva is a hack that aims to eradicate scams done by hospitals for their limited and reserved resources. It is a distributed ledger-based blockchain implementation of the rates proposed and charged and the commodity count by hospitals for the treatment and consultancy of patients. I built the logic part of its frontend, gaining knowledge about DIDs, the Web of Trust and wallet authentication.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/hospitatva",
      },
    ],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TAILWIND_CSS, STACK_NAMES.TYPESCRIPT],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473710/jagnani73/projects/hospitatva/preview1_1_ghtg1s.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473707/jagnani73/projects/hospitatva/preview2_ov2nxo.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473715/jagnani73/projects/hospitatva/preview3_cl9fz1.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473712/jagnani73/projects/hospitatva/preview6_1_mlrp5u.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473724/jagnani73/projects/hospitatva/preview7_1_ydmuwg.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473721/jagnani73/projects/hospitatva/preview8_1_wghanp.png",
    ],
  },
  {
    slug: "marquee",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473627/jagnani73/projects/marquee/Screenshot_from_2022-07-02_19-57-10_vyyznz.png",
    name: "react-easy-marquee",
    tag: "package",
    description:
      " I couldn't find a good react marquee package and thus decided to develop it. react-easy-marquee is a highly customisable `marquee` package for React built using CSS. Renders anything given between the tags, be it an image, text or a custom JSX element! It is a simple plug-and-play package and requires no external dependency.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/react-easy-marquee",
      },
      {
        name: LINKS_NAMES.NPM,
        url: "https://www.npmjs.com/package/react-easy-marquee",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://jagnani73.github.io/react-easy-marquee/",
      },
    ],
    stack: [STACK_NAMES.PREACT, STACK_NAMES.TAILWIND_CSS],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473624/jagnani73/projects/marquee/Screenshot_from_2022-07-02_19-57-55_skdcwe.png",
    ],
  },
  {
    slug: "shikshak",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473786/jagnani73/projects/shikshak/screenshot-home_1_qehcch.png",
    name: "Shikshak",
    tag: "website",
    description:
      "Shikshak is a hack that enables remote online education by minimising the data consumed exponentially. I built its frontend, which has two ends, a Teacher and a Student. I also implemented its WebRTC-based exchange of data.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/shikshak",
      },
    ],
    stack: [
      STACK_NAMES.REACT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.NODE,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473789/jagnani73/projects/shikshak/screenshot-calibrate_1_kaglgd.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473783/jagnani73/projects/shikshak/screenshot-preview_1_lsp63m.png",
    ],
  },
  {
    slug: "contracts",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473801/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-45-58_qpcdoj.png",
    name: "Contracts",
    tag: "website",
    description:
      "Contracts is a blockchain-based expense-splitter application. In it, a user can create an account to login to our web app. Once a user is logged in, he can add expenses, edit expenses, settle expenses, or delete transactions. All this is stored in logs so that a user is aware of deletions or edits made to a transaction. I created its complete frontend utilising blockchain-based authentication.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/contracts",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473805/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-45-39_lskus9.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473807/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-46-25_hpuchh.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473811/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-46-20_hxrgok.png",
    ],
  },
  {
    slug: "githubsrm",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473646/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-12-49_chg5tm.png",
    name: "GitHub Community SRM",
    tag: "website",
    description:
      "GitHub Community SRM is a student-led community aimed at unifying all the projects and papers made in SRMIST under the banner of the SRM-IST-KTR GitHub Organisation. Its main website serves as a portal for the same. Students and Teachers can register themselves here under various projects. These registrations interact directly with GitHub APIs, creating the repositories, adding or removing people and more. I built the frontend of the registration portal.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/githubsrm",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473649/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-08-44_ry5x2x.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473653/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-08-03_iy2rwn.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473655/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-08-58_ucfgvx.png",
    ],
  },
  {
    slug: "soulless-citadel",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473774/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-10-37_lbh90h.png",
    name: "The Soulless Citadel",
    tag: "website",
    description:
      "The Soulless Citadel was a client-based project created during my tenure in Quinence. The project serves as an NFT Marketplace on the Zilliqa blockchain. I developed the website's initial versions. I got an insight into RPC calls, wallet authentication and, in general, what a blockchain is during this project.",
    links: [
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://soullesscitadel.com/",
      },
    ],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TAILWIND_CSS, STACK_NAMES.TYPESCRIPT],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473765/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-11-00_hnikmb.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473768/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-12-06_ydadq7.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473771/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-12-30_cagse6.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473780/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-11-13_igmule.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473777/jagnani73/projects/soulless-citadel/Screenshot_from_2022-07-03_03-11-42_mtxhzk.png",
    ],
  },
  {
    slug: "wealth42",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473680/jagnani73/projects/wealth42/Screenshot_from_2022-07-03_03-01-26_ryqnkd.png",
    name: "wealth42",
    tag: "website",
    description:
      "wealth42 is a fintech company. The project initially started as an outsourced project given to SRMKZILLA. I was working on their landing application as a mentor for the recruits. Eventually, I got hired as a Software Development Intern in wealth42 and continued laying the foundation of this application. I implemented class-based directed graph forms and complex validation states in the project, optimising it for the end-user. I also created a custom user tracking system for the project.",
    links: [
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://wealth42.com/",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473672/jagnani73/projects/wealth42/Screenshot_from_2022-07-03_03-01-38_fomvhg.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473680/jagnani73/projects/wealth42/Screenshot_from_2022-07-03_03-03-23_jqqmqw.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473675/jagnani73/projects/wealth42/Screenshot_from_2022-07-03_03-03-44_r0v9mc.png",
    ],
  },
  {
    slug: "stories",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473752/jagnani73/projects/stories/1_1_rnugym.png",
    name: "Stories",
    tag: "website",
    description:
      "Stories is a mental health aid hack. It enables a user to choose its 'worries' and connect and chat with people of the same concerns for random advice seeking or release of frustration. The messages are protected with a censor layer in case of a toxic message. I developed its complete frontend, including the SocketIO-based chat application and admin panel.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/stories",
      },
    ],
    stack: [
      STACK_NAMES.REACT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.NODE,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473758/jagnani73/projects/stories/2_1_wwqysl.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473761/jagnani73/projects/stories/3_1_xlmyej.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473755/jagnani73/projects/stories/4_1_ylfthn.png",
    ],
  },
  {
    slug: "fren",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473741/jagnani73/projects/fren/screenshot-client_1_ftnrvo.png",
    name: "Fren",
    tag: "website",
    description:
      "Fren is a hack that aims to bridge the gap between a therapist and their client. It is a note-taking application for journals and diary entries. The notes taken in it by a client are not shown to the therapist; instead, an analysis of the note, usage of words and terminologies and more. I built its complete frontend, including the therapist panel.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/fren",
      },
    ],
    stack: [
      STACK_NAMES.REACT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
      STACK_NAMES.NODE,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473737/jagnani73/projects/fren/screenshot-therapist_1_xy2335.png",
    ],
  },
  {
    slug: "bharat-beacon",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473617/jagnani73/projects/bharat-beacon/image_i4bbih.png",
    name: "Bharat Beacon",
    tag: "website",
    description:
      "BharatBeacon is a hack that was created for disaster management. It covers preemptive measures, mid-crisis solutions and post-crisis optimization. It is an IoT solution with a portal that is the Governments end. It showed the location of the distress calls on a map with information. I worked on the Government portal using MapBox APIs and HTTP Polling.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/BharatBeacon",
      },
    ],
    stack: [
      STACK_NAMES.HTML,
      STACK_NAMES.CSS,
      STACK_NAMES.JAVASCRIPT,
      STACK_NAMES.NODE,
    ],
  },
  {
    slug: "aaruush-links",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473734/jagnani73/projects/aaruush-links/Screenshot_from_2022-07-03_03-48-15_q2grbw.png",
    name: "AARUUSH Links",
    tag: "website",
    description:
      "AARUUSH is an annual student-led Techno-Management fest held in SRMIST. The fest has numerous events, workshops, competitions, etc., conducted across the year via all domains. AARUUSH Links was a project aiming at a cumulation for all the digital presence of these links. It also has an admin panel to add a category-specific event. I created the whole frontend of this project, including the admin panel which opens with an easter egg.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/aaruush-links",
      },
    ],
    stack: [STACK_NAMES.REACT, STACK_NAMES.NODE, STACK_NAMES.BOOTSTRAP],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473731/jagnani73/projects/aaruush-links/Screenshot_from_2022-07-03_03-51-34_uxyjk0.png",
    ],
  },
  {
    slug: "ossmosis",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473727/jagnani73/projects/ossmosis/Screenshot_from_2022-07-03_02-53-55_plyc7y.png",
    name: "OSSmosis",
    tag: "microsite",
    description:
      "OSSmosis was the first event conducted by GitHub Community SRM. It was an event that provided a platform for the participants to showcase their Open Source Software. The event required a Description, Rules, and Criteria section and a registration portal. The project taught me VueJS. The deployment was fully static as the project was a microsite.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/ossmosis",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://ossmosis.jagnani73.com/",
      },
    ],
    stack: [STACK_NAMES.VUE, STACK_NAMES.TAILWIND_CSS],
  },
  {
    slug: "frame-fantasy",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473620/jagnani73/projects/frame-fantasy/Screenshot_from_2022-07-03_02-08-32_asnuhj.png",
    name: "Frame Fantasy",
    tag: "website",
    description:
      "Frame Fantasy is a client freelance project. It is a gallery website for a professional photographer. The requirements stated a gallery page for all the types of photos there are along with contact details for the first version. I used Cloudinary as an images CMS for the same. The second version will include a backend with notifying services for the Contact Me page.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/frame-fantasy",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://framefantasy.co.in/",
      },
    ],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TAILWIND_CSS, STACK_NAMES.TYPESCRIPT],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473824/jagnani73/projects/frame-fantasy/Screenshot_from_2022-07-03_02-08-56_lmmccy.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473824/jagnani73/projects/frame-fantasy/Screenshot_from_2022-07-03_02-08-56_lmmccy.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473826/jagnani73/projects/frame-fantasy/Screenshot_from_2022-07-03_02-10-12_n1b7xh.png",
    ],
  },
  {
    slug: "sarthaka",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473637/jagnani73/projects/sarthaka/Screenshot_from_2022-07-03_02-44-20_mtlumg.png",
    name: "Sarthaka Foundation",
    tag: "website",
    description:
      "Sarthaka Foundation is an NGO. They wanted a presentation of all their work and events, and drives. This project was one of my first with NextJS, TypeScript and TailwindCSS. The requirements desired a complex paywall as well. I learned a lot of new things creating this project.",
    links: [
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://sarthakafoundation.ngo",
      },
    ],
    stack: [
      STACK_NAMES.NODE,
      STACK_NAMES.NEXT,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473638/jagnani73/projects/sarthaka/Screenshot_from_2022-07-03_02-44-32_rwzvsa.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473640/jagnani73/projects/sarthaka/Screenshot_from_2022-07-03_02-45-03_omntoy.png",
    ],
  },
  {
    slug: "aashma",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473830/jagnani73/projects/aashma/Screenshot_from_2022-07-03_02-25-20_shgcnb.png",
    name: "Aashma Foundation",
    tag: "website",
    description:
      "Aashma Foundation is an NGO that needed a landing website. Data Science Community SRM was in charge of that. I, under the community, laid the foundation for the static site. Their requirements were minimal, only a static page displaying a gallery and details to accept donations. Based on the requirements, I chose the vanilla stack.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/Aashma-Foundation",
      },
    ],
    stack: [
      STACK_NAMES.HTML,
      STACK_NAMES.CSS,
      STACK_NAMES.JAVASCRIPT,
      STACK_NAMES.BOOTSTRAP,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473818/jagnani73/projects/aashma/Screenshot_from_2022-07-03_02-25-52_egtlwx.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473816/jagnani73/projects/aashma/Screenshot_from_2022-07-03_02-25-58_xzdgwb.png",
    ],
  },
  {
    slug: "kz-links",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473668/jagnani73/projects/kz-links/Screenshot_from_2022-07-03_01-30-02_iqiehy.png",
    name: "KZ Links",
    tag: "website",
    description:
      "KZ Links was a pure linktree adaption. It extended another project of SRMKZILLA, a URL shortener that also gave tracking statistics. It envisioned a highly customizable profile page. I was a mentor for this project. I taught and guided the recruits on how to use NextJS.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/kz-links",
      },
    ],
    stack: [
      STACK_NAMES.NEXT,
      STACK_NAMES.NODE,
      STACK_NAMES.TAILWIND_CSS,
      STACK_NAMES.TYPESCRIPT,
    ],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473665/jagnani73/projects/kz-links/Screenshot_from_2022-07-03_01-23-40_a4jjod.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473661/jagnani73/projects/kz-links/Screenshot_from_2022-07-03_01-24-26_c0x4oj.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473659/jagnani73/projects/kz-links/Screenshot_from_2022-07-03_01-23-26_bief8w.png",
    ],
  },
  {
    slug: "doc-gen",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473792/jagnani73/projects/doc-gen/preview_1_kqzvim.png",
    name: "DocGen",
    tag: "website",
    description:
      "DocGen was a simple hack created under Data Science Community SRM. Its purpose is to generate images with customisable cursive text to create a 'fake assignment'. My role in the project was to guide and mentor the recruits. I, myself, got an insight on PreactJS in doing so.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/docgen",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "http://docgen.jagnani73.com/",
      },
    ],
    stack: [STACK_NAMES.PREACT, STACK_NAMES.JAVASCRIPT],
  },
  {
    slug: "morelinks",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473631/jagnani73/projects/morelinks/Screenshot_from_2022-07-03_02-34-07_l0oai2.png",
    name: "Morelinks",
    tag: "microsite",
    description:
      "MoreLinks was a brainchild of the Data Science Community SRM. It was simply a Linktree adaptation with more. MoreLinks had a preview of the community's latest buzz, including their tweets, posts, blogs and more. The website was completely static, wherein I taught and mentored the recruits on the vanilla stack.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/morelinks",
      },
    ],
    stack: [
      STACK_NAMES.HTML,
      STACK_NAMES.CSS,
      STACK_NAMES.JAVASCRIPT,
      STACK_NAMES.BOOTSTRAP,
    ],
  },
  {
    slug: "dscommunity",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473746/jagnani73/projects/dscommunity/Screenshot_from_2022-07-03_02-36-57_af4bix.png",
    name: "Data Science Community",
    tag: "website",
    description:
      "Data Science Community SRM was a new community in SRMIST. This website was the first instalment of their online presence. I was the only web developer in the community. This project was a public face of the community. It first was built entirely on the vanilla stack, during which I started learning ReactJS. Then migrated the whole website on ReactJS. I then eventually added a backend serving along with a NodeMailer-backed Contact-Us form.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/Data-Science-Community-SRM/Data-Science-Community-Website",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://www.dscommunity.in/",
      },
    ],
    stack: [STACK_NAMES.REACT, STACK_NAMES.BOOTSTRAP, STACK_NAMES.NODE],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473742/jagnani73/projects/dscommunity/Screenshot_from_2022-07-03_02-37-19_wwy3lr.png",
    ],
  },
  {
    slug: "iei",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473799/jagnani73/projects/iei/Screenshot_from_2022-07-03_04-13-51_mdjwqb.png",
    name: "IEI",
    tag: "website",
    description:
      "Institution of Engineers (India) or IEI of the Tamil Nadu branch had commissioned their website project to SRMKZILLA during my time there. The website was supposed to be a static frontend website for the first version. The data for the People and the Events pages was to be admin panel powered. This project was a great starter project for the full-stack recruits. I was a lead developer for the frontend (complete version 1 and partial version 2). Once the base was developed, the project was handed off to the recruits, with the original developers as mentors.",
    links: [],
    stack: [STACK_NAMES.NEXT, STACK_NAMES.TAILWIND_CSS, STACK_NAMES.TYPESCRIPT],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473795/jagnani73/projects/iei/Screenshot_from_2022-07-03_04-14-03_auz3xj.png",
    ],
  },
  {
    slug: "srmkzilla-hacktoberfest-21",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473749/jagnani73/projects/srmkzilla-hacktoberfest-2021/Screenshot_from_2022-07-03_04-28-16_u1xurs.png",
    name: "SRMKZILLA Hacktoberfest 2021",
    tag: "microsite",
    description:
      "Hacktoberfest, the annual celebration of Open Source Software, is a month-long event organized by DigitalOcean. In support of Hacktoberfest, communities all around the world host mini-events that utilize an official branding kit given by provided by DigitalOcean. SRMKZILLA, in my tenure there, also hosted a mini-event. This project was a microsite developed as the information as well as registration portal. A TypeForm handled the registration form. The microsite is entirely static and built on the vanilla stack.",
    links: [
      {
        name: LINKS_NAMES.GITHUB,
        url: "https://github.com/jagnani73/srmkzilla-hacktoberfest-2021",
      },
      {
        name: LINKS_NAMES.WEBSITE,
        url: "https://srmkzilla-hacktoberfest-2021.jagnani73.com",
      },
    ],
    stack: [STACK_NAMES.HTML, STACK_NAMES.CSS, STACK_NAMES.JAVASCRIPT],
  },
];

export const hackathons: HackathonType[] = [
  {
    name: "ETHGlobal New Delhi 2025",
    organizer: "ETHGlobal",
    award: "Best use of Fluence Virtual Servers - Track Prize",
    location: "New Delhi",
    duration: "September 2025",
    project: {
      name: "flux",
      slug: "flux",
    },
  },
  {
    name: "ETHGlobal Prague 2025",
    organizer: "ETHGlobal",
    award: "Blockscout Protocol Pool Prize - Track Prize",
    location: "Prague",
    duration: "May 2025",
    project: {
      name: "daoscape",
      slug: "daoscape",
    },
  },
  {
    name: "ETHOnline 2024",
    organizer: "ETHGlobal",
    award: "Sign Protocol Pool Prize - Track Prize",
    location: "Online",
    duration: "September 2024",
    project: {
      name: "dewls",
      slug: "dewls",
    },
  },
  {
    name: "Unfold 2023",
    organizer: "CoinDCX",
    award: "Best use of Router - Track Prize",
    location: "Online",
    duration: "November 2023",
    project: {
      name: "lenden",
      slug: "lenden",
    },
  },
  {
    name: "MOZOHACK 4.0",
    organizer: "SRMZKILLA",
    award: "Mentor",
    location: "Online",
    duration: "February 2023",
  },
  {
    name: "Participation",
    organizer: "Unknown",
    award: "Participation",
    location: "Online",
    duration: "February 2022",
    project: {
      name: "delinzk",
      slug: "delinzk",
    },
  },
  {
    name: "HackRx 3.0",
    organizer: "Bajaj Finserv",
    award: "Dark Horse - Power & Pace",
    location: "Pune",
    duration: "June 2022",
    project: {
      name: "NudgeLab",
      slug: "nudge-lab",
    },
  },
  {
    name: "Rookie Hacks II",
    organizer: "Major League Hacking",
    award: "Best Blockchain Project Using Hedera",
    location: "Online",
    duration: "May 2022",
    project: {
      name: "Contracts",
      slug: "contracts",
    },
  },
  {
    name: "Smart India Hackathon - Internals",
    organizer: "AICTE - SRMIST",
    location: "Online",
    duration: "March 2022",
    project: {
      name: "Hospitatva",
      slug: "hospitatva",
    },
    award: "Participation",
  },
  {
    name: "MOZOHACK 2.1",
    organizer: "SRMKZILLA",
    award: "Mentor",
    location: "Online",
    duration: "March 2021",
  },
  {
    name: "Hack CBS 3.0",
    organizer: "Major League Hacking",
    award: "Participation",
    location: "Online",
    duration: "October 2020",
    project: {
      name: "Stories",
      slug: "stories",
    },
  },
  {
    name: "Hack This Fall",
    organizer: "Major League Hacking",
    award: "First Position",
    location: "Online",
    duration: "October 2020",
    project: {
      name: "Shikshak",
      slug: "shikshak",
    },
  },
  {
    name: "HackTheMountains",
    organizer: "Major League Hacking",
    award: "Fourth Position",
    location: "Online",
    duration: "October 2020",
    project: {
      name: "Fren",
      slug: "fren",
    },
  },
  {
    name: "Code2Create 4.0",
    organizer: "ACM VIT - Student Chapter",
    award: "Best First Year Team",
    location: "Vellore",
    project: {
      name: "BharatBeacon",
      slug: "bharat-beacon",
    },
    duration: "March 2020",
  },
];

export const certifications: CertificationType[] = [
  {
    name: "Database Foundations",
    organization: "Oracle Academy",
    validity: "April 2022",
  },
  {
    name: "AWS Certified Cloud Practioner",
    organization: "Amazon Web Services",
    validity: "September 2021 - 2024",
  },
  {
    name: "Fundamentals of Red Hat Enterprise Linux",
    organization: "Red Hat Enterprise",
    validity: "September 2021",
  },
  {
    name: "The Bits and Bytes of Computer Networking",
    organization: "Google",
    validity: "May 2020",
  },
  {
    name: "Technical Support Fundamentals",
    organization: "Google",
    validity: "April 2020",
  },
  {
    name: "Palo Alto Networks Academy Cybersecurity Foundation",
    organization: "Palo Alto",
    validity: "April 2020",
  },
];

export const resumes: ResumeType[] = [
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1766508479/jagnani73/resumes/2020251223.png",
    resume: "https://drive.google.com/uc?id=1GYW7-Crdh_UyvKOuvQaL3kwpEI3_SCOp",
    date: "23 December 2025",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476077/jagnani73/resumes/20210206.png",
    resume: "https://drive.google.com/uc?id=14rlW_vq_1UX45zqnyAfPHyJpUSVuzIft",
    date: "11 February 2023",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476099/jagnani73/resumes/20220608.png",
    resume: "https://drive.google.com/uc?id=1WKDcp6zL0sBMxacnGO4p6HsJ8SldjaDe",
    date: "08 July 2022",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476110/jagnani73/resumes/20210925.png",
    resume: "https://drive.google.com/uc?id=1KZKfxRvsBRcUbAMmhkbIdwP4UovmZh9E",
    date: "20 April 2022",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476133/jagnani73/resumes/20210908.png",
    resume: "https://drive.google.com/uc?id=1axpcLaEEe1iRD0eNrCCUDhMyMKXSyYVF",
    date: "25 September 2021",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476155/jagnani73/resumes/20230211.png",
    resume: "https://drive.google.com/uc?id=1vJ7J7FC6ofYA15qHlpG_b-cvtBkSbb0e",
    date: "08 September 2021",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476189/jagnani73/resumes/2020420.png",
    resume: "https://drive.google.com/uc?id=1UB8kkpx5yFxhm-EJojwFXU-omHmlGjQw",
    date: "06 February 2021",
  },
  {
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476211/jagnani73/resumes/20200528.png",
    resume: "https://drive.google.com/uc?id=1UlHEHcW_7nzP8NW61UlvmvPoYtYkscQl",
    date: "28 May 2020",
  },
];
