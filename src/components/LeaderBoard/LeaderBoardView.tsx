import React from 'react';
import { Banner } from './Banner';
import { UserInfo } from './UserInfo';

export const LeaderBoardView = () => {
  return (
    <div className='container'>
      <Banner />
      <div className='bg-white rounded-xl p-6'>
        <UserInfo />
      </div>
    </div>
  );
};
