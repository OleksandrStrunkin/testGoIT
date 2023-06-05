import styles from "./Card.module.css"
import pic from "../Image/picture.png"
import logo from "../Image/Logo.png"


import { useState, useEffect } from 'react';

export default function Card({ user }) {
  const [following, setFollowing] = useState(() => {
    const storedFollowing = localStorage.getItem(`following_${user.id}`);
    return storedFollowing ? JSON.parse(storedFollowing) : false;
  });
  const [followers, setFollowers] = useState(() => {
    const storedFollowers = localStorage.getItem(`followers_${user.id}`);
    return storedFollowers ? JSON.parse(storedFollowers) : user.followers;
  });

  useEffect(() => {
    const storedFollowing = localStorage.getItem(`following_${user.id}`);
    const storedFollowers = localStorage.getItem(`followers_${user.id}`);
    if (storedFollowing !== null) {
      setFollowing(JSON.parse(storedFollowing));
    }
    if (storedFollowers !== null) {
      setFollowers(JSON.parse(storedFollowers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`following_${user.id}`, JSON.stringify(following));
    localStorage.setItem(`followers_${user.id}`, JSON.stringify(followers));
  }, [followers, following]);

  const handleClick = () => {
    if (following) {
      setFollowing(false);
      setFollowers(followers - 1);
    } else {
      setFollowing(true);
      setFollowers(followers + 1);
    }
  };

  const formattedFollowers = followers.toLocaleString();

  return (
    <div className={styles.card}>
      <img src={logo} className={styles.logo} />
      <img src={pic} className={styles.images} />
      <div className={styles.line}>
        <div className={styles.circle}>
          <img src={user.avatarUrl} className={styles.photo} />
        </div>
      </div>
      <p className={styles.text}>{user.tweets} tweets</p>
      <p className={styles.text}>{formattedFollowers.replace(/\s/g, ',')} Followers</p>
      <button
        className={following ? styles.btnFollowing : styles.btn}
        onClick={handleClick}
      >
        {following ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}