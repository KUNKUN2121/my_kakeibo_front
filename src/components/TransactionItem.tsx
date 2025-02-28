/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from "@emotion/react"
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import UndoIcon from '@mui/icons-material/Undo';
import GroupsIcon from '@mui/icons-material/Groups';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FastfoodIcon from '@mui/icons-material/Fastfood';

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


interface TransactionItemProps {
    item: SbiTransaction;
    handleToggleBudget: (id: string, isRegisteredToBudget: boolean) => void;
    handleWarikanOpen: (id: string) => void;
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

const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.info('swipe action triggered')}>
        Action name
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (
    id : string,
    is_registered_to_budget : boolean,
     handleToggleBudget : (id: string, isRegisteredToBudget: boolean)=> void, handleWarikanOpen : (id: string) =>void) => (

        <TrailingActions>
        <SwipeAction
            onClick={() => {
                console.log("toggle")
                handleWarikanOpen(id)
            }}
        >
            <div css={actionContent} style={{ backgroundColor: "#ba772b"}}>
                <GroupsIcon />
            </div>
        </SwipeAction>
        {/* 222222 */}
        <SwipeAction
            onClick={() => {
                console.log("toggle")
                handleToggleBudget(id, is_registered_to_budget)
            }}
        >
            {is_registered_to_budget == true ? (
                // 家計簿に登録しない
                <div css={actionContent} style={{
                    backgroundColor: "#f44336",
                    }}>
                    <div css={itemColumnCentered}>
                        <DeleteOutline />
                    </div>
                </div>
            ) : (
                <div css={actionContent} style={{
                    backgroundColor: "#4caf50",
                    }}>
                    <div css={itemColumnCentered}>
                        <UndoIcon />
                    </div>
                </div>

            )}

        </SwipeAction>
        </TrailingActions>

  );
const TransactionItem: React.FC<TransactionItemProps> = ({ item, handleToggleBudget, handleWarikanOpen}) => {
    const navigate = useNavigate();

    const handleItemClick = (item: SbiTransaction) => {
        // window.location.href = `/${item.id}`;
        console.log(item.id);
        navigate(`/detail/${item.id}`);
    }
    return (
        <SwipeableList
            fullSwipe={true}
            threshold={0.4}
            type={Type.IOS}
        >
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions(item.id, item.is_registered_to_budget,handleToggleBudget,handleWarikanOpen)}
                onClick={() => handleItemClick(item)}
            >
                <div key={item.approval_number} css={wapper} style={{
                    backgroundColor: item.is_registered_to_budget == false ? "#cdcdcd98" : "#fff",
                    color: item.is_registered_to_budget == false ? "#676767" : "#333",

                }}>
                    <div css={topCss}>
                        <p css={dateCss}>{dateFormat(item.transaction_date)} {
                        item.is_confirmed == true ? " [確定]" : ""}
                        </p>
                    </div>
                    <div css={mainContainer}>
                        {/* <FastfoodIcon /> */}
                        <div css={containerCss}>
                                <p css={merchantCss}>{toHalfWidth(removeId(getMerchantName(item.merchant_name)))}</p>
                        
                            <span css={priceCss} style={{
                                color: item.amount < 0 ? "red" : "black",
                            }}>{amountFormat(item.amount, item.currency)}<span css={currencyCss}>{item.currency == "JPY" ? "円" : item.currency}</span></span>
                        </div>
                    </div>

                    {/* <span css={categoryCss}>カテゴリー</span> */}
                    <span css={memoCss}>{item.memo}</span>




                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};


const wapper = css`
    margin: 0 0;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    width: 100%;

`;
const merchantCss = css`
    font-size: 16px;
    vertical-align: bottom;
`;

const actionContent = css`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 8px;
    font-size: 12px;
    font-weight: 500;
    box-sizing: border-box;
    color: #eee;
    user-select: none;
`;


const itemColumnCentered = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const containerCss = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const topCss = css`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
`;

const dateCss = css`
    font-size: 14px;
`;

const priceCss = css`
    font-size: 24px;
`;

const currencyCss = css`
    font-size: 14px;
    margin-left: 5px;
    color: #333;
`;

const categoryCss = css`
    font-size: 12px;
    color: #666;
    padding-top: 10px;
`;
const memoCss = css`
    font-size: 12px;
    color: #666;
    padding-top: 10px;
`;

const mainContainer = css`
    display: flex;
    align-items: center;
`;



const getMerchantName = (merchant_name: string | null): string => {
    if (merchant_name === null || merchant_name === "Japan Bridge Center") {
        return " ";
    }
    return merchant_name;
}

const dateFormat = (date: string): string => {
    const dateObj = new Date(date);
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return hours + "時" + minutes + "分";
}

// .00になるので 小数点以下切り捨てる
const amountFormat = (amount: number, currency:string): string => {

    return Math.floor(amount).toLocaleString();
}


// [／ｉＤ]という文字列を取り除く
const removeId = (str: string): string => {
    const cleanedText = str.replace(/／ｉＤ$/, "");
    // 全角英語を半角英語に変換

    return cleanedText;
}

const toHalfWidth = (str: string) => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    );
  };



export default TransactionItem;
