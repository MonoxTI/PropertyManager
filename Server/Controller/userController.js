import database from '../models/datamodel.js';

export const EnterProp = async (req, res) =>{
    if(!req.body)
    {
        return res.status(404).json({success: false, message: 'No request body recieved'});
    }
    const {PropertyName, location, Rent, Levy, Bond, Tenant} =req.body;

    
     if (!PropertyName || !location || !Rent || !Levy || !Bond || !Tenant) {
        return res.status(400).json({ success: false, message: 'Missing details' });
    }
    
    try {
        const existingProp = await database.findOne({PropertyName,location});
        if(existingProp)
        {
            return res.status(404).json({success: false, message: 'Property already exists'});
        }
        const prop = new database({
            PropertyName,
            location,
            Tenant,
            TotalRent: Rent,
            TotalLevy: Levy,
            TotalBond: Bond,
            Records: [
                {
                    Rent,
                    Levy,
                    Bond
                }
            ]
        }); 
    await prop.save();
        
        return res.status(200).json({success: true, message: `${PropertyName} has been added successfully`});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// GOOD
export const getProperty = async (req,res) =>{
    try{
        const properties = await database.find({});

        if(properties.length === 0)
        {
            return res.status.json({success: false, message: 'Properties not found'})
        }

        const PropertyDetails = properties.map((prp) =>{
            const Rent = prp.Rent;
            const Levy = prp.Levy;
            const Bond = prp.Bond;
            //const Bond = prp.Bond ||0;
            return{
                PropertyName: prp.PropertyName,
                Location: prp.location,
                Rent: Rent,
                Levy: Levy,
                Bond: Bond,
                //Bond: Bond.toFixed(2),
                Tenant: prp.Tenant || 'N/A',
            };
        });

        res.status(200).json({
            success: true, 
            Properties: PropertyDetails
        })
    }catch (error) {
        return res.status(500).json({success: false, message:error.message});
    }
}
export const getDetailProperty = async (req,res) =>{
   
    try {

        const {PropertyName, location} = req.body;

        const propty = await database.findOne({PropertyName, location});

        if(!propty){
            return res.json({success:false, message: 'Property not found'})
        }
        
        
        const Propertydetail = {
            PropertyName: propty.PropertyName,
            location: propty.location,
            TotalRent: propty.TotalRent,
            TotalLevy: propty.TotalLevy,
            TotalBond: propty.TotalBond,
            Profit: propty.TotalRent - (propty.TotalLevy+ propty.TotalBond),
            Records: propty.Records.map((rec) =>({
                month: rec.Month,
                Rent: rec.Rent,
                Levy: rec.Levy,
                Bond: rec.Bond
            }))
        }

        return res.status(200).json({success:true,
             message: 'The Property you are searching:',
            Propertydetail})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export const EnterAmounts = async (req, res) =>{
   const {PropertyName, location, Rent, Levy, Bond} = req.body;
        
        if(!PropertyName && !location)
        {
            return res.json({success: false, 
                message: 'Property and location are required'})
        }

    try{
        const properties = await database.findOne({PropertyName, location});

        if(!properties)
        {
            return res.json({success:false, message: 'Property not found'});
        }
        const Months = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

        if(!properties.Records)
        {
            properties.Records =[];
        }

        properties.Records.push({
            Month: Months,
            Rent: Number(Rent),
            Levy: Number(Levy),
            Bond: Number(Bond)})

        properties.TotalRent += Rent;
        properties.TotalLevy += Levy;
        properties.TotalBond += Bond;

        await properties.save();

        return res.status(200).json({success: true, message: `${PropertyName}:${Months} Rent, Levy and Bond saved`})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}