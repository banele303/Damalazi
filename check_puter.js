import https from 'https';

https.get('https://js.puter.com/v2/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/ai\.[a-zA-Z0-9_]+/g);
    const unique = [...new Set(matches)];
    console.log(unique);
  });
});
