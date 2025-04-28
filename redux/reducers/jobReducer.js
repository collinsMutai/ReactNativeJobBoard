// redux/reducers/jobReducer.js
import {
  ADD_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  SELECT_JOB,
} from "../actions/jobActionTypes";
import uuid from "react-native-uuid";


// Initial state with multiple jobs
const initialState = {
  jobs: {
    [uuid.v4()]: {
      title: "Frontend Developer",
      image: "https://avatar.iran.liara.run/public/6",
      description:
        "Work with modern frontend frameworks to build engaging user interfaces.",
      postedDate: "2025-04-20",
      yearsOfExperience: 2,
      location: "New York, NY",
    },
    [uuid.v4()]: {
      title: "Backend Developer",
      image: "https://avatar.iran.liara.run/public/girl",
      description: "Design and maintain scalable APIs and backend services.",
      postedDate: "2025-04-18",
      yearsOfExperience: 3,
      location: "Austin, TX",
    },
    [uuid.v4()]: {
      title: "UX Designer",
      image: "https://avatar.iran.liara.run/public/32",
      description: "Create user-friendly designs and improve user experience.",
      postedDate: "2025-04-22",
      yearsOfExperience: 1,
      location: "San Francisco, CA",
    },
    [uuid.v4()]: {
      title: "Product Manager",
      image: "https://avatar.iran.liara.run/public/7",
      description: "Lead cross-functional teams to deliver products.",
      postedDate: "2025-04-21",
      yearsOfExperience: 5,
      location: "Seattle, WA",
    },
    [uuid.v4()]: {
      title: "Marketing Specialist",
      image: "https://avatar.iran.liara.run/public/5",
      description: "Develop and execute marketing strategies.",
      postedDate: "2025-04-19",
      yearsOfExperience: 2,
      location: "Chicago, IL",
    },
    [uuid.v4()]: {
      title: "Data Scientist",
      image: "https://avatar.iran.liara.run/public/8",
      description: "Analyze large datasets to drive business insights.",
      postedDate: "2025-04-17",
      yearsOfExperience: 4,
      location: "Boston, MA",
    },
  },
  selectedJob: null,
};


const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOB:
      const newJob = { ...action.payload, id: uuid.v4()  };
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
