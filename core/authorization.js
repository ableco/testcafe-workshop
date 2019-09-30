import { RequestHook } from 'testcafe';
let TOKEN = '';
export default  class DeviceAuthorization extends RequestHook {
  constructor (tokenId) {
    TOKEN = tokenId;
    super();
  }
  async onRequest (e) {
    e.requestOptions.headers['Authorization'] = `Bearer ${TOKEN}`;
  }

  async onResponse (e) {
    // do nothing
  }
}