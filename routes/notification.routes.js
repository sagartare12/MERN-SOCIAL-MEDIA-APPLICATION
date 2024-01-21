const notificationController = require("../controllers/notification.controller");
const express = require('express')
const authController = require('../controllers/auth.controller')


const router =express.Router();

router.post('/notification',authController.protect,notificationController.createNotification);


router.delete('/notification/:id',authController.protect,notificationController.removeNotification);

router.get('/notifications',authController.protect,notificationController.getNotification);

router.patch('/isReadNotification/:id',authController.protect,notificationController.updateReadStatus);


router.delete('/deleteAllNotification',authController.protect,notificationController.deleteAllNotifications);



  module.exports=router;