"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const player_1 = __importDefault(require("../models/player"));
const team_1 = __importDefault(require("../models/team"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// logo team upload 
var storageTeam = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/logos');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var uploadTeam = (0, multer_1.default)({
    storage: storageTeam,
}).single('logo');
// image player upload 
var storagePlayer = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var uploadPlayer = (0, multer_1.default)({
    storage: storagePlayer,
}).single('image');
// Insert an Team into database route
router.post('/addTeam', uploadTeam, (req, res) => {
    let info = {
        name: req.body.name,
        score: req.body.score,
        logo: req.file.filename,
    };
    const team = team_1.default.create(info)
        .then(team => {
        res.json({ message: 'Team added successfully!' });
        res.redirect('/allTeams');
    })
        .catch((err) => {
        res.status(400).send("unable to save to database");
    });
    res.status(200).send(team);
});
// Get all teams route
router.get('/allTeams', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield team_1.default.find();
    res.render("all_teams", {
        title: "All Teams",
        teams: teams,
    });
}));
// GET match
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield team_1.default.find();
    res.render("match", {
        title: "All Matchs",
        teams: teams,
    });
}));
router.get('/addTeam', (req, res) => {
    res.render("add_teams", { title: "Add Teams" });
});
//Edit an team route
router.get('/edit/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    yield team_1.default.findById(id, (err, team) => {
        if (err) {
            res.redirect('/allTeams');
        }
        else {
            if (team == null) {
                res.redirect('/allTeams');
            }
            else {
                res.render("edit_teams", {
                    title: 'Edit Team',
                    team: team,
                });
            }
        }
    });
}));
//update team route
router.post('/update/:id', uploadTeam, (req, res) => {
    let id = req.params.id;
    let new_image = '';
    if (req.file) {
        new_image = req.file.filename;
        try {
            fs_1.default.unlinkSync('src/logos/' + req.body.old_image);
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        new_image = req.body.old_image;
    }
    team_1.default.findByIdAndUpdate(id, {
        name: req.body.name,
        logo: req.body.logo,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        }
        else {
            res.json({ message: 'Team updated successfully!' });
            res.redirect('/allTeams');
        }
    });
});
// Delete team route
router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    team_1.default.findByIdAndRemove(id, (err, result) => {
        if (result.logo != '') {
            try {
                fs_1.default.unlinkSync('src/logos' + result.logo);
            }
            catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        }
        else {
            res.json({ message: "Team deleted successfully!" });
            res.redirect('/allTeams');
        }
    });
});
// Insert an player into database route
router.post('/addTeam', uploadPlayer, (req, res) => {
    let info = {
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        image: req.file.filename,
    };
    const player = player_1.default.create(info)
        .then(player => {
        res.json({ message: 'player added successfully!' });
        res.redirect('/allPlayers');
    })
        .catch((err) => {
        res.status(400).send("unable to save to database");
    });
    res.status(200).send(player);
});
// Get all players route
router.get('/allPlayers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield player_1.default.find();
    res.render("index", {
        title: "All Players",
        players: players,
    });
}));
router.get('/addPlayer', (req, res) => {
    res.render("add_players", { title: "Add Players" });
});
//Edit an player route
router.get('/edit/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    yield player_1.default.findById(id, (err, player) => {
        if (err) {
            res.redirect('/allPlayers');
        }
        else {
            if (player == null) {
                res.redirect('/allPlayers');
            }
            else {
                res.render("edit_players", {
                    title: 'Edit Player',
                    player: player,
                });
            }
        }
    });
}));
//update player route
router.post('/update/:id', uploadPlayer, (req, res) => {
    let id = req.params.id;
    let new_image = '';
    if (req.file) {
        new_image = req.file.filename;
        try {
            fs_1.default.unlinkSync('src/uploads/' + req.body.old_image);
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        new_image = req.body.old_image;
    }
    player_1.default.findByIdAndUpdate(id, {
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        image: req.file.filename,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        }
        else {
            res.json({ message: 'Player updated successfully!' });
            res.redirect('/allPlayers');
        }
    });
});
// Delete Player route
router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    player_1.default.findByIdAndRemove(id, (err, result) => {
        if (result.image != '') {
            try {
                fs_1.default.unlinkSync('src/uploads' + result.image);
            }
            catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        }
        else {
            res.json({ message: "Player deleted successfully!" });
            res.redirect('/allPlayers');
        }
    });
});
router.post('/gameData', (req, res) => {
});
exports.default = router;
//# sourceMappingURL=route.js.map