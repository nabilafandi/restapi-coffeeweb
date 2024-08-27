const About =  require('../models/about')

const getAboutPage = async (req, res) => {
    try {
        const aboutData = await About.findOne()
        if (!aboutData) {
            
        }
        res.json(aboutData)
    } catch (error) {
        res.status(500).json({
            'message': `Error fetching data: ${error}`
        })
    }
}

module.exports = {
    getAboutPage,
}