import useCartStore from './cart';
import useGroupPathStore from './groupPath';
import useTitleStore from './title';
import useUserStore from './user';

export {
  useCartStore,
  useGroupPathStore,
  useTitleStore,
  useUserStore,
};
  
const store = {
  useCartStore,
  useGroupPathStore,
  useTitleStore,
  useUserStore,
};
  
if (window['Cypress']) {
  window['store'] = store;
}
