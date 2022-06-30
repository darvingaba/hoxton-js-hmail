import './style.css'

type Email = {
  from: string;
  header: string;
  content: string;
  emailAddress: string;
  img: string;
  read: boolean;
}

type State = {
  emails: Email[];
  filter: string;
};

const state: State = {
  emails: [
    {
      from: 'Nico',
      header: "Link to today's video and slides is up!",
      content:
        'Link is up and you know where to find it! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'nico@email.com',
      img: 'assets/nico.JPG',
      read: false
    },
    {
      from: 'Ed',
      header:
        "Congratulations! You have received a free beaver! Your name will now be displayed in the classroom's beaver list!",
      content:
        'Beaver beaver beaver beaver beaver beaver beaver beaver ! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'ed@email.com',
      img: 'assets/ed.JPG',
      read: false
    },
    {
      from: 'Government',
      header: 'Time to pay your tax!',
      content:
        'Pay us now! Pay us now! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'government@email.com',
      img: 'assets/gov.jpg',
      read: false
    }
    
    // feel free to add more emails here
  ],
  filter:''
}

function getFilteredEmails() {
  return state.emails.filter(
    (email) =>
      email.content.toLowerCase().includes(state.filter.toLowerCase()) ||
      email.from.toLowerCase().includes(state.filter.toLowerCase())
  );
}

function createEmail(item: Email){
  // <ul class="emails-list">
    let ulEl:HTMLUListElement = document.createElement('ul');
    ulEl.className='emails-list';

    ulEl.addEventListener('click', () => {
      mainEl.textContent = '';
      item.read = true;
      textContent(item);
    })

    let liEl = document.createElement('li');
    liEl.className='emails-list__item';
    let spanEl = document.createElement('span');
    spanEl.className='emails-list__item__read-icon material-symbols-outlined';
    spanEl.textContent='mark_email_unread';
  
    let imgEl = document.createElement('img');
    imgEl.className='emails-list__item__image';
    imgEl.src= item.img;

    let pEl = document.createElement('p');
    pEl.className='emails-list__item__from';
    pEl.textContent= item.from;

    let p2El = document.createElement('p');
    p2El.className='emails-list__item__content';
    p2El.textContent= item.content;

    liEl.append(spanEl, imgEl, pEl, p2El);
    ulEl.append(liEl);

    let mainEl:HTMLDivElement = document.querySelector('main');
    mainEl.append(ulEl);
    if(item.read===true){
      liEl.remove();
      readEmails(item);
    }
}

function textContent(item: Email){
    let mainEl :HTMLDivElement = document.querySelector('main');

    let sectionEl = document.createElement('section');
    sectionEl.className='single-email';

    let buttonEl = document.createElement('button');
    buttonEl.className='single-email__button';
    buttonEl.textContent='⬅Back';
    buttonEl.addEventListener('click', () => {
      mainEl.textContent = '';
      render();
    })

    let divEl = document.createElement('div');

    let imgEl = document.createElement('img');
    imgEl.className='single-email__image';
    imgEl.src= item.img;

    let spanEl = document.createElement('span');
    spanEl.className='single-email__sender';
    spanEl.textContent= item.from + ' (' + item.emailAddress + ')';

    let h1El = document.createElement('h1');
    h1El.className='single-email__header';
    h1El.textContent= item.header;

    let pTag = document.createElement('p');
    pTag.className='single-email__content';
    pTag.textContent= item.content;

    divEl.append(imgEl, spanEl);

    sectionEl.append(buttonEl, divEl, h1El, pTag);
    mainEl.append(sectionEl);
}


function readEmails(item: Email){
    // <li class="emails-list__item read">
    let liEl:HTMLLIElement = document.createElement('li');
    liEl.className='emails-list__item read';
    let spanEl = document.createElement('span');
    spanEl.className='emails-list__item__read-icon material-symbols-outlined';
    spanEl.textContent='mark_email_read';

    //   <span class="emails-list__item__read-icon material-symbols-outlined">
    //     mark_email_read
    //   </span>
    //   <img class="emails-list__item__image" src="assets/nico.JPG" />
    let imgEl = document.createElement('img');
    imgEl.className='emails-list__item__image';
    imgEl.src= item.img;
    //   <p class="emails-list__item__from">Nico</p>
    let pEl = document.createElement('p');
    pEl.className='emails-list__item__from';
    pEl.textContent= item.from;
    //   <p class="emails-list__item__content">
    let p2El = document.createElement('p');
    p2El.className='emails-list__item__content';
    p2El.textContent= item.content;
    //     Link to today's video and slides is up!
    //   </p>
    // </li>;
    liEl.append(spanEl, imgEl, pEl, p2El);
    let ulEl = document.querySelector(".emails-list");
    if(ulEl===null)return;
    ulEl.append(liEl);
}

function filteredEmails() {
    let inputEl = document.querySelector<HTMLInputElement>(".filter-input");
    if (!inputEl) return;
    inputEl.addEventListener("keydown", function (event) {
        if (inputEl === null) return;
        if (event.key !== "Enter") return;
        state.filter = inputEl.value;
    })
    
    let filteredEmail = getFilteredEmails();
    
    if (inputEl.value.length > 0) {
        return filteredEmail.map((item) => createEmail(item));
    }
    let mainEl = document.querySelector<HTMLDivElement>('main');

    let titlesEl = document.createElement('h1');
    titlesEl.className='titles';
    titlesEl.textContent='Emails';

    let emailsList = document.createElement("ul");
    emailsList.className = "emails-list";
    
    
    mainEl.append(titlesEl, emailsList);
    
}


function render(){
  for(let email of state.emails){
    createEmail(email);
  }

}
filteredEmails();
render();


