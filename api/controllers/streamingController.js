'use strict';




function validateString(myproperty,charNumber)
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
                        if (!validateString(config.player,6)){
                            return res.status(500).send('Bad Request: Invalid player');
                        }else{
                            if (!validatePrivate(config.private)){
                                return res.status(500).send('Bad Request: Invalid private');
                            }else{
                                if (!validateString(config.description,10)){
                                    return res.status(500).send('Bad Request: Invalid description');
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

  var scriptShell="sh /rtmp-server/scripts/init.sh "+config.clubname+" "+config.camera+" "+config.cameraport+" "+config.streamport+" "+config.playtime+" "+config.player+" "+config.private+" "+config.description;

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

  
    return res.status(200).send('Streaming API Up and Running!!')

  

};