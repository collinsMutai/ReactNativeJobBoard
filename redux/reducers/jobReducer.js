import {
  ADD_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  SELECT_JOB,
  SET_JOBS,
} from "../actions/jobActionTypes";

const initialState = {
  jobs: {},
  selectedJob: null,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return {
        ...state,
        jobs: action.payload, // This should be an object keyed by _id
      };
    case ADD_JOB:
    case UPDATE_JOB:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [action.payload._id]: action.payload,
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
