const products = [
    { id: 1, name: 'Mezcla original 200g', price: 500 },
    { id: 2, name: 'Mezcla original 500g', price: 900 },
    { id: 3, name: 'Mezcla especial 200g', price: 700 },
    { id: 4, name: 'Mezcla especial 500g', price: 1200 }
  ];
  const priceElement = document.getElementById("product");
  const numberElement = document.getElementById("number");
  let purchases = [];
  
  function add() {
    const productId = parseInt(priceElement.value);
    const number = parseInt(numberElement.value);
  
    const product = products.find(p => p.id === productId);
    if (!product) {
      window.alert("Por favor, seleccione un producto válido.");
      return;
    }
  
    let purchase = {
      id: productId,
      name: product.name,
      price: product.price,
      number: number
    };
  
    let newPurchase = true;
  
    purchases.forEach(item => {
      if(item.id === purchase.id) {
        item.number += purchase.number;
        newPurchase = false;
      }
    });
  
    if(newPurchase) {
      purchases.push(purchase);
    }
  
    window.alert(`${display()}\nSubtotal: ${subtotal()} yenes`);
    priceElement.value = "0";
    numberElement.value = "";
  }
  
  function display() {
    return purchases.map(purchase => {
      return `${purchase.name} - ${purchase.price} yenes - Cantidad: ${purchase.number}`;
    }).join("\n");
  }
  
  function subtotal() {
    return purchases.reduce((prev, purchase) => {
      return prev + purchase.price * purchase.number;
    }, 0);
  }
  
  function calc() {
    const sum = subtotal();
    const postage = calcPostageFromPurchase(sum);
    window.alert(`Subtotal: ${sum} yenes, Gastos de envío: ${postage} yenes. Total: ${sum + postage} yenes.`);
    purchases = [];
    priceElement.value = "0";
    numberElement.value = "";
  }
  
  function calcPostageFromPurchase(sum) {
    if (sum === 0 || sum >= 3000) {
      return 0;
    } else if (sum < 2000) {
      return 500;
    } else {
      return 250;
    }
  }