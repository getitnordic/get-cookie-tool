import React, { useState, useEffect } from 'react';
import { fetchPublicSuffixList } from '../utils/utils';

type WebsiteListProps = {
  loading: boolean,
  websites: string[],
};

const WebsiteList: React.FC<WebsiteListProps> = ({ loading, websites }) => {
  if (loading) {
    return <div>Loading assets...</div>;
  }

  return (
    <div>
      {websites.map((website, index) => (
        <div key={index}>{website}</div>
      ))}
    </div>
  );
};

export default WebsiteList;
