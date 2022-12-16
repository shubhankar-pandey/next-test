import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'
import { Fragment } from 'react';
import Head from 'next/head';

function HomePage(props) {

  return (
    <Fragment>
      <Head>

        <title>React Meetups</title>
        <meta  name='description' 
          content='Browse a huge list of higly active React Meetups'
        />

      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export async function getStaticProps(){
  // fetch data from and API
  // Now this code will be present in server side 
  // credentials wil not be exposed everything will be preserver
  // So this is safe

  const client = await MongoClient.connect('mongodb+srv://lonershubhankar:OzO20fK8xqYGrPUv@cluster0.wtoonqf.mongodb.net/meetups?retryWrites=true&w=majority')

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props:{
      meetups:meetups.map((p,index)=>({title:p.title,image:p.image,address:p.address,id:p._id.toString()}))
    },
    // After how many time we should revalitate the server value every 1 sec 
    // or how much time taken to use it
    revalidate:1
  }
};

// get Server Side props
// this will generate not on build process
// but almost every time on the server after deployment

// export async function getServerSideProps(context) {
//   /***
//    * When to use getServerSideProps
//    * 1. When data changes every seconds and even revalitate cant help you 
//    * 2. When u need addition authentication in request for which type of user it access
//    * 3. When u need to access req object on every request the page is loaded
//    * 4.
//    * 
//    */
//   const req = context.req;
//   const res = context.res;
//   // featch data from an API or a file syestem 
//   return {
//     props:{
//       meetups:DUMMY_MEETUPS
// // this function run for every incoming request anyway so revalitatedoesnt make any sense
//     }
//   }
// }

export default HomePage