import axios from "axios";
const url = process.env.REACT_APP_URL;


export const fetchAllPage = async () => {
  return await axios({
    method: 'get',
    url: `${url}/cms/cmspagename`
  });
};

// export const updateStatus = async (data) => {
//   console.log(data);
//   return await axios({
//     method: 'put',
//     url: `${url}/cms/`
//     data
//   })
// }

export const fetchAllPageName = async () => {
  return await axios({
    method: 'get',
    url: `${url}/cms/pagename`
  });
}

export const createPageData = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/cms/cmspagename`,
    data
  });
}

export const fetchOne = async (id) => {
  return await axios({
    method: 'get',
    url: `${url}/cms/getonepage?id=${id}`
  });
}

export const updateOne = async (data) => {
  return await axios({
    method: 'put',
    url: `${url}/cms/cmspagename`,
    data
  });
}

