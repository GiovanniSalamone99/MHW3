
caricaContenuti();
let x=0;
document.getElementById("cerca").addEventListener("keyup", cerca);

function caricaContenuti()
{
    for(let i in content)
    {
        const leghe= document.querySelector(".leghe");
        const contenuto=document.createElement("div");
        const pref=document.createElement("span");
        const stella=document.createElement("img");
        stella.src="img/stella_grigia.png";
        const titolo=document.createElement("h1");
        titolo.textContent=content[i].title;
        const img=document.createElement("img");
        img.src=content[i].img;
        const desc=document.createElement("p");
        desc.textContent="Dettagli";
        leghe.appendChild(contenuto);
        pref.appendChild(stella);
        contenuto.appendChild(pref);
        contenuto.appendChild(titolo);
        contenuto.appendChild(img);
        contenuto.appendChild(desc);
        contenuto.dataset.titoloId=i;
        pref.addEventListener("click", addPref);
        desc.addEventListener("click", aggiornaDesc);
        pref.classList.add("pointer");
        desc.classList.add("pointer");
    }
}

function addPref(event){
    for(let i in content)
    {
        if(i==event.currentTarget.parentNode.dataset.titoloId)
        {
            x++;
            const pref= document.querySelector(".preferiti");
            pref.parentNode.classList.remove("hidden");
            const span=document.createElement("span");
            const elimina=document.createElement("img");
            elimina.src="img/uncheck.jpg"
            const contenuto=document.createElement("div");
            const titolo=document.createElement("h1");
            titolo.textContent=content[i].title;
            const img=document.createElement("img");
            img.src=content[i].img;
            pref.appendChild(contenuto);
            span.appendChild(elimina);
            contenuto.appendChild(span);
            contenuto.appendChild(titolo);
            contenuto.appendChild(img);
            contenuto.dataset.prefId=i;
            event.currentTarget.removeEventListener("click", addPref);
            event.currentTarget.firstChild.src="img/preferiti.png";
            event.currentTarget.classList.remove("pointer");
            elimina.addEventListener("click", eliminaPref);
            elimina.classList.add("pointer");
        }
    }
}

function eliminaPref(event){
    event.currentTarget.removeEventListener("click", eliminaPref);
    event.currentTarget.parentNode.parentNode.remove();
    const id=document.querySelectorAll(".leghe div");
    for(let i of id)
    {
        
        if(i.dataset.titoloId==event.currentTarget.parentNode.parentNode.dataset.prefId)
        {
            x--;
            i.firstChild.firstChild.src="img/stella_grigia.png";
            i.firstChild.addEventListener("click", addPref);
            i.firstChild.classList.add("pointer");
            if(x==0)
            {
                const pref= document.querySelector(".preferiti");
                pref.parentNode.classList.add("hidden");
            }
        }
    }
    
}

function aggiornaDesc(event){
    event.currentTarget.textContent=content[event.currentTarget.parentNode.dataset.titoloId].desc;
    event.currentTarget.classList.remove("pointer");
    const meno=document.createElement("p");
    meno.classList.add("pointer");
    meno.textContent="Mostra meno";
    event.currentTarget.parentNode.appendChild(meno);
    event.currentTarget.removeEventListener("click", aggiornaDesc);
    meno.addEventListener("click", dettagli);
}

function dettagli(event){
    event.currentTarget.previousSibling.textContent="Dettagli";
    event.currentTarget.removeEventListener("click", dettagli);
    event.currentTarget.previousSibling.addEventListener("click", aggiornaDesc);
    event.currentTarget.previousSibling.classList.add("pointer");
    event.currentTarget.remove();
}

function cerca(){
    let valore = document.getElementById("cerca").value;
    const id=document.querySelectorAll(".leghe div");
    let a=0;
    for(let i of id)
    {
        i.classList.add("hidden");
        if(i.dataset.titoloId.startsWith(valore))
        {
            i.classList.remove("hidden");

            a=1;
            document.getElementById("risultato").classList.add("hidden");
        }
    }
    if(a==0)
    {
        document.getElementById("risultato").classList.remove("hidden");
    }
}