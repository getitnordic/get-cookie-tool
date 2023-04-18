import { useEffect, useState } from 'react';

interface PublicSuffixList {
  data: string[];
  etag: string;
}

export const fetchPublicSuffixList = async (): Promise<PublicSuffixList> => {
  const cachedData = localStorage.getItem('publicSuffixList');
  const cachedEtag = localStorage.getItem('publicSuffixListEtag');
  const headers: { 'If-None-Match'?: string } = {};

  if (cachedEtag) {
    headers['If-None-Match'] = cachedEtag;
  }

  const response = await fetch('https://publicsuffix.org/list/public_suffix_list.dat', { headers });

  if (response.status === 304 && cachedData && cachedEtag) {
    return {
      data: JSON.parse(cachedData),
      etag: cachedEtag,
    };
  }

  const etag = response.headers.get('ETag');
  const data = await response.text();
  const websites = data
    .split('\n')
    .filter((line) => !line.startsWith('//') && !line.startsWith('!') && line.trim() !== '')
    .map((line) => line.trim());
  /* .filter((line) => !line.startsWith('//') && !line.startsWith('!') && line.endsWith('.xx') && line.trim() !== '') */

  localStorage.setItem('publicSuffixList', JSON.stringify(websites));
  localStorage.setItem('publicSuffixListEtag', etag || '');

  return {
    data: websites,
    etag: etag || '',
  };
};
