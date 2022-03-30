// src/App.js
import React, { useState, useEffect } from 'react';

// import API from Amplify library
import { API } from 'aws-amplify'

// import query definition
import { listPosts } from './graphql/queries'

//import the withAuthenticator component
import { withAuthenticator } from "@aws-amplify/ui-react";

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log({ err })
    }
  }
  return (
      <div>
        <h1>Hello Posters</h1>
        {
          posts.map(post => (
              <div key={post.id}>
                <h3>{post.name}</h3>
                <p>{post.location}</p>
                <p>{post.id}</p>
                <p>{post.author}</p>
              </div>
          ))
        }
        <Authenticator>
            {({ signOut, user }) => (
                <div className="App">
                    <p>
                        Hey {user.username}, welcome to my channel, with auth!
                    </p>
                    <button onClick={signOut}>Sign out</button>
                </div>
            )}
        </Authenticator>
      </div>


  )
}

export default withAuthenticator(App)