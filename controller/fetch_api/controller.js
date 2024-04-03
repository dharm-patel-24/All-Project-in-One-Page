const fetchPosts = (req, res) => {
  res.render('fetch_posts');
}

const fetchShowMore = (req, res) => {
  const id = req.params.id;
  res.render('fetch_showMore', { id: id });
}

module.exports = { fetchPosts, fetchShowMore };