import axios from 'axios'

const baseURL = 'http://localhost:3003/'

export const addTransaction = async ({ srcAccount, desAccount, type, total }) => {
  let result = [];
  const res = await axios({
    method: 'POST',
    baseURL,
    url: '/transaction',
    data: {
      srcAccount, desAccount, type, total
    }
  })

  if (res.data.status === 'success') {
    result = res.data.data
  }

  return Promise.resolve(result);
}

export const getTransaction = async ({ limit = '', srcAccount = '' }) => {
  let result = [];
  let summary = [];

  const res = await axios({
    method: 'GET',
    baseURL,
    url: '/transaction',
    params: {
      limit,
      srcAccount
    }
  })

  if (res.data.status === 'success') {
    result = res.data.data
    summary = res.data.summary

  }

  return Promise.resolve([result, summary]);
}