let orders = JSON.parse(localStorage.getItem('order')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('order', JSON.stringify(orders));
}