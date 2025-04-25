import React from 'react';
import { TERMS_AND_CONDITIONS_HTML } from '@/helpers/TOS';

const TOS = () => {
  return (
    <div className='container p-10'>
      <div
        className='text-justify'
        dangerouslySetInnerHTML={{ __html: TERMS_AND_CONDITIONS_HTML }}
      />
    </div>
  );
};

export default TOS;
