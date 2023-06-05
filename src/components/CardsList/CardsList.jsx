import { useEffect, useState } from "react";
import { getUsers } from "../api/api"
import Card from '../Card/Card';
import styles from "./CardList.module.css"

export default function CardsList() {
    const [users, setUsers] = useState([]);
    const [visibleUsers, setVisibleUsers] = useState([]);
    const [page, setPage] = useState(1);
    const perPage = 3;
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const fetchedUsers = await getUsers();
          setUsers(fetchedUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
    }, []);
  
    useEffect(() => {
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const usersToDisplay = users.slice(startIndex, endIndex);
      if (page === 1) {
        setVisibleUsers(usersToDisplay);
      } else {
        setVisibleUsers((prevUsers) => [...prevUsers, ...usersToDisplay]);
      }
    }, [users, page]);
    
    const handleLoadMore = () => {
      if (visibleUsers.length < users.length) {
        setPage(page + 1);
      }
    };

    return (
        <>
        {visibleUsers.map((user) => (
        <Card key={user.id} user={user} />
      ))}
        {visibleUsers.length < users.length && (
        <button onClick={handleLoadMore} className={styles.button}>Load More</button>
      )}
        </>
    )
}