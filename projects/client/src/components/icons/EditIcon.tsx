import * as React from 'react';

import editIcon from '!svg-inline-loader!../../assets/edit-24px.svg';

type EditIconProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const EditIcon: React.FunctionComponent<EditIconProps> = (props: EditIconProps) => {
    return (
        <div {...props} dangerouslySetInnerHTML={{__html: editIcon}}/>
    );
}

export default EditIcon;