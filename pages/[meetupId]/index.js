import { MongoClient , ObjectId} from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupDetails from '../../components/meetups/MeetupDetails';

function HomePage(props) {
  return (
    <Fragment>
    <Head>

      <title>{props.meetupData.title}</title>
      <meta  name='description' 
        content={props.meetupData.description}
      />

    </Head>
    <MeetupDetails
        image ={ props.meetupData.image }
        title={ props.meetupData.title }
        address= { props.meetupData.address }
        description={ props.meetupData.description }
      />
    {/* <MeetupList meetups={props.meetups} /> */}
  </Fragment>

  )
}





// Now in general when we specify the dynamic components we usually need to specify
// getStaticPaths 

export async function getStaticPaths() {
  // fetch  id of all the supported path from the data base 
  const client = await MongoClient.connect('mongodb+srv://lonershubhankar:OzO20fK8xqYGrPUv@cluster0.wtoonqf.mongodb.net/meetups?retryWrites=true&w=majority')

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({},{
    _id:1
  }).toArray();

  client.close();


  return {
    // this property means if all the pages are specified here
    // if fallback is false then user will get error in case of imvalid path
    // if fallback is true the it will staticlly generate specified params and dnammically generate others
    // if fallback is set to blocking it will regenerate no of pages with its value and not regenrateextra page every time but cache new value
    // fallback:false,

    fallback:'blocking',

    paths:meetups.map(p=>({
      params:{
        meetupId:p._id.toString()
      }
    })),
  }
}


// Now meetup details ussaly dont change every times
// we probably need getStaticProps here not getServerSideProps which rebuild the page in every request

export async function getStaticProps(context) {
  // featch data for a single meetup
  /**
   * Now context parameter here will  going to have req and res as null
   * but this will going to have params property to get param of router of the page
   */

    const params = context.params;
    const meetupId = params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://lonershubhankar:OzO20fK8xqYGrPUv@cluster0.wtoonqf.mongodb.net/meetups?retryWrites=true&w=majority')

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
  
    const meetups = await meetupsCollection.findOne({
      _id:ObjectId(meetupId)
    });
  
    console.log(meetups);
    client.close();
  


  return {
    props:{
      meetupData:{
        id:meetupId,
        image:meetups.image,
        title:meetups.title,
        description:meetups.description,
        address:meetups.address,
      }
    }
  }
}


export default HomePage;