import React from 'react';
import ExtraDetails from '../../dist/images/miniwidgets.jpg';
import ExtraDetails2 from '../../dist/images/description.jpg';
import ExtraDetails3 from '../../dist/images/specs.jpg';
import YouMayLike from '../../dist/images/youmaylike.jpg';

const StaticComponents = (props) => {
  return (
    <div className="vert-container">
      <img src={ExtraDetails} className="static"></img>
      <p id="static-name">{props.name.toUpperCase()}</p>
      <img src={ExtraDetails2} className="static"></img>
      <img src={ExtraDetails3} className="static"></img>
      <p id="youMayLike">YOU MIGHT ALSO LIKE</p>
      <img src={YouMayLike} className="static"></img>
    </div>
  )
};

export default StaticComponents;