import request from './request';
export const mpcbot = async (data) => {
  return await request({ method: 'post', url: 'https://www.swftc.info/ai/mpcbot' ,data: data});
};
export const getCoinList = async (data) => {
    return await request({ method: 'get', url: '/v1/api/getCoinList' ,params: data});
};
export const getKlineInfo = async (data) => {
  return await request({ method: 'get', url: '/v1/api/getKlineInfo' ,params: data});
};
export const getPresetTwo = async (data) => {
  return await request({ method: 'get', url: '/v1/api/getPresetTwo' ,params: data});
};
export const getPresetThree = async (data) => {
  return await request({ method: 'get', url: '/v1/api/getPresetThree' ,params: data});
};

export const getTopics = async (data) => {
  return await request({ method: 'get', url: '/v1/api/getTopics' ,params: data});
};

export const checkLogin = async (data) => {
  return await request({ method: 'get', url: '/v1/api/checkLogin' ,params: data});
};

export const userLogin = async (data) => {
  return await request({ method: 'post', url: '/v1/api/userLogin' ,data: data});
};

export const register = async (data) => {
  return await request({ method: 'post', url: '/v1/api/register' ,data: data});
};

export const modifyPassword = async (data) => {
  return await request({ method: 'post', url: '/v1/api/modifyPassword' ,data: data});
};

export const loginOut = async (data) => {
  return await request({ method: 'get', url: '/v1/api/loginOut' ,params: data});
};

export const sendVerifyCode = async (data) => {
  return await request({ method: 'post', url: '/v1/api/sendVerifyCode' ,data: data});
};

export const getCaptcha = async (data) => {
  return await request({ method: 'get', url: '/v1/api/getCaptcha' ,params: data});
};

export const sendchat = async (data) => {
  return await request({ method: 'post', url: '/v1/api/sendChat' ,data: data});
};

export const getMsgGroupList = async (data) => {
  return await request({ method: 'get', url: '/v1/api/getMsgGroupList' ,params: data});
};

export const getMessageList = async (data) => {
  return await request({ method: 'get', url: '/v1/api/getMessageList' ,params: data});
};

export const delMsgGroupList = async (data) => {
  return await request({ method: 'post', url: '/v1/api/delMsgGroupList' ,data: data});
};

export const sendEmailCode = async (data) => {
  return await request({ method: 'post', url: '/v1/api/sendEmailCode' ,data: data});
};

export const getPredictInfo = async (data) => {
  return await request({ method: 'get', url: '/v1/api/getPredictInfo' ,params: data});
};

export const userRate = async (data) => {
  return await request({ method: 'post', url: '/v1/api/userRate' ,params: data});
};
export const delMessages = async (data) => {
  return await request({ method: 'post', url: '/v1/api/delMessages' ,data: data});
};
export const shareMessages = async (data) => {
  return await request({ method: 'post', url: '/v1/api/shareMessages' ,data: data});
};
export const getShareMessages = async (data) => {
  return await request({ method: 'post', url: '/v1/api/getShareMessages' ,data: data});
};

export const account = async (data) => {
  return await request({ method: 'get', url: '/v1/api/pay/account' ,params: data});
};
export const payCardInfo = async (data) => {
  return await request({ method: 'get', url: '/v1/api/pay/cardInfo' ,params: data});
};







