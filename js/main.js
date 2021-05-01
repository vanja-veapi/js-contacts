var id = 1; // Initalize id for contacts
$(document).ready(function(){

    const menuBtn = document.querySelector(".menu"); // Fetch hamburger menu
    let menuOpen = false; // inital it's false

    const nav = document.querySelector("#nav"); // ul > li
    let container = document.querySelector(".container"); //container tag da bih mogao da ga blurujem;

    let makeContactId = document.querySelector("#make-contact"); // Form div
    makeContactId.style.filter = "blur(5px)";

    
    menuBtn.addEventListener("click", function(){
        if(!menuOpen)
        {
            menuBtn.classList.add("open");
            menuOpen = true;

            nav.classList.remove("d-none");
            nav.classList.add("fade-in");

            container.style.filter = "blur(5px)";
            makeContactId.style.filter = "blur(5px)";
        }
        else
        {
            menuBtn.classList.remove("open");
            menuOpen = false;
            
            nav.classList.remove("fade-in");
            nav.classList.add("d-none");

            container.style.filter = "blur(0px)";
            makeContactId.style.filter = "blur(0px)";
        }
    });


    let list = document.querySelector("#list"); // Kontakt lista

    //1. LI TAG
    let contactList = document.querySelector("#contacts");
    

    contactList.addEventListener("click", function(){
        list.classList.remove("d-none");

        setTimeout(function(){
            container.style.right = "0%";
            makeContactId.style.bottom = "1000px";
        }, 30);
        
        
        
        setTimeout(function()
        { 
            menuBtn.classList.remove("open");
            menuOpen = false;
            
            nav.classList.remove("fade-in");
            nav.classList.add("d-none");
            
            container.style.filter = "blur(0px)";
            makeContactId.style.filter = "blur(5px)";
        }, 700);
    });

    //2 LI TAG 
    let addContact = document.querySelector("#add"); // Li element


    addContact.addEventListener("click", function(){
        container.style.right = "200%";

        makeContactId.style.bottom = "230px";
        makeContactId.style.left = "3%";
       
        setTimeout(function()
        {   
            menuBtn.classList.remove("open");
            menuOpen = false;
            
            nav.classList.remove("fade-in");
            nav.classList.add("d-none");
            
            container.style.filter = "blur(0px)";
            makeContactId.style.filter = "blur(0px)";
        }, 700);
        setTimeout(function(){
            list.classList.add("d-none");
        }, 2000);
    });



    //Contact list
    let saveContact = document.querySelector("#save-contact");
    let name, surname, mobilePhone;






    var vrednost = "asc";

    let contactIsEmpty = true;
    let notification = document.querySelector("#notification");
    
    let kontaktList = getItemFromLS("contactList");
    
    // console.log(kontaktList.products.length);
    if(kontaktList === null || kontaktList.products.length === 0)
    {
        notification.innerHTML = "The list is empty.";
        contactIsEmpty = false;
    }
    else
    {
        notification.innerHTML = "";
        sortiranje(vrednost, kontaktList.products);
        displayContactData(kontaktList.products);
    }
    // console.log(kontaktList.products[0].name);
    // displayContactData(kontaktList.products);



    
    name = document.querySelector("#name");
    surname = document.querySelector("#surname");
    mobilePhone = document.querySelector("#mobile-phone");

    saveContact.addEventListener("click", function(){
        // alert("Uspesno ste uneli novi kontakt");
        notification.parentElement.remove();
        const person = makeContact(name.value, surname.value, mobilePhone.value);
        if (person) {
            // 1. opcija
            // kontaktList.products.push(person);
            // setItemToLS('contactList', kontaktList);

            // 2. varijanta
            // addToContact(person.name, person.surname, person.mobilePhone);

            const contacts = getItemFromLS('contactList');
            console.log(contacts)
            sortiranje(sort.value, contacts.products);
            sortChanges(contacts.products);
            // displayContactData(contacts.products);
        }
        btnRemoveRefresh();
    });

    //Sort and filter
    let sort = document.querySelector("#sort");
    console.log(vrednost);
    sort.addEventListener("change", function(){
        const contacts = getItemFromLS('contactList');

        let vrednost = this.value.toLowerCase();
        sortiranje(vrednost, contacts.products);
        sortChanges(contacts.products);
        
        btnRemoveRefresh();
    });

    let filter = document.querySelector("#filter");
    filter.addEventListener("input", function(){
        const contacts = getItemFromLS('contactList');

        let vrednost = this.value.toLowerCase();
        let filtered = contacts.products.filter(e => e.name.toLowerCase().includes(vrednost));
        
        sortChanges(filtered);

        btnRemoveRefresh();
    });

    //Contact remove
    btnRemoveRefresh();

    
});
function btnRemoveRefresh()
{
    let btnRemove = document.querySelectorAll(".btnRemove");
    btnRemove.forEach(btn => {
        btn.addEventListener("click", function()
        {
            const id = Number($(this).attr('data-id'));
            console.log(id);

            btn.parentElement.parentElement.remove();
            removeContact(id);
        });
    });
}
function sortiranje(vrednost, podatak)
{
    switch(vrednost)
    {
        case "asc":
            podatak.sort((a, b) => {
                if(a.name < b.name)
                {
                    return -1;
                }
                else if(a.name > b.name)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            });
            break;
        case "desc":
            podatak.sort((a, b) => {
                if(a.name > b.name)
                {
                    return -1;
                }
                else if(a.name < b.name)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            });
            break;
        default:
            console.log("greska");
    }
}
function makeContact(ime, prezime, telefon)
{
    let brojGresaka = 0;
    let errAll = document.querySelector("#errAll");

    let name = document.querySelector("#name");
    let surname = document.querySelector("#surname");
    let mobilePhone = document.querySelector("#mobile-phone");

    let nameSurnameRegEx = /^[A-ZŠĐČĆŽa-zšđčć]{2,20}$/;
    let mobRegEx = /^[\d]{9,11}$/;

    if(ime === "" && prezime === "" && telefon === "")
    {
        errAll.classList.remove("invisible");

        name.style.border = "1px solid #ff0000";
        surname.style.border = "1px solid #ff0000";
        mobilePhone.style.border = "1px solid #ff0000";

        console.log("Sva polja su obavezna");
        brojGresaka++;
    }
    else
    {
        errAll.classList.add("visibile");
        
        name.style.border = "none";
        surname.style.border = "none";
        mobilePhone.style.border = "none";
    }
    
    if(ime === "")
    {
        name.style.border = "1px solid #ff0000";

        console.log("Polje ime ne moze biti prazno");
        brojGresaka++;
    }
    else
    {
        if(!nameSurnameRegEx.test(ime)) //per@
        {
            name.style.border = "1px solid #ff0000";
            brojGresaka++;
            console.log("GRESKA IME")   
        }
        else
        {
            name.style.border = "none";
        }
    }

    if(prezime === "")
    {
        surname.style.border = "1px solid #ff0000";

        console.log("Prezime ne moze biti prazno");
        brojGresaka++;
    }
    else
    {
        if(!nameSurnameRegEx.test(prezime))
        {
            surname.style.border = "1px solid #ff0000";
            brojGresaka++;     
            console.log("GRESKA IPREME")    
        }
        else
        {
            surname.style.border = "none";
        }
    }

    if(telefon === "")
    {
        mobilePhone.style.border = "1px solid #ff0000";

        console.log("Polje telefon ne moze biti prazno");
        brojGresaka++;
    }
    else
    {
        if(!mobRegEx.test(telefon))
        {
            mobilePhone.style.border = "1px solid #ff0000";
            brojGresaka++;
            console.log("GRESKA TEL") 
        }
        else
        {
            mobilePhone.style = "none";
        }
    }

    
    console.log(brojGresaka);
    if(brojGresaka === 0)
    {
        let person = [
            {
                id: id,
                name: ime,
                surname: prezime,
                mobilePhone: telefon
            }
        ];
        id += 1;

        alert("Uspesno ste uneli novi kontakt");
        addToContact(ime, prezime, telefon);
        return person;
        // output(person);
    }
    else
    {
        console.log("Postoje greske");
    }
}

