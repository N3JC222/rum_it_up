const axios = require('axios');

const query = `
    {
        pirateStatsDatas(
        first: 2
        orderBy: intervalStartAt
        orderDirection: desc
        where: {intervalType: DAILY, nft_: {tokenId: "755"}}
        ) {
        goldMinted
        questsStarted
        questsCompleted
        intervalStartAt
        intervalType
        nft {
            name
            description
            tokenId
            contractAddress
        }
        }
    }
`;

const url = 'https://subgraph.satsuma-prod.com/208eb2825ebd/proofofplay/pn-pop-apex/api';

// Define the function to make the GraphQL request
async function makeGraphQLRequest(url) {
  let all_data = []

  for (let id = 1; id < 5; id++) {
    let query = `
    {
        pirateStatsDatas(
        first: 1
        orderBy: intervalStartAt
        orderDirection: desc
        where: {intervalType: DAILY, nft_: {tokenId: "${id}"}}
        ) {
        goldMinted
        questsStarted
        questsCompleted
        intervalStartAt
        intervalType
        nft {
            name
            tokenId
            attributes {
              name
              value
            }
        }
        }
    }
`

    try {
      const response = await axios.post(url, { query });
      all_data.push(response.data);
    } catch (error) {
      console.error('GraphQL request failed:', error.message);
      throw error;
    }
  }
  
  return all_data;
}

// Call the function with your query, URL, and headers
makeGraphQLRequest(url)
  .then(data => {
    console.log('GraphQL response:', JSON.stringify(data));
    // Handle the response data here
  })
  .catch(error => {
    // Handle errors here
  });
