const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

/* Create Notification function code start here */
exports.createNotification=catchAsync(async(req,res,next) =>{
  const loggedInUser = await User.findById(req.user._id);
 
    let notificationObject = {
      recipients: req.body.recipients,
      url: req.body.url,
      text: req.body.text,
    };

    notificationObject.user = loggedInUser._id;

    const newNotification = await Notification.create(notificationObject);

     res.status(200).json({
      notifications: newNotification,
    });
 

})

/* Remove Notification function code start here */
exports.removeNotification=catchAsync(async(req, res,next) =>{
 
    const notification = await Notification.findByIdAndDelete(req.params.id);

     res.status(200).json({
      msg: "Notification Deleted",
    });
})

/* Get Notification function code start here */
exports.getNotification=catchAsync(async(req, res,next)=> {

    const notifications = await Notification.find({
      recipient: req._id,
    });

    res.status(200).json({
      notifications: notifications,
    });
})

/* Update Read Status function code start here */
exports.updateReadStatus=catchAsync(async(req, res,next)=> {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(400).send({
        msg: "No Notification found",
      });
    }
 
    if(!notification.recipients.includes(req.user._id)) return next(new AppError('User not in recipient field. Pls send the notification to recipient!',404))
    // if (checkNotification.length == 0) {
    //   return res.status(200).send({
    //     msg: "User not in recipient field. Pls send the notification to recipient!",
    //   });
    // }

    notification.isRead = true;

    await notification.save();
     res.status(200).json({
      notifications: notification,
    });
  
  
}) 

/* Delete All Notification function code start here */
exports.deleteAllNotifications=catchAsync(async(req, res,next) =>{
  
    const result = await Notification.deleteMany({ recipient: req.user._id });
    res.status(200).json({
      notifications: result,
      deletedCount: result.length,
    });
  
  
})