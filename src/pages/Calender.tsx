import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja'; // 追加
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { css } from '@emotion/react';
import { removeDecimal } from '../api/Function';

const Calendar: React.FC = () => {
    let calendarRef = React.createRef<FullCalendar>();
    const [transactions, setTransactions] = useState<SbiTransaction[]>([]);

    const fetchTransactions = async() => {
        // 表示されている範囲で取得する
        const calendarApi = calendarRef.current.getApi();
        const getStart = new Date(calendarApi.view.currentStart)
        const getEnd = new Date(calendarApi.view.currentEnd)
        // startを7日前、endを7日後に変更
        getStart.setDate(getStart.getDate() -7);  // 7日前
        getEnd.setDate(getEnd.getDate() +7);      // 7日後

        // 日付をISO文字列に変換
        const start = getStart.toISOString().split('T')[0];
        const end = getEnd.toISOString().split('T')[0];


        try {
            var url = import.meta.env.VITE_ENV_API_SERVER_URL;
            const response = await fetch(`${url}/api/transactions/range?start=${start}&end=${end}`, {
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTransactions(data.transactions);
                // console.log(groupByDateAmount(data.transactions));
            } else {
                console.error("Failed to fetch transactions");
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }
    , []);



    return (
        <div css={wapperCss}>
                <div style={{
                    height: "100%",
                }}>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        locales={[jaLocale]}         
                        locale='ja'
                        businessHours={true} // 土日の色付け
                        navLinks={false}  // クリックでリンクに飛ぶのを無効化
                        datesSet={fetchTransactions}
                        fixedWeekCount={false}
                        height={"80%"}
                        
                        events={[
                            ...groupByDateAmount(transactions)
                                .map((item) => {
                                    // amountが0の場合は表示しない
                                    if (parseFloat(item.amount) === 0) {
                                        return null; // ここで null を返す
                                    }
                                    
                                    return { title: removeDecimal(parseFloat(item.amount)), date: item.date };
                                })
                                .filter(item => item !== null),  // nullを取り除く
                        ]}
                    />
                </div>
        </div>
    );
};

export default Calendar;

const wapperCss = css`
    flex: 1;
`;

// transactionから利用日ごとの合計金額を取得するし、それをカレンダーに表示する
// 1. 月の利用金額を取得する
// 2. 利用日ごとの合計金額を取得する
// 3. カレンダーに表示する
// 4. カレンダーの日付をクリックすると、その日の取引情報を表示する



const groupByDate = (transactions: SbiTransaction[]) => {
    return transactions.reduce((acc, transaction) => {
        const date = transaction.transaction_date.split(" ")[0]; // "2025-02-20 12:01:04" → "2025-02-20"
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {} as { [key: string]: SbiTransaction[] });
}

const groupByDateAmount = (transactions: SbiTransaction[]) => {
    const groupDate = groupByDate(transactions);
    console.log(groupDate);
    const result =  Object.entries(groupDate).map(([date, transactions]) => {
        const amount = transactions.reduce((acc, transaction) => {
            if (transaction.is_registered_to_budget == false) {
                console.log("is_registered_to_budget is false");
                return acc;
            }
            const amount = typeof transaction.amount === "string" ? parseFloat(transaction.amount) : transaction.amount;
            return acc + amount;
        }, 0);
        return { date, amount: amount.toFixed(2) }; // 小数点2桁にフォーマット
    });
    console.log(result);
    return result;
}

