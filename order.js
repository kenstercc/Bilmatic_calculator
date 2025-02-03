const ordersData = [
    { orderId: 1, product: 'Phone', quantity: 2, price: 15 },
    { orderId: 2, product: 'Tablet', quantity: 1, price: 25 },
    { orderId: 3, product: 'Macbook', quantity: 3, price: 30 },
    { orderId: 4, product: 'Laptop', quantity: 1, price: 20 },
    { orderId: 5, product: 'Microphone', quantity: 4, price: 18 },
    { orderId: 6, product: 'Earphones', quantity: 2, price: 35 },
    { orderId: 7, product: 'Jacket', quantity: 1, price: 22 },
    { orderId: 8, product: 'Shirt', quantity: 2, price: 28 },
    { orderId: 9, product: 'Shorts', quantity: 3, price: 12 },
    { orderId: 10, product: 'Pants', quantity: 2, price: 40 },
    { orderId: 11, product: 'Gazebo', quantity: 1, price: 25 },
    { orderId: 12, product: 'Dressing Table', quantity: 3, price: 20 },
    { orderId: 13, product: 'Charger', quantity: 1, price: 32 },
    { orderId: 14, product: 'Television', quantity: 2, price: 14 },
    { orderId: 15, product: 'Sweater', quantity: 4, price: 26 },
  ];
  const batchSize = 5;
  
  function updateOrderPrice(order) {
    const newPrice = parseFloat((order.price * 1.1).toFixed(1));
    return { ...order, price: newPrice };
  }
  
  function processABatch(batch, processingFunction) {
    for (const order of batch) {
      const updatedOrder = processingFunction(order);
      console.log(`Order ${updatedOrder.orderId} - Updated Price: $${updatedOrder.price}`);
    }
  }
  
  const numOfBatches = Math.ceil(ordersData.length / batchSize);
  
  for (let batchIndex = 0; batchIndex < numOfBatches; batchIndex++) {
    const start = batchIndex * batchSize;
    const end = Math.min(start + batchSize, ordersData.length);
  
    const batch = ordersData.slice(start, end);
  
    processABatch(batch, updateOrderPrice);
  
    console.log(`Batch ${batchIndex + 1} processed.`);
    console.log("");
  }
  
  console.log('Batch processing of order prices is complete.');