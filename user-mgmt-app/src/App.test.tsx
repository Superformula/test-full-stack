import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe(' App', () => {
  it('Should render', async () => {
    const { getByText } = render(<App />);
    const usersList = getByText(/Loading.../i);
    expect(usersList).toBeInTheDocument();
  });
});
