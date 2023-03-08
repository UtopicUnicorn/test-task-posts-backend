import axios from 'axios';
import { apiURL } from '../../urls.js';

export default {
  async getFormattedJSON() {
    const posts = await this.getPosts();
    const users = await this.getUsers();

    for (let user of users.data) {
      let postsArray = [];
      for (let post of posts.data) {
        if (user.id === post.userId) {
          delete post.userId;
          post.title_crop = this.titleFormatter(post.title);
          postsArray.push(post);
        }
      }
      user = await this.formatUser(user, postsArray);
    }
    return users.data;
  },

  async getPosts() {
    try {
      return await axios.get(apiURL + '/posts');
    } catch (err) {
      console.log(err);
    }
  },

  async getUsers() {
    try {
      return await axios.get(apiURL + '/users');
    } catch (err) {
      console.log(err);
    }
  },

  async getComments(postId) {
    try {
      return await axios.get(apiURL + `/posts/${postId}/comments`);
    } catch (err) {
      console.log(err);
    }
  },

  addressFormatter(address) {
    return `${address.city}, ${address.street}, ${address.suite}`;
  },

  titleFormatter(title) {
    if (title.length > 20) {
      return title.substr(0, 20).trim() + '...';
    }
    return title;
  },

  urlFormatter(url) {
    return 'https://' + url;
  },

  async commentsOnPosts(user) {
    const promises = user.posts.map(async (post) => {
      const { data } = await this.getComments(post.id);
      post.comments = data.map((item) => {
        delete item.postId;
        return item;
      });
      return post;
    });
    return Promise.all(promises);
  },

  async formatUser(user, posts) {
    delete user.username;
    delete user.phone;
    user.address = this.addressFormatter(user.address);
    user.website = this.urlFormatter(user.website);
    user.company = user.company.name;
    user.posts = posts;

    //bonus task - add comments to Ervin Howell posts
    if (user.name === 'Ervin Howell') {
      user = await this.commentsOnPosts(user);
    }
    return user;
  },
};
