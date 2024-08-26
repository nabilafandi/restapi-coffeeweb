const About =  require('../models/about')

const getAboutPage = async (req, res) => {
    try {
        console.log(About)
        const aboutData = await About.findOne()
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