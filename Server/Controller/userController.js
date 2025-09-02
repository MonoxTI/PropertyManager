import {PropDB,MonthDB,TotalDB} from '../models/datamodel.js';
//npm start server

//POST(200)
export const EnterProp = async (req, res) =>{
    if(!req.body)
    {
        return res.status(404).json({success: false, message: 'No request body recieved'});
    }
    const {PropertyName, location, Rent, Levy, Bond, Tenant} =req.body;

    
     if (!PropertyName || !location || Rent== null || Levy== null  || Bond== null  || !Tenant) {
        return res.status(400).json({ success: false, message: 'Missing details' });
    }
    
    try {
        const existingProp = await PropDB.findOne({PropertyName,location});

        if(existingProp)
        {
            return res.status(409).json({success: false, message: 'Property already exists'});
        }
        const prop = new PropDB({
            PropertyName,
            location,
            Tenant,
            Rent,
            Levy,
            Bond
        }); 
        
    await prop.save();
        
        return res.status(201).json({success: true, message: `${PropertyName} has been added successfully`});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

//POST(200)
export const EnterAmounts = async (req, res) =>{
   const {PropertyName, location, Rent, Levy, Bond} = req.body;
        
        if(!PropertyName || !location)
        {
            return res.status(409).json({success: false, 
                message: 'Property and location are required'})
        }

    try{
        const property = await PropDB.findOne({PropertyName, location})

        if(!property)
        {
            return res.status(404).json({success:false, message: 'Property not found'});
        }
        const Months = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

        const existMonth = await MonthDB.findOne({Prop: property._id,Month: Months})
        if(existMonth)
        {
            return res.json({success: false, message: `${Months} entery already exists`});
        }


        const monthlyadd = new MonthDB({
            Prop: property._id,
            Month: Months,
            Rent: Number(Rent),
            Levy: Number(Levy),
            Bond: Number(Bond),
            Expense: []
        })

        await monthlyadd.save();

        return res.status(200).json({success: true, message: `${PropertyName}:${Months} Rent, Levy and Bond saved`})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
//POST(200)
export const EnterExpense = async (req,res) =>{
    const {PropertyName,location, Description, Amount} =req.body;
    if(!PropertyName ||!location||!Description||Amount == null)
    {
        return res.status(400).json({success: false, message: `Missing details. Please enter.`})
    }
    try {
        
    const property = await PropDB.findOne({PropertyName,location})
     if(!property)
        {
            return res.status(404).json({success:false, message: 'Property not found'});
        }

        const Months = new Date().toLocaleString('default',{month: 'long',year: 'numeric'});

        let Monthexpense = await MonthDB.findOne({Prop: property._id, Month: Months});
        
        if(!Monthexpense)
        {
             Monthexpense = new MonthDB({
                Prop: property._id,
                Month: Months,
                Rent: property.Rent,
                Levy: property.Levy,
                Bond: property.Bond,
                Expense: []
        });
    }
    Monthexpense.Expense.push({
       Description,
       Amount: Number(Amount)
    })
    await Monthexpense.save();

    return res.status(200).json({success: true,message: `${PropertyName} ${Months} expense has been added successfully`})
    
} catch (error) {
return res.status(500).json({message: error.message})
}
}

// GET(200)
export const getProperty = async (req,res) =>{
    try{
        const Property = await PropDB.find({}).exec();
       
        if(Property.length === 0)
        {
            return res.status(404).json({success: false, message: 'Properties not found'})
        }

        const PropertyDetails = Property.map((prp) =>{
            return{
                PropertyName: prp.PropertyName,
                Location: prp.location,
                Rent: prp.Rent,
                Levy: prp.Levy,
                Bond: prp.Bond,
                Tenant: prp.Tenant ?? 'N/A'
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
//GET(200) issue with profits
export const getDetailProperty = async (req,res) =>{
    const {PropertyName, location} = req.body;

    if(!PropertyName || !location)
    {
        return res.status(400).json({success: false, message: 'Please enter Propertynmae and location'})
    }
    try {
        const propty = await PropDB.findOne({PropertyName, location})

        if(!propty){
            return res.status(404).json({success:false, message: 'Property not found'})
        }

        const totals = await MonthDB.aggregate([
            { $match: {Prop: propty._id}},
            {$unwind : {path: '$Expense', preserveNullAndEmptyArrays: true}},
            {
                $group: {
                    _id: '$Prop',
                    TotalRent: {$sum: '$Rent'},
                    TotalLevy: {$sum: '$Levy'},
                    TotalBond: {$sum: '$Bond'},
                    TotalExpense: {$sum: {$ifNull: ['$Expense.Amount',0]}}
                }
            }
        ])
        const summary = totals[0] || {TotalRent: 0, TotalLevy:0, TotalBond: 0};

        const records = await MonthDB.find({Prop:propty._id}).select('Month Rent Levy Bond Expense')
        
        const Propertydetail = {
            PropertyName: propty.PropertyName,
            location: propty.location,
            TotalRent: summary.TotalRent,
            TotalLevy: summary.TotalLevy,
            TotalBond: summary.TotalBond,
            TotalExpense: summary.TotalExpense,
            Profit: summary.TotalRent - (summary.TotalLevy+ summary.TotalBond + summary.TotalExpense),
            Records: records.map((rec) =>({
                month: rec.Month,
                Rent: rec.Rent,
                Levy: rec.Levy,
                Bond: rec.Bond,
                Expense: rec.Expense
            }))
        };

        return res.status(200).json({success:true,
             message: 'The Property you are searching:',
            Propertydetail})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

