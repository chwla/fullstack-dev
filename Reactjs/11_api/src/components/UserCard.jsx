import React from 'react';

const UserCard = ({ data }) => {
  if (!data) return null;

  const { name, phone, location, picture } = data;

  return (
    <div className="user-card">
      <img className="user-img" src={picture.large} alt="User" />
      <h3>{name.first} {name.last}</h3>
      <p>{phone}</p>
      <p>{location.city}, {location.state}</p>
    </div>
  );
};

export default UserCard;
