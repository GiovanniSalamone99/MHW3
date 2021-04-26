const form = document.querySelector('#search_content');
form.addEventListener('submit', search)

function search(event)
{
	
	event.preventDefault();
  
	const content = document.querySelector('#cerca').value;
  
	if(content) {
	    const text = encodeURIComponent(content);
		console.log('Eseguo ricerca elementi riguardanti: ' + text);
  
		rest_url= 'https://www.scorebat.com/video-api/v1/';
		fetch(rest_url).then(onResponse).then(onJson);
        
	}
	else {
		alert("Inserisci il testo per cui effettuare la ricerca");
	}
}
function onResponse(response)
{
	console.log('Risposta ricevuta');
 	return response.json();
}

function onJson(json){
	const highlight = document.querySelector('.highlights');
	highlight.innerHTML='';
	const content = document.querySelector('#cerca').value;
	console.log('JSON ricevuto');
	console.log(json);
	let a=0;
	if (json.status == 400) {
		const errore = document.createElement("h1"); 
		const messaggio = document.createTextNode(json.detail); 
		errore.appendChild(messaggio); 
		library.appendChild(errore);
		return
	  }
	for(let i=0;i<json.length;i++)
	{
		if(json[i].title.toLowerCase().includes(content.toLowerCase()))
	  	{
			const contenuto=document.createElement("div");
			const title=document.createElement("h1");
			title.textContent=json[i].title;
			const img=document.createElement("img");
			img.src=json[i].thumbnail;
			const url=document.createElement("a");
			url.href=json[i].url;
			url.target="_blank";
			url.textContent="Clicca qui";
			contenuto.appendChild(title);
			contenuto.appendChild(img);
			contenuto.appendChild(url);
			highlight.appendChild(contenuto);
			a=1;
			document.getElementById("risultato").classList.add("hidden");
		}
	}
	if(!a)
	  {
		document.getElementById("risultato").classList.remove("hidden");
	  }
}