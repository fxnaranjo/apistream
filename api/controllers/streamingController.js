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
   
    if (myproperty==null || myproperty.length>1 || myproperty<1 || myproperty>3 || isNaN(myproperty))
        return false;
    else
        return true;
}


function validateRecord(myproperty)
{
   
    if (myproperty==null || myproperty.length>1 || (myproperty!=1 && myproperty!=0) || isNaN(myproperty))
        return false;
    else
        return true;
}


exports.startCameraStream = function(req, res) {

    if (  req.headers.authorization !== 'Basic ZnhuYXJhbmpvOjAyMGt3MzA=' )
    {
        return res.status(401).send('Authentication denied.')
    }

    var config = req.body;
    
    if (config==null)
    return res.status(500).send('Bad Request')

    if (!validateString(config.clubname,6))
    {
        return res.status(500).send('Bad Request: Invalid clubname')
    }else{
        if (!validateString(config.camera,3))
        {
            return res.status(500).send('Bad Request: Invalid camera')
        }else
        {
            if (!validateNumber(config.cameraport,4))
            {
                return res.status(500).send('Bad Request: Invalid cameraport')
            }else{
                if (!validateNumber(config.streamport,4)){
                    return res.status(500).send('Bad Request: Invalid streamport')
                }else{
                    if (!validatePlaytime(config.playtime)){
                        return res.status(500).send('Bad Request: Invalid playtime')
                    }else{
                        if (!validateString(config.player,6)){
                            return res.status(500).send('Bad Request: Invalid player')
                        }
                    }
                }
            }
        }
    }
     
    

    
  var resultado ={
    clubname: config.clubname,
    camera: config.camera,
    cameraport: config.cameraport,
    streamport: config.streamport,
    playtime: config.playtime,
    player: config.player,
    result: "success"
  };

  res.json(resultado);


  

};