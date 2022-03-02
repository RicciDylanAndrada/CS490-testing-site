...
# Create an application instance
app = create_app()

# Define a route to fetch the available articles
#GET EXAMPLE DATA
@app.route("/articles", methods=["GET"], strict_slashes=False)
def articles():

    articles = Articles.query.all()
    results = articles_schema.dump(articles)

    return jsonify(results)
#POST EXAMPLE DATA
@app.route("/add", methods=["POST"], strict_slashes=False)
def add_articles():
    title = request.json['title']
    body = request.json['body']

    article = Articles(
        title=title,
        body=body
        )

    db.session.add(article)
    db.session.commit()

    return article_schema.jsonify(article)

if __name__ == "__main__":
    app.run(debug=True)