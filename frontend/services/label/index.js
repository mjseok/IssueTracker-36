import adders from './adders';
import deleters from './deleters';
import getters from './getters';
// import updaters from './updaters'

const labelService = (apiRequest) => {
  return {
    ...adders(apiRequest),
    ...getters(apiRequest),
    // ...updaters(axios),
    ...deleters(apiRequest),
  };
};

export default labelService;
