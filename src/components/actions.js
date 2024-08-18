export const UPDATE_LIKES = 'UPDATE_LIKES'

export const LikesDislikes = (likes,dislikes) => ({
    type: UPDATE_LIKES,
    payload: {likes:likes,dislikes:dislikes}
  });
