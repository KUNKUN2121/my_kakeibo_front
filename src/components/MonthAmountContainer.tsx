import { css } from '@emotion/react';
import { selectClasses } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface TotalAmount {
    month: number;
    week?: number;
    day?: number;
}

interface MonthAmountContainerProps {
    totalAmount: TotalAmount;
    selectedMonth: number;
    setSelectedMonth: (month: number) => void;
}
const MonthAmountContainer : React.FC<MonthAmountContainerProps> = ({
    totalAmount,
    selectedMonth,
    setSelectedMonth
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
                <MonthDate props={selectedMonth} setSelectedMonth={setSelectedMonth} />
            <p css={monthP}>今月の支出</p>
            
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

interface MonthDateProps {
    props: number;
    setSelectedMonth: (month: number) => void;
}

const MonthDate : React.FC<MonthDateProps> = ({
    props,
    setSelectedMonth
}) => {
    // 現在の月をYYYYMM形式なので、年と月に分ける
    const year = Math.floor(props / 100);
    const monthNum = props % 100;
    const month = `${year}年${monthNum}月`;

    const handleBeforeMonth = () => {
        // YYYYMM形式をDate型に変換
        const date = new Date(year, monthNum - 2);
        const newMonth = date.getFullYear() * 100 + (date.getMonth() + 1);
        setSelectedMonth(newMonth);
    }

    const handleNextMonth = () => {
        // YYYYMM形式をDate型に変換
        const date = new Date(year, monthNum);
        const newMonth = date.getFullYear() * 100 + (date.getMonth() + 1);
        setSelectedMonth(newMonth);
    }

    return (
        <div css={monthContainerCss}>
            <NavigateBeforeIcon sx={{ fontSize: 28 }} onClick={() => handleBeforeMonth()} />
            <p>{month}</p>
            <NavigateNextIcon sx={{ fontSize: 28 }} onClick={() => handleNextMonth()} /> 
        </div>
    )
}


export default MonthAmountContainer;


const monthContainerCss = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        font-size: 20px;
    }
`;