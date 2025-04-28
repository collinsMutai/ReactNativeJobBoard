import {
  ADD_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  SELECT_JOB,
} from "../actions/jobActionTypes";

// Initial job array — assumed already loaded with unique IDs
const initialJobsArray = [
  {
    title: "Frontend Developer",
    image: "https://avatar.iran.liara.run/public/6",
    description:
      "Work with modern frontend frameworks to build engaging user interfaces.",
    postedDate: "2025-04-20",
    yearsOfExperience: 2,
    location: "New York, NY",
    keyResponsibilities: [
      "Develop UI components using React",
      "Collaborate with backend team",
      "Optimize application performance",
    ],
    skillsAndExperience: [
      "Proficiency in JavaScript, React",
      "Understanding of REST APIs",
      "2+ years in frontend development",
    ],
    perksAndBenefits: [
      "Health insurance",
      "Remote work options",
      "Stock options",
    ],
    id: "4a1a95de-6ebc-4872-bd43-2967252fd9d8",
  },
  {
    title: "Backend Developer",
    image: "https://avatar.iran.liara.run/public/girl",
    description: "Design and maintain scalable APIs and backend services.",
    postedDate: "2025-04-18",
    yearsOfExperience: 3,
    location: "Austin, TX",
    keyResponsibilities: [
      "Build and maintain APIs",
      "Work with cloud services",
      "Database optimization",
    ],
    skillsAndExperience: [
      "Node.js, Express",
      "Experience with PostgreSQL",
      "3+ years in backend development",
    ],
    perksAndBenefits: [
      "Flexible hours",
      "Annual tech stipend",
      "Paid vacation",
    ],
    id: "f91d5f7e-5c49-406b-8b02-9f71bf937555",
  },
  {
    title: "UX Designer",
    image: "https://avatar.iran.liara.run/public/32",
    description: "Create user-friendly designs and improve user experience.",
    postedDate: "2025-04-22",
    yearsOfExperience: 1,
    location: "San Francisco, CA",
    keyResponsibilities: [
      "Design user interfaces",
      "Conduct usability testing",
      "Collaborate with product team",
    ],
    skillsAndExperience: [
      "Figma, Adobe XD",
      "User research experience",
      "Portfolio of design work",
    ],
    perksAndBenefits: [
      "Design budget",
      "Wellness programs",
      "Flexible remote work",
    ],
    id: "6bd5df45-51b4-4f6d-a2d0-ab01bf2e40f9",
  },
  {
    title: "Product Manager",
    image: "https://avatar.iran.liara.run/public/7",
    description: "Lead cross-functional teams to deliver products.",
    postedDate: "2025-04-21",
    yearsOfExperience: 5,
    location: "Seattle, WA",
    keyResponsibilities: [
      "Define product roadmap",
      "Coordinate with engineering",
      "Gather user feedback",
    ],
    skillsAndExperience: [
      "Agile methodologies",
      "Strong communication skills",
      "5+ years in product roles",
    ],
    perksAndBenefits: [
      "Leadership coaching",
      "Equity options",
      "Work-from-home allowance",
    ],
    id: "2795b999-8ab1-43c8-9f8f-ab0bb2166a5d",
  },
  {
    title: "Marketing Specialist",
    image: "https://avatar.iran.liara.run/public/5",
    description: "Develop and execute marketing strategies.",
    postedDate: "2025-04-19",
    yearsOfExperience: 2,
    location: "Chicago, IL",
    keyResponsibilities: [
      "Plan marketing campaigns",
      "Track campaign performance",
      "Manage social media channels",
    ],
    skillsAndExperience: [
      "SEO, SEM, Google Analytics",
      "Strong copywriting skills",
      "Experience with HubSpot",
    ],
    perksAndBenefits: ["Annual bonus", "Team retreats", "Free lunch on-site"],
    id: "d8254f9f-5795-4f51-9c78-b19e60321609",
  },
  {
    title: "Data Scientist",
    image: "https://avatar.iran.liara.run/public/8",
    description: "Analyze large datasets to drive business insights.",
    postedDate: "2025-04-17",
    yearsOfExperience: 4,
    location: "Boston, MA",
    keyResponsibilities: [
      "Build machine learning models",
      "Interpret data trends",
      "Work closely with product teams",
    ],
    skillsAndExperience: [
      "Python, R, SQL",
      "Statistical modeling",
      "4+ years in data science",
    ],
    perksAndBenefits: [
      "Conference allowances",
      "Hybrid work model",
      "Company-paid certifications",
    ],
    id: "2659b6e1-a5e4-4510-9e3f-7aabb59c271f",
  },
];

// Convert to object with id as key
const initialJobsObject = {};
initialJobsArray.forEach((job) => {
  initialJobsObject[job.id] = job;
});

const initialState = {
  jobs: initialJobsObject,
  selectedJob: null,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOB:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [action.payload.id]: action.payload,
        },
      };

    case UPDATE_JOB:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [action.payload.id]: action.payload,
        },
      };

    case DELETE_JOB:
      const { [action.payload]: _, ...remainingJobs } = state.jobs;
      return {
        ...state,
        jobs: remainingJobs,
      };

    case SELECT_JOB:
      return {
        ...state,
        selectedJob: state.jobs[action.payload] || null,
      };

    default:
      return state;
  }
};

export default jobReducer;
