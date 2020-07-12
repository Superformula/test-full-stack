import * as React from 'react';

import './user-card.css';

const UNSPLASH_COLLECTION = "148984"

// Github probably wont like this...
// const DEFAULT_AVATAR = "https://avatars2.githubusercontent.com/u/34583379?s=400&u=a084e2cd88c164807fe6e63f8ea1e57d75ca4e8d&v=4";

type UserCardHtmlProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface UserCardBaseProps {
    name: string;
    description: string;
    id: string;
    flare?: JSX.Element;
    cardRef?: React.MutableRefObject<any>;
}
type UserCardProps = UserCardHtmlProps & UserCardBaseProps;

const UserCard: React.FunctionComponent<UserCardProps> = (props: UserCardProps) => {
    const { name, description, id, flare, cardRef, ...htmlProps } = props;

    // Prevent caching with the avatar url
    // https://source.unsplash.com/
    const unsplashUrl = `https://source.unsplash.com/collection/${UNSPLASH_COLLECTION}/144x144?${id}`;

    // This is embarassing.
    // https://stackoverflow.com/questions/493296/css-display-an-image-resized-and-cropped
    return (
        <div {...htmlProps} ref={cardRef} className="user-card">
            <div className="user-card-avatar" style={{
                backgroundImage: `url(${unsplashUrl})`,
            }}></div>
            <p>
                <span className="user-card-emphasis-h2">{name.toUpperCase()}</span> 
                {flare}
            </p>
            <p>
                {description}
            </p>
        </div>
    );
}

export default UserCard;