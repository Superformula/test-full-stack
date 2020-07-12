import * as React from 'react';

import editIcon from '!svg-inline-loader!../../assets/error_outline-24px.svg';

type AlertIconProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const AlertIcon: React.FunctionComponent<AlertIconProps> = (props: AlertIconProps) => {
    return (
        <div {...props} dangerouslySetInnerHTML={{__html: editIcon}}/>
    );
}

export default AlertIcon;