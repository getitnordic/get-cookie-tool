import React from 'react';

export const RegexComp = ({ websites }) => {
  // Render the websites
  return (
    <div>
      {websites.map((website, index) => (
        <div key={index}>{website}</div>
      ))}
    </div>
  );
};
