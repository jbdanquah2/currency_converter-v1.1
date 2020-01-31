if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(wkd => {
            
            console.log('Registered');
        }).catch(err => {
            console.log('failed to register');
        });
    });
}


function convert() {
    //    console.log("here")
    const amount = document.getElementById("amount").value;
    const currencyFrom = document.getElementById("currency").value;
    const currencyTo = document.getElementById("current").value;

    const msg = document.getElementById("msg");
   const s1 = document.getElementById("s1").selected;
   const s2 = document.getElementById("s2").selected;

    if (amount <= 0) {

        msg.innerHTML = `Please enter valid amount`;
        document.getElementById("answer").value = `0.00`;
   } else if ((s1 == true) || (s2 == true)) {

        msg.innerHTML = `<small>Please select currency</small>`;
        document.getElementById("answer").value = `0.00`;
    } else {
       msg.innerHTML = `<small>Convert your currency now!</small>`;
       GetAsync(amount, currencyFrom, currencyTo, callback);

   }
}

function callback(data, amount, query) {
    const currencyTo = document.getElementById("current").value;
    const rate = data[query].toFixed(5);
    const total = amount * rate;
    document.getElementById("rate").innerHTML = `@<strong id="rColor">${rate}</strong>`;
    document.getElementById("answer").value = `${currencyTo} ${total}`;
}


function GetAsync(amount, currencyFrom, currencyTo, callback) {
    const query = `${currencyFrom}_${currencyTo}`;
    const url = `https://free.currencyconverterapi.com/api/v4/convert?q=${query}&compact=ultra`;
	
	fetch(url).then(
	response => {
		if(response.status == 200){
			console.log('response', response);
			response.json().then(data => {
				console.log('data', data);
				callback(data, amount, query);
			}).catch(ex => {
                toast();
                document.getElementById("answer").value = `?`;
                document.getElementById("rate").innerHTML = `@<strong id="rColor">?</strong>`;
            });
		}
	}).catch(err => {
		console.log(err);
       
	});
}
   
function toast() {
    var x = document.getElementById("toastbar");
    x.className = "show";
    setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
}

     

//var dbPromise = idb.open('c-convertor', 1, (upgradeDb) => {
//    var keyValStore = upgradeDb.createObjectStore('exchange-rates');
//  });
//  
//  
//  // set"
//  function setVal(key,val){
//   dbPromise.then((db) =>{
//    var tx = db.transaction('exchange-rates', 'readwrite');
//    var keyValStore = tx.objectStore('exchange-rates');
//    keyValStore.put(val, key);
//    return tx.complete;
//  });
//  }
