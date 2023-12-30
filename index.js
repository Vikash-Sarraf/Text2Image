import {config} from 'dotenv';
config();

import fs from "fs";
import express from "express";
import axios from 'axios';
import FormData from 'form-data';
import fetch from 'node-fetch'
import request from 'request';
import { arrayBufferToBase64 } from './util.js';
import cors from "cors";
import fileUpload from 'express-fileupload';
import Replicate from "replicate";
import tinify from 'tinify';

const app = express();
app.use(express.json());    //enable parsing middleware for requests
app.use(express.urlencoded());
app.use(cors({origin:['http://localhost:3000'],credentials:true}));
app.use(fileUpload());

const PORT = process.env.PORT || 8080;
var API_KEY="";

var provider;
var resolution;
var details;
var query;

app.post('/upscale', async (req,res)=>{
  try{
    if (req.body.secret !== 'qwerty'){
      res.status(400).json({msg:"unauthorized"})
    }
    let items={};
    if(req.files === null){
      res.status(400).json({msg:"No file selected"});
    }
    const file = req.files.file;
    console.log(file.data)

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
  });

  const output = await replicate.run(
    "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
    {
      input: {
        image: 'data:image/png;base64,' + arrayBufferToBase64(file.data),
        scale:8
      }
    }
  );
  items = {image_resource_url:""};
      items.image_resource_url = output;
      res.json(items)
  } catch (e) {
    res.status(400).json({msg:"unauthorized"})
  }
})

app.post("/", async (req,res)=>{
  try{
    if (req.body.secret !== 'qwerty'){
      res.status(400).json({msg:"unauthorized"})
    }
    let items={};
    const { lighting, artstyle, time, color, frame, inspiration, prompt } = req.body;

    const details = `${lighting ?? ''}${artstyle ?? ''}${time ?? ''}${color ?? ''}${frame ?? ''}${inspiration ?? ''}`;

    const query = prompt + details;
    provider = req.body.provider;
    resolution = req.body.resolution;
    console.log(query+"\n"+provider+"\n"+resolution)
    if(["openai","deepai","stabilityai","replicate"].includes(provider)){
    API_KEY = process.env.EDEN_API_KEY;
    const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/image/generation",
        headers: {
          authorization: `Bearer ${API_KEY}`,
        },
        data: {
          providers: provider,
          text: query,
          resolution: resolution,
        },
      };
      
      axios
        .request(options)
        .then((response) => {
            var resp = (response.data);
            console.log({provider})
            console.log(resp[provider])
            // console.log(JSON.stringify(response.data))
            // 
            items = resp[provider].items[0];
            res.json(items)
        })
        .catch((error) => {
          console.error(error);
        });
        
    }
    else if(provider == "clipdropai"){
        API_KEY = process.env.CLIP_API_KEY;
        const form = new FormData()
        form.append('prompt',query )
        fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY,
        },
        body: form,
    })
  .then(response => response.arrayBuffer())
  .then(buffer => {
    
    items = {image_resource_url:""};
         items.image_resource_url = 'data:image/png;base64,' + arrayBufferToBase64(buffer);
         res.json(items)
  })
    .catch((error) => {
        console.error(error);
      });
}
    else if(provider == "stablediffusion"){
        API_KEY = process.env.STABLE_API_KEY;
        var options = {
            'method': 'POST',
            'url': 'https://stablediffusionapi.com/api/v3/text2img',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "key": API_KEY,
              "prompt": query,
              "negative_prompt": null,
              "width": resolution.slice(0,resolution.indexOf("x")),
              "height": resolution.slice(resolution.indexOf("x")+1),
              "samples": "1",
              "num_inference_steps": "20",
              "seed": null,
              "guidance_scale": 7.5,
              "safety_checker": "yes",
              "multi_lingual": "no",
              "panorama": "no",
              "self_attention": "no",
              "upscale": "no",
              "embeddings_model": null,
              "webhook": null,
              "track_id": null
            })
          };
          
          request(options, function (error, response) {
            if (error) {console.log(error)};
            var resp = (response.body);
            resp = JSON.parse(resp)
            items = {image_resource_url:""}
            items.image_resource_url =(resp.output[0])
            res.json(items)
          })
    }
  } catch (e) {
    res.status(400).json({msg:"something went wrong"})
  }

});
app.post("/compress", (req,res)=>{
  try{
  if (req.body.secret !== 'qwerty'){
    res.status(400).json({msg:"unauthorized"})
  }
  tinify.key = process.env.COMPRESS_API
  const fileURL = req.body.file;
  fs.readFile("unoptimized.png", function(err, sourceData) {
  if (err) throw err;
  tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
    if (err) throw err;
    items = {image_resource_url:""};
         items.image_resource_url = 'data:image/png;base64,' + arrayBufferToBase64(resultData);
         res.json(items)
  });
});
} catch (e) {
  res.status(400).json({msg:"something went wrong"})
}
})

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})