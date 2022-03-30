import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify'
import { listPosts } from './graphql/queries'
import { withAuthenticator } from "@aws-amplify/ui-react";
import {HashRouter, Switch, Route } from "react-router-dom";
// code for latest version of amplify/ui-react to handle adding sing out button
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// useEffect(() => {
//     fetchPos
//     }
//
// )



function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    try {
      let postData = await API.graphql({ query: listPosts, variables: { limit: 100 } });
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
                        Hey {user.username}, Amplify KICKS ARSE!!
                    </p>
                    <button onClick={signOut}>Sign out</button>
                </div>
            )}
        </Authenticator>
      </div>


  )
}


export default withAuthenticator(App)