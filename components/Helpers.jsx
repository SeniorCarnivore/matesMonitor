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

export const exportJson = () => {
  const data = JSON.stringify({
    skills: localStorage.getItem('skills'),
    mates: localStorage.getItem('mates')
  });

  const a = document.createElement('a');
  const file = new Blob([data], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = 'matesMonitorData.txt';
  a.click();
};

export const getJsonFromFile = (e, callback) => {
  const { files } = e.target; 
  const file = files[0];

  readFileContent(file)
    .then(content => (
      callback(JSON.parse(content))
    ))
    .catch(error => console.log(error));
};

export const readFileContent = file => {
	const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  })
};