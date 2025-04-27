// redux/actions/jobActions.js
import { ADD_JOB, UPDATE_JOB, DELETE_JOB, SELECT_JOB } from "./jobActionTypes";

// Add a new job to the store
export const addJob = (newJob) => ({
  type: ADD_JOB,
  payload: newJob,
});

// Update an existing job
export const updateJob = (updatedJob) => ({
  type: UPDATE_JOB,
  payload: updatedJob,
});

// Delete a job by its ID
export const deleteJob = (jobId) => ({
  type: DELETE_JOB,
  payload: jobId,
});

// Select a job to view its details
export const selectJob = (jobId) => ({
  type: SELECT_JOB,
  payload: jobId,
});
