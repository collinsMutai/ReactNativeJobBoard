const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("./models/Job");

dotenv.config();

const initialJobsArray = [
  {
    title: "Frontend Developer",
    category: "Engineering",
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
  },
  {
    title: "Backend Developer",
    category: "Engineering",
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
  },
  {
    title: "UX Designer",
    category: "Design",
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
  },
  {
    title: "Product Manager",
    category: "Product",
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
  },
  {
    title: "Marketing Specialist",
    category: "Marketing",
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
  },
  {
    title: "Data Scientist",
    category: "Data Science",
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
  },
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear the collection before inserting new data
    await Job.deleteMany({});
    console.log("🗑️ Cleared existing jobs");

    // Insert the initial jobs
    await Job.insertMany(initialJobsArray);
    console.log("🌱 Seeded jobs successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding jobs:", err);
    process.exit(1);
  }
};

seedJobs();
