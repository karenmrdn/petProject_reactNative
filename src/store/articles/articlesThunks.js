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
      });
    });

    dispatch(articlesActions.setArticles(articlesArr));
  };

  firestore().collection("articles").onSnapshot(onResult, onError);
};

export const addArticleAsync =
  (header, body, imageUrl, tags) => async dispatch => {
    dispatch(articlesActions.toggleIsArticlesLoading());

    try {
      await firestore()
        .collection("articles")
        .add({ authorId: "u1", header, body, imageUrl, tags });
    } catch (error) {
      dispatch(errorsActions.setError(error?.message ?? error));
    }

    dispatch(articlesActions.toggleIsArticlesLoading());
  };
