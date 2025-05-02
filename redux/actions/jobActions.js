import {
  ADD_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  SELECT_JOB,
  SET_JOBS,
} from "./jobActionTypes";

// ✅ Backend API URL
const API_URL = "http://192.168.100.7:5000/api/jobs";

// Fetch all jobs from backend using fetch
export const fetchJobs = () => async (dispatch) => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch jobs, status: ${res.status}`);
    }
    const data = await res.json();
    console.log("API Response:", data);
    const jobsObject = {};
    data.forEach((job) => {
      jobsObject[job._id] = job;
    });
    dispatch({ type: SET_JOBS, payload: jobsObject });
  } catch (err) {
    console.error("❌ Failed to fetch jobs:", err.message);
  }
};

// Add a job using fetch
export const addJob = (newJob) => async (dispatch) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    if (!res.ok) {
      throw new Error(`Failed to add job, status: ${res.status}`);
    }
    const data = await res.json();
    dispatch({ type: ADD_JOB, payload: data });
  } catch (err) {
    console.error("❌ Failed to add job:", err.message);
  }
};

// Update a job using fetch
export const updateJob = (job) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    if (!res.ok) {
      throw new Error(`Failed to update job, status: ${res.status}`);
    }
    const data = await res.json();
    dispatch({ type: UPDATE_JOB, payload: data });
  } catch (err) {
    console.error("❌ Failed to update job:", err.message);
  }
};

// Delete a job using fetch
export const deleteJob = (jobId) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/${jobId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete job, status: ${res.status}`);
    }
    dispatch({ type: DELETE_JOB, payload: jobId });
  } catch (err) {
    console.error("❌ Failed to delete job:", err.message);
  }
};

// Select a job locally
export const selectJob = (jobId) => ({
  type: SELECT_JOB,
  payload: jobId,
});
