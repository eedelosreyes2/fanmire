import axios from 'axios';

const url = 'https://localhost:5000/api/identity';

class IdentityService {

  static authenticateFB(access_token) {
    return axios.post(`${url}/facebook`, {
      access_token
    }).then(({ data }) => data);
  }
}

export default IdentityService;
