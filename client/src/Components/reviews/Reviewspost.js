import React from 'react';
import StarRatings from 'react-star-ratings';

const Reviewspost = ({ Rposts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className='list-group mb-4'>
      {Rposts.map((Rpost) => (
        <div key={Rpost.review_id} className='list-group-item'>
          <div className='reviews_box'>
            <StarRatings
              rating={Rpost.rating}
              starDimension="30px"
              starSpacing="10px"
            />

            {Rpost.review}
          </div>

        </div>
      ))}
    </div>
  );
};

export default Reviewspost;