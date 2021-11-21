const fetchApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const priceQuote = await response.json();
  return priceQuote;
};

export default fetchApi;
