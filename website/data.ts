// Data Types
export interface ExperienceType {
  _id?: string;
  logo: string;
  org: string;
  url?: string;
  designation: string;
  tag: string;
  description: string;
  duration: string;
  slug: string;
  featured: boolean;
}

export interface ProjectType {
  _id?: string;
  preview: string;
  images?: string[];
  name: string;
  description: string;
  tag: string;
  stack: string[];
  links: { name: string; url: string }[];
  slug: string;
  featured: boolean;
}

export interface HackathonType {
  _id?: string;
  name: string;
  organizer: string;
  award: string;
  location: string;
  duration: string;
  project?: {
    name: string;
    slug: string;
  };
}

export interface CertificationType {
  _id?: string;
  name: string;
  organization: string;
  validity: string;
}

export interface ResumeType {
  _id?: string;
  resume: string;
  preview: string;
  date: string;
}

// Hardcoded Data Arrays - Real data from jagnani73.com
export const experiences: ExperienceType[] = [
  {
    _id: "6630f1d5101d75af44737a13",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714483586/jagnani73/experiences/covalent_klcbpk.png",
    description:
      "CovalentHQ is a blockchain data provider offering comprehensive and transparent access to blockchain data in a unified API. I was given the ownership of a range of open-source products called GoldRush as a way of increasing the API consumption. GoldRush includes a GoldRush Decoder, which is expandable for contributors to add decoders that convert raw log events to structured, human-readable data. GoldRush also includes a GoldRush Kit which is a 'Smart Component' UI library for plug-n-play visualized data of over 200 chains.",
    designation: "Software Engineer",
    duration: "June 2023 - Present",
    featured: true,
    org: "CovalentHQ",
    slug: "covalent",
    tag: "full-time",
    url: "https://www.covalenthq.com",
  },
  {
    _id: "63ea32a8355122b1c60c485b",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/hashmail_al48gr.png",
    description:
      "Hashmail is a comprehensive web3 mailbox client that centralizes all your different wallet addresses. As the owner and successful launch of two versions, I am proud to say that the main application of Hashmail has thousands of active users and has successfully integrated thousands of wallet addresses. Additionally, I have developed a proxy server that streamlines the process of sending and receiving emails and supports API integration with other applications.",
    designation: "Founding Engineer",
    duration: "July 2022 - June 2023",
    featured: true,
    org: "Hashmail",
    slug: "hashmail",
    tag: "full-time",
    url: "https://hashmail.dev",
  },
  {
    _id: "62a2268ed99dabcb689206a0",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/quinence_c4lnln.png",
    org: "Quinence",
    url: "https://www.instagram.com/nwcsrmist/",
    designation: "Software Development Consultant",
    tag: "internship",
    description:
      "Quinence is another FinTech firm based on web3. In Quinence, I got the opportunity to explore web3 in-depth, NFTs, marketplaces, blockchain, smart contracts, and the latest buzz I got involved with. In Quinence, I was the engineering owner of two client-based projects. One was creating a metaverse. The other was an NFT marketplace, with filters, sorting, profile pages, and more.",
    duration: "January 2022 - April 2022",
    slug: "quinence",
    featured: true,
  },
  {
    _id: "62a2247cd99dabcb6892069f",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/nwc_rlg3cg.png",
    org: "Networking & Communications Association",
    url: "https://www.instagram.com/nwcsrmist/",
    designation: "Founding Vice President",
    tag: "campus club",
    description:
      "I was on the founding board of the Networking and Communications Association. It is a student representative association delegated by my school's Networking and Communications Department. I had the opportunity to host some successful social events while laying the foundation of multiple internal projects.",
    duration: "September 2021 - January 2022",
    slug: "nwc",
    featured: false,
  },
  {
    _id: "62a2235bd99dabcb6892069e",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472674/jagnani73/experiences/wealth42_xjniil.png",
    org: "wealth42",
    url: "https://wealth42.com",
    designation: "Software Development Intern",
    tag: "intership",
    description:
      "wealth42 was a delightful experience. It is a FinTech firm. I was the lead developer in over three projects, including the main website. I gained insights on class-based architectural systems, form implementation of directed graphs, and mail scraping. The main website was live and released features rolling. This made me develop things on a direct user feedback system. We had implemented our tracking that enhanced this aspect.",
    duration: "August 2021 - December 2021",
    slug: "wealth42",
    featured: false,
  },
  {
    _id: "62a2223ed99dabcb6892069d",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/mlh_vd3dib.png",
    org: "Major League Hacking",
    url: "https://mlh.io/",
    designation: "Pre-Fellowship",
    tag: "fellowship",
    description:
      "Major League Hacking or MLH hosts numerous hackathons every weekend across the globe. They had recently started their fellowship program. I had applied to a track called explorer, which then converted to the Pre-fellowship. During my tenure, I interacted with people around the world and developed a CLI reminder application with them. We were split into pods, and every pod had a dedicated mentor.",
    duration: "July 2021 - August 2021",
    slug: "mlh",
    featured: false,
  },
  {
    _id: "62a2206bd99dabcb6892069c",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/gcsrm_qqr7f5.png",
    org: "GitHub Community SRM",
    url: "https://githubtech.tech",
    designation: "Founding Administrator",
    tag: "campus club",
    description:
      "GitHub Community SRM is one of my most passionate steps toward OSS. It is an initiative undertaken by a group of students of SRMIST, including myself, with the sole purpose of starting the OSS revolution in SRMIST. We aim to consolidate all the projects and papers created in SRMIST under the banner of the SRMISTKTR GitHub Organisation. I've been an integral part of establishing this community, conducting events, and making the portal to facilitate this.",
    duration: "May 2021 - Present",
    slug: "gcsrm",
    featured: false,
  },
  {
    _id: "62a21791d99dabcb6892069b",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472672/jagnani73/experiences/slashpay_flui0b.png",
    org: "Slash",
    url: "https://www.slashpay.app/",
    designation: "Web Development Consultant",
    tag: "internship",
    description:
      "Slash was my first FinTech firm. As a hiring challenge, I created a landing website with some hidden easter eggs. Slash exposed me to the industrial lifestyle and deadlines. I made a dashboard that effectively was an analytics preview for the merchant, stock and orders management, and customer interaction. I also got the opportunity to look into the mass generation of static pages.",
    duration: "March 2021 - July 2021",
    slug: "slash",
    featured: false,
  },
  {
    _id: "6127d463595d0995251eb726",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/envision_amzz9a.png",
    org: "Team Envision",
    url: "https://envision.aaruush.org/",
    designation: "Committee Head",
    tag: "campus club",
    description:
      "Team Envision is the technical club of SRMIST's student-run, official Annual Techno-Management Fest, AARUUSH. Undertaking various platforms for the social cause, here I was a significant part of creating projects that supported the community—created portals that provisioned certificate distribution and events, the primary website for AARUUSH, and more.",
    duration: "July 2020 - Janurary 2022",
    slug: "envision",
    featured: false,
  },
  {
    _id: "6127d463595d0995251eb72a",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472673/jagnani73/experiences/srmkzilla_kqrrks.png",
    org: "SRMKZILLA",
    url: "https://srmkzilla.net/",
    designation: "Lead - Technical",
    tag: "campus club",
    description:
      "SRMKZILLA, an official Mozilla Campus Club in SRMIST, has always been about spreading open-source. In SRMKZILLA, I got to work and experience various day-to-day management products, such as a mass mailer or a recruiting portal. I was a part of multiple projects representing the organization and worked with the companies to develop the same. In SRMKZILLA, I was trusted with the technical teams' management, including leading projects and organizing events.",
    duration: "June 2020 - November 2021",
    slug: "srmkzilla",
    featured: false,
  },
  {
    _id: "6127d463595d0995251eb728",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/collate_rtcny4.jpg",
    org: "Collate Innovations",
    url: "https://githubsrm.tech/",
    designation: "Full Stack Developer",
    tag: "internship",
    description:
      "In my first internship, Collate Innovations, I was exposed to the industrial application of ReactJS. Before this internship, I had worked on various projects, including some hackathon-winning ones. This internship taught me how to manage client expectations, how users look at an application, and what essentially UX is. Collate Innovations is an ed-tech platform that taught me how the workings of the industry happen.",
    duration: "June 2020 - September 2020",
    slug: "collate",
    featured: false,
  },
  {
    _id: "6127d463595d0995251eb727",
    logo: "https://res.cloudinary.com/jagnani73/image/upload/v1714472671/jagnani73/experiences/dscommunity_unp27a.png",
    org: "Data Science Community SRM",
    url: "https://www.dscommunity.in/",
    designation: "Web Development Lead",
    tag: "campus club",
    description:
      "I started in Data Science Community SRM as a part of the founding team. The experience of creating a community and being a part of something from the core up was humbling. I was the lead developer in the community and took up various accessibility projects and management roles.",
    duration: "December 2019 - December 2020",
    slug: "dscommunity",
    featured: false,
  },
];

