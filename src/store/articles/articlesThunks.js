import { errorsActions } from "../errors/errorsSlice";
import firestore from "@react-native-firebase/firestore";
import { articlesActions } from "../articles/articlesSlice";

export const fetchArticles = () => dispatch => {
  const onError = error => {
    dispatch(errorsActions.setError(error?.message ?? error));
  };

  const onResult = querySnapshot => {
    const articlesArr = [];

    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      articlesArr.push({
        id: documentSnapshot.id,
        authorId: data.authorId,
        imageUrl: data.imageUrls[0],
        imageUrls: data.imageUrls.filter((_, index) => index !== 0) || [],
        header: data.header,
        body: data.body,
        tags: data.tags,
        timestamp: data.timestamp,
        location: data.location,
      });
    });

    dispatch(articlesActions.setArticles(articlesArr));
  };

  firestore()
    .collection("reports")
    .orderBy("timestamp", "desc")
    .onSnapshot(onResult, onError);
};

export const createArticleAsync =
  (userId, header, body, imageUrls, tags, timestamp, location) =>
  async dispatch => {
    dispatch(articlesActions.toggleIsArticlesLoading());

    try {
      await firestore().collection("reports").add({
        authorId: userId,
        header,
        body,
        imageUrls,
        tags,
        timestamp,
        location,
      });
    } catch (error) {
      dispatch(errorsActions.setError(error?.message ?? error));
    }

    dispatch(articlesActions.toggleIsArticlesLoading());
  };

export const deleteArticleAsync = articleId => async dispatch => {
  dispatch(articlesActions.toggleIsArticlesLoading());

  try {
    await firestore().collection("reports").doc(articleId).delete();
  } catch (error) {
    dispatch(errorsActions.setError(error?.message ?? error));
  }

  dispatch(articlesActions.toggleIsArticlesLoading());
};
