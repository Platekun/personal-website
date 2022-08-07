import { Version } from '../db';

const alphaVersion = new Version('alpha');

const Resume = {
  profile: [
    alphaVersion.createRecord(
      'I have an undergraduate degree in Computer Science from Universidad del Norte but I consider myself self-taught person.',
      'My journey in the software development industry started in 2016. I specialize on front-end development, but I know my way in back-end aswell. Most of my work is built with React.',
      'I strive to build products with good UX, I believe that a mindset of “Building stuff with care” is the best way I have got to help people.',
      'I am always hungry for knowledge, you will always see me reading and sharing articles, tweets and listening to podcasts related to software development. I also love training myself and playing videogames from time to time.'
    ),
  ],
  workExperiences: [
    alphaVersion.createCollection(
      {
        employer: 'TICOM.SA',
        employerUrl: 'http://ticom.co/wordpress/',
        from: {
          month: 1,
          year: 2016,
        },
        to: {
          month: 7,
          year: 2016,
        },
        jobTitle: ['Full Stack Developer'],
        description: [
          'Main technologies: Dojo.js and Java',
          'Worked on the internal ERP of the company. My time here was spent on the petty cash, invoices and cash flow movements modules.',
          'Business analysis and implementation of the domain design.',
        ],
        images: [
          {
            filename: 'ticom-erp.webp',
            alt: 'TICOM S.A ERP home screen',
          },
          {
            filename: 'ticom-erp-1.webp',
            alt: 'TICOM S.A ERP money management module example screen',
          },
          {
            filename: 'ticom-erp-2.webp',
            alt: 'TICOM S.A ERP money management module example screen',
          },
          {
            filename: 'ticom-erp-3.webp',
            alt: 'TICOM S.A ERP cash flow module example screen',
          },
        ],
      },
      {
        employer: 'NativApps',
        employerUrl: 'https://nativapps.com',
        from: {
          month: 2,
          year: 2017,
        },
        to: {
          month: 3,
          year: 2018,
        },
        jobTitle: ['Front-End Developer'],
        description: [
          'Main technologies: React.js, Redux and Ionic.',
          'Front-End development in an analytics dashboard project for a private health insurance provider.',
          'Maintenance of BeGirl’s mobile application: An application to empower women with the tools to track their menstrual cycles.',
        ],
        images: [
          {
            filename: 'be-girl-app-1.webp',
            alt: 'BeGirl application ovulation tracking',
          },
          {
            filename: 'be-girl-app-2.webp',
            alt: 'BeGirl application ovulation calendar',
          },
        ],
      },
      {
        employer: 'Ideaware',
        employerUrl: 'https://ideaware.co',
        from: {
          month: 7,
          year: 2018,
        },
        to: {
          month: 4,
          year: 2020,
        },
        jobTitle: ['Front-End Developer'],
        description: [
          'Main technologies: TypeScript, React.js and Redux / MobX / XState.',
          'Built the UI for Get Luna’s therapist credentialing form: A single page application wizard form that therapist applicants need to fill in to apply for a job in Luna.',
          'Built the UI for Get Luna’s patients’ form: A single page application form used by patients or by their doctors to track their progress in different areas; The application also provides a therapist-specific view of the evolution of a specific patient.',
          "Built the UI for Get Luna's therapist dashboard: A single page dashboard used by therapist to filter out and observe data according to a patient sample.",
        ],
        images: [
          {
            filename: 'luna-intake-form-first-part.webp',
            alt: 'LunaCare intake form first screen',
          },
          {
            filename: 'luna-care-credentialing-form.webp',
            alt: 'LunaCare credentialing form example screen',
          },
          {
            filename: 'luna-dashboard.webp',
            alt: 'LunaCare credentialing dashboard example',
          },
        ],
      },
      {
        employer: 'Zemoga',
        employerUrl: 'https://zemoga.com',
        from: {
          month: 4,
          year: 2020,
        },
        to: {
          month: 10,
          year: 2021,
        },
        jobTitle: ['Front-End Developer'],
        description: [
          'Main technologies: React.js, Next.js and Node.js.',
          "Worked on Sony's Competition Center: A multipage website that aims to elevate Sony’s competitive play to the next level by offering tournaments and competitive gaming content, curated based on your favorite titles.",
          'My role involved developing new features, problem solving, release management, task prioritization and collaboration with the business analysts and designers.',
        ],
        images: [
          {
            filename: 'sony-competition-center.webp',
            alt: 'Sony Competition Center old experience',
          },
          {
            filename: 'sony-competition-center-colombia.webp',
            alt: 'Sony Competition Center recent experience',
          },
        ],
      }
    ),
  ],
  functions: [
    alphaVersion.createCollection(
      {
        name: 'features',
        description: 'Develop user facing features for web apps.',
      },
      {
        name: 'design-to-code',
        description: 'Translate designs into code.',
      },
      {
        name: 'problem-solving',
        description: 'Identify UI problems and possible solutions.',
      },
      {
        name: 'build-and-mantain',
        description: 'Design, build and mantain high quality front-end code.',
      },
      {
        name: 'cross-browser',
        description: 'Build UI cross-browser and multi-device functionalities.',
      }
    ),
  ],
  tooling: [
    alphaVersion.createCollection(
      {
        name: 'HTML',
        description:
          'It defines the meaning and structure of web content. It uses "markup" to annotate text, images, and other content for display in a Web browser.',
        source: 'https://developer.mozilla.org/en-US/docs/Web/html',
      },
      {
        name: 'CSS',
        description:
          'Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML. It describes how elements should be rendered on screen, on paper, in speech, or on other media.',
        source: 'https://developer.mozilla.org/en-US/docs/Web/css',
      },
      {
        name: 'JavaScript',
        description:
          'JavaScript (JS) is a programming language with first-class functions most well-known as the scripting language for Web pages.',
        source: 'https://developer.mozilla.org/en-US/docs/Web/javascript',
      },
      {
        name: 'TypeScript',
        description:
          'TypeScript is a strongly typed programming language that adds additional syntax to JavaScript, giving you better tooling by allowing to describe the shape of data.',
        source: 'https://www.typescriptlang.org',
      },
      {
        name: 'React.js',
        description: 'A JavaScript library for building user interfaces.',
        source: 'https://reactjs.org',
      },
      {
        name: 'XState',
        description:
          'XState is a library for modeling behavior as finite state machines and statecharts.',
        source: 'https://xstate.js.org/docs/',
      },
      {
        name: 'Node.js',
        description:
          'A JavaScript runtime environment that runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser.',
        source: 'https://nodejs.dev/learn',
      },
      {
        name: 'Next.js',
        description:
          'Next.js is a React framework that provides building blocks to build static and dynamic websites and web apps.',
        filename: 'https://nextjs.org/',
      }
    ),
  ],
  socialMedia: [
    alphaVersion.createCollection(
      {
        name: 'Twitter',
        socialMediaUrl: 'https://twitter.com/lobitodotdev',
      },
      {
        name: 'LinkedIn',
        socialMediaUrl: 'https://www.linkedin.com/in/carlos-camilo-lobo',
      },
      {
        name: 'GitHub',
        socialMediaUrl: 'https://github.com/Platekun',
      }
    ),
  ],
};

function findResumeByVersion(tag) {
  return {
    profileRecord: Resume.profile.find((p) => p.tag === tag).toJSON(),
    workExperiencesCollection: Resume.workExperiences
      .find((we) => we.tag === tag)
      .toJSON(),
    functionsCollection: Resume.functions.find((f) => f.tag === tag).toJSON(),
    toolingCollection: Resume.tooling.find((t) => t.tag === tag).toJSON(),
    socialMediaCollection: Resume.socialMedia
      .find((sm) => sm.tag === tag)
      .toJSON(),
  };
}

export { Resume, findResumeByVersion };
