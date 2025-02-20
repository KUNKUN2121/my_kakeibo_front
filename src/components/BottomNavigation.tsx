import { css } from '@emotion/react';
import TransactionItem from './TransactionItem';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { CalendarMonth, Category, Favorite, FavoriteSharp, Home, LocationCity, Restore, Settings } from '@mui/icons-material';
import { useState } from 'react';

const BtmNav : React.FC = ({

    }) =>{
        const [value, setValue] = useState(0);
    return (
        <div>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
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