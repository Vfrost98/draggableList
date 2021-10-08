const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const desserts = [
    "Creme Brulee (France)",
    "Mochi (Japan)",
    "Apple Pie (USA)",
    "Nanaimo Bar (Canada)",
    "Gulab Jamun (India)",
    "Pakhlava (Turkey)",
    "Kardinalschnitten (Austria)",
    "Dadar Gulung (Indonesia)",
    "Poffertjes (NetherLands)",
    "Kremes (Hungary)"
];

const listItems = []; //storing list items

let startIndex;

createList();

//add list items to DOM
function createList(){
    [...desserts]
    .map(a => ({value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((dish, index) => {
            console.log(dish);
            const listItem = document.createElement('li');
            
            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true"> 
                    <p class="dish-name">${dish}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);
            draggableList.appendChild(listItem);
        });

        addEventListeners();
}

function dragStart(){
    startIndex = +this.closest('li').getAttribute('data-index')
}

function dragEnter(){
    this.classList.add('over');
}

function dragLeave(){
    this.classList.remove('over');
}

function dragOver(e){
    e.preventDefault();
}

function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(startIndex, dragEndIndex);
    this.classList.remove('over');
}

//swapping list items for drag and drop
function swapItems(start, end){
    const itemOne = listItems[start].querySelector('.draggable');
    const itemTwo = listItems[end].querySelector('.draggable');

    listItems[start].appendChild(itemTwo);
    listItems[end].appendChild(itemOne);
}

//checking order of list items
function checkOrder(){
    listItems.forEach((listItem, index) => {
        const dishName = listItem.querySelector('.draggable').innerText.trim();
        
        if(dishName != desserts[index]){
            listItem.classList.add('wrong');
        }else{
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListeners(){
   const draggables = document.querySelectorAll('.draggable');
   const dragListItems = document.querySelectorAll('.draggable-list li');

   draggables.forEach(draggable => {
       draggable.addEventListener('dragstart', dragStart);
   })

   dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}


check.addEventListener('click', checkOrder);