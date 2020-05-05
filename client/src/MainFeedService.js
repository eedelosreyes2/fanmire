import axios from 'axios';

const url = 'https://localhost:5000/api/posts'; // change to proxy later

class MainFeedService {
  // Get Posts
  static getPosts(celebrity) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/${celebrity}/`).then((res) => {
          const data = res.data;
          resolve(
            data.map(post => ({
              ...post,
              createdAt: new Date(post.createdAt)
            }))
          );
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  // Create Post
  static insertPost(text) {
    return axios.post(url, {
      text
    });
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}/${id}`);
  }
}

export default MainFeedService;