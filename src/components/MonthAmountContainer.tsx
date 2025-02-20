import { css } from '@emotion/react';

interface TotalAmount {
    month: number;
    week?: number;
    day?: number;
}

interface MonthAmountContainerProps {
    totalAmount: TotalAmount;
}
const MonthAmountContainer : React.FC<MonthAmountContainerProps> = ({
    totalAmount
    }) =>{
        const monthContainer = css`
        background-color: #b1e6ff;
        width: 100%;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

    const monthP = css`
        font-size: 16px;
        margin-bottom: 10px;
    `;

    return (
        <div css={monthContainer}>
        <p css={monthP}>2025/02</p>
        <Amount 
            amount={totalAmount!['month']} 
        />
    </div>
    )
}

interface AmountProps {
    amount: number;
}

const Amount : React.FC<AmountProps> = ({
    amount = 0
    }) =>{
        const changeAmount = (num: number) => {
            return num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        };

        const amountStyle = css`
            font-size: 24px;
        `;
        const yenStyle = css`
            font-size: 16px;
        `;
        
        return (
                <span css={amountStyle}>{changeAmount(amount)}<span css={yenStyle}>円</span></span>
        );
        
};
export default MonthAmountContainer;