import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middlewares = [thunk];

if (import.meta.env.DEV) {
  middlewares.push(createLogger());
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store); 

export default { store, persistor }