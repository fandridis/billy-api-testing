import axios from 'axios';

let request = async (method, url, body) => {
  try {
      const res = await axios({
          baseURL: 'https://api.billysbilling.com/v2',
          method,
          url,
          headers: {
              'X-Access-Token': '64842819136bf5c866a90427c3a8507e7fa00998',
              'Content-Type': 'application/json'
          },
          data: body
      })

      if (res.status >= 400) {
          throw new Error(`${method}: ${url} failed with ${res.status} - ${res.data}`)
      }

      return res.data;
  } catch (e) {
      console.error(e)
      throw e
  }
}

export default request;