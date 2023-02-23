const getMedian = (numbers) => {
    const sorted = Array.from(numbers).sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

const messagesFromReactAppListener = (
    msg,
    sender,
    sendResponse) => {
  
     const prices = Array.from(document.querySelectorAll("[data-test='property-card-price']"))
                         .map(price => price.innerHTML)

    console.log(prices)
     const homeDetailsRaw = Array.from(document.querySelectorAll('[class*="StyledPropertyCardHomeDetails"]'))

     const homeDetails = homeDetailsRaw.map((home) => {
         const beds = home.children[0]?.innerText
         const baths = home.children[1]?.innerText
         const sqft = home.children[2]?.innerText
         return {
             beds,
             baths,
             sqft
         }
     })

     const addresses = Array.from(document.getElementsByTagName("address"))
                     .map(address => address.innerText)

                     const homes = []
 
     for (let i=0; i<addresses.length; i++) {
         
         const home = {
             address: addresses[i],
             beds: homeDetails[i].beds,
             baths: homeDetails[i].baths,
             sqft: homeDetails[i].sqft,
             price: prices[i],
         }
         console.log(home)
         
         homes.push(home)
     }
 
    const pricesNumber = prices.map(price => {
     return Number(price.replace(/[^0-9.-]+/g,""))
    })
 
    const averagePrice = pricesNumber.reduce((prev, curr) => prev + curr)/prices.length
 
    const medianPrice = getMedian(pricesNumber);
 
    const response = {
        homes,
        averagePrice,
        medianPrice,
    };
    console.log(response)
    console.log(homes)
  
    sendResponse(response);
 }
  
 chrome.runtime.onMessage.addListener(messagesFromReactAppListener);