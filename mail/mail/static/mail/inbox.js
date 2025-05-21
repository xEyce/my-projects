document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);


  document.querySelector("#compose-form").addEventListener("submit", send_email);
  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {
  
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#display-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function view_email(id) {
  // Show only the display-view
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#display-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
      // Print email
      console.log("display view")
      console.log(email);

      // Display the email view
      const sender = email.sender;
      const recipients = email.recipients;
      const subject = email.subject;
      const body = email.body;
      const timestamp = email.timestamp;

      document.querySelector("#display-view").innerHTML = `
        <ul class="list-group">
          <li class="list-group-item"><strong>From: </strong>${sender}</li>
          <li class="list-group-item"><strong>To: </strong>${recipients}</li>
          <li class="list-group-item"><strong>Subject: </strong>${subject}</li>
          <li class="list-group-item"><strong>Body: </strong></li>
          <li class="list-group-item">${body}
          <li class="list-group-item"><i><strong>${timestamp}</strong></i></li>
        </ul>
        
      `;

    // Change the email to read
    fetch(`/emails/${email.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })

    // Add Archive or Unarchive button  
    const archive_button = document.createElement('button');
    archive_button.className = "btn btn-sm btn-outline-primary";  
    archive_button.style.marginRight = "5px";
    archive_button.innerHTML = email.archived ? "Unarchive" : "Archive";
    document.querySelector("#display-view").append(archive_button)

    archive_button.addEventListener('click', function() {
      fetch(`/emails/${email.id}`, {
        method: 'PUT',
        body: JSON.stringify({  
            archived: !email.archived
        })
      })
      .then(() => load_mailbox('inbox'))
    });

    // Add Reply Button
    const reply_button = document.createElement('button');
    reply_button.className = "btn btn-sm btn-outline-primary";
    reply_button.innerHTML = "Reply";
    reply_button.addEventListener('click', function(){
      compose_email();

      document.querySelector('#compose-recipients').value = email.sender;
      if (email.subject.startsWith("Re: ")) {
        document.querySelector('#compose-subject').value = email.subject;
      } else {
        document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
      }
      document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;
    });
    document.querySelector("#display-view").append(reply_button);

  });

}


function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#display-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Print emails
      console.log(emails);  

      emails.forEach(email => {
        const entry = document.createElement('div');
        entry.classList.add('list-group-item');
        entry.innerHTML = `
          <p><strong><i>${email.sender}</i></strong> - ${email.subject}<span style="float: right;"><i>${email.timestamp}</</span> 
          </p>
  
        `;

      // Change background-color for 'read/unread' email
        entry.classList.add(`${email.read ? 'read' : 'unread'}`)
        
      // View Email when clicked
        entry.addEventListener('click', function() {
          view_email(email.id)
          console.log("This element has been clicked!")
        });
        document.querySelector("#emails-view").append(entry)

      });
});

}

function send_email(event) {
  event.preventDefault();

  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body,
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
  })
  .then(() => load_mailbox('sent'));

}