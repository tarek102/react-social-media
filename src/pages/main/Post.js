import React, { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Post = (props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState(null)
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id))

  const addLike = async() => {
    try{
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id
      })
      
      if (user) {
        setLikes((prev) => 
          prev ? [...prev, {userId: user.uid, likeId: newDoc.id }] : [{userId: user.uid, likeId: newDoc.id }]
        )
      }
    } catch(e) {
      console.log(e);
    }
      
  };

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id})));
  }

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

  const deleteLike = async() => {
    try{
      const likesToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likesToDeleteData = await getDocs(likesToDeleteQuery);
      const likeId = likesToDeleteData.docs[0].id;

      const likesToDelete = doc(db, "likes", likeId)
      await deleteDoc(likesToDelete)
      
      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId))
      }
    } catch(e) {
      console.log(e);
    }
      
  };

  
  
  useEffect(() => {
    getLikes();
  }, []);
    
  return (
    <div className='each-post'>
      <h2 className='post-title'>{post.title}</h2>
      <p className='post-desc'>
        {post.description}
      </p>
      <h4 className='post-author'>{post.username}</h4>
      <button onClick={hasUserLiked ? deleteLike : addLike}>{hasUserLiked?<>&#128078;</> : <>&#128077;</>}</button>
      {likes && <p>Likes: {likes?.length} </p>}
    </div>
  )
}

export default Post