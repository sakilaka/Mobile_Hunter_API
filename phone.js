const loadPhones = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data =await res.json();
    displayPhones(data.data , dataLimit);
}

const displayPhones  = (phones , dataLimit) =>{
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = ``;
    // display e fixed number phone 

    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0,10);
      showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }


   

    // display no phone found

    const noFound = document.getElementById('no-found')
    if(phones.length === 0){
      noFound.classList.remove('d-none')
    }
    else{
      noFound.classList.add('d-none')
    }


    // display all phone found

    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneDiv)
    })
    toggleSpinner(false);

   
}

const processSearch = (dataLimit) =>{
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText , dataLimit) 
}

document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(10);
})

document.getElementById('search-field').addEventListener('keydown',function(event){
if(event.key === "Enter")
    processSearch(10);    
})

const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none')
  }
}

document.getElementById('btn-showAll').addEventListener('click',function(){
  processSearch();
})

const loadPhoneDetails = async id =>{
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res =await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
   const phoneTitle = document.getElementById('phoneDetailModalLabel');
   phoneTitle.innerText = phone.name;
   const phoneDetails = document.getElementById('phone-details');
   phoneDetails.innerHTML = `
     <h5>Release Date : ${phone.releaseDate ? phone.releaseDate: 'no releseDate' }</h5>
     <h5>others : ${phone.others ? phone.others.Bluetooth: 'no BlueTooth' }</h5>
     <h5>storage : ${phone.mainFeatures
      ? phone.mainFeatures
      .storage: 'no Storage' }</h5>
   `
}

loadPhones('oppo');