export const projects: ProjectType[] = [
  {
    _id: "62cbd9bb2c4f550c54a5cb95",
    slug: "nudge-lab",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473693/jagnani73/projects/nudge-lab/preview3_j50aqp.png",
    name: "NudgeLab",
    featured: true,
    tag: "website",
    description:
      "NudgeLab is a hack which at its core is a no-code, platform independent nudge management service. It is a platform that wraps over the existing architecture of any infrastructure and through an admin panel, creates campaign based and trigger based nudges. A project wherein I worked completely on the backend and no frontend, except debugging. I created a CDN based approach for the campaign nudges and HTTP polling for the trigger based ones.",
    links: [
      {
        name: "github",
        url: "https://github.com/jagnani73/nudge-lab",
      },
    ],
    stack: ["node", "express", "react"],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473687/jagnani73/projects/nudge-lab/preview1_r2k59y.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473684/jagnani73/projects/nudge-lab/preview2_rdp0vp.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473690/jagnani73/projects/nudge-lab/preview4_dzkwog.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473698/jagnani73/projects/nudge-lab/preview5_wd9hvv.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473699/jagnani73/projects/nudge-lab/preview6_n74him.png",
    ],
  },
  {
    _id: "62c1b351c4dcd2ee9ef2125d",
    slug: "hospitatva",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473718/jagnani73/projects/hospitatva/preview5_vqlet8.png",
    name: "Hospitatva",
    featured: true,
    tag: "website",
    description:
      "Hospitatva is a hack that aims to eradicate scams done by hospitals for their limited and reserved resources. It is a distributed ledger-based blockchain implementation of the rates proposed and charged and the commodity count by hospitals for the treatment and consultancy of patients. I built the logic part of its frontend, gaining knowledge about DIDs, the Web of Trust and wallet authentication.",
    links: [
      {
        name: "github",
        url: "https://github.com/jagnani73/hospitatva",
      },
    ],
    stack: ["next", "tailwind css", "typescript"],
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
    _id: "62c1b351c4dcd2ee9ef2125c",
    slug: "marquee",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473627/jagnani73/projects/marquee/Screenshot_from_2022-07-02_19-57-10_vyyznz.png",
    name: "react-easy-marquee",
    featured: true,
    tag: "package",
    description:
      " I couldn't find a good react marquee package and thus decided to develop it. react-easy-marquee is a highly customisable `marquee` package for React built using CSS. Renders anything given between the tags, be it an image, text or a custom JSX element! It is a simple plug-and-play package and requires no external dependency.",
    links: [
      {
        name: "github",
        url: "https://github.com/jagnani73/react-easy-marquee",
      },
      {
        name: "npm",
        url: "https://www.npmjs.com/package/react-easy-marquee",
      },
      {
        name: "demonstration",
        url: "https://jagnani73.github.io/react-easy-marquee/",
      },
    ],
    stack: ["react", "css"],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473624/jagnani73/projects/marquee/Screenshot_from_2022-07-02_19-57-55_skdcwe.png",
    ],
  },
  {
    _id: "62c1b351c4dcd2ee9ef21257",
    slug: "shikshak",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473786/jagnani73/projects/shikshak/screenshot-home_1_qehcch.png",
    name: "Shikshak",
    featured: true,
    tag: "website",
    description:
      "Shikshak is a hack that enables remote online education by minimising the data consumed exponentially. I built its frontend, which has two ends, a Teacher and a Student. I also implemented its WebRTC-based exchange of data.",
    links: [
      {
        name: "github",
        url: "https://github.com/jagnani73/shikshak",
      },
    ],
    stack: ["react", "tailwind css", "typescript", "node"],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473789/jagnani73/projects/shikshak/screenshot-calibrate_1_kaglgd.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473783/jagnani73/projects/shikshak/screenshot-preview_1_lsp63m.png",
    ],
  },
  {
    _id: "62c1b351c4dcd2ee9ef2125b",
    slug: "contracts",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473801/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-45-58_qpcdoj.png",
    name: "Contracts",
    featured: false,
    tag: "website",
    description:
      "Contracts is a blockchain-based expense-splitter application. In it, a user can create an account to login to our web app. Once a user is logged in, he can add expenses, edit expenses, settle expenses, or delete transactions. All this is stored in logs so that a user is aware of deletions or edits made to a transaction. I created its complete frontend utilising blockchain-based authentication.",
    links: [
      {
        name: "github",
        url: "https://github.com/jagnani73/contracts",
      },
    ],
    stack: ["node", "next", "tailwind css", "typescript"],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473805/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-45-39_lskus9.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473807/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-46-25_hpuchh.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473811/jagnani73/projects/contracts/Screenshot_from_2022-07-03_00-46-20_hxrgok.png",
    ],
  },
  {
    _id: "62c1b351c4dcd2ee9ef2125a",
    slug: "githubsrm",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473646/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-12-49_chg5tm.png",
    name: "GitHub Community SRM",
    featured: false,
    tag: "website",
    description:
      "GitHub Community SRM is a student-led community aimed at unifying all the projects and papers made in SRMIST under the banner of the SRM-IST-KTR GitHub Organisation. Its main website serves as a portal for the same. Students and Teachers can register themselves here under various projects. These registrations interact directly with GitHub APIs, creating the repositories, adding or removing people and more. I built the frontend of the registration portal.",
    links: [
      {
        name: "github",
        url: "https://github.com/jagnani73/githubsrm",
      },
    ],
    stack: ["node", "next", "tailwind css", "typescript"],
    images: [
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473649/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-08-44_ry5x2x.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473653/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-08-03_iy2rwn.png",
      "https://res.cloudinary.com/jagnani73/image/upload/v1714473655/jagnani73/projects/githubsrm/Screenshot_from_2022-07-03_00-08-58_ucfgvx.png",
    ],
  },
];

