import { merge } from 'lodash';
import Defaults from './default';
import Env from './env';

/**
 * Config envs
 */
export default merge({}, Defaults, Env);
