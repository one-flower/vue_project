module.exports = () => {
  return (req, res, next) => {
    res.status(404).send('404 not found')
  }
}