export const hackathons: HackathonType[] = [
  {
    _id: "62ca942f16203064d4c4e879",
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
    _id: "62ca941716203064d4c4e878",
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
    _id: "62c348be5c87cb3943f52f51",
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
    _id: "62c347e45c87cb3943f52f50",
    name: "MOZOHACK 2.1",
    organizer: "SRMKZILLA",
    award: "Mentor",
    location: "Online",
    duration: "March 2021",
  },
  {
    _id: "62c347155c87cb3943f52f4f",
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
    _id: "62c3467b5c87cb3943f52f4e",
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
    _id: "62c346535c87cb3943f52f4d",
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
    _id: "62c344c85c87cb3943f52f4c",
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
    _id: "62c379373dedd70bb2d8c6bc",
    name: "Database Foundations",
    organization: "Oracle Academy",
    validity: "April 2022",
  },
  {
    _id: "62c378f23dedd70bb2d8c6bb",
    name: "AWS Certified Cloud Practioner",
    organization: "Amazon Web Services",
    validity: "September 2021 - September 2024",
  },
  {
    _id: "62c378983dedd70bb2d8c6ba",
    name: "Fundamentals of Red Hat Enterprise Linux",
    organization: "Red Hat Enterprise",
    validity: "September 2021",
  },
  {
    _id: "62c378073dedd70bb2d8c6b9",
    name: "The Bits and Bytes of Computer Networking",
    organization: "Google",
    validity: "May 2020",
  },
  {
    _id: "62c377f83dedd70bb2d8c6b8",
    name: "Technical Support Fundamentals",
    organization: "Google",
    validity: "April 2020",
  },
  {
    _id: "62c377e63dedd70bb2d8c6b7",
    name: "Palo Alto Networks Academy Cybersecurity Foundation",
    organization: "Palo Alto",
    validity: "April 2020",
  },
];

