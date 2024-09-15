const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()
mongoose.connect('mongodb+srv://vinasviradia:vinasviradia@cluster0.ivmis.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get("/",async(req,res)=>{
    // const articles = [{
    //     title:"Test Article 1",
    //     createdAt:new Date(),
    //     description:'Test description'
    // },
    // {
    //         title: "Test Article 2",
    //         createdAt: new Date(),
    //         description: 'Test description'
    // }]
    const articles = await Article.find().sort({createdAt:'desc'})
        res.render("articles/index",{articles:articles})
})
app.use('/articles',articleRouter)
app.listen(3000)