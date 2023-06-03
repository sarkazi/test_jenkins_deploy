const determiningCoreAppCourse = (shortCourseName) => {
  switch (shortCourseName) {
    case 'PRINCIPLES':
      return process.env.COREAPP_PRINCIPLES_COURSE_ID;
    case 'STORY':
      return process.env.COREAPP_STORY_COURSE_ID;
    case 'INDIRECT':
      return process.env.COREAPP_INDIRECT_COURSE_ID;
    case 'BOOSTER':
      return process.env.COREAPP_BOOSTER_COURSE_ID;
    case 'IDEA':
      return process.env.COREAPP_IDEA_COURSE_ID;
  }
};

console.log('555555');

module.exports = determiningCoreAppCourse;
