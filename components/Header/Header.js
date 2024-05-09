import Link from "next/link"
import styles from "./Header.module.scss"

export default function Header () {
    return (
        <>
        <header className={styles.header}>
             <ul>
                <li>
                    <Link href="/">Accueil</Link>
                    <Link href="/blog">Blog</Link>
                </li>
             </ul>
        </header>
        </>
    )
}