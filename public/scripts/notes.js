const notesList = document.getElementById('list-group');

// Handle when a user submits note
notesList
  .addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('in scripts/notes.js')
    // Get the note text from the DOM and assign it to a variable
    let noteTitle = document.getElementById('note-title').value;
    // Get the username text and add it to a variable
    let noteDetail = document.getElementById('note-detail').value.trim();

    // Create an object with the username and note
    const newnote = {
      noteTitle,
      noteDetail,
      noteType: 'Complaint',
    };
    console.log('made it here');
    // Fetch POST request to the server
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newnote),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.status);
        noteTitle = '';
        noteDetail = '';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
