import { Version } from '../db';

const alphaVersion = new Version('alpha');

const Resume = {
  profile: [
    alphaVersion.createRecord(
      'My name is Carlos Lobo. I am a software developer from Barranquilla, Colombia.',
      'Regarding my education, I have a bachelors degree in Systems Engineering from Universidad del Norte but despite this I consider myself self-taught person.',
      'My journey in the software development industry started in 2016. I specialize on front-end development, but I can work my way through in the server side as well. Most of my work is built using React.',
      'I strive to build products with good user experience (UX), I believe that a mindset of "Building stuff with care" is the best way I have to help people.',
      'I am a curious person and I really like learning knew things.'
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
          'TICOM S.A is a cement production company in Barranquilla. Most of their processes and documentation were in physical state and the company wished to migrate into a more digital nature, they were planning to build a customized enterprise resource planning software (ERP).',
          'The development team consisted of multiple full stack developers that worked on different modules of the ERP software, we followed the waterfall methodology. As part of the development team for the ERP, my contributions were adding features in the petty cash, invoices and cash flow movements modules.',
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
          'NativApps is an application development company which provides software development for corporations and startups.',
          'During my time in the company I worked in two projects: The first one was for a private health insurance provider. The company wished to migrate into a more digital nature by building a dashboard-like experience for their employees. Our team consisted in a set of multiple front-end developers and back-end developers, we worked following agile practices. As part of the development team for the dashboard, my contributions were working on the create / read / update / delete (CRUD) screens for the different entities of the domain as well as designing the front-end architecture.',
          'For my second project in the company I worked for BeGirl. BeGirl is as Be Girl is a design company that creates innovative, beautiful, and affordable reusable menstrual hygiene products for womankind. One of their products was a mobile application to empower women with the tools to track their menstrual cycles with all the information they could need. My role in the project consisted in providing support and solving production issues to the existing application.',
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
          'Ideaware is a company that connects Colombia’s top talent with US companies and startups.',
          'During my time in the company I worked in three applications for a single client: LunaCare, a startup that is trying to re-imagine physical therapy by bringing therapists and treaments to the people that need them.',
          'Our team consisted of a designer, a back-end developer and a front-end developers, we worked following agile practices. For my first project the user interface (UI) with code name of "Patients Form": A single page application form used by patients or by their doctors to track their progress in different areas; The application also provides a therapist-specific view of the evolution of a specific patient.',
          'For my second project I built the user interface (UI) with code name "Credentialing form": A single page application wizard form that therapist applicants need to fill in to apply for a job in Luna.',
          'For my third and last project I Built the user interface (UI) with code name "Dashboard": A single page dashboard used by therapists to filter out and observe data according to a patient sample.',
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
          'Zemoga is a company that helps organizations build better digital products by offering their expertise in cross-functiona teams.',
          'During my time in the company I worked for the Sony Group Corporation. As a giant in the console space, Sony wished to elevate Sony\'s competitive play to the next level by offering tournaments and competitive gaming content, curated based on your favorite titles, that is how their "Competition Center" came to life.',
          'Our team consisted of multiple front-end developers, back-end developers, product designers, business analysts and QAs. The team worked using SCRUM and Kanban. As part of the development team my role involved developing new features, scaling architecture, problem solving, release management, task prioritization and collaboration with the other team members.',
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
        name: 'design-to-code',
        description:
          'Translate user interface (UI) / user experience (UX) designs into code.',
      },
      {
        name: 'features',
        description:
          'Develop user facing features for web applications in collaboration with customers, designers, product managers, stakeholders, and peers.',
      },
      {
        name: 'cross-browser',
        description:
          'Build user interface cross-browser and multi-device functionalities.',
      },
      {
        name: 'problem-solving',
        description:
          'Identify user interface (UI) related problems and solve them using appropriate technologies, user experience patterns and best practices.',
      },
      {
        name: 'build-and-mantain',
        description:
          'Design, develop, test, deploy, maintain, and support high-quality production code.',
      },
      {
        name: 'optimize',
        description:
          'Optimize delivery of code and assets to the users browser using CDN, caches, compressions, etc.',
      }
    ),
  ],
  tooling: [
    alphaVersion.createCollection(
      {
        name: 'HTML',
        description:
          'A language used to define the meaning and structure of web content. It uses "markup" to annotate text, images, and other content for display in a Web browser.',
        source: 'https://developer.mozilla.org/en-US/docs/Web/html',
      },
      {
        name: 'CSS',
        description:
          'A stylesheet language used to describe the presentation of a document written in HTML. It describes how elements should be rendered on screen, on paper, in speech, or on other media.',
        source: 'https://web.dev/learn/css',
      },
      {
        name: 'JavaScript',
        description:
          'A programming language most well-known as the scripting language for web pages. It defines the behavior of the user interfaces but it can be used on the server side as well.',
        source: 'https://developer.mozilla.org/en-US/docs/Web/javascript',
      },
      {
        name: 'TypeScript',
        description:
          'A strongly typed programming language that adds additional syntax to JavaScript, giving you better tooling by allowing to describe the shape of data.',
        source: 'https://www.typescriptlang.org',
      },
      {
        name: 'React.js',
        description:
          'A JavaScript library for building user interfaces (UI) using functional programing principles.',
        source: 'https://reactjs.org',
      },
      {
        name: 'XState',
        description:
          'A JavaScript library for modeling behavior as finite state machines and statecharts.',
        source: 'https://xstate.js.org/docs',
      },
      {
        name: 'Node.js',
        description:
          'A JavaScript runtime environment that runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser.',
        source: 'https://nodejs.dev/learn',
      },
      {
        name: 'Express.js',
        description:
          'A Node.js framework considered the de facto standard for building websites and APIs with Node.js',
        source: 'https://expressjs.com',
      },
      {
        name: 'Next.js',
        description:
          'A React framework that provides building blocks to build static and dynamic websites and web apps.',
        source: 'https://nextjs.org',
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
