import axios from "axios";
const url = process.env.REACT_APP_URL;



export const getAllexecutive = async (token) => {
  return await axios({
    method: 'get',
    url: `${url}/users/salesexecutive`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const executiveStatus = async (data, token) => {
  return await axios({
    method: 'put',
    url: `${url}/users/salesexecutivestatus`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const updateExecutive = async (data, token) => {
  return await axios({
    method: 'put',
    url: `${url}/users/salesexecutive`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const addExecutive = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${url}/users/salesexecutive`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const getAllmanager = async (token) => {
  return await axios({
    method: 'get',
    url: `${url}/users/salesmanager?setactive=active`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const getbeatFromArea = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/get_beat_from_area`,
    data
  });
}

export const getAreaFromBranch = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/get_area_from_branch`,
    data
  })
}

export const getBranchFromManager = async (data, role, token) => {
  return await axios({
    method: 'post',
    url: `${url}/users/getBranch?role=${role}`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


