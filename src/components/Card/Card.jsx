import styles from "./Card.module.css"


export default function Card () {
    return (
        <div className={styles.card}>
            <p>700 tweets</p>
            <p>100000 Followers</p>
            <button>Follow</button>
        </div>
    )
}