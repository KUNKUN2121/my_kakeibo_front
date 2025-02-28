import { css } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppBar, Button, CircularProgress, IconButton, Skeleton, Toolbar, Typography } from '@mui/material';

import React, { useEffect } from 'react';
import DetailTable from '../components/Detail/DetailTable';
import { useParams } from 'react-router-dom';

interface DetailItem {
    transaction_date: string;
    merchant_name: string;
    amount: number;
    memo: string;
}


const Detail: React.FC = ({
    // props
}) => {

    const {id} = useParams();


    const [detailItem, setDetailItem] = React.useState<DetailItem>(null);

    const fetchTransactions = async () => {
        try {

            var url = import.meta.env.VITE_ENV_API_SERVER_URL;
            var month = new Date().getFullYear() * 100 + (new Date().getMonth() + 1); // 現在の月をYYYYMM形式で取得
            month = 202502;

            const response = await fetch(`${url}/api/transactions/${id}`, {
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setDetailItem(data.transaction);
            } else {
                console.error("Failed to fetch transactions");
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }
    , []);

    // 情報が取得できてない場合はローディングを表示


    return (
        <div css={wapper}>
             <AppBar position="static">
                <Toolbar>
                    {/* クリックしたら前のページに戻る */}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => {3
                        window.history.back();
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    明細
                </Typography>
                    <div>
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="up"
                        sx={{ mr: 2 }}
                        >  
                            <KeyboardArrowUpIcon color="inherit"/>
                        </IconButton>
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="down"
                        sx={{ mr: 2 }}
                        >  
                            <KeyboardArrowDownIcon color="inherit"/>
                        </IconButton>
                        
                        
                    </div>
                </Toolbar>
            </AppBar>
            <div css={topCss}>
                {detailItem ? (
                    <>
                        <h1>{detailItem.transaction_date}</h1>
                        <h2>{detailItem.merchant_name}</h2>
                        <h3>¥{detailItem.amount}</h3>
                    </>
                ) : (
                    <>
                        {/* <Skeleton variant="rectangular" width={"100%"} height={"100px"} /> */}
                        <CircularProgress />
                    </>
                )}
            </div>
            <DetailTable  />
            
            <p>カテゴリー</p>
            <p>メモ</p>
            <p>住信SBIネット銀行</p>
            
        </div>
    );
};

export default Detail;

const wapper = css`
    display: flex;
    flex-direction: column;
    /* flex: 1; */
`;

const topCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;

    h1 {
        font-size: 20px;
    }

    h2 {
        padding-top: 8px;
        font-size: 16px;
        color: #333;
    }

    h3 {
        padding-top: 8px;
        font-size: 24px;
        color: #333;
    }
`;

const tableCss = css`
    width: 100%;
`;

const categoryItemCss = css`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;