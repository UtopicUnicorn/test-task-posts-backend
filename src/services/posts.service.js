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
      //if 20-th char is ' ' then get 19 chars and add '...'
      if (title[19] === ' ') {
        return title.substr(0, 19) + '...';
      }
      return title.substr(0, 20) + '...';
    }
    return title;
  },

  urlFormatter(url) {
    return 'https://' + url;
  },

  async commentsOnPosts(user) {
    for (let post of user.posts) {
      const comments = await this.getComments(post.id);
      for (let comment of comments.data) {
        delete comment.postId;
      }
      post.comments = comments.data;
    }
    return user;
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
