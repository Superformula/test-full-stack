import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe(' App', () => {
  it('Should render', () => {
    const { getByText } = render(<App />);
    const hallo = getByText(/Hallo/i);
    expect(hallo).toBeInTheDocument();
  });
});