export const resumes: ResumeType[] = [
  {
    _id: "63e75359068eae777a0c8341",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476155/jagnani73/resumes/11%20February%202023/preview_20230211_mc0txc.png",
    resume: "https://drive.google.com/uc?id=14rlW_vq_1UX45zqnyAfPHyJpUSVuzIft",
    date: "11 February 2023",
  },
  {
    _id: "62c93ef127c1163da5e31de5",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476099/jagnani73/resumes/08%20July%202022/preview_20220709_dyoelr.png",
    resume: "https://drive.google.com/uc?id=1WKDcp6zL0sBMxacnGO4p6HsJ8SldjaDe",
    date: "08 July 2022",
  },
  {
    _id: "62c3800f3dedd70bb2d8c6c0",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476189/jagnani73/resumes/20%20April%202022/preview_2020420_vbcwuh.png",
    resume: "https://drive.google.com/uc?id=1KZKfxRvsBRcUbAMmhkbIdwP4UovmZh9E",
    date: "20 April 2022",
  },
  {
    _id: "62c37fea3dedd70bb2d8c6bf",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476110/jagnani73/resumes/25%20September%202021/preview_20211209_sitb6g.png",
    resume: "https://drive.google.com/uc?id=1axpcLaEEe1iRD0eNrCCUDhMyMKXSyYVF",
    date: "25 September 2021",
  },
  {
    _id: "62c37fc83dedd70bb2d8c6be",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476133/jagnani73/resumes/08%20September%202021/preview_20210908_pxaere.png",
    resume: "https://drive.google.com/uc?id=1vJ7J7FC6ofYA15qHlpG_b-cvtBkSbb0e",
    date: "08 September 2021",
  },
  {
    _id: "62c37f663dedd70bb2d8c6bd",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476077/jagnani73/resumes/06%20February%202021/preview_20210206_g9dc90.png",
    resume: "https://drive.google.com/uc?id=1UB8kkpx5yFxhm-EJojwFXU-omHmlGjQw",
    date: "06 February 2021",
  },
  {
    _id: "62c393746f8688597e1633c0",
    preview:
      "https://res.cloudinary.com/jagnani73/image/upload/v1714476211/jagnani73/resumes/28%20May%202020/preview_20200528_ba7hzo.png",
    resume: "https://drive.google.com/uc?id=1UlHEHcW_7nzP8NW61UlvmvPoYtYkscQl",
    date: "28 May 2020",
  },
];
