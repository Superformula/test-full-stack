import * as React from 'react';

import './user-card.css';

const UNSPLASH_COLLECTION = "148984"

// Github probably wont like this...
const DEFAULT_AVATAR = "https://avatars2.githubusercontent.com/u/34583379?s=400&u=a084e2cd88c164807fe6e63f8ea1e57d75ca4e8d&v=4";

type UserCardHtmlProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface UserCardBaseProps {
    name: string;
    description: string;
    id: string;
}
type UserCardProps = UserCardHtmlProps & UserCardBaseProps;

const UserCard: React.FunctionComponent<UserCardProps> = (props: UserCardProps) => {
    const { name, description, id, ...htmlProps } = props;

    // Prevent caching with the avatar url
    // https://source.unsplash.com/
    const unsplashUrl = `https://source.unsplash.com/collection/${UNSPLASH_COLLECTION}/144x144?${id}`;

    // This is embarassing.
    // https://stackoverflow.com/questions/493296/css-display-an-image-resized-and-cropped
    return (
        <div className="user-card-grid-element user-card-grid-element-row-element">
            <div {...htmlProps} className="user-card">
                <div className="user-card-avatar" style={{
                    backgroundImage: `url(${unsplashUrl})`,
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