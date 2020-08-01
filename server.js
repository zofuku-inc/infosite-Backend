const app = require('./app');

require('dotenv').config()

const PORT =   process.env.PORT || 5006

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
})