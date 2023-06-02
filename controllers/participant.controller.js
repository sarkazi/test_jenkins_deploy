const Participant = require('../entities/Participant');

class ParticipantController {
  constructor() {}

  create = async (objDB) => {
    return await Participant.create(objDB);
  };

  findOneByEmail = async (email) => {
    return await Participant.findOne({ email });
  };
}

module.exports = new ParticipantController();
