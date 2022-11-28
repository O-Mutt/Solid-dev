
async function first() {
  counter = 0;
  counter++;
  console.log(counter);
}

async function second() {
  counter = 0;
  for (let i = 0; i < 10000; i++) {
    counter++;
    console.log(counter);
    await delay(1000);
  }
}

async function third() {
  counter = 0;
  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < 3; j++) {
      counter++;
      console.log(counter);
      await delay(100);
    }
  }
}

async function fourth() {
  counter = 0;
  const user = [
    { name: 'matt'},
    { name: 'matt'},
    { name: 'matt'},
    { name: 'matt'},
    { name: 'matt'},
    { name: 'matt'}
  ]
  for (let i = 0; i < 10000; i++) {
    user.map(async (u) => {
      await google.oauth.getId(u);
    });
  }
}

function delay(ms) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

fourth();