import axios from "axios";



export const getAllDistributor = async (token) => {
  return await axios({
    method: 'get',
    url: `${process.env.REACT_APP_URL}/users/distributor`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const Adddistributor = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${process.env.REACT_APP_URL}/users/distributor`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const distributorStatus = async (data, token) => {
  return await axios({
    method: 'put',
    url: `${process.env.REACT_APP_URL}/users/statusdistributor`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const updateDistributor = async (data, token) => {
  return await axios({
    method: 'put',
    url: `${process.env.REACT_APP_URL}/users/updateDistributor`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const getAreaFromBranch = async (data) => {
  return await axios({
    method: 'post',
    url: `${process.env.REACT_APP_URL}/master/get_area_from_branch`,
    data
  })
}

export const getbeatFromArea = async (data) => {
  return await axios({
    method: 'post',
    url: `${process.env.REACT_APP_URL}/master/get_beat_from_area`,
    data
  });
}

export const getExecutiveFromManager = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${process.env.REACT_APP_URL}/users/get_executive_from_manager`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const getBranchFromExecutive = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${process.env.REACT_APP_URL}/users/get_branch_form_executive`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


