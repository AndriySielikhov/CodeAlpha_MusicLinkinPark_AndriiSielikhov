document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    // Заборона стандартної поведінки посилання
    e.preventDefault();

    // Отримання ідентифікатора сторінки з атрибуту data-page
    const pageId = link.getAttribute('data-page');

    // Пошук цільової сторінки за ідентифікатором
    const targetPage = document.getElementById(pageId);

    // Якщо сторінка знайдена
    if (targetPage) {
      // Видалення класу active у всіх сторінок
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });

      // Додавання класу active до цільової сторінки
      targetPage.classList.add('active');
    }
  });
  
});


const playlistCovers = document.querySelectorAll('.playlist-cover');
const playlistTitle = document.getElementById('playlist-title');
const playlistInfo = document.getElementById('playlist-info');
const openPlaylistButton = document.getElementById('open-playlist');
const playlistModal = document.getElementById('playlist-modal');
const closeModalButton = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTrackList = document.getElementById('modal-track-list');

// Дані про плейлісти
const playlists = [
  {
    id: "playlist1",
    title: "Hybrid Theory",
    description: "The iconic debut album by Linkin Park, featuring nu-metal hits like In the End and Crawling",
    images: [
      "./image/play1-1.jpg"
    ],
    tracks: [
      { name: "In the End-", artist: "Linkin Park", image: "./image/playlist1/play1.jpg" },
      { name: "Crawling-", artist: "Linkin Park", image: "./image/playlist1/play1.jpg" },
      { name: "Papercut-", artist: "Linkin Park", image: "./image/playlist1/play1.jpg" }
    ]
  },
  {
    id: "playlist2",
    title: "Meteora",
    description: "A powerful follow-up album with emotional and energetic tracks like Numb and Breaking the Habit",
    images: [
      "./image/play2-2.jpg"
    ],
    tracks: [
      { name: "Numb-", artist: "Linkin Park", image: "./image/playlist2/play2.jpg" },
      { name: "Faint-", artist: "Linkin Park", image: "./image/playlist2/play2.jpg" },
      { name: "Breaking the Habit-", artist: "Linkin Park", image: "./image/playlist2/play2.jpg" }
    ]
  },
  {
    id: "playlist3",
    title: "Minutes to Midnight",
    description: "A more experimental album blending rock and alternative sounds, including What I've Done and Shadow of the Day",
    images: [
      "./image/play3-3.jpg"
    ],
    tracks: [
      { name: "What I've Done-", artist: "Linkin Park", image: "./image/playlist3/play3.jpg" },
      { name: "Bleed It Out-", artist: "Linkin Park", image: "./image/playlist3/play3.jpg" },
      { name: "Shadow of the Day-", artist: "Linkin Park", image: "./image/playlist3/play3.jpg" }
    ]
  }
];

// Початковий стан
let currentIndex = 1;

// Оновлення відображення
function updateCarousel() {
  playlistCovers.forEach((cover, index) => {
    cover.classList.remove('left', 'center', 'right');
    if (index === currentIndex) {
      cover.classList.add('center');
    } else if (index === (currentIndex + 2) % 3) {
      cover.classList.add('left');
    } else {
      cover.classList.add('right');
    }
  });

  // Оновлення опису та кнопки
  const currentPlaylist = playlists[currentIndex];
  playlistTitle.textContent = currentPlaylist.title;
  playlistInfo.textContent = currentPlaylist.description;
  openPlaylistButton.setAttribute('data-playlist-id', currentPlaylist.id);
}

// Відкриття модального вікна
openPlaylistButton.addEventListener('click', () => {
  const playlistId = openPlaylistButton.getAttribute('data-playlist-id');
  const selectedPlaylist = playlists.find(playlist => playlist.id === playlistId);

  if (selectedPlaylist) {
    modalTitle.textContent = selectedPlaylist.title;
    modalDescription.textContent = selectedPlaylist.description;

    // Оновлення фотографій
    const playlistImages = document.querySelector('.playlist-images');
    playlistImages.innerHTML = selectedPlaylist.images.map(image => `
      <img src="${image}" alt="Фото плейліста">
    `).join('');

    // Оновлення списку треків
    modalTrackList.innerHTML = selectedPlaylist.tracks.map(track => `
      <li>
        <img src="${track.image}" alt="${track.name}">
        <div>
          <strong>${track.name}</strong>
          <span>${track.artist}</span>
        </div>
      </li>
    `).join('');

    // Показати модальне вікно
    playlistModal.classList.remove('hidden');
    playlistModal.classList.add('visible');
  }
});

// Закриття модального вікна
closeModalButton.addEventListener('click', () => {
  playlistModal.classList.remove('visible');
  playlistModal.classList.add('hidden');
});

// Обробник кліків на обкладинки
playlistCovers.forEach((cover, index) => {
  cover.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

// Ініціалізація
updateCarousel();




modalTrackList.addEventListener('click', (event) => {
  const li = event.target.closest('li');
  if (li) {
    const index = Array.from(modalTrackList.children).indexOf(li);
    const playlistId = openPlaylistButton.getAttribute('data-playlist-id');

    // Переходимо на сторінку плеєра
    window.location.href = `player.html?playlistId=${playlistId}&trackIndex=${index}`;
  }
});




// Збереження активної сторінки
localStorage.setItem('activePage', pageId);

// Відновлення активної сторінки при завантаженні
window.addEventListener('load', () => {
  const activePage = localStorage.getItem('activePage');
  if (activePage) {
    document.getElementById(activePage)?.classList.add('active');
  }
});
