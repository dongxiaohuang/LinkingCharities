const express = require('express');
const bodyParser = require('body-parser');
const uploadRouter = express.Router();
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const MulterAzureStorage = require('multer-azure-storage');
const config = require('../config');
const Users = require('../models/users');
const storageAzure = require('azure-storage');
storageAzure.connectionString = config.azureStorageConnectionString;
const blobService = storageAzure.createBlobService(config.azureStorage.accountName, config.azureStorage.accountKey);
const Charities = require('../models/charities');
//multer config


const storage = new MulterAzureStorage({
     azureStorageConnectionString: config.azureStorageConnectionString,
     containerName: 'userprofile',
     containerSecurity: 'blob'
});

const storageCharity = new MulterAzureStorage({
     azureStorageConnectionString: config.azureStorageConnectionString,
     containerName: 'charitypics',
     containerSecurity: 'blob'
})


const imageFileFilter = (req, file, callback) => {
     // regular express only accept jpg jpeg png gif
     if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error("you can upload only image files!"), false);
     }
     return callback(null, true);
};

const upload = multer({
     storage: storage,
     fileFilter: imageFileFilter
});
const uploadCharity = multer({
     storage: storageCharity,
     fileFilter: imageFileFilter
})
uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
     .options(cors.corsWithOptions, (req, res) => {
          sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          res.statusCode = 403;
          res.end('GET is not supported on endpoint /upload');
     })
     //corresponding to the name of the name('imageFile') of input
     // error handled by upload
     .post(cors.corsWithOptions, authenticate.verifyUser, upload.single('imageFile'), (req, res, next) => {
          Users.findById(req.user._id)
               .then(user => {
                    if(!req.file){
                         res.statusCode = 500;
                         res.setHeader('Content-Type', 'application/json');
                         res.json({
                              success:'false',
                              message:'no file uploaded'
                         }); // mul
                    }
                    //if any delete image
                    if(user.blobName && user.blobName !='defaultuserpic.png'){
                         blobService.deleteBlobIfExists('userprofile', user.blobName, err => {
                                     if(err) {
                                         console.log(err)
                                     } else {
                                         console.log({ message: `Block blob '${user.blobName}' deleted` });
                                     }
                                 });
                    }
                    user.profile = req.file.url;
                    user.blobName = req.file.blobName;
                    user.save()
                         .then(user => {
                              res.statusCode = 200;
                              res.setHeader('Content-Type', 'application/json');
                              res.json({
                                   uploadFile: req.file,
                                   user: user
                              }); // multer will provide file for us for single upoload
                         }, err => next(err))
                         .catch(err => next(err))
               }, err => next(err))
               .catch(err => next(err))

     })
     .put(cors.cors, authenticate.verifyUser, (req, res, next) => {
          res.statusCode = 403;
          res.end('PUT is not supported on endpoint /upload');
     })
     .delete(cors.cors, (req, res, next) => {
          res.statusCode = 403;
          res.end('DELETE is not supported on endpoint /upload');

     });

uploadRouter.route('/charitiesPics/:chairtyId')
     .options(cors.corsWithOptions, (req, res) => {
          sendStatus(200);
     })
     .post(cors.corsWithOptions, uploadCharity.array('imageFile', 3), (req, res, next) => {
          Charities.findById(req.params.chairtyId)
          .then(charity => {
               // charity.images = req.files
               if(!req.files){
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                         success:'true',
                         message:'no pictures uploaded'
                    });
               }else{
                    let images = [];
                    for(let i=0; i<req.files.length; i++){
                         images.push(req.files[i].url)
                    }
                    charity.images = images;
                    charity.save()
                    .then(charity => {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json({
                              uploadedFiles: req.files,
                              charity:charity
                         }); // multer will provide file for us for array upoload
                    }, err => next(err))
                    .catch(err => next(err))
               }
          }, err => next(err))
          .catch(err => next(err))
     })

module.exports = uploadRouter;
