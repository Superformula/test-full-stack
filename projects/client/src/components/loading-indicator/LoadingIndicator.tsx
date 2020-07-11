import * as React from 'react';

import './loading-indicator.css';

type LoadingIndicator = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const LoadingIndicator: React.FunctionComponent<LoadingIndicator> = (props: LoadingIndicator) => {
    return (
        <div {...props} className="loading-indicator"></div>
    );
}

export default LoadingIndicator;