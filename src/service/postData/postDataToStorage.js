import {
  firebaseStore,
  firebaseStorage,
  firebaseAuth,
  firebase,
} from "../firebase";

const postDataToStorage = (imgs, postId, setProgressBar) => {
  const currentUserUid = firebaseAuth.currentUser.uid;

  // storage 업로드
  imgs.forEach((img) => {
    const uploadTask = firebaseStorage
      .ref()
      .child(`/${currentUserUid}/${postId}/${img.file.name}`)
      .put(img.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress tag는 부동소수점만 지원 so use Math.round
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgressBar(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("paused");
            break;

          case "running":
            console.log("running");
            break;

          default:
            console.log("default");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const urlResult = uploadTask.snapshot.ref.getDownloadURL();
        const metadataReult = uploadTask.snapshot.ref.getMetadata();
        const imgUrl = await Promise.resolve(urlResult);
        const ImgMetaData = await Promise.resolve(metadataReult);
        const { name, timeCreated } = ImgMetaData;

        await firebaseStore
          .collection("post")
          .doc(currentUserUid)
          .collection("my-post")
          .doc(postId)
          .update({
            imgsData: firebase.firestore.FieldValue.arrayUnion({
              name,
              timeCreated,
              imgUrl,
            }),
          });
        //porogressBar reset
        setProgressBar(0);
      }
    );
  });
};

export default postDataToStorage;
