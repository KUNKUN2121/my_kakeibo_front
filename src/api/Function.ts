// 金が買う .00 を消し、3桁ごとにカンマを入れる
export const removeDecimal = (price: number): string => {
    const num = Math.floor(price);
    
    // 3桁ごとにカンマを入れる

    return num.toLocaleString("ja-JP");;
};


// dateをYYYY MM/DD HH:mm:s 形式に変換
export const formatDate = (date
/*: string*/
) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    const result = `${year}/${month}/${day} ${hour}:${minute}`;
    return result;
}