class Article {
  constructor(id, authorId, imageUrl, header, body, tags) {
    this.id = id;
    this.authorId = authorId;
    this.imageUrl = imageUrl;
    this.header = header;
    this.body = body;
    this.tags = tags;
  }
}

export default Article;
