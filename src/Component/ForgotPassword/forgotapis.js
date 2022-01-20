import axios from "axios";
const url = process.env.REACT_APP_URL;

export const forgotPass = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/auth/forgot_password`,
    data
  });
}

export const otpVerify = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/auth/verify_otp`,
    data
  });
}

export const resetPass = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/auth/reset_password`,
    data
  })
}