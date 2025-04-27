// redux/reducers/jobReducer.js
import {
  ADD_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  SELECT_JOB,
} from "../actions/jobActionTypes";
import { v4 as uuidv4 } from "uuid";

// Initial state with multiple jobs
const initialState = {
  jobs: {
    [uuidv4()]: {
      title: "Frontend Developer",
      image: "https://avatar.iran.liara.run/public/6",
      description:
        "Work with modern frontend frameworks to build engaging user interfaces.",
      postedDate: "Posted on April 20, 2025",
    },
    [uuidv4()]: {
      title: "Backend Developer",
      image: "https://avatar.iran.liara.run/public/girl",
      description: "Design and maintain scalable APIs and backend services.",
      postedDate: "Posted on April 18, 2025",
    },
    [uuidv4()]: {
      title: "UX Designer",
      image: "https://avatar.iran.liara.run/public/32",
      description: "Create user-friendly designs and improve user experience.",
      postedDate: "Posted on April 22, 2025",
    },
    [uuidv4()]: {
      title: "Product Manager",
      image: "https://avatar.iran.liara.run/public/7",
      description: "Lead cross-functional teams to deliver products.",
      postedDate: "Posted on April 21, 2025",
    },
    [uuidv4()]: {
      title: "Marketing Specialist",
      image: "https://avatar.iran.liara.run/public/5",
      description: "Develop and execute marketing strategies.",
      postedDate: "Posted on April 19, 2025",
    },
    [uuidv4()]: {
      title: "Data Scientist",
      image: "https://avatar.iran.liara.run/public/8",
      description: "Analyze large datasets to drive business insights.",
      postedDate: "Posted on April 17, 2025",
    },
  },
  selectedJob: null, // Initially, no job is selected
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOB:
      const newJob = { ...action.payload, id: uuidv4() };
      return {
        ...state,
        jobs: { ...state.jobs, [newJob.id]: newJob }, // Add job to the jobs object
      };

    case UPDATE_JOB:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [action.payload.id]: { ...action.payload }, // Update the job in the jobs object
        },
      };

    case DELETE_JOB:
      const { [action.payload]: _, ...rest } = state.jobs; // Remove the job by ID
      return {
        ...state,
        jobs: rest,
      };

    case SELECT_JOB:
      return {
        ...state,
        selectedJob: state.jobs[action.payload] || null, // Select job directly by ID
      };

    default:
      return state;
  }
};

export default jobReducer;
