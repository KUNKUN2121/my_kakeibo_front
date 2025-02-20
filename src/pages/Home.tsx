import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import WeekTodayContainer from '../components/WeekTodayContainer';
import MonthAmountContainer from '../components/MonthAmountContainer';
import TransactionList from '../components/TransactionList';
import BottomNavigation from '../components/BottomNavigation';
import BtmNav from '../components/BottomNavigation';

interface SbiTransaction {
    id: string;
    approval_number: string;
    transaction_date: string;
    merchant_name: string | null;
    currency: string;
    amount: number;
    memo: string;
    is_registered_to_budget: boolean;
    is_confirmed: boolean;
}

interface TotalAmount {
    month: number;
    week?: number;
    day?: number;
}

const Home: React.FC = () => {
    const [sbiTransactions, setSbiTransactions] = useState<SbiTransaction[]>([]);
    const [totalAmount, setTotalAmount] = useState<TotalAmount>({ month: 0 });
    const fetchTransactions = async () => {
        try {

            var url = import.meta.env.VITE_ENV_API_SERVER_URL;
            var month = new Date().getFullYear() * 100 + (new Date().getMonth() + 1); // 現在の月をYYYYMM形式で取得
            month = 202502;

            const response = await fetch(`${url}/api/transactions?month=${month}`, {
            });

            if (response.ok) {
                const data = await response.json();
                setSbiTransactions(data.transactions);
                setTotalAmount(data.total_amount);
            } else {
                console.error("Failed to fetch transactions");
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

        // 初回レンダリング時にデータを取得
        useEffect(() => {
            fetchTransactions();
        }, []);

    const wapper = css`
        height: 100vh;
        width: 100%;
    `;

const AddBtnCss = css`
    width: 100%;
`;


console.log(import.meta.env.VITE_ENV_API_SERVER_URL);
    return (
        <div css={wapper}>
            <MonthAmountContainer totalAmount={totalAmount} />
            <WeekTodayContainer totalAmount={totalAmount} />
            {/* 収入と支出を見よう */}
            <Button css={AddBtnCss}>追加</Button>
            <TransactionList sbiTransactions={sbiTransactions} />
            <BtmNav />
        </div>
    );
};



export default Home;

