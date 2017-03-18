var Company = require('../models/model_company')
var mongoose = require('mongoose');
const multer = require('multer')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

module.exports={
  register: function(req,res){
    var newCompany = new Company({
      email: req.body.email,
      password: passwordHash.generate(req.body.password),
      verified:false,
      created_at:new Date(),
      updated_at:new Date(),
    })
    newCompany.save(function(err){
      if(err) throw err
      res.json(newCompany)
    })
  },
  login: function(req, res, next){
    var token = jwt.sign({ email: req.body.email }, 'ukmhub');
    res.send({ token: token })
  },
  editProfile: function(req,res){
    Company.findOne({_id:req.params.id},function(err,company){
      if(err){
        res.send(err)
      }
      else{
        company.name = req.body.name
        company.type = req.body.type
        company.category = JSON.parse(req.body.category)
        company.location.lat = req.body.lat
        company.location.lng = req.body.lng
        company.website = req.body.website
        company.address = req.body.address
        company.phone = req.body.phone
        company.description = req.body.description
        company.images = req.file
        company.updated_at = new Date()
        company.save(function(err){
          if(err){
            res.send(err)
          }
          else{
            res.json(company)
          }
        })

      }
    })
  },
  showByCategories: function(req,res){
    Company.findOne({_id:req.params.id}).then(function(result){
      if(result.type === 'corporate'){
        Company.find({type:'ukm',category: { $in:result.category} }).then(function(result){
          res.json(result)
        })
      }
      else{
        Company.find({type:'corporate',category:{$in:result.category}}).then(function(result){
          res.json(result)
        })
      }
    })
  },
  showOne: function(req,res){
    Company.findOne({_id:req.params.id}).then(function(result){
      res.json(result)
    })
  },
  showAll: function(req,res){
    Company.find().then(function(result){
      res.json(result)
    })
  },
  deleteAll: function(req,res){
    Company.remove().then(function(result){
      res.send('data berhasil dihapus')
    })
  },
  checkCorporate: function(req,res,next){
    Company.findOne({_id:req.params.id}).then(function(result){
      if(result.type === 'corporate'){
        next()
      }
      else{
        res.send("your company is not a corporate type")
      }
    })
  },
  checkUkm: function(req,res,next){
    Company.findOne({_id:req.params.id}).then(function(result){
      if(result.type === 'ukm'){
        next()
      }
      else{
        res.send("your company is not a ukm type")
      }
    })
  },
  createBuyRequest: function(req,res){
    Company.findByIdAndUpdate(req.params.id,{
      $push:{
            'request':{
              types:"buy",
              title:req.body.title,
              price:Number(req.body.price),
              description:req.body.description,
              images:req.file,
              open:true
            }
          }
      },{
        new:true
      }, (err,data)=>{
        if(err){
          res.send(err)
        }
        else{
          res.send(data)
        }
      }
    )
  },
  createSellRequest: function(req,res){
    Company.findByIdAndUpdate(req.params.id,{
      $push:{
            'request':{
              types:"sell",
              title:req.body.title,
              price:Number(req.body.price),
              description:req.body.description,
              images:req.file,
              open:true
            }
          }
      },{
        new:true
      }, (err,data)=>{
        if(err){
          res.send(err)
        }
        else{
          res.send(data)
        }
      }
    )
  },
  showRequest: function(req,res){
    var requestArray =[]
    Company.findOne({_id:req.params.id}).then(function(result){
      if(result.type === 'corporate'){
        Company.find({type:'ukm',category: { $in:result.category} },{ password:0}).then(function(result){
          result.forEach(function(data){
            data.request.forEach(function(dats){
              if(dats.open==true){

                requestArray.push({seller: data._id,request:dats})
              }
            })
          })
          res.send(requestArray)
        })
      }
      else{
        Company.find({type:'corporate',category: { $in:result.category} },{ request: 1}).then(function(result){
          result.forEach(function(data){
            data.request.forEach(function(dats){
              if(dats.open==true){

                requestArray.push(dats)
              }
            })
          })
          res.send(requestArray)
        })
      }
    })
  },
  changeReqStatus: function(req,res){
    Company.findOne({_id:req.params.companyId}).then(function(result){
      result.request.forEach(function(data){
        if(data.id === req.params.requestId){
          if(data.open === true){
            data.open = false
            result.save(function(err){
              if(err){
                res.send(err)
              }
              else{
                res.json(result)
              }
            })
          }
          else{
            data.open = true
            result.save(function(err){
              if(err){
                res.send(err)
              }
              else{
                res.json(result)
              }
            })
          }
        }
      })
    })
  },
  createLetter:function(req,res){
    Company.findByIdAndUpdate(req.params.id,{
      $push:{
            'letter':{
              to:req.params.otherId,
              from:req.params.id,
              requestId:req.params.requestId,
              title:req.body.title,
              date: new Date(),
              status:'waiting',
              message:req.body.message
            },
          }
      },{
        new:true
      }, (err,data)=>{
        if(err){
          res.send(err)
        }
        else{
          Company.findByIdAndUpdate(req.params.otherId,{
            $push:{
                  'acceptedMessages':{
                    letterId: data.letter[data.letter.length-1]._id
                  },
                }
            },{
              new:true
            }, (err,datas)=>{
              if(err){
                res.send(err)
              }
              else{
                res.json(data)
              }
            }
          )
        }
      }
    )
  },
}