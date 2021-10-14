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
        imageUrl: data.imageUrl,
        header: data.header,
        body: data.body,
        tags: data.tags,
        timestamp: data.timestamp,
      });
    });

    dispatch(articlesActions.setArticles(articlesArr));
  };

  firestore()
    .collection("articles")
    .orderBy("timestamp", "desc")
    .onSnapshot(onResult, onError);
};

export const createArticleAsync =
  (userId, header, body, imageUrl, tags, timestamp) => async dispatch => {
    dispatch(articlesActions.toggleIsArticlesLoading());

    try {
      await firestore()
        .collection("articles")
        .add({ authorId: userId, header, body, imageUrl, tags, timestamp });
    } catch (error) {
      dispatch(errorsActions.setError(error?.message ?? error));
    }

    dispatch(articlesActions.toggleIsArticlesLoading());
  };

export const deleteArticleAsync = articleId => async dispatch => {
  dispatch(articlesActions.toggleIsArticlesLoading());

  try {
    await firestore().collection("articles").doc(articleId).delete();
  } catch (error) {
    dispatch(errorsActions.setError(error?.message ?? error));
  }

  dispatch(articlesActions.toggleIsArticlesLoading());
};
