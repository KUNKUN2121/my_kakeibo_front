import { css } from '@emotion/react';
import TransactionItem from './TransactionItem';

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

interface TransactionItemProps {
    sbiTransactions: SbiTransaction[];
    fetchTransactions: () => void;
}

const wrapper = css`
    margin-top: 20px;
    padding: 0 4px 0 4px;
`;

const groupByDate = (transactions: SbiTransaction[]) => {
    return transactions.reduce((acc, transaction) => {
        const date = transaction.transaction_date.split(" ")[0]; // "2025-02-20 12:01:04" → "2025-02-20"
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {} as { [key: string]: SbiTransaction[] });
};

const TransactionList: React.FC<TransactionItemProps> = ({ sbiTransactions,fetchTransactions }) => {
    const groupedTransactions = groupByDate(sbiTransactions);

    const handleToggleBudget = async (id: string, isRegisteredToBudget: boolean) => {
        // トグル処理
        const baseurl = import.meta.env.VITE_ENV_API_SERVER_URL;
        const url = `${baseurl}/api/toggleRegisterToBudget`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
                id,
                is_registered_to_budget: !isRegisteredToBudget,
            }),
        });

        // レスポンスが200の場合、fetchTransactionsを呼び出す
        if (response.ok) {
            fetchTransactions();
        }


    };

    const handleWarikanOpen = (id: string) => {
        // 割り勘処理
    };

    return (
        <div css={wrapper}>
            {Object.entries(groupedTransactions).map(([date, transactions]) => (
                <div key={date} css={dateGropCss}>
                    <div css={dateCss}>{date}</div>
                    {transactions.map((item) => (
                        <TransactionItem
                            key={item.id}
                            item={item}
                            handleToggleBudget={handleToggleBudget}
                            handleWarikanOpen={handleWarikanOpen}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TransactionList;


const dateCss = css`
    font-weight: bold;
`;

const dateGropCss = css`
    margin-bottom: 16px;
    padding-bottom: 16px;
`;