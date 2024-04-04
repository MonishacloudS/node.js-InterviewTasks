const fetch = require('node-fetch');

// Function to make HTTP request asynchronously
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Data fetched from ${url}:`, data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
}

// Function to perform multiple HTTP requests sequentially
async function performHttpRequests() {
    try {
        const endpoint1Data = await fetchData('https://api.example.com/endpoint1');
        const endpoint2Data = await fetchData('https://api.example.com/endpoint2');
        const combinedData = { ...endpoint1Data, ...endpoint2Data };
        console.log('Combined data:', combinedData);
    } catch (error) {
        console.error('Error performing HTTP requests:', error);
    }
}

// Function to perform multiple HTTP requests in parallel
// async function performHttpRequests() {
//     try {
//         const [endpoint1Data, endpoint2Data] = await Promise.all([
//             fetchData('https://api.example.com/endpoint1'),
//             fetchData('https://api.example.com/endpoint2')
//         ]);
//         const combinedData = { ...endpoint1Data, ...endpoint2Data };
//         console.log('Combined data:', combinedData);
//     } catch (error) {
//         console.error('Error performing HTTP requests:', error);
//     }
// }



// Call the function to perform HTTP requests
performHttpRequests();