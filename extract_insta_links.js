const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', reject);
  });
}

async function run() {
  try {
    const url = 'https://www.instagram.com/reel/DZ3ud5bp3SN/';
    console.log(`Fetching ${url}...`);
    const html = await fetchUrl(url);
    
    // Write full html to a file to search
    fs.writeFileSync('C:\\Users\\HP\\Desktop\\Venthra Solutions\\venthrasolutions-master\\insta_reel.html', html);
    console.log('Saved html to insta_reel.html');

    // Find any urls containing scontent or mp4
    const matches = html.match(/https:\/\/[^"'\s<>]*?(?:scontent|cdninstagram|mp4)[^"'\s<>]*?/gi) || [];
    console.log(`Found ${matches.length} matches.`);
    
    const unique = [...new Set(matches)];
    console.log(`Unique matches: ${unique.length}`);
    
    // Write unique links to a file
    fs.writeFileSync('C:\\Users\\HP\\Desktop\\Venthra Solutions\\venthrasolutions-master\\insta_links.txt', unique.join('\n'));
    console.log('Saved links to insta_links.txt');
  } catch (err) {
    console.error(err);
  }
}

run();
