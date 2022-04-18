async function getUsers() {
  return await fetch("../data.json").then((response) => response.json());
}

const createComment = (commentary) => {
  const isReply = commentary.replyingTo ? "reply" : false;
  return (
    `<div class="comment-container ` +
    isReply +
    `">` +
    (isReply ? `<div class="reply-line"></div>` : ``) +
    `
  <div class="comment-vote">
    <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
  </svg></i></button>
    <h4 class="comment-score">` +
    commentary.score +
    `</h4>
    <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
  </svg></button>
  </div>
  <div class="comment-section">
    <div class="comment-header">
      <div class="user-info">
      <img src=` +
    commentary.user.image.png +
    `>
            <h4 class="username">` +
    commentary.user.username +
    `</h4>
          <h4>` +
    commentary.createdAt +
    `</h4>
      </div>
      <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16">
      <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
    </svg>Reply</button>
    </div>
            <div class="commentary ">
              <h4>` +
    commentary.content +
    `</h4>
    </div>

  </div>
</div>
`
  );
};
const createAddCommentSection = (currentUser) => {
  return (
    `
  <div class="comment-container add-comment"> 
    <img src=` +
    currentUser.image.png +
    `>
    <textarea type="text" maxlength="300" placeholder="Add a comment..."></textarea>
    <button>SEND</button>
  </div>
  `
  );
};

const createCommentSection = () => {
  const feed = document.querySelector("#feed");

  getUsers().then((jsonValue) => {
    const comments = jsonValue.comments;
    const currentUser = jsonValue.currentUser;
    comments.forEach((commentary) => {
      const replies = commentary.replies;
      feed.innerHTML += createComment(commentary);
      replies.forEach((reply) => {
        feed.innerHTML += createComment(reply);
      });
    });
    feed.innerHTML += createAddCommentSection(currentUser);
  });
};

createCommentSection();
