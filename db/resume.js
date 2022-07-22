const Resume = {
  greeting: `Hello, I am Carlos, Front-End Developer and UI enthusiast`,
  profile: [
    'I have an undergraduate degree in Computer Science from Universidad del Norte but I consider myself self-taught person.',
    'My journey in the software development industry started in 2016. I specialize on front-end development, but I know my way in back-end aswell. Most of my work is built with React.',
    'I strive to build products with good UX, I believe that a mindset of “Building stuff with care” is the best way I have got to help people.',
    'I am always hungry for knowledge, you will always see me reading and sharing articles, tweets and listening to podcasts related to software development. I also love training myself and playing videogames from time to time.',
  ],
  experience: [
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
          source: 'https://lobito-personal-page.s3.amazonaws.com/ticom-erp.png',
          alt: 'TICOM S.A ERP home screen',
        },
        {
          source:
            'https://lobito-personal-page.s3.amazonaws.com/ticom-erp-1.png',
          alt: 'TICOM S.A ERP money management module example screen',
        },
        {
          source:
            'https://lobito-personal-page.s3.amazonaws.com/ticom-erp-2.png',
          alt: 'TICOM S.A ERP money management module example screen',
        },
        {
          source:
            'https://lobito-personal-page.s3.amazonaws.com/ticom-erp-3.png',
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
      jobTitle: ['Back-End Developer', 'Front-End Developer'],
      description: [
        'Main technologies: React.js, Redux and Ionic.',
        'Front-End development in an analytics dashboard project for a private health insurance provider.',
        'Maintenance of BeGirl’s mobile application: An application to empower women with the tools to track their menstrual cycles.',
      ],
      images: [
        {
          source:
            'https://lobito-personal-page.s3.amazonaws.com/be-girl-1.jpeg',
          alt: 'BeGirl application ovulation tracking',
        },
        {
          source:
            'https://lobito-personal-page.s3.amazonaws.com/be-girl-2.jpeg',
          alt: 'BeGirl application ovulation calendar',
        },
        {
          source:
            'https://lobito-personal-page.s3.amazonaws.com/be-girl-3.jpeg',
          alt: 'BeGirl application ovulation information',
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
          source:
            'https://lobito-personal-page.s3.amazonaws.com/luna-intake-form-first-part.png',
          alt: 'LunaCare intake form first screen',
        },
        {
          source:
            'https://lobito-personal-page.s3.amazonaws.com/luna-care-credentialing-form.png',
          alt: 'LunaCare credentialing form example screen',
        },
        {
          source:
            'https://lobito-personal-page.s3.amazonaws.com/luna-dashboard.png',
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
          source:
            'https://lobito-personal-page.s3.amazonaws.com/sony-competition-center.jpeg',
          alt: 'Sony Competition Center old experience',
        },
        {
          source:
            'https://lobito-personal-page.s3.amazonaws.com/sony-competition-center-colombia',
          alt: 'Sony Competition Center recent experience',
        },
      ],
    },
  ],
  functions: [
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
    },
  ],
  tooling: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Node.js'],
  socialMedia: {
    twitter: 'https://twitter.com/lobitodotdev',
    linkedIn: 'https://www.linkedin.com/in/carlos-camilo-lobo/',
    gitHub: 'https://github.com/Platekun',
  },
};

export { Resume };
