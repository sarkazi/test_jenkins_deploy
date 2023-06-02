const CoreAppApi = require('../api/CoreAppApi.instance');

class CoreAppController {
  constructor() {}

  getAllCourses = async () => {
    const { data } = await CoreAppApi.get('/course');
    return data;
  };

  getUsers = async () => {
    const { data } = await CoreAppApi.get('/user');
    return data.payload.users;
  };

  createUser = async (user) => {
    const { data } = await CoreAppApi.post('/user/import', user);

    return data;
  };

  createWebhook = async () => {
    const body = {
      event: 'COURSE_JOINED',
      courseId: process.env.COREAPP_BOOSTER_COURSE_ID,
      url: 'https://7b2e-5-144-118-36.ngrok-free.app/webhookCallback',
      method: 'GET',
    };

    const { data } = await CoreAppApi.post('/webhook', body);
    return data;
  };

  deleteWebhook = async () => {
    const webhookId = '647379b18c8921a68962d806';

    const { data } = await CoreAppApi.delete(`/webhook/${webhookId}`);
    return data;
  };

  getAllWebhooks = async () => {
    const { data } = await CoreAppApi.get(`/webhook`);
    return data.payload.webhooks;
  };

  joinUserToCourse = async (courseId, payload) => {
    const { data } = await CoreAppApi.post(
      `/course/${courseId}/invite/import`,
      payload
    );
    return data;
  };
}

module.exports = new CoreAppController();
