// The endpoints you may need are:

// GET /travelers/1
// PATCH /travelers/1
// GET /animalSightings
// POST /animalSightings
// PATCH /animalSightings/:id
// DELETE /animalSightings/:id
const animalSightingsContainer = document.querySelector('ul#animals')
const newAnimalForm = document.querySelector('#new-animal-sighting-form')

//Deliverable 1: Show traveler info upon page load
// When the page loads, the information about the traveler should display including their name, image, nickname, and number of likes.

fetch('http://localhost:3000/travelers/1')
.then(resp => resp.json())
.then(data => renderAll(data))


function renderAll(data){

    const travelerName = document.querySelector('h2')
    const travelerNickname = document.querySelector('em')
    const likes = travelerNickname.nextElementSibling
    let photo = travelerName.previousElementSibling

    travelerName.textContent = data.name 
    travelerNickname.textContent = data.nickname 
    likes.textContent = data.likes //now showing likes after
    photo.src = data.photo

    const allAnimals = data.animalSightings.forEach(element => {
        const li = document.createElement('li')
        li.dataset.id = element.id 

        li.innerHTML = `
        <p>${element.description}</p>
        <img src='${element.photo}' alt='${element.description}'/>
        <a href='video url here' target='_blank'>Here's a video about the ${element.species} species!</a>
        <p class='likes-display'>${element.likes} Likes</p>
        <button class="like-button" type="button">Like</button>
        <button class="delete-button" type="button">Delete</button>
        <button class="toggle-update-form-button" type="button">Toggle Update Form</button>
        <form class="update-form" style="display: none;">
          <input type="text" value="${element.description}"/>
          <input type="submit" value="Update description">
          </form>`

          animalSightingsContainer.append(li)
    });

}

function renderOne(animalObj){
    const li = document.createElement('li')
    li.dataset.id = animalObj.id 
    li.innerHTML = `
    <p>${animalObj.description}</p>
    <img src='${animalObj.photo}' alt='${animalObj.description}'/>
    <a href='video url here' target='_blank'>Here's a video about the ${animalObj.species} species!</a>
    <p class='likes-display'>${animalObj.likes} Likes</p>
    <button class="like-button" type="button">Like</button>
    <button class="delete-button" type="button">Delete</button>
    <button class="toggle-update-form-button" type="button">Toggle Update Form</button>
    <form class="update-form" style="display: none;">
      <input type="text" value="${animalObj.description}"/>
      <input type="submit" value="Update description">
      </form>`

      animalSightingsContainer.append(li)
}

newAnimalForm.addEventListener('submit', event =>{
    event.preventDefault()

   

   const newAnimalObj = {
       travelerId: 1,
       species: event.target.species.value,
       video: event.target.video.value,
       photo: event.target.photo.value,
       description: event.target.description.value,
       likes: 0
   }

fetch('http://localhost:3000/animalSightings', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, 
      body: JSON.stringify(newAnimalObj)
      
    })
    .then(resp => resp.json())
    .then(data => renderOne(data))
    event.target.reset()
})


// Deliverable 4: Increase traveler likes
// When the user clicks on the traveler's like button, the new number of likes should display on the page without reloading the page. The new number of likes should persist (if the page reloads, the new number of likes should still display).

// trav like button
//new num likes
//no reload

const likeBtn = document.getElementsByClassName('like-button')
const profile = document.querySelector('div#profile')


profile.addEventListener('click', event => {
    event.preventDefault()
if (event.target.matches('.like-button')){
    const likes = event.target.previousElementSibling
    const newLikes = parseInt(likes.textContent) + 1
    likes.textContent = `${newLikes} Likes`

        fetch('http://localhost:3000/travelers/1', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify({ likes: newLikes })
            
        })  
        
        // .then(resp => resp.json())
        // .then(travLikes => {
            
        // not ness for PATCH
    }
})

animalSightingsContainer.addEventListener('click', event => {
    event.preventDefault()
if (event.target.matches('.like-button')){
    const likes = event.target.previousElementSibling
    const newLikes = parseInt(likes.textContent) + 1
    likes.textContent = `${newLikes} Likes`
    const id = likes.parentNode.dataset.id 

        fetch(`http://localhost:3000/animalSightings/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify({ likes: newLikes })
            
        })  
        
        // .then(resp => resp.json())
        // .then(travLikes => {
            
        // not ness for PATCH
    }
})

animalSightingsContainer.addEventListener('click', event => {
if (event.target.matches('.delete-button')){
    event.target.parentNode.remove()
    const id = event.target.parentNode.dataset.id 
    

        fetch(`http://localhost:3000/animalSightings/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            
        })  
        
        // .then(resp => resp.json())
        // .then(travLikes => {
            
        // not ness for PATCH
    } else if (event.target.matches('.toggle-update-form-button')){ 
        
        // let toggle = event.target.nextElementSibling.style.display
        // toggle === 'none' ? toggle = 'block' : toggle = 'none'
        if (event.target.nextElementSibling.style.display === 'none'){
            event.target.nextElementSibling.style.display = 'block'
        }else {event.target.nextElementSibling.style.display = 'none'}
    }
})
// console.log(animalSightingsContainer)
// animalSightingsContainer.addEventListener('submit', event => {
//     event.preventDefault()
//     if (event.target.matches('#animals > li:nth-child(1) > form')){
        
//     }
// })

animalSightingsContainer.addEventListener('submit',function(event){   
     
    if (event.target.matches('form')){
        event.preventDefault()
        console.log('clicked')
    }
})
