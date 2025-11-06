// Routes
app.get("/booking", (req, res) => {
  // Merge sample data with any additional data
  const templateData = {
    ...sampleData,
    // You can add more data here
  }

  res.render("booking", templateData)
})
