import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

//global.fetch = fetch;