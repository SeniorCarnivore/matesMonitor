export const createMateId = (keys) => {
  const id = Math.floor(Math.random() * ( 1000 - 0 + 1 )) + 1;
  const idIsUnique = keys.indexOf(id) < 0;
  const uniqueId = idIsUnique ? id : createMateId(keys);

  return uniqueId;
};

export const getMateDetails = (mates, mateDetails) => {
  let details = 'There is no mate selected (๑◕︵◕๑)';

  if (mateDetails !== 0 && mates.length !== 0) {
    details = mates.find(mate => mate.id === mateDetails);
  }

  return details;
};

export const handleCheckboxChange = (e, callbackSet, id) => {
  const {
    value,
    checked
  } = e.target;

  callbackSet(value, checked, id);
};

export const createSkillsList = (skills) => {
  const mateSkills = {};

  Array.from(skills).map(skill => {
    mateSkills[skill] = false;
    return skill;
  });

  return mateSkills;
};

export const duplicate = data => {
  if (Array.isArray(data)) {
    return [ ...data ];
  }

  if (typeof data === 'object') {
    if (data && data.size) {
      return new Set([ ...data ]);
    }

    return { ...data };
  } 
};