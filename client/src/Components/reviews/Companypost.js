import React from 'react';
//import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const Companypost = ({ Cposts: Cposts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className='list-group mb-4'>
      {Cposts.map((Cpost) => (
        <div key={Cpost.partners_id} className='list-group-item'>

          <div className='reviews_box'>
            <h3 className='review_details_text'>{Cpost.company_name}</h3>
            <h3 className='review_details_text'> {Cpost.industry}</h3>
            <button className='ADbutton_edit'><Link to="../company/PartnersPage" state={Cpost.partners_id}>View more</Link></button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Companypost;