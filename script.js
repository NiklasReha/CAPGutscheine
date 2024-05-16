var listencounter=0;
function enterWorker()
{
    if(document.getElementById("input_vorname_mitarbeiter").value.trim()==""||document.getElementById("input_nachname_mitarbeiter").value.trim()=="")
        {
            alert("Bitte fülle den Vornamen und Nachnamen komplett aus!");
            return;
        }
    listencounter++;
    var input_vorname=document.getElementById("input_vorname_mitarbeiter").value;
    var input_nachname=document.getElementById("input_nachname_mitarbeiter").value;
    var listitemwrapper=document.createElement('li');
    listitemwrapper.className=listencounter%2==1?'listenwrapper_gerade':'listenwrapper_ungerade';
    var obj_delete_Btn=document.createElement('button');
    obj_delete_Btn.textContent='Löschen';
    obj_delete_Btn.className='delete_eintrag';
    obj_delete_Btn.onclick=function(){delete_eintrag(this);};
    var obj_content_listenelement_vorname=document.createElement('p');
    obj_content_listenelement_vorname.textContent=input_vorname;
    obj_content_listenelement_vorname.className='listenelement_vorname';
    var obj_content_listenelement_nachname=document.createElement('p');
    obj_content_listenelement_nachname.textContent=input_nachname;
    obj_content_listenelement_nachname.className='listenelement_vorname';
    listitemwrapper.appendChild(obj_content_listenelement_vorname);
    listitemwrapper.appendChild(obj_content_listenelement_nachname);
    listitemwrapper.appendChild(obj_delete_Btn);
    document.getElementById("mitarbeiter_liste_daten").appendChild(listitemwrapper);
    document.getElementById("input_vorname_mitarbeiter").value="";
    document.getElementById("input_nachname_mitarbeiter").value="";
}
function delete_eintrag(ele){
    listencounter--;
    var parent=ele.parentElement;
    var einträge=parent.parentElement.children;
    document.getElementById("mitarbeiter_liste_daten").removeChild(parent);
    for(var i=0;i<einträge.length;i++) {
        einträge[i].className=i%2==1?'listenwrapper_gerade':'listenwrapper_ungerade';   
    }
}

function sende_daten()
{
    var data = new FormData();
    var name_capmarkt=document.getElementById("input_capmarkt_name");
    var plz_capmarkt=document.getElementById("input_strasse_hausnummer");
    var mitarbeiter_liste=document.getElementById("mitarbeiter_liste_daten");
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();
    const currentHour=currentDate.getHours();
    const currentMinutes=currentDate.getMinutes();
    const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear+"-"+currentHour+"_"+currentMinutes;
    if(name_capmarkt.value.trim()==""||plz_capmarkt.value.trim=="")
        {
            alert("Bitte trage die Daten des Marktes ein!");
            return;
        }
    if(plz_capmarkt.value.trim().length!=5 ||!/^\d+$/.test(plz_capmarkt.value.trim()))
        {
            alert("Die Postleitzahl scheint falsch zu sein. Bitte beachte das die Postleitzahl nur 5 Stellen lang sein darf und nur aus Zahlen bestehen darf.");
            return;
        }
    if(mitarbeiter_liste.children.length<=1)
        {
            alert("Bitte trage die Daten der Mitarbeiter ein!");
            return;
        }
    var content="";
    for(var i=1;i<mitarbeiter_liste.children.length;i++)
        {
            content+=mitarbeiter_liste.children[i].children[0].textContent.trim()+";"+mitarbeiter_liste.children[i].children[1].textContent.trim()+"\r\n";
        }
    data.append("data",content);
    data.append("name",(name_capmarkt.value+"_"+plz_capmarkt.value).replaceAll(".",'').replaceAll("\\","").replaceAll("/",""));
    console.log(name_capmarkt.value+"_"+plz_capmarkt.value);
    data.append("timestamp",dateString);
    console.log(dateString);
    var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
    xhr.open( 'post', 'https://capgutscheine.rehagmbh.de/upload.php', true );
    xhr.send(data);
    alert("Die Werte wurden erfolgreich eingetragen!");
    var liste=document.getElementById("mitarbeiter_liste_daten");
    console.log(liste.children);
    while(liste.firstChild)
        {
            liste.firstChild.remove();
        }
    name_capmarkt.value="";
    plz_capmarkt.value="";
    listencounter=0;
    var header=document.createElement("li");
    header.id="mitarbeiter_liste_daten_header";
    var vorname=document.createElement("p");
    vorname.textContent="Vorname";
    var nachname=document.createElement("p");
    nachname.textContent="Nachname";
    var loeschen=document.createElement("p");
    loeschen.textContent="Löschen";
    header.appendChild(vorname);
    header.appendChild(nachname);
    header.appendChild(loeschen);
    liste.appendChild(header);
}

