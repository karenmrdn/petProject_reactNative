import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "Articles",
  initialState: {
    articles: [
      {
        id: "a1",
        authorId: "u1",
        imageUrl:
          "https://kod.ru/content/images/size/w1050/2021/10/814f2912-cf45-4865-9538-639d858a93a6.jpg",
        header:
          "Facebook заблокировала разработчика, который сделал расширение для отписки от всего",
        body: "Как сообщает Slate Magazine, Unfollow Everything был опубликован в Chrome Store в прошлом году, однако через некоторое время Facebook потребовала от Барклая удалить его. Но несмотря на то, что он выполнил требование из-за нежелания получить иск, компания навсегда заблокировала аккаунты Луи в Facebook и Instagram.",
        tags: ["News", "Facebook"],
      },
      {
        id: "a2",
        authorId: "u1",
        imageUrl: "https://kod.ru/content/images/size/w650/2021/10/R540.png",
        header:
          "Reuters: Нидерланды потребовали от Apple изменить политику App Store",
        body: "Управление Нидерландов по делам потребителей и рынков (ACM) пришло к выводу, что App Store нарушает антимонопольное законодательство, пишет Reuters со ссылкой на источники. По мнению ведомства, Apple злоупотребляет своим доминирующим положением на рынке, заставляя разработчиков использовать только собственную платёжную систему с комиссией от 15% до 30%. При этом штрафовать Apple голландские власти пока не стали, но предписали изменить политику.",
        tags: ["Apple", "Reuters", "Privacy policy"],
      },
      {
        id: "a3",
        authorId: "u2",
        imageUrl:
          "https://kod.ru/content/images/size/w650/2021/10/1233382967.0.jpg",
        header:
          "Ирландия перестанет быть «налоговой гаванью» для IT-компаний — в стране повышают налог",
        body: "body",
        tags: ["Google", "Ireland"],
      },
    ],
  },
  reducers: {
    addArticle(state, action) {
      state.articles = [...state.articles, action.payload];
    },
  },
});

export const articlesActions = articlesSlice.actions;

export default articlesSlice.reducer;
