// delete item from local storage
export const deleteItem = ({key, id}) =>  {
    const existingData = fetchData(key);
    if(id) {
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}