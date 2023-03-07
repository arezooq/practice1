import { Router, Request, Response } from 'express'
import multer from 'multer'
import Player from '../models/player'
import Team from '../models/team'
import fs from 'fs'

const router = Router()
// logo team upload 
var storageTeam = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'src/logos')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})


var uploadTeam = multer({
    storage: storageTeam,
}).single('logo')

// image player upload 
var storagePlayer = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'src/uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})


var uploadPlayer = multer({
    storage: storagePlayer,
}).single('image')


// Insert an Team into database route
router.post('/addTeam', uploadTeam, (req: Request, res: Response) =>{
    let info = {
        name: req.body.name,
        score: req.body.score,
        logo: req.file!.filename,
    }
    const team = Team.create(info)
    .then(team => {
        res.json({ message: 'Team added successfully!'})
        res.redirect('/allTeams');
    })
    .catch((err: any) => {
        res.status(400).send("unable to save to database");
    });
    res.status(200).send(team)
});


// Get all teams route
router.get('/allTeams', async (req, res) => {
    const teams = await Team.find()
    res.render("all_teams", {
        title: "All Teams",
        teams: teams,
    })
})
// GET match
router.get('/', async (req, res) => {
    const teams = await Team.find()
    res.render("match", {
        title: "All Matchs",
        teams: teams,
    })
})


router.get('/addTeam', (req, res) =>{
    res.render("add_teams", { title: "Add Teams" })
})

//Edit an team route
router.get('/edit/:id',async (req: Request, res: Response) =>{
    let id = req.params.id
    await Team.findById(id, (err: any, team: null) =>{
        if(err){
            res.redirect('/allTeams')
        }else{
            if(team == null){
                res.redirect('/allTeams')
            }else{
                res.render("edit_teams", {
                    title: 'Edit Team',
                    team: team,
                })
            }
        }
    })
})

//update team route
router.post('/update/:id', uploadTeam, (req, res) => {
    let id = req.params.id
    let new_image = ''

    if(req.file){
        new_image = req.file.filename
        try{
            fs.unlinkSync('src/logos/' + req.body.old_image)
        }catch(err){
            console.log(err)
        }
    }else{
        new_image = req.body.old_image
    }

    Team.findByIdAndUpdate(id, {
        name: req.body.name,
        logo: req.body.logo,
    }, (err: { message: any }, result: any) =>{
        if(err){
            res.json({ message: err.message, type: 'danger' })
        }else {
            res.json({ message: 'Team updated successfully!'})
            res.redirect('/allTeams')
        }
    })
})

// Delete team route
router.get('/delete/:id', (req, res) =>{
    let id = req.params.id
    Team.findByIdAndRemove(id, (err: { message: any }, result: { logo: string }) =>{
        if(result.logo != ''){
            try{
                fs.unlinkSync('src/logos' + result.logo)
            }catch(err){
                console.log(err)
            }
        }

        if(err){
            res.json({ message: err.message })
        }else {
            res.json({ message :"Team deleted successfully!"})
            res.redirect('/allTeams')
        }
    })
})

// Insert an player into database route
router.post('/addTeam', uploadPlayer, (req, res) =>{
    let info = {
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        image: req.file!.filename,
    }
    const player = Player.create(info)
    .then(player => {
        res.json({message: 'player added successfully!'})
    res.redirect('/allPlayers');
    })
    .catch((err: any) => {
    res.status(400).send("unable to save to database");
    });
    res.status(200).send(player)
   });


// Get all players route
router.get('/allPlayers', async (req, res) => {
    const players = await Player.find()
    res.render("index", {
        title: "All Players",
        players: players,
    })
})

router.get('/addPlayer', (req, res) =>{
    res.render("add_players", { title: "Add Players" })
})

//Edit an player route
router.get('/edit/:id',async (req, res) =>{
    var id = req.params.id
    await Player.findById(id, (err: any, player: null) =>{
        if(err){
            res.redirect('/allPlayers')
        }else{
            if(player == null){
                res.redirect('/allPlayers')
            }else{
                res.render("edit_players", {
                    title: 'Edit Player',
                    player: player,
                })
            }
        }
    })
})

//update player route
router.post('/update/:id', uploadPlayer, (req, res) => {
    let id = req.params.id
    let new_image = ''

    if(req.file){
        new_image = req.file.filename
        try{
            fs.unlinkSync('src/uploads/' + req.body.old_image)
        }catch(err){
            console.log(err)
        }
    }else{
        new_image = req.body.old_image
    }

    Player.findByIdAndUpdate(id, {
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        image: req.file!.filename,
    }, (err: { message: any }, result: any) =>{
        if(err){
            res.json({ message: err.message, type: 'danger' })
        }else {
            res.json({ message: 'Player updated successfully!'})
            res.redirect('/allPlayers')
        }
    })
})

// Delete Player route
router.get('/delete/:id', (req, res) =>{
    let id = req.params.id
    Player.findByIdAndRemove(id, (err: { message: any }, result: { image: string }) =>{
        if(result.image != ''){
            try{
                fs.unlinkSync('src/uploads' + result.image)
            }catch(err){
                console.log(err)
            }
        }

        if(err){
            res.json({ message: err.message })
        }else {
            res.json({ message: "Player deleted successfully!" })
            res.redirect('/allPlayers')
        }
    })
})


router.post('/gameData',(req, res) =>{

} )


export default router