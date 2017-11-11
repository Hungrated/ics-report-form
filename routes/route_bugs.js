// const express = require('express');
// const router = express.Router();

// const fs = require('fs');
// const multer = require('multer');
// const pathLib = require('path');
// const xl = require('node-xlrd');

// const Bug = require('../models/db_bugs');

// let uploadDir = '../public/upload/buginfo';

// let objMulter = multer({
//   dest: pathLib.resolve(__dirname, uploadDir) // file upload destination
// });

// router.post('/import', objMulter.any(), function(req, res, next) { // XLS file upload

//   //rename a file
//   let newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
//   fs.rename(req.files[0].path, newName, function(err) {
//     if (err) {
//       console.log('file rename error');
//       return res.json(statusLib.FILE_RENAME_FAILED);
//     } else { // parse XLS file
//       req.fileURL = newName;
//       next();
//     }
//   });
// });

// router.post('/import', function(req, res, next) { // extract data & convert to JSON

//   xl.open(req.fileURL, function(err, data) {
//     if (err) {
//       console.log(err.name, err.message);
//       res.json({ msg: 'fail' });
//     } else {
//       let dataArr = [];
//       let sheet = data.sheets[0];
//       for (let rIdx = 1; rIdx < sheet.row.count; rIdx++) {
//         try {
//           dataArr.push({
//             cnvd_id: sheet.cell(rIdx, 1),
//             title: sheet.cell(rIdx, 0),
//             pub_time: sheet.cell(rIdx, 2),
//             harm_rank: sheet.cell(rIdx, 3),
//             products_aff: sheet.cell(rIdx, 4),
//             description: sheet.cell(rIdx, 5),
//             ref_url: sheet.cell(rIdx, 6),
//             solution: sheet.cell(rIdx, 7),
//             detector: sheet.cell(rIdx, 8),
//             patch: sheet.cell(rIdx, 9),
//           });
//         } catch (e) {
//           console.log(e.message);
//         }
//       }
//       req.body.bugData = dataArr;
//       next();
//     }
//   });
// });

// router.post('/import', function(req, res) { // create database record

//   let dataArr = req.body.bugData;

//   let flag = 0; // flag of all data import finish

//   function createBugData(dataIdx) {
//     Bug.create({
//         cnvd_id: dataArr[dataIdx].cnvd_id,
//         title: dataArr[dataIdx].title,
//         pub_time: dataArr[dataIdx].pub_time,
//         harm_rank: dataArr[dataIdx].harm_rank,
//         products_aff: dataArr[dataIdx].products_aff,
//         description: dataArr[dataIdx].description,
//         ref_url: dataArr[dataIdx].ref_url,
//         solution: dataArr[dataIdx].solution,
//         detector: dataArr[dataIdx].detector,
//         patch: dataArr[dataIdx].patch
//       })
//       .then(function() {
//         flag++;
//         if (flag === dataArr.length) {
//           res.json({ msg: 'success' });
//         }
//       }).catch(function(e) {
//         console.error(e);
//         return res.json({ msg: 'fail' });
//       });
//   }

//   for (let dataIdx = 0; dataIdx < dataArr.length; dataIdx++) {
//     createBugData(dataIdx);
//   }
// });

// module.exports = router;