/**
 * Created by andh on 1/29/17.
 */
import Content from '../models/content.model';
// const User = require('mongoose').model('User');
const npp = 6;
const formidable = require('formidable');
// const dir = 'sources/img';
import graphicMagick from 'gm';
const gm = graphicMagick.subClass({ imageMagick: true });
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import serverConfig from '../configs/server.config';
import mkdirp from 'mkdirp';

const exec = require('child_process').exec;

// size
const WIDTH_MEDIACONTENT = 600;
const WIDTH_THUMB = 460;
const HEIGHT_THUMB = 300;
const WIDTH_SMALLTHUMB = 300;
const HEIGHT_SMALLTHUMB = 157;

const getErrorMessage = (err) => {
  // console.log(err);
  let messages = [];
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        messages = ['URL is exist'];
        break;
      default:
        break;
    }
  } else {
    for (const errName of err.errors) {
      err.errors[errName].message && messages.push(err.errors[errName].message);
    }
  }
  return messages;
};
// const configAggregation = (sortType, aggregation) => {
//   if (sortType === 'hot') {
//     aggregation.project.hot = {
//       $add: [
//         {
//           $multiply: [
//             {
//               $cond: [
//                 {
//                   $gt: ['$point', 0],
//                 }, {
//                   $cond: [
//                     {
//                       $lt: ['$point', 0],
//                     },
//                     0,
//                     1,
//                   ],
//                 },
//                 -1,
//               ],
//             }, {
//               $log: [
//                 {
//                   $max: [
//                     {
//                       $abs: '$point',
//                     },
//                     1,
//                   ],
//                 },
//                 10,
//               ],
//             },
//           ],
//         }, {
//           $divide: [
//             {
//               $divide: [
//                 {
//                   $subtract: ['$created', new Date('2005-12-8')],
//                 },
//                 1000,
//               ],
//             },
//             46000,
//           ],
//         },
//       ],
//     };
//     aggregation.sort = {
//       hot: -1,
//     };
//   } else if (sortType === 'top') {
//     aggregation.project.top = {
//       $add: [
//         {
//           $size: '$views',
//         }, {
//           $multiply: [
//             {
//               $size: '$shares',
//             },
//             2,
//           ],
//         },
//       ],
//     };
//     aggregation.sort = {
//       top: -1,
//     };
//   } else {
//     aggregation.sort = {
//       created: -1,
//     };
//   }
// };
exports.hasAuthorization = (req, res, next) => {
  if (req.post.creator._id !== parseInt(req.user._id, 10) && req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res
    .status(403)
    .send({ messages: ["You aren't Creator"] });
  }
  next();
  return null;
};
exports.list = (req, res) => {
  const paging = parseInt(req.query.paging, 10) || npp;
  // console.log('paging', paging);
  const page = parseInt(req.query.page, 10) || 1;
  const skip = page > 0 ? ((page - 1) * paging) : 0;
  const conds = [];

  if (!req.query.user || parseInt(req.query.user, 10) !== req.user._id) {
    if (req.query.review) {
      conds.push({ review: true });
    } else {
      conds.push({ publish: true });
    }
  }
  req.query.category && conds.push({ categories: req.query.category });

  if (req.query.recommendations && req.user._id) {
    if (req.user.recommendations) {
      const cateList = [];
      req.user.recommendations.forEach((recommendation) => {
        cateList.push({ categories: recommendation });
      });
      if (cateList.length) {
        conds.push({ $or: cateList });
      }
    }
  }
  req.query.user && conds.push({ creator: parseInt(req.query.user, 10) });
  if (req.query.text) {
    conds.push({
      $or: [
        {
          title: {
            $regex: req.query.text,
            $options: 'i',
          },
        }, {
          description: {
            $regex: req.query.text,
            $options: 'i',
          },
        },
      ],
    });
  }
  conds.push({ procesed: true });
  // const match = null;
  // if (!conds.length) {
  //   match = {};
  // } else if (conds.length === 1) {
  //   match = conds.pop();
  // } else {
  //   match = {
  //     $and: conds,
  //   };
  // }
  // console.log(match);
  // https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111
  // e33d0d9#.hkka5wx3i
  const aggregation = {};
  aggregation.project = {
    created: 1,
    title: 1,
    description: 1,
    prize: 1,
    type: 1,
    url: 1,
    follows: 1,
    shares: 1,
    categories: 1,
    point: 1,
    view: 1,
    numComment: 1,

    mediaContent: 1,
    mediaContentHeight: 1,
    mediaContentWidth: 1,

    thumb: 1,
    thumbHeight: 1,
    thumbWidth: 1,

    smallThumb: 1,
    smallThumbHeight: 1,
    smallThumbWidth: 1,

    creator: {
      $arrayElemAt: [
        [
          {
            avatar: {
              $arrayElemAt: ['$creator.avatar', 0],
            },
            username: {
              $arrayElemAt: ['$creator.username', 0],
            },
          },
        ],
        0,
      ],
    },
  };
  // console.log((new Date).getTime());
  // const sortType = configAggregation(req.query.order, aggregation);
  Content.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'creator',
        foreignField: '_id',
        as: 'creator',
      },
    }, {
      $project: aggregation.project,
    },
    // Sorting pipeline
    {
      $sort: aggregation.sort,
    }, {
      $skip: skip,
    },
    // Optionally limit results
    {
      $limit: (paging + 1),
    },
  ], (err, results) => {
    // console.log(results);
    if (err) {
      // console.log(err);
      return res
      .status(400)
      .send();
    }

    // results = results.map(function (doc) {     return new Content(doc) });
    res.json(results);
    // Content.populate(results, { "path": "creator", "select": "displayName
    // username avatar" }, function (err, data) {     if (err) return
    // res.status(400).send();     console.log(JSON.stringify(data));     var isNext
    // = false;     if (data.length == (paging + 1)) {         isNext = true;
    // data.pop();     }     resdata = {         data: data,         isNext: isNext
    // }     res.json(resdata); });
    return null;
  });
};

