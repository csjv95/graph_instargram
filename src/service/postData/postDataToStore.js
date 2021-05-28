import { firebaseStore } from "../firebase";
import { firebaseAuth } from "../firebase";

const postDataToStore = (text, noComments, location, postId) => {
  const timestamp = Date.now();
  // const time = new Date(timestamp); 여기서 하면 firestore가 seconds변환시켜줘서 받아올때 해주기;
  const user = firebaseAuth.currentUser;
  const uid = user.uid;

  const postData = firebaseStore
    .collection("post")
    .doc(uid)
    .collection("my-post")
    .doc(postId);

  // 사진,텍스트,로케이션,댓글가능

  postData.set({
    postId,
    imgsData : [],
    text,
    noComments,
    location,
    timestamp,
    uid, 
  });
};

export default postDataToStore;
