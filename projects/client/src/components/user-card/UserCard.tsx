import * as React from 'react';

import './user-card.css';
const tmp = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60";

type UserCardHtmlProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface UserCardBaseProps {
    name: string;
    description: string;
    avatarUrl: string;
}

type UserCardProps = UserCardHtmlProps & UserCardBaseProps;

const UserCard: React.FunctionComponent<UserCardProps> = (props: UserCardProps) => {
    const { name, description, avatarUrl, ...htmlProps } = props;

    // This is embarassing.
    // https://stackoverflow.com/questions/493296/css-display-an-image-resized-and-cropped
    return (
        <div className="user-card-grid-element user-card-grid-element-row-element">
            <div {...htmlProps} className="user-card">
                <div className="user-card-avatar" style={{
                    backgroundImage: `url(${tmp})`,
                }}></div>
                <h2>
                    {name.toUpperCase()}
                </h2>
                <p>
                    {description}
                </p>
            </div>
        </div>
    );
}

export default UserCard;