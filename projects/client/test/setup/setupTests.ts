import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

Enzyme.configure({
    adapter: new Adapter()
});

//global.fetch = fetch;