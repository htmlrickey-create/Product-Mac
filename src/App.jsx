
import { useState } from 'react'
import './App.css'
import Header from './components/Herder'
import Hero from './components/Hero'

function App() {

    const [language, setLanguage] = useState("jp");

    return (
        <>
            <Header
                language={language}
                setLanguage={setLanguage}
            />

            <Hero language={language} />

            <div className="source-section" id="source">

                <h1 className="UniqName">
                    {language === "jp"
                        ? "公式ページ等掲載欄"
                        : "OFFICIAL SOURCES"}
                </h1>

                <p className="source-text">
                    {language === "jp"
                        ? "各情報元: MCDONALD様"
                        : "Sources: McDonald's"}
                </p>

                <a
                    className="UniqLink"
                    href="https://www.mcdonalds.co.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {language === "jp"
                        ? "公式ページ"
                        : "Official Website"}
                </a>

                <a
                    className="UniqLink"
                    href="https://www.mcdonalds.co.jp/products/1220/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {language === "jp"
                        ? "今回紹介したサムライマックダブル肉厚ビーフ（炙り醤油風）公式ページ"
                        : "Official Page - Samurai Mac Double Thick Beef (Roasted Soy Sauce Flavor)"}
                </a>

            </div>
        </>
    )
}

export default App
