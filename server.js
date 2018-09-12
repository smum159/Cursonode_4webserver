const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials/')
app.set('viwe engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);    
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err) {
            console.log('Unable to append to server .log!');
        }
    })
    next();
});
/* app.use((req, res, next) => {
    res.render('maintenance.hbs');
}); */
app.use(express.static(__dirname + '/public/'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
})

app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Diz is di jom peich dog!',
        todayDate: 'el día de hoy'
    });
});

app.get ('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'Avau Peich'
    });
});
app.get ('/bad', (req,res)=>{
    res.send({
        nombrePagina: 'Bad',
        mensaje: 'Bad Conection',
        resultados:{
            status: '400',
            conexion:'error'
        }
    });
})

app.get ('/proyects', (req,res)=>{
    res.render('proyects.hbs',{
        pageTitle: 'Prollekx Peich'
    });
});

app.listen(port, () => {
    console.log(`ATENCION: El servidor listo en el puerto ${port} :)`);
    
});