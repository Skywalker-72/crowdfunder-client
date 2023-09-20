// projectSlice.js
import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projectName: '',
    projectDescription: '',
    targetAmount: '',
    thumbnailUrl: '',
  },
  reducers: {
    setProjectInfo: (state, action) => {
      state.projectName = action.payload.projectName;
      state.projectDescription = action.payload.projectDescription;
      state.targetAmount = action.targetAmount;
      state.thumbnailUrl = action.thumbnailUrl;
    },
  },
});

export const projectActions = projectSlice.actions
export default projectSlice
