import React from 'react';

function TrafficRules() {
  return (
    <div className="traffic-rules-container">
      <h1>Traffic Rules</h1>
      <div className="rule">
        <img src="https://media.licdn.com/dms/image/C5112AQE172mXoRY3Uw/article-cover_image-shrink_600_2000/0/1520226712791?e=2147483647&v=beta&t=yscOLvvrs9ZXCtiFViE4hZrGXU3I1MGqM_ZwcJ8Y5GI" alt="Stop Sign" />
        <div className="rule-info">
          <h2>Stop Sign</h2>
          <p>Drivers must come to a complete stop at the stop line or before entering the intersection.</p>
        </div>
      </div>
      <div className="rule">
        <img src="https://c.ndtvimg.com/2022-02/ol6qrda_car_625x300_09_February_22.jpg" alt="Speed Limit Sign" />
        <div className="rule-info">
          <h2>Speed Limit</h2>
          <p>Drivers must not exceed the posted speed limit.</p>
        </div>
      </div>
      <div className="rule">
        <img src="https://mylawcompany.com/wp-content/uploads/2022/10/What-Does-Yielding-the-Right-of-Way-Mean-1024x683-1.jpg" alt="Yield Sign" />
        <div className="rule-info">
          <h2>Yield Sign</h2>
          <p>Drivers must slow down and yield the right of way to traffic in the intersection or roadway.</p>
        </div>
      </div>
      <div className="rule">
        <img src="https://c.ndtvimg.com/2021-12/0sqiadj_car_625x300_31_December_21.jpg" alt="No Parking Sign" />
        <div className="rule-info">
          <h2>No Parking</h2>
          <p>Drivers are not allowed to park in areas where this sign is posted.</p>
        </div>
      </div>
      <div className="rule">
        <img src="https://as1.ftcdn.net/v2/jpg/01/24/80/92/1000_F_124809227_zCWI4lXFclUOiQ9LpeFmbT0Sb4Np83Qy.jpg" alt="Pedestrian Crossing Sign" />
        <div className="rule-info">
          <h2>Pedestrian Crossing</h2>
          <p>Drivers must yield to pedestrians at crosswalks.</p>
        </div>
      </div>
      <div className="rule">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqZE2XfqM3E0__UKLQq_mrp2Xhtszg-Vwo_w&s" alt="No U-Turn Sign" />
        <div className="rule-info">
          <h2>No U-Turn</h2>
          <p>Drivers are not allowed to make a U-turn at this location.</p>
        </div>
      </div>
      <div className="rule">
        <img src="https://seaislenews.com/wp-content/uploads/sites/3/2017/12/1.4-traffic-plan-one-way-sign.jpg" alt="One Way Sign" />
        <div className="rule-info">
          <h2>One Way</h2>
          <p>Drivers must follow the direction indicated by the sign.</p>
        </div>
      </div>
      <div className="rule">
        <img src="https://assets.telegraphindia.com/telegraph/13RanHorn6c_210947.jpg" alt="No Honking Sign" />
        <div className="rule-info">
          <h2>No Honking</h2>
          <p>Drivers are not allowed to use their horns in this area.</p>
        </div>
      </div>
    </div>
  );
}

export default TrafficRules;
