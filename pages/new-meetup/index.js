import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {

    const router = useRouter();

    const addMeetupHandler = async (enteredMeetupData)=>{
      console.log(enteredMeetupData);
      const response = await fetch('/api/new-meetup',{
        method:'POST',
        body:JSON.stringify(enteredMeetupData),
        headers:{
          'Content-Type':'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      router.push('/')
    };

  return (
    <Fragment>
    <Head>

      <title>Add a New Meetups</title>
      <meta  name='description' 
        content='Add your own meetups and create amzing networking opputunity'
      />

    </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    {/* <MeetupList meetups={props.meetups} /> */}
  </Fragment>

  )
}

export default NewMeetupPage;
