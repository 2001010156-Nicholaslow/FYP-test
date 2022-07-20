import React from 'react';

const Reviewspost = ({Rposts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className='list-group mb-4'>
      {Rposts.map((Rpost) => (
        <div key={Rpost.id} className='list-group-item'>
          {Rpost.title}
        </div>
      ))}
    </div>
  );
};

export default Reviewspost;