import axios from "axios";


export const getAllReports = async (data, token) => {
  return await axios({
    method: 'get',
    url: `${process.env.REACT_APP_URL}/report/all_reports?filter=${data}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}



export const getAllEndCustomer = async (data, token) => {
  return await axios({
    method: 'get',
    url: `${process.env.REACT_APP_URL}/report/end_customer_report`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}


export const getAllDebtor = async (data, token) => {
  return await axios({
    method: 'get',
    url: `${process.env.REACT_APP_URL}/report/debtor_ageing`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}