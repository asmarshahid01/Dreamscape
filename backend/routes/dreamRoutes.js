const express = require('express')
const {isLoggedIn}=require("../middleware");
const {
    getDreams,
    writeDream,
    showDreams,
    deleteDream,
    makePublicDream,
    showUserPublicDreams,
    showPublicDreams,
    likeDream,
    dislikeDream,
    deletePublicDream
} = require('../controllers/dreamController');
const { checkAuth } = require('../middlewares/checkAuth');

const router = express.Router()

router.get('/', checkAuth, getDreams)
router.post('/', checkAuth, writeDream)
router.get('/showdreams', checkAuth, showDreams)
router.delete('/:id',checkAuth, deleteDream)
router.post('/public/:id',checkAuth, makePublicDream)
router.delete('/public/:id',checkAuth, deletePublicDream)
router.get('/showpublic',checkAuth, showPublicDreams)
router.get('/showpublicuser',checkAuth, showUserPublicDreams)
router.patch('/:id/like',checkAuth, likeDream)
router.patch('/:id/dislike',checkAuth, dislikeDream)

module.exports = router