// Routes
app.get("/booking", (req, res) => {
  // Merge sample data with any additional data
  const templateData = {
    ...sampleData,
  
  }

  res.render("booking", templateData)
})
