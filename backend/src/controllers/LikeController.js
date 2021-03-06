const Dev = require('../models/dev');

module.exports ={
    async store(req, res){
                
        try {
            const { user } = req.headers;
            const { devId } = req.params;
            const loggedDev = await Dev.findById(user);
            const targetDev = await Dev.findById(devId);
            
            if (loggedDev.likes.includes(loggedDev._id)) {
                
            }

            loggedDev.likes.push(targetDev._id);

            await loggedDev.save();

            return res.json(loggedDev)   

        } catch (error) {
            return res.status(400).json({error: 'Dev not exists'})    
        }
    }
};