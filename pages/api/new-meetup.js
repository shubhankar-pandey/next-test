import {MongoClient} from 'mongodb'

// api/new-meetup
// POST  api/new-meetup
// each route has an handler function to handle send of data and this will only
// run on server not on front end


async function handler(req,res) {
    // and this req file will going to have a req bar which will contain req type
    if (req.method === 'POST') {
        // this will going to be data of post req
        const data  = req.body;

        const {title, image, address, description} = data;
        const client = await MongoClient.connect('mongodb+srv://lonershubhankar:OzO20fK8xqYGrPUv@cluster0.wtoonqf.mongodb.net/meetups?retryWrites=true&w=majority')

        const db = client.db();
        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({
            message:'Meetup Inserted'
        })

    }

    
}


export default handler;