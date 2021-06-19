import React from 'react';
import usePersons from '../../hooks/useUsersInifniteList';

const Home: React.FC = () => {
  const {
    users, loading, error, hasNextPage, loadMore,
  } = usePersons();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>
          <p>
            {user.name}
          </p>
        </div>
      ))}

      <button type="button" disabled={!hasNextPage} onClick={loadMore}> more</button>
    </div>
  );
};

export default Home;
