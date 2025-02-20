import { css } from '@emotion/react';
import TransactionItem from './TransactionItem';

interface TotalAmount {
    month: number;
    week?: number;
    day?: number;
}

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
}
const TransactionList : React.FC<TransactionItemProps> = ({
    sbiTransactions
    }) =>{
    return (
        <div>
        利用履歴
        {sbiTransactions.map((item) => (
                <TransactionItem item={item} 
                    handleToggleBudget={handleToggleBudget} 
                    handleWarikanOpen={handleWarikanOpen} 
                    key={item.id}
                />
        ))}
        
    </div>
    )
}

        const handleToggleBudget = async (id: string, isRegisteredToBudget: boolean) => {
            
        };
        const handleWarikanOpen = (id : string) => {

        };

export default TransactionList;