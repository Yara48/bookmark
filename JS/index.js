let bookmarks = [];

function submit() {
  var nameInput = document.getElementById('bookmarkName');
  var urlInput = document.getElementById('bookmarkURL');
  var errorBox = document.querySelector('.box-info');
  
 
  if (nameInput.value.length < 3 || !isValidUrl(urlInput.value)) {
    errorBox.classList.remove('d-none');
    return;
  } else {
    errorBox.classList.add('d-none');
  }
  
 
  var newBookmark = {
    name: nameInput.value,
    url: urlInput.value
  };
  
  bookmarks.push(newBookmark);
  

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
  displayBookmarks();
  

  nameInput.value = '';
  urlInput.value = '';
}


function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {

    var regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
    return regex.test(url);
  }
}

function displayBookmarks() {
  const tableContent = document.getElementById('tableContent');
  tableContent.innerHTML = '';
  
  bookmarks.forEach((bookmark, index) => {
    var row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${bookmark.name}</td>
      <td>
        <a href="${bookmark.url}" target="_blank" class="btn btn-visit">
          <i class="fa-solid fa-eye"></i> Visit
        </a>
      </td>
      <td>
        <button onclick="deleteBookmark(${index})" class="btn btn-delete">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </td>
    `;
    
    tableContent.appendChild(row);
  });
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}


document.getElementById('closeBtn').addEventListener('click', () => {
  document.querySelector('.box-info').classList.add('d-none');
});


window.addEventListener('DOMContentLoaded', () => {
  var savedBookmarks = localStorage.getItem('bookmarks');
  if (savedBookmarks) {
    bookmarks = JSON.parse(savedBookmarks);
    displayBookmarks();
  }
});

