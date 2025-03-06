import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { CalendarMonth, Category, Home, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BtmNavProps {
    bottomNavValue: number;
    setBottomNavValue: (value: number) => void;
}

const BtmNav : React.FC<BtmNavProps> = ({
    bottomNavValue,
    setBottomNavValue
    }) =>{

    const navigate = useNavigate();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setBottomNavValue(newValue);
        switch (newValue) {
          case 0:
            navigate('/');
            break;
          case 1:
            navigate('/calender');
            break;
          case 2:
            navigate('/category');
            break;
          case 3:
            navigate('/settings');
            break;
        }
      };
    
    return (
        <div>
        <BottomNavigation
            showLabels
            value={bottomNavValue}
            onChange={handleChange}
            >
            <BottomNavigationAction label="ホーム" icon={<Home />} />
            <BottomNavigationAction label="カレンダー" icon={<CalendarMonth/>} />
            <BottomNavigationAction label="カテゴリー" icon={<Category/>} />
            <BottomNavigationAction label="設定" icon={<Settings />} />
        </BottomNavigation>
    </div>
    )
}


export default BtmNav;