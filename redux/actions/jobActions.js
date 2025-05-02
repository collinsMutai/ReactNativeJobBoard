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

export const addJob = (jobData) => async (dispatch) => {
  console.log("Adding job:", jobData);
  try {
    const formData = new FormData();

    // ✅ Append image only if provided
    if (jobData.image) {
      if (
        jobData.image.startsWith("http") ||
        jobData.image.startsWith("https")
      ) {
        // 🔁 Remote image URL — send as plain string
        formData.append("imageUrl", jobData.image);
      } else if (jobData.image.startsWith("data:image")) {
        // If base64 data URI is passed, send as a string directly
        formData.append("imageUrl", jobData.image);
      } else {
        // 📂 Local file from ImagePicker
        const fileUri = jobData.image;
        const fileName = fileUri.split("/").pop() || "job-image.jpg";
        const fileType = "image/jpeg"; // You can enhance this by detecting mime type

        formData.append("image", {
          uri: fileUri,
          name: fileName,
          type: fileType,
        });
      }
    }

    // ✅ Append all other fields
    formData.append("title", jobData.title);
    formData.append("category", jobData.category);
    formData.append("description", jobData.description);
    formData.append("postedDate", jobData.postedDate);
    formData.append("location", jobData.location);
    formData.append("yearsOfExperience", jobData.yearsOfExperience.toString());
    formData.append(
      "keyResponsibilities",
      JSON.stringify(jobData.keyResponsibilities)
    );
    formData.append(
      "skillsAndExperience",
      JSON.stringify(jobData.skillsAndExperience)
    );
    formData.append(
      "perksAndBenefits",
      JSON.stringify(jobData.perksAndBenefits)
    );

    // ✅ Submit job to backend
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const newJob = await response.json();

    if (response.ok) {
      dispatch({ type: ADD_JOB, payload: newJob });
    } else {
      console.error("❌ Failed to add job:", newJob);
    }
  } catch (error) {
    console.error("❌ Error adding job:", error);
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
