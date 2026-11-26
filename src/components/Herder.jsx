function Header({ language, setLanguage }){
    const toggleLanguage = () => {
        setLanguage(language === "jp" ? "en" : "jp");
    };
    return(
        <header className="header">
            <h1>SAMURAI MAC</h1>
            <h2>{language === "jp" ? "サムライマックダブル肉厚ビーフ　炙り醤油風" : "Samurai Mac Double Thick Beef – Seared Soy Sauce Style"}</h2>
            <button
                    className="language-button"
                    onClick={toggleLanguage}
                >
                    {language === "jp" ? "EN" : "JP"}
            </button>
        </header>
    )
}

export default Header