<<<<<<< HEAD
export const waait = () => new Promise(res => 
    setTimeout(res, Math.random() *800))

// colors
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.
    length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

=======
>>>>>>> b284e689ec5c2a442a1f879bf2c354672fc1c24b
// local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// delete item from local storage
export const deleteItem = ({key, id}) =>  {
    const existingData = fetchData(key);
    if(id) {
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}