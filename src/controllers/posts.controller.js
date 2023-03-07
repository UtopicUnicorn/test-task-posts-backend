import postsService from '../services/posts.service.js';

export default {
  async get(req, res) {
    try {
      const formattedResponse = await postsService.getFormattedJSON();

      //print result in terminal
      console.log(JSON.stringify(formattedResponse, null, 4));

      //send back with formatted json
      res.type('json').send(JSON.stringify(formattedResponse, null, 4));
    } catch (e) {
      console.error(e.message);
    }
  },
};