function output(data)
{
    let myContacts = document.querySelector("#my-contacts");
    let print = "";

    for(let i = 0; i < data.length; i++)
    {
        print += makePerson(data[i]);
    //     print += $("#my-contacts").append(`<tr data-id='${data[i].id}'><td>${data[i].name}</td><td>${data[i].surname}</td><td>${data[i].mobilePhone}</td><td>
    //     <input type="button" class="btnRemove btn btn-danger" data-id='${data[i].id}' value="Remove contact"/>
    // </td></tr>`)
    }
    myContacts.innerHTML += print;
}
function sortChanges(data)
{

    let myContacts = document.querySelector("#my-contacts");
    let print = `<tr>
    <th>Name</th>
    <th>Surname</th>
    <th>Mobile</th>
    <th>Delete contact</th></tr>`;

    for(let i = 0; i < data.length; i++)
    {
        print += makePerson(data[i]);
    }
    myContacts.innerHTML = print;
}
function makePerson(person)
{
    return `<tr data-id='${person.id}'>
    <td>${person.name}</td>
    <td>${person.surname}</td>
    <td>${person.mobilePhone}</td>
    <td>
        <input type="button" class="btnRemove btn btn-danger" data-id='${person.id}' value="Remove contact"/>
    </td>
</tr>`;
}
function removeContact(paramId)
{
    var contactList = getItemFromLS("contactList");

    console.log(contactList.products)
    
    let filtriranje = contactList.products.filter(e => e.id != paramId);
    contactList.products = filtriranje;

    //AKO SE u nasem nizu objekta nadje vrednost u promenljivoj proba (=== true) onda splice(0,1)

    console.log(contactList.products);
    setItemToLS("contactList", contactList);
}
function addToContact(ime, prezime, mobilniTelefon)
{
    var maxNumber
    var contactList = getItemFromLS("contactList");
    // Ako ne postoji, napravi novu porudžbinu
    if(!contactList)
    {
        contactList = {
            products: []
        }
    }

    for(let i = 0; i < contactList.products.length; i++)
    {
        maxNumber = Math.max(contactList.products[i].id);
    }
    // console.log(maxNumber);

    if(contactList.products.length === 0)
    {
        contactList.products.push({
            id: 0,
            name: ime,
            surname: prezime,
            mobilePhone: mobilniTelefon
        });
    }
    else
    {
        contactList.products.push({
            id: maxNumber + 1,   //  contactList.products.length,
            name: ime,
            surname: prezime,
            mobilePhone: mobilniTelefon
        });   
    }
    //Pretpostavljam da ce biti problem prilikom brisanja. Konkretno mislim da ce da se gaze podaci..
   
    let maxId = Math.max(contactList.products.id);
    // Ako artikal ne postoji, napravi novi

    // Snimi izmenjenu porudžbinu u local storage
    setItemToLS("contactList", contactList);


}
function setItemToLS(string, variable)
{
    localStorage.setItem(string, JSON.stringify(variable));
}
function getItemFromLS(string)
{
    return JSON.parse(localStorage.getItem(string));
}
function displayContactData(contacts)
{
    const zaIspis = [];
    let contactList = getItemFromLS("contactList");

    for(contact of contacts)
    {
        if(contactList === null)
        {
            break;
        }
        const prod = contactList.products.find(el => contact.id === el.id);
        if (prod) {
                zaIspis.push({...contact, ...prod});
            }
    }
    // console.log(zaIspis);
    output(zaIspis);
}