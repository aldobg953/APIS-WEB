"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './marvel.module.css';
import md5 from 'md5';

export default function MarvelPage() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.lordicon.com/lordicon.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const fetchMarvelCharacters = async () => {
            const publicKey = 'f308cd586ea9452ad15bb4045a37692f';
            const privateKey = 'b1d336afee0d0135d02b46bc843b70b831bb742e';
            const ts = '1';
            const hash = md5(ts + privateKey + publicKey);

            try {
                const response = await axios.get(
                    `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`
                );
                setCharacters(response.data.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Marvel characters:', error);
                setError('Failed to load characters');
                setLoading(false);
            }
        };

        fetchMarvelCharacters();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                <lord-icon
                    src="https://cdn.lordicon.com/lqxfrxad.json"
                    trigger="loop"
                    state="loop-expand"
                    colors="primary:#ffffff"
                >
                </lord-icon>
                <div>Loading characters</div>
                <a className={styles.backHome} href="/">&larr; Back</a>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                <lord-icon
                    src="https://cdn.lordicon.com/vihyezfv.json"
                    trigger="in"
                    colors="primary:#f75151"
                >
                </lord-icon>
                <div>{error}</div>
                <a className={styles.backHome} href="/">&larr; Back</a>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <a className={styles.backHome} href="/">&larr; Back</a>
                <h1 className={styles.title}>Marvel Characters</h1>
            </header>
            <div className={styles.grid}>
                {characters.map((character) => (
                    <div key={character.id} className={styles.card}>
                        <img
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            alt={character.name}
                            className={styles.characterImage}
                        />
                        <h3>{character.name}</h3>
                    </div>
                ))}
            </div>

            <footer className={styles.footer}>
            <a href="https://matias.me/nsfw/">by Aldo Barrera</a>
            </footer>
        </div>
    );
}
