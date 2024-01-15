import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Post from "./Post";

function Main() {
  const [postsList, setPostsList] = useState(null);
  const postRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postRef);
    
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  };
  

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {postsList?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Main;
