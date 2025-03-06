import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import WeekTodayContainer from '../components/WeekTodayContainer';
import MonthAmountContainer from '../components/MonthAmountContainer';
import TransactionList from '../components/TransactionList';
import BtmNav from '../components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';


interface TotalAmount {
    month: number;
    week?: number;
    day?: number;
}

const Home: React.FC = () => {
    const [sbiTransactions, setSbiTransactions] = useState<SbiTransaction[]>([]);
    const [totalAmount, setTotalAmount] = useState<TotalAmount>({ month: 0 });
    const [selectedMonth, setSelectedMonth] = useState<number>(null);
    const fetchTransactions = async () => {
        try {

            var url = import.meta.env.VITE_ENV_API_SERVER_URL;
            // selectedMonth がnullの場合、現在の月にする
            var month = selectedMonth;
            if (!month) {
                month = new Date().getFullYear() * 100 + new Date().getMonth() + 1;
            }

            // month = 202502;
            // 現在の月をYYYYMM形式で取得

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
            setSelectedMonth(new Date().getFullYear() * 100 + new Date().getMonth() + 1);
            fetchTransactions();
        }, []);

        useEffect(() => {
            fetchTransactions();
        }, [selectedMonth]);

const wapper = css`
    display: flex;
    flex-direction: column;
    height: calc(100dvh - 56px);
    overflow-y: hidden;
`;

const AddBtnCss = css`
    width: 100%;
`;

const kotei = css`
    flex-grow: 1;
    overflow-y: auto;
    flex-shrink: 0;
`;

const transactionCss = css`
    overflow: auto;
    /* flex-grow: 1; */
`;

const addBtnCss = css`
/* 薄い青色のぼたん　 */
    position: absolute;
    right: 10px;
    bottom: 80px;
    z-index: 1000;
`;
console.log(import.meta.env.VITE_ENV_API_SERVER_URL);
    return (
        <div css={wapper}>
            <div css={kotei}>
                <MonthAmountContainer totalAmount={totalAmount} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>
                <WeekTodayContainer totalAmount={totalAmount} />
            </div>
            <div css={addBtnCss}>
                <Fab color="primary" aria-label="add">
                <AddIcon />
                </Fab>
            </div>
            <div css={transactionCss}>
                <TransactionList 
                    sbiTransactions={sbiTransactions} 
                    fetchTransactions={fetchTransactions}
                />
                </div>
            
        </div>
    );
};



export default Home;

