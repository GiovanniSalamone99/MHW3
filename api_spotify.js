const client_id="5655844afff64a87ac7fe9d47e630a1c";
const cliente_secret="9c67cb2f40f84d838750634be165e4d6";
let token;
const podcast_value="fantacalcio grand hotel";

fetch("https://accounts.spotify.com/api/token",
{
    method:"post",
    body:'grant_type=client_credentials',
    headers:
    {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + cliente_secret)
    }

}
).then(onTokenResponse).then(onTokenJson);

function pod()
{
    fetch("https://api.spotify.com/v1/search?q="+podcast_value+"&type=episode&limit=40&offset=0&market=IT"  ,
        {
            headers:
            {
                'Authorization': 'Bearer ' + token,
                'Accept': "application/json"
            }
        }
    ).then(onResponse).then(onJson);
}

function onTokenResponse(response)
{
    console.log('Risposta ricevuta');
 	return response.json();
}

function onTokenJson(json)
{
    console.log('token preso');
    token = json.access_token;
    pod();
    console.log(json);
}

function onResponse(response)
{
    console.log('Risposta ricevuta');
 	return response.json();
}

function onJson(json)
{
    console.log(json);
    for(let i=0;i<json.episodes.total;i++)
    {
    const pod=document.querySelector(".podcast")
    const titolo=document.createElement("h1");
    titolo.textContent=json.episodes.items[i].name;
    const div=document.createElement("div");
    const link=document.createElement("a");
    const img=document.createElement("img");
    img.src=json.episodes.items[i].images[1].url;
    link.href=json.episodes.items[i].external_urls.spotify;
    link.target="_blank";
    const desc=document.createElement("p");
    desc.textContent=json.episodes.items[i].description;
    link.appendChild(img)
    div.appendChild(link)
    div.appendChild(desc);
    pod.appendChild(titolo);
    pod.appendChild(div);
    }
}