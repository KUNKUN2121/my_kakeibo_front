import { css } from '@emotion/react';
import React, { useState } from 'react';
import SourceIcon from '@mui/icons-material/Source';
import { SwipeableDrawer } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
interface DetailTableProps {
    data: Array<{ id: number; name: string; amount: number }>;
}

const DetailTable: React.FC = ({  }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    return (
        <div css={wapper}>
            <div css={contentCss}
             onClick={toggleDrawer}
             >
                <div>
                    <SourceIcon />
                    カテゴリー
                </div>
                <SwipeableDrawer
                    anchor="bottom"
                    open={isDrawerOpen}
                    onClose={() => console.log("close")}
                    onOpen={() => console.log("open")}
                >
                    <div css={drawerWapper}>
                        <h1>カテゴリー</h1>
                    </div>
                </SwipeableDrawer>
                <KeyboardArrowDownIcon color="inherit"/>
                
            </div>
        </div>
    );
};

export default DetailTable;

const wapper = css`
    width: 100%;
`;

const contentCss = css`

    display: flex;
    justify-content: space-between;
    padding: 1rem;

    border-top: solid black 1px;
    border-bottom: solid black 1px;
`;

const drawerWapper = css`
    height: calc(100vh / 1.5);
`;