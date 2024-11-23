import React, {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';

import './daily.css';

function Daily() {
  const versionNumber = '1.0'
  useEffect(() => {
    document.title = 'Deer Clicker'
  },[])

  const [cookies, setCookies] = useCookies(['data']);

  return (
    <div className="dailyApp">
      <div className='dailyGrid'>
        
      </div>
    </div>
  );
}

export default Daily;
