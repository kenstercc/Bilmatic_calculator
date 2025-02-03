import fs from 'fs'

// Function to read tasks from a file
const readTasks = async (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject('Error reading file: ' + err);
      resolve(JSON.parse(data));
    });
  });
};

// Function to process a task
const processTask = async (task) => {
  return new Promise((resolve) => {
    console.log(`Processing ${task.billing_event}...`);
    setTimeout(() => {
    
    const Entity    = task.business_party_value_1;
    const SubEntity = task.business_party_value_2;
    const Account   = task.business_party_value_3;
    const item      = task.billing_event;

   

  // Querying the data using fetch and promises
  fetch('http://localhost:3000/viewcontract/'+Entity+'/'+SubEntity+'/'+Account+``) 
  // Deserializing the data we received
  .then(response => response.json())
   // We have our data now, we initialize our table
  .then(data => {
   
  const filteredData = data.filter(row => row.contract_billing_item === item); 
   
  
  
  const variable = {
    "qty": task.item_count,
    "value": task.account_value
   }
   
   //call dynamic calculator with schedule and necessary item data
   fetch('http://localhost:3000/calculate',  {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
       body: JSON.stringify({ filteredData, variable  })
      })
    .then(response => response.json())
    .then(data => {
        task.fee_amount = data.calcuResponse.finalresult.toLocaleString();
        task.legend = data.calcuResponse.legend;  
        task.status = 'completed';
        console.log(`${task.billing_event} completed.`);
        resolve(task);                  
      })
        })

     .catch(error => {
      console.error('Error with calculator!!', error);
      })
    }, 1000); // Simulating a delay in processing the task   
    
  });
};

// Function to save the updated tasks back to the file
const saveTasks = async (filename, tasks) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(tasks, null, 2), (err) => {
      if (err) reject('Error saving tasks: ' + err);
      resolve('Tasks saved successfully');
    });
  });
};

// Main batch process function
const runBatchProcess = async () => {
  try {
    // Step 1: Read the tasks from file
    const tasks = await readTasks('billing_trans.json');
    
    // Step 2: Process each task
    for (let task of tasks) {
      await processTask(task);
    }

    // Step 3: Save the updated tasks
    await saveTasks('billing_trans.json', tasks);
    console.log('Batch process completed successfully.');
  } catch (err) {
    console.error('Error during batch process:', err);
  }
};

// Run the batch process
runBatchProcess();