import { useState, useEffect } from "react"

function Hero({ language }) {

    const [phase, setPhase] = useState("normal")
    const [contentType, setContentType] = useState("main")
    const [nextContent, setNextContent] = useState(null)
    const [charCount, setCharCount] = useState(0)

    const [clickCount, setClickCount] = useState(0)
    const [secretLocked, setSecretLocked] = useState(false)

    const [isJump, setIsJump] = useState(false)

    const [couponUsed, setCouponUsed] = useState(false)

    const price = 590
    const discount = 190
    const finalPrice = couponUsed ? price - discount : price

    const handleBackgroundClick = (event) => {

        if (event.target !== event.currentTarget) return

        setIsJump(true)

        setTimeout(() => {
            setIsJump(false)
        }, 600)

        if (phase !== "normal") return

        if (secretLocked) return

        const newCount = clickCount + 1
        setClickCount(newCount)


        if (newCount >= 5) {
            setSecretLocked(true)
            handleClick("secret")
        }
    }


    const scrambleText = (text) => {

        if (phase !== "glitch" && phase !== "melt") {
            return text
        }

        return [...text].map((char, index) => {

            if (char === " " || char === "\n") return char

            return index < charCount ? "?" : char

        }).join("")
    }

    useEffect(() => {

        if (phase === "glitch") {

            const interval = setInterval(() => {
                setCharCount(prev => prev + 1)
            }, 40)

            const timer = setTimeout(() => {
                setPhase("melt")
            }, 700)

            return () => {
                clearInterval(interval)
                clearTimeout(timer)
            }
        }

        if (phase === "melt") {

            const timer = setTimeout(() => {
                setContentType(nextContent)
                setCharCount(0)
                setPhase("reveal")
            }, 800)

            return () => clearTimeout(timer)
        }

        if (phase === "reveal") {

            const timer = setTimeout(() => {
                setPhase("normal")
            }, 700)

            return () => clearTimeout(timer)
        }

    }, [phase])


    const handleClick = (type) => {

        if (phase !== "normal") return
        if (contentType === type) return

        setNextContent(type)
        setCharCount(0)
        setPhase("glitch")
    }

    const texts = {
        jp: {
            main: {
                title: "サムライマック 炙り醤油風ダブル肉厚ビーフ",
                subtitle: "マクドナルドで最高の贅沢を。",
                description: "肉厚・濃厚な旨味・贅沢"
            },

            materials: {
                title: "原材料詳細",
                subtitle: "原材料情報",
                description: "小麦粉・牛肉・チーズ・玉ねぎ・炙り醤油風ソース"
            },

            allergens: {
                title: "アレルゲン情報",
                subtitle: "アレルギー情報",
                description: "小麦・乳・卵・ごま・大豆・鶏肉・牛肉・豚肉"
            },

            nutrition: {
                title: "栄養成分情報",
                subtitle: "栄養成分",
                description: "エネルギー 633kcal / たんぱく質 38.0g / 脂質 37.1g"
            },

            secret: {
                title: "僕の感想",
                subtitle: "シークレット：投稿主のレビュー",
                description: `個人的にはマックに行って何食べようか迷ったらこれにします。
                たまねぎの食感と、ソースと牛肉の絡み方がとても自分好みで食べた瞬間幸せな気持ちになります。`
            }
        },

        en: {
            main: {
                title: "Samurai Mac Double Thick Beef",
                subtitle: "A premium indulgence at McDonald's.",
                description: "Thick beef, rich flavor, and indulgence."
            },

            materials: {
                title: "Ingredients",
                subtitle: "Ingredient Information",
                description: "Wheat flour, beef, cheese, onions, and roasted soy-style sauce."
            },

            allergens: {
                title: "Allergen Information",
                subtitle: "Allergen Details",
                description: "Wheat, milk, eggs, sesame, soy, and others."
            },

            nutrition: {
                title: "Nutrition Information",
                subtitle: "Nutritional Facts",
                description: "Energy 633 kcal / Protein 38.0 g / Fat 37.1 g"
            },

            secret: {
                title: "My Review",
                subtitle: "SECRET: Personal Review",
                description: `Whenever I visit McDonald's and can't decide what to order, this is my go-to choice.
                I love the texture of the onions and how the sauce blends with the beef. Every bite makes me happy.`
            }
        }
    };

    const title = texts[language][contentType].title;
    const subtitle = texts[language][contentType].subtitle;
    const description = texts[language][contentType].description;


    return (
        <section
            className={`hero ${isJump ? "jump" : ""}`}
            onClick={handleBackgroundClick}
        >

            <div className="hero-content">

                <div className={`hero-text ${phase}`}>

                    <p className="hero-subtitle">
                        {scrambleText(subtitle)}
                    </p>

                    <h2>
                        {scrambleText(title)}
                    </h2>

                    <div className="hero-details">
                        {scrambleText(description)}
                    </div>

                </div>

                <div className="hero-buttons">

                    <button onClick={() => handleClick("materials")}>
                        {language === "jp" ? "原材料" : "Ingredients"}
                    </button>

                    <button onClick={() => handleClick("allergens")}>
                        {language === "jp" ? "アレルゲン" : "Allergens"}
                    </button>

                    <button onClick={() => handleClick("nutrition")}>
                        {language === "jp" ? "栄養成分" : "Nutrition"}
                    </button>

                    <button onClick={() => handleClick("main")}>
                        {language === "jp" ? "商品紹介" : "Product"}
                    </button>

                    {secretLocked && (
                        <button onClick={() => handleClick("secret")}>
                            {language === "jp" ? "秘密の感想" : "My Review"}
                        </button>
                    )}

                </div>

                <div className={`price-area ${couponUsed ? "coupon-active" : ""}`}>

                    <p className="price-label">
                        {language === "jp" ? "値段" : "PRICE"}
                    </p>

                    <div className="price">
                        {language === "jp"
                        ? `${finalPrice.toLocaleString()}円`
                        : `¥${finalPrice.toLocaleString()}`}
                    </div>

                    {couponUsed && (
                        <p className="discount-text">
                            {language === "jp"
                             ? "190円引き適用中"
                             : "¥190 discount applied"}
                        </p>
                    )}

                    <button
                        className="coupon-button"
                        onClick={() => setCouponUsed(!couponUsed)}
                    >
                        {couponUsed
                        ? (language === "jp" ? "クーポン解除" : "Remove Coupon")
                        : (language === "jp" ? "クーポン使用後の値段推測" : "Use Coupon")}
                    </button>

                    <p className="price-note">
                        {language === "jp"
                        ? "※価格・割引額は紹介用の概算です。"
                        : "*Price and discount are approximate for presentation purposes."}
                    </p>

                </div>

            </div>

        </section>
    )
}

export default Hero