const jpgOptim = (input) => {
  return new Promise((resolve, reject) => {
    let sizeCompressed;
    if (input.size.width / input.originalWidth > 1) {
      sizeCompressed = Math.round(input.size.width / input.originalWidth * input.originalFileSize / 1000);
      !input.LQ && (sizeCompressed *= 10);
    } else {
      sizeCompressed = Math.round(0.8 * input.originalFileSize / 1000);
    }
    const cmd = `jpegoptim --size=${sizeCompressed}k ${input.fileOutput}`;
    exec(cmd, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
const pngOptim = (input) => {
  return new Promise((resolve, reject) => {
    const cmd = `optipng -o7 -strip all ${input.fileOutput}`;
    exec(cmd, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
const createCompressedImage = (input) => {
  return new Promise((resolve, reject) => {
    if (input.LQ) {
      input.size.width && (input.size.width = Math.round(input.size.width / 10));
      input.size.height && (input.size.height = Math.round(input.size.height / 10));
    }
    const cmd = `convert ${input.fileInput} -filter Triangle -define filter:support=2 -thumbnail ${input.size.width} -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip ${input.fileOutput}`;
    exec(cmd, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const createCroppedCompressedImage = (input) => {
  return new Promise((resolve, reject) => {
    if (input.LQ) {
      input.size.width && (input.size.width = Math.round(input.size.width / 10));
      input.size.height && (input.size.height = Math.round(input.size.height / 10));
    }
    const cmd = `convert ${input.fileInput} -gravity center -crop x${Math.round(input.size.height * input.originalWidth / input.size.width)}+0+0 +repage -filter Triangle -define filter:support=2 -thumbnail ${input.size.width} -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip ${input.fileOutput}`;
    exec(cmd, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
const reduceGifSize = (input) => {
  return new Promise((resolve, reject) => {
    gm(input.fileInput).resize(input.size.width).quality(input.size.width / input.originalWidth)
      .write(input.fileInput, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
};
const formatGifToMp4 = (input) => {
  return new Promise((resolve, reject) => {
    const command = ffmpeg(input.fileInput).format('mp4').on('end', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    command.save(input.fileOutput);
  });
};
const takeMp4Screenshot = (input) => {
  return new Promise((resolve, reject) => {
    ffmpeg(input.fileInput).on('end', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    }).screenshots({
      timestamps: input.screenShot.timestamps,
      folder: input.screenShot.folderPath,
      filename: input.screenShot.filename,
      size: `${input.size.width}x${input.size.height}`,
    });
  });
};
const removeFile = (input) => {
  return new Promise((resolve, reject) => {
    fs.unlink(input.fileInput, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
// const changefileName = (input, callback) => {
//   const cmd = `mv ${input.oldName} ${input.newName}`;
//   exec(cmd, function (error, stdout, stderr) {
//     if (error) {
//       console.log(error);
//     } else {
//       if (callback)
//         callback();
//     }
//   });
// }
exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  const dir = `uploaded/${req.user._id}`;

  form.uploadDir = `${__dirname}/../../public/${dir}/`;
  mkdirp(form.uploadDir, () => {
    // if (err) {
    //   return res.status(400).send({ messages: err });
    // }
  });

  form.keepExtensions = true;
  form.maxFields = 1;
  form.maxFieldsSize = 4096;
  let count = 0;
  let _content;

  form.on('progress', bytesReceived => {
    if (bytesReceived > 6000000) {
      form._error();
      return res.status(400).send();
    }
    return null;
  });
  form.on('field', (name, field) => {
    if (name === 'content') {
      _content = field;
    }
  });

  form.on('file', (name1, file) => {
    count++;
    const fileNameSplit = file.path.split('/');
    const fileNameWithExtension = fileNameSplit[fileNameSplit.length - 1];
    const fileNameWithoutExtension = fileNameWithExtension.split('.')[0];
    const fileNameExtension = fileNameWithExtension.split('.')[1];
    const pathFolder = file.path.split(fileNameWithExtension)[0];
    const pathFullFileNameWithoutExtension = `${pathFolder}${fileNameWithoutExtension}`;
    const URLFolder = `${serverConfig.host}/${dir}/`;
    const URLFullFileNameWithoutExtension = `${URLFolder}${fileNameWithoutExtension}`;
    gm(file.path).size((err, size) => {
      if (!err && (fileNameExtension === 'jpg' || fileNameExtension === 'png' || fileNameExtension === 'gif')) {
        const originalWidth = size.width;
        const originalHeight = size.height;
        const originalFileSize = file.size;

        const data = JSON.parse(_content);

        data.creator = req.user._id;
        data.type = file.type;

        const ratioAcceptable = originalHeight / originalWidth < 5;
        data.thumbHeight = ratioAcceptable ? Math.round(originalHeight * WIDTH_THUMB / originalWidth) : HEIGHT_THUMB;
        data.thumbWidth = WIDTH_THUMB;

        data.mediaContentHeight = Math.round(originalHeight * WIDTH_MEDIACONTENT / originalWidth);
        data.mediaContentWidth = WIDTH_MEDIACONTENT;

        data.smallThumbWidth = WIDTH_SMALLTHUMB;
        data.smallThumbHeight = HEIGHT_SMALLTHUMB;

        const fileInputObj = { fileInput: file.path };
        const origin = {
          originalWidth,
          originalFileSize,
        };

        const sizeMediaContent = { size: { width: WIDTH_MEDIACONTENT, height: data.mediaContentHeight } };

        const sizeThumb = {
          size: {
            width: WIDTH_THUMB,
            height: ratioAcceptable ? data.thumbHeight : HEIGHT_THUMB,
          },
        };

        const sizeSmallThumb = { size: { width: WIDTH_SMALLTHUMB, height: HEIGHT_SMALLTHUMB } };

        const lowQuality = { LQ: true };

        if ((fileNameExtension === 'jpg' || fileNameExtension === 'png') && count === 1) {
          data.mediaContent = `${URLFullFileNameWithoutExtension}.${fileNameExtension}`;
          data.mediaContentLQ = `${URLFullFileNameWithoutExtension}_LQ.${fileNameExtension}`;

          data.thumb = `${URLFullFileNameWithoutExtension}_thumb.${fileNameExtension}`;
          data.thumbLQ = `${URLFullFileNameWithoutExtension}_thumb_LQ.${fileNameExtension}`;

          data.smallThumb = `${URLFullFileNameWithoutExtension}_smallThumb.${fileNameExtension}`;
          data.smallThumbLQ = `${URLFullFileNameWithoutExtension}_smallThumb_LQ.${fileNameExtension}`;

          const content = new Content(data);
          content.save((err1, content1) => {
            if (err1) {
              return res.status(400).send({ messages: getErrorMessage(err) });
            }
            return res.json({ data: content1 });
          });

          const fileOutputMediaContent = { fileOutput: `${pathFullFileNameWithoutExtension}.${fileNameExtension}` };
          const fileOutputMediaContentLQ = { fileOutput: `${pathFullFileNameWithoutExtension}_LQ.${fileNameExtension}` };

          const fileOutputThumb = { fileOutput: `${pathFullFileNameWithoutExtension}_thumb.${fileNameExtension}` };
          const fileOutputThumbLQ = { fileOutput: `${pathFullFileNameWithoutExtension}_thumb_LQ.${fileNameExtension}` };

          const fileOutputSmallThumb = { fileOutput: `${pathFullFileNameWithoutExtension}_smallThumb.${fileNameExtension}` };
          const fileOutputSmallThumbLQ = { fileOutput: `${pathFullFileNameWithoutExtension}_smallThumb_LQ.${fileNameExtension}` };

          const mediaContent = Object.assign({}, fileInputObj, origin, fileOutputMediaContent, sizeMediaContent);
          const mediaContentLQ = Object.assign({}, fileInputObj, origin, fileOutputMediaContentLQ, sizeMediaContent, lowQuality);
          const thumb = Object.assign({}, fileInputObj, origin, fileOutputThumb, sizeThumb);
          const thumbLQ = Object.assign({}, fileInputObj, origin, fileOutputThumbLQ, sizeThumb, lowQuality);
          const smallThumb = Object.assign({}, fileInputObj, origin, fileOutputSmallThumb, sizeSmallThumb);
          const smallThumbLQ = Object.assign({}, fileInputObj, origin, fileOutputSmallThumbLQ, sizeSmallThumb, lowQuality);

          createCompressedImage(mediaContent)
          .then(() => createCompressedImage(mediaContentLQ))
          .then(() => {
            if (ratioAcceptable) {
              createCompressedImage(thumb)
              .then(() => createCompressedImage(thumbLQ));
            } else {
              createCroppedCompressedImage(thumb)
              .then(() => createCroppedCompressedImage(thumbLQ));
            }
          })
          .then(() => createCroppedCompressedImage(smallThumb))
          .then(() => createCroppedCompressedImage(smallThumbLQ))
          .then(() => {
            if (fileNameExtension === 'jpg') {
              jpgOptim(mediaContent)
              .then(() => jpgOptim(mediaContentLQ))
              .then(() => jpgOptim(thumb))
              .then(() => jpgOptim(thumbLQ))
              .then(() => jpgOptim(smallThumb))
              .then(() => jpgOptim(smallThumbLQ));
            } else {
              pngOptim(mediaContent)
              .then(() => pngOptim(mediaContentLQ))
              .then(() => pngOptim(thumb))
              .then(() => pngOptim(thumbLQ))
              .then(() => pngOptim(smallThumb))
              .then(() => pngOptim(smallThumbLQ));
            }
          })
          .then(() => {
            content.processed = true;
            content.save();
          });
        } else if (file.type === 'image/gif' && count === 1) {
          data.mediaContent = data.thumb = `${URLFullFileNameWithoutExtension}.mp4`;

          data.smallThumb = `${URLFullFileNameWithoutExtension}_smallThumb.png`;
          data.smallThumbLQ = `${URLFullFileNameWithoutExtension}_smallThumb_LQ.png`;

          const content = new Content(data);
          content.save((err1, content1) => {
            if (err1) {
              return res.status(400).send({ messages: getErrorMessage(err) });
            }
            return res.json({ data: content1 });
          });

          const fileOutputMp4 = { fileOutput: `${pathFullFileNameWithoutExtension}.mp4` };
          const fileInputMp4 = { fileInput: `${pathFullFileNameWithoutExtension}.mp4` };

          const fileOutputSmallThumb = { fileOutput: `${pathFullFileNameWithoutExtension}_smallThumb.png` };
          const fileOutputSmallThumbLQ = { fileOutput: `${pathFullFileNameWithoutExtension}_smallThumb_LQ.png` };

          const tempSmallThumbInput = { fileInput: `${pathFullFileNameWithoutExtension}.png` };

          const screenShotObj = {
            screenShot: {
              timestamps: ['00:00:0.00'],
              folderPath: pathFolder,
              filename: `${fileNameWithoutExtension}.png`,
            },
          };

          const gif = Object.assign({}, fileInputObj, origin, sizeMediaContent);
          const mp4 = Object.assign({}, fileInputObj, fileOutputMp4);
          const screenShot = Object.assign({}, fileInputMp4, screenShotObj, sizeMediaContent);
          const smallThumb = Object.assign({}, tempSmallThumbInput, origin, fileOutputSmallThumb, sizeSmallThumb);
          const smallThumbLQ = Object.assign({}, tempSmallThumbInput, origin, fileOutputSmallThumbLQ, sizeSmallThumb, lowQuality);

          reduceGifSize(gif)
          .then(() => formatGifToMp4(mp4))
          .then(() => takeMp4Screenshot(screenShot))
          .then(() => createCroppedCompressedImage(smallThumb))
          .then(() => createCroppedCompressedImage(smallThumbLQ))
          .then(() => removeFile(fileInputObj))
          .then(() => removeFile(tempSmallThumbInput))
          .then(() => pngOptim(smallThumb))
          .then(() => pngOptim(smallThumbLQ))
          .then(() => {
            content.processed = true;
            content.save();
          });
        } else {
          fs.unlink(file.path);
          return res.status(400).send();
        }
        return null;
      }
      return null;
    });
  });
  form.parse(req);
};

function checkExists(dir, callback) {
  fs.exists(dir, (exists) => {
    if (!exists) {
      mkdirp(dir, (err) => {
        // if (err)
        //   console.error(err);
        // else {
        //   console.log('The uploads folder was not present, we have created it for you [' + dir + ']');
        !err && callback();
        // }
      });
      // throw new Error(dir + ' does not exists. Please create the folder');
    } else {
      callback();
    }
  });
}
exports.uploadFile = (req, res) => {
  const form = new formidable.IncomingForm();
  const cDir = `contents/${req.content._id}`;
  const uploadDir = `${__dirname}/../../public/uploaded/${cDir}`;
  form.uploadDir = uploadDir;
  // console.log(form.uploadDir);
  form.keepExtensions = true;
  form.maxFields = 1;
  form.maxFieldsSize = 4096;
  let count = 0;
  checkExists(uploadDir, () => {
    form
    .parse(req, () => {
    });
  });
  form.on('progress', (bytesReceived) => {
    if (bytesReceived > 3000000) {
      form._error();
      // console.log('Loi nhan');
      return res.status(400).send();
    }
    return null;
  });
  form.on('file', (name1, file) => {
    // console.log(file);
    // console.log("F");
    count++;
    if ((file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/msword' || file.type === 'application/pdf') && file.size < 3000000 && count === 1) {
      const arrSplit = file.path.split('/');
      const name = arrSplit[arrSplit.length - 1];
      return res.json({
        link: `${serverConfig.host}/${cDir}/${name}`,
      });
    }
    // console.log("F2");
    fs.unlink(file.path);
    // console.log('file qua lon');
    return res.status(400).send();
  });
};
exports.get = (req, res) => {
  return res.json({ data: req.content });
};

exports.update = (req, res) => {
  // if(req.body.url){     Challenge.findOne({url:
  // req.body.url}).exec(function(err,challenge){         if(err) return
  // res.status(400).send({messages: ['An error occur. Please try again later']});
  //         if(challenge) res.status(400).send({messages: ['URL has exist']})
  // req.body.public = req.challenge.public;         req.body._id =
  // req.challenge._id;         req.body.creator = req.user._id;
  // Challenge.findByIdAndUpdate(req.challenge._id,req.body).exec(function(err,cha
  // l lenge){             if(err) return res.status(400).send({messages:
  // getErrorMessage(err)});             return res.json({message: "Challenge's
  // information has changed"});         });     }) } else {     req.body.public =
  // req.challenge.public;     req.body._id = req.challenge._id; req.body.creator
  // = req.user._id;
  // Challenge.findByIdAndUpdate(req.challenge._id,req.body).exec(function(err,cha
  // l lenge){         if(err) return res.status(400).send({messages:
  // getErrorMessage(err)});         return res.json({message: "Challenge's
  // information has changed"});     }); }

  req.body.publish = false;
  req.body._id = req.content._id;
  req.body.creator = req.user._id;
  Content.findByIdAndUpdate(req.content._id, req.body).exec((err, content) => {
    return err ? res.status(400).send({ messages: getErrorMessage(err) }) : res.json({
      message: "Content's information has changed",
      data: content,
    });
  });
};
exports.review = (req, res) => {
  req.content.review = true;
  req.content.save();
  res.status(200).send({ data: true });
};
exports.publish = (req, res) => {
  req.content.publish = !req.content.publish;
  req.content.save();
  res.status(200).send({ data: req.content.publish });
};

// function removeFile(input) {
//   fs.unlink(input, () => {
//       // if (err)
//       //   console.log(err);
//   }
//   );
// }

exports.remove = (req, res) => {
  if (req.content.creator._id === req.user._id || req.user.role === 'admin' || req.user.role === 'manager') {
    req.content.remove((err, content) => {
      return err ? res.status(400).send({ messages: getErrorMessage(err) }) : res.json({ data: content });
    });

    const mediaContentfileName = req.content.mediaContent.split('/files/')[1];
    const mediaContentFilePath = `${__dirname}/../../public/uploaded/files/${mediaContentfileName}`;
    const thumbfileName = req.content.thumb.split('/files/')[1];
    const thumbFilePath = `${__dirname}/../../public/uploaded/files/${thumbfileName}`;
    const smallThumbfileName = req.content.smallThumb.split('/files/')[1];
    const smallThumbFilePath = `${__dirname}/../../public/uploaded/files/${smallThumbfileName}`;

    removeFile(mediaContentFilePath);
    removeFile(thumbFilePath);
    removeFile(smallThumbFilePath);

    if (req.content.mediaContent.indexOf('.mp4') === -1) {
      let extension;
      mediaContentfileName.indexOf('png') !== -1 && (extension = '.png');
      mediaContentfileName.indexOf('jpg') !== -1 && (extension = '.jpg');

      const mediaContentfileName20 = `${mediaContentfileName.split('.')[0]}_20_${extension}`;
      const mediaContentFilePath20 = `${__dirname}/../../public/uploaded/files/${mediaContentfileName20}`;

      const thumbfileName20 = `${thumbfileName.split('.')[0]}_20_${extension}`;
      const thumbFilePath20 = `${__dirname}/../../public/uploaded/files/${thumbfileName20}`;

      const smallThumbfileName20 = `${smallThumbfileName.split('.')[0]}_20_${extension}`;
      const smallThumbFilePath20 = `${__dirname}/../../public/uploaded/files/'${smallThumbfileName20}`;

      removeFile(mediaContentFilePath20);
      removeFile(thumbFilePath20);
      removeFile(smallThumbFilePath20);
    }
  } else {
    return res.status(401).send('You are not creator or manager or admin');
  }
  return null;
};
exports.contentByID = (req, res, next, id) => {
  Content
  .findById(id)
  .populate('creator', 'displayName username avatar')
  .populate('categories', 'title')
  // .populate('type', 'title')
  .exec((err, content) => {
    if (err) {
      // console.log(1);
      return res.status(400).send();
    }
    if (!content) {
      return res.status(400).send({
        messages: [`Failed to load content ${id}`],
      });
    }
    req.content = content;
    // console.log(content);
    next();
    return null;
  });
  return null;
};
exports.follow = (req, res) => {
  let isFollowed = false;
  req.content.follows.forEach((follow) => {
    follow === req.user._id && (isFollowed = true);
    return null;
  });
  if (!isFollowed) {
    Content.findByIdAndUpdate(req.content._id, {
      $addToSet: {
        follows: req.user._id,
      },
    }).exec((err) => {
      return err ? res.status(400).send() : res.status(200).send({
        data: {
          follow: true,
        },
      });
    });
  } else {
    Content.findByIdAndUpdate(req.content._id, {
      $pull: {
        follows: req.user._id,
      },
    }).exec((err) => {
      return err ? res.status(400).send() : res.status(200).send({
        data: {
          follow: false,
        },
      });
    });
  }
};

exports.share = (req, res) => {
  Content.findByIdAndUpdate(req.content._id, {
    $addToSet: {
      shares: req.user._id,
    },
  }).exec((err) => {
    return err ? res.status(400).send() : res.status(200).send();
  });
};

exports.view = (req, res) => {
  // Content.findByIdAndUpdate(req.content._id, { $addToSet: { "views":
  // req.user._id } }).exec(function (err, success) {     if (err) return
  // res.status(400).send();     return res.status(200).send(); });
  Content.findByIdAndUpdate(req.content._id, {
    $inc: {
      view: 1,
    },
  }).exec((err, success) => {
    return err ? res.status(400).send() : res.json({ view: success.view });
  });
};

exports.report = (req, res) => {
  let hasReported = false;
  req.content.reports.forEach((reporter) => {
    reporter === req.user._id && (hasReported = true);
    return null;
  });
  if (!hasReported) {
    Content
    .findByIdAndUpdate(req.content._id, {
      $addToSet: {
        reports: req.user._id,
      },
    })
    .exec((err, success) => {
      return err ? res.status(400).send() : res.json(success);
    });
  } else {
    Content
    .findByIdAndUpdate(req.content._id, {
      $pull: {
        reports: req.user._id,
      },
    })
    .exec((err, success) => {
      return err ? res.status(400).send() : res.json(success);
    });
  }
};

exports.voteUp = (req, res) => {
  let isVotedUp = false;
  req
  .content
  .voteUps
  .forEach((vote) => {
    vote === req.user._id && (isVotedUp = true);
    return null;
  });

  if (!isVotedUp) {
    let isVotedDown = false;
    req
    .content
    .voteDowns
    .forEach((vote) => {
      vote === req.user._id && (isVotedDown = true);
      return null;
    });
    if (isVotedDown) {
      Content.findByIdAndUpdate(req.content._id, {
        $pull: {
          voteDowns: req.user._id,
        },
        $inc: {
          point: 1,
        },
      })
      .exec((err) => {
        if (err) {
          return res.status(400).send();
        }
        Content.findByIdAndUpdate(req.content._id, {
          $addToSet: {
            voteUps: req.user._id,
          },
          $inc: {
            point: 1,
          },
        })
        .exec((err1) => {
          return err1 ? res.status(400).send() : res.status(200).send({
            data: {
              voteUp: true,
            },
          });
        });
        return null;
      });
    } else {
      Content.findByIdAndUpdate(req.content._id, {
        $addToSet: {
          voteUps: req.user._id,
        },
        $inc: {
          point: 1,
        },
      })
      .exec((err) => {
        return err ? res.status(400).send() : res.status(200).send({
          data: {
            voteUp: true,
          },
        });
      });
    }
  } else {
    return res
    .status(200)
    .send({
      data: {
        voteUp: false,
      },
    });
  }
  return null;
};

exports.voteDown = (req, res) => {
  let isVotedDown = false;
  req
  .content
  .voteDowns
  .forEach((vote) => {
    vote === req.user._id && (isVotedDown = true);
    return null;
  });

  if (!isVotedDown) {
    let isVotedUp = false;
    req.content.voteUps.forEach((vote) => {
      vote === req.user._id && (isVotedUp = true);
      return null;
    });
    if (isVotedUp) {
      Content.findByIdAndUpdate(req.content._id, {
        $pull: {
          voteUps: req.user._id,
        },
        $inc: {
          point: -1,
        },
      })
      .exec((err) => {
        if (err) {
          return res.status(400).send();
        }
        Content.findByIdAndUpdate(req.content._id, {
          $addToSet: {
            voteDowns: req.user._id,
          },
          $inc: {
            point: -1,
          },
        }).exec((err1) => {
          return err1 ? res.status(400).send() : res.status(200).send({
            data: {
              voteDown: true,
            },
          });
        });
        return null;
      });
    } else {
      Content.findByIdAndUpdate(req.content._id, {
        $addToSet: {
          voteDowns: req.user._id,
        },
        $inc: {
          point: -1,
        },
      }).exec((err) => {
        return err ? res.status(400).send() : res.status(200).send({
          data: {
            voteDown: true,
          },
        });
      });
    }
  } else {
    return res
    .status(200)
    .send({
      data: {
        voteDown: false,
      },
    });
  }
  return null;
};

exports.unVote = (req, res) => {
  // remove vote up
  let isVotedUp = false;
  req.content.voteUps.forEach((vote) => {
    vote === req.user._id && (isVotedUp = true);
    return null;
  });

  // remove vote down
  let isVotedDown = false;
  req.content.voteDowns.forEach((vote) => {
    vote === req.user._id && (isVotedDown = true);
    return null;
  });
  if (isVotedDown) {
    Content.findByIdAndUpdate(req.content._id, {
      $pull: {
        voteDowns: req.user._id,
      },
      $inc: {
        point: 1,
      },
    }).exec((err) => {
      if (err) {
        return res.status(400).send();
      }
      if (isVotedUp) {
        Content.findByIdAndUpdate(req.content._id, {
          $pull: {
            voteUps: req.user._id,
          },
          $inc: {
            point: -1,
          },
        }).exec((err1) => {
          return err1 ? res.status(400).send() : res.status(200).send({
            data: {
              unVote: true,
            },
          });
        });
      }
      return null;
    });
  } else {
    if (isVotedUp) {
      Content.findByIdAndUpdate(req.content._id, {
        $pull: {
          voteUps: req.user._id,
        },
        $inc: {
          point: -1,
        },
      })
      .exec((err) => {
        return err ? res.status(400).send() : res.status(200).send({
          data: {
            unVote: true,
          },
        });
      });
    } else {
      return res
      .status(200)
      .send({
        data: {
          unVote: false,
        },
      });
    }
  }
  return null;
};

exports.renderAngular = (req, res, next) => {
  if ((req.url.indexOf('sources') < 0 && req.url.indexOf('api') < 0 && req.url.indexOf('assets') < 0)) {
    res.render('index', {
      message: null,
      app: serverConfig.app,
      channel: serverConfig.channel,
    });
  } else {
    next();
  }
};
exports.renderContent = (req, res) => {
  Content
  .findById(req.params.id)
  .exec((err, content) => {
    if (content) {
      const app = {};
      app.id = serverConfig.app.id;
      app.title = content.title;
      app.image = content.mediaContent;
      app.description = content.description;
      app.url = `${serverConfig.host}/contents/${content._id}`;
      res.render('index', {
        message: null,
        app,
        channel: serverConfig.channel,
      });
    } else {
      res.render('index', {
        message: null,
        app: serverConfig.app,
        channel: serverConfig.channel,
      });
    }
  });
};
