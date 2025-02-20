import { css } from '@emotion/react';

interface TotalAmount {
    month: number;
    week?: number;
    day?: number;
}

interface WeekTodayContainerProps {
    totalAmount: TotalAmount;
}
const WeekTodayContainer : React.FC<WeekTodayContainerProps> = ({
    totalAmount
    }) =>{
            const weekDayContainerStyle = css`
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
            `;
        
            const weekDayContentsStyle = css`
                width: 50%;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                
            `;
    return (
        totalAmount['week'] == undefined ? null : (
            <div css={weekDayContainerStyle}>
                <div css={weekDayContentsStyle}>
                    <p>今週の支出</p>
                    <Amount 
                        amount={totalAmount['week']!} 
                    />
                </div>
                <div css={weekDayContentsStyle}>
                    <p>今日の支出</p>
                    <Amount 
                        amount={totalAmount['day']!} 
                    />
                </div>
            </div>
        )
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
export default WeekTodayContainer;