'use strict';




function validateString(myproperty,charNumber)
{
   
    if (myproperty==null || myproperty.length<charNumber)
        return false;
    else
        return true;
}

function validateStringID(myproperty,charNumber)
{
   
    if (myproperty==null || myproperty.length<charNumber)
        return false;
    else
        return true;
}


function validateNumber(myproperty,charNumber)
{
   
    if (myproperty==null || myproperty.length<charNumber || isNaN(myproperty))
        return false;
    else
        return true;
}

function validatePlaytime(myproperty)
{
   
    if (myproperty==null || myproperty.length>3 || myproperty<1 || myproperty>120 || isNaN(myproperty))
        return false;
    else
        return true;
}


function validatePrivate(myproperty)
{
   
    if (myproperty==null ||  (myproperty!=true && myproperty!=false))
        return false;
    else
        return true;
}


exports.startCameraStream = function(req, res) {

    if (  req.headers.authorization !== 'Basic ZnhuYXJhbmpvOjAyMGt3MzA=' )
    {
        return res.status(401).send('Authentication denied.');
    }

    var config = req.body;
    
    if (config==null)
    return res.status(500).send('Bad Request');

    if (!validateString(config.clubname,6))
    {
        return res.status(500).send('Bad Request: Invalid clubname');
    }else{
        if (!validateString(config.camera,3))
        {
            return res.status(500).send('Bad Request: Invalid camera');
        }else
        {
            if (!validateNumber(config.cameraport,4))
            {
                return res.status(500).send('Bad Request: Invalid cameraport');
            }else{
                if (!validateNumber(config.streamport,4)){
                    return res.status(500).send('Bad Request: Invalid streamport');
                }else{
                    if (!validatePlaytime(config.playtime)){
                        return res.status(500).send('Bad Request: Invalid playtime');
                    }else{
                        if (!validateString(config.player,5)){
                            return res.status(500).send('Bad Request: Invalid player');
                        }else{
                            if (!validatePrivate(config.private)){
                                return res.status(500).send('Bad Request: Invalid private');
                            }else{
                                if (!validateString(config.description,10)){
                                    return res.status(500).send('Bad Request: Invalid description: 10 characters');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
     
    
///////////CALL SHELL SCRIPT////////////////////////

const { exec } = require('child_process');

var resultado ={
    clubname: config.clubname,
    camera: config.camera,
    cameraport: config.cameraport,
    streamport: config.streamport,
    playtime: config.playtime,
    player: config.player,
    private: config.private,
    description: config.description,
    result: "fail"
  };

  var scriptShell="sh /rtmp-server/scripts/init.sh "+config.clubname+" "+config.camera+" "+config.cameraport+" "+config.streamport+" "+config.playtime+" "+config.player+" "+config.private+" '"+config.description+"'";

var yourscript = exec(scriptShell,
        (error, stdout, stderr) => {
            if (error != null) {
                return res.status(500).send('Error:'+error);
            }else{
                resultado.result="success";
                res.json(resultado);
            }
        });

    

  


  

};



exports.stopCameraStream = function(req, res) {

    if (  req.headers.authorization !== 'Basic ZnhuYXJhbmpvOjAyMGt3MzA=' )
    {
        return res.status(401).send('Authentication denied.');
    }

    var config = req.body;
    
    if (config==null)
    return res.status(500).send('Bad Request');

    if (!validateString(config.clubname,6))
    {
        return res.status(500).send('Bad Request: Invalid clubname');
    }else{
        if (!validateString(config.camera,3))
        {
            return res.status(500).send('Bad Request: Invalid camera');
        }else
        {
            if (!validateString(config.player,5))
            {
                return res.status(500).send('Bad Request: Invalid player');
            }else{
                if (!validateStringID(config.streamID)){
                    return res.status(500).send('Bad Request: Invalid stream ID');
                }
            }
        }
    }
     
    
///////////CALL SHELL SCRIPT////////////////////////

const { exec } = require('child_process');

var resultado ={
    clubname: config.clubname,
    camera: config.camera,
    player: config.player,
    streamId: config.streamID,
    result: "fail"
  };

 

  var scriptShell="sh /rtmp-server/scripts/stop.sh "+config.clubname+" "+config.camera+" "+config.player+" "+config.streamID;

var yourscript = exec(scriptShell,
        (error, stdout, stderr) => {
            if (error != null) {
                return res.status(500).send('Error:'+error);
            }else{
                resultado.result="success";
                res.json(resultado);
            }
        });

    

  


  

};

exports.healthStreaming = function(req, res) {

  
    console.log("Testing");
    return res.status(200).send('Streaming API Up and Running!!')

  

};



exports.highlight = function(req, res) {


    let myPath = "";
    let highlight="";
    let clubname="";
    let highlightPath="";

    if (  req.headers.authorization !== 'Basic ZnhuYXJhbmpvOjAyMGt3MzA=' )
    {
        return res.status(401).send('Authentication denied.');
    }

    var config = req.body;
    
    if (config==null)
        return res.status(500).send('Bad Request');
    
        if (!validateString(config.videoPath,10))
        {
            return res.status(500).send('Bad Request: Invalid video Path');
        }else
        {
            const myArray = config.videoPath.split("/");
            clubname=myArray[3];
            myPath = "/library/"+clubname+"/"+myArray[4];
            let aux="-"+Date.now()+"-hl";
            highlight=myArray[4].split("-")[0]+aux+".mp4";
            highlightPath="/library/"+clubname+"/"+highlight;

            if (!validateString(config.start,8))
            {
                    return res.status(500).send('Bad Request: Invalid start value');
            }else{
                if (!validateString(config.stop,8))
                {
                return res.status(500).send('Bad Request: Invalid stop value');
                }else{
                    if (!validateString(config.player,5))
                            {
                                return res.status(500).send('Bad Request: Invalid player');
                            }else{

                                if (!validatePrivate(config.private))
                                    {
                                        return res.status(500).send('Bad Request: Invalid private');
                                    }else{
                                    
                                        if (!validateString(config.description,10))
                                        {
                                            return res.status(500).send('Bad Request: Invalid description: 10 characters');
                                        }
                                    }
                            }
                }
            
            }
            
        }

        ///////////CALL SHELL SCRIPT////////////////////////

const { exec } = require('child_process');

var resultado ={
    videoPath: config.videoPath,
    highlightPath: highlightPath,
    result: "fail"
  };

  res.json(resultado);

  var scriptShell="sh /rtmp-server/scripts/init.sh "+clubname+" "+  +" hl-camera hl-port hl-port 1 "+config.start+" "+config.stop+" "+config.player+" "+config.private+" '"+config.description+"'";

//var yourscript = exec(scriptShell,
  //      (error, stdout, stderr) => {
    //        if (error != null) {
      //          return res.status(500).send('Error:'+error);
        //    }else{
          //      resultado.result="success";
            //    res.json(resultado);
            //}
        //});
  

};