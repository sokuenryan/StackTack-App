export const waait = () => new Promise(res => 
    setTimeout(res, Math.random() *800))

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
};