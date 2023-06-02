const CoreAppApi = require('../api/CoreAppApi.instance');

class ProdamusController {
  constructor() {}

  joinUserToCourse = async () => {
    const body = {
      emails: ['nikemorozow@yandex.ru'],
    };

    const { data } = await CoreAppApi.post(
      `/course/${process.env.COREAPP_BOOSTER_COURSE_ID}/invite/import`,
      body
    );
    return data;
  };
}

module.exports = new ProdamusController();
