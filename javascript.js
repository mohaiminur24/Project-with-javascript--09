const getDataFromInput = () => {

    const name = getinputValue('productname');
    const quantity = getinputValue('quantity');

    if(name !== '' && name.length <10 && quantity !== ''  && quantity.length <3){
        saveLocalstorage(name,quantity);
        document.getElementById('message').classList.add('hidden');
    }else{
        document.getElementById('message').classList.remove('hidden');
    };
       
};

const getinputValue = id => {
    const inputField = document.getElementById(id);
    const inputvalue = inputField.value;
    inputField.value = "";
    return inputvalue;
};

const saveLocalstorage = (name,quantity) => {
    const cart = getlocalstorage('cart');
    cart[name] = quantity;
    const cartstring = JSON.stringify(cart);
    localStorage.setItem('cart',cartstring);
    document.getElementById('tableBody').innerHTML = "";
    displaydatafromlocalstorage(cart);
};

const getlocalstorage = () => {
        const storage = localStorage.getItem('cart');
        let cart = {};
        if(storage){
            cart = JSON.parse(storage);
        };
        return cart;
};
const displaydatafromlocalstorage = () => {
    const storage = localStorage.getItem('cart');
    const cart = JSON.parse(storage); 
    const parent = document.getElementById('tableBody');
    for(const single in cart){
        const quantity = cart[single];
        const tr = document.createElement('tr');
        tr.innerHTML =
        `
        <td>${single}</td>
        <td>${quantity}</td>
        <td><button class="px-5 py-1 my-1 bg-red-600 rounded-md text-white" onclick="deletebutton('${single}')">Delete</button></td>
        `;
        parent.appendChild(tr);
    };
};

const reset = () => {
    localStorage.removeItem('cart');
    saveLocalstorage();
};

const deletebutton = item => {
    const storage = localStorage.getItem('cart');
    const cart = JSON.parse(storage); 
    delete cart[item];
    const cartstring = JSON.stringify(cart);
    localStorage.setItem("cart",cartstring);
    saveLocalstorage();
};


