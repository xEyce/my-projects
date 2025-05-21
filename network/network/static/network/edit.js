document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.onclick = function() {
            const postId = this.getAttribute('data-post-id');
            const contentView = document.querySelector(`#content-view-${postId}`);
            const editView = document.querySelector(`#edit-view-${postId}`);
            
            contentView.style.display = "none";
            editView.style.display = "block";
        };
    });

    document.querySelectorAll('.save-btn').forEach(button => {
        button.onclick = function() {
            const postId = this.getAttribute('data-post-id');
            const contentView = document.querySelector(`#content-view-${postId}`);
            const editView = document.querySelector(`#edit-view-${postId}`);
            const editContent = document.querySelector(`#edit-content-${postId}`).value;

            // Send AJAX request to update post in the backend
            fetch("/edit_post/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRFToken": getCSRFToken()  // Required for CSRF protection
                },
                body: `post_id=${postId}&content=${encodeURIComponent(editContent)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    contentView.textContent = editContent; // Update content in the DOM
                    contentView.style.display = "block";
                    editView.style.display = "none";
                } else {
                    alert(data.message);  // Display error message
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            });
        };
    });


    document.querySelectorAll('.like-btn').forEach(button => {
        button.onclick = function() {
            const postId = this.getAttribute('data-post-id');
            fetch(`/toggle_like/${postId}/`, {
                method: 'POST',
    
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update button text based on like status
                    this.textContent = data.is_liked ? "Unlike" : "Like";
                    // Update the like count
                    document.querySelector(`#like-count-${postId}`).textContent = data.like_count;
                } else {
                    alert("Error toggling like status.");
                }
            })
            .catch(error => console.error("Error:", error));
        };
    });
});

// Helper function to get CSRF token from cookies
function getCSRFToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === ('csrftoken=')) {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return cookieValue;
}
