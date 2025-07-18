"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Star, Sparkles, Gift, Cake, Volume2 } from "lucide-react"

export default function BirthdayPage() {
  const [showMainPage, setShowMainPage] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentWish, setCurrentWish] = useState(0)
  const [showSurprise, setShowSurprise] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [playingAudio, setPlayingAudio] = useState<number | null>(null)
  const [showCakeWithCandles, setShowCakeWithCandles] = useState(false) // New state for cake animation

  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])
  const mainAudioRef = useRef<HTMLAudioElement | null>(null)

  const wishes = [
    "💖 Chúc mừng ManKing tuổi mới nhiều niềm vui như khi thấy cảnh tắm suối trong anime. Và may mắn hơn cả main sống dai như ruồi, mà gái vẫn yêu! 💖",
    "🎂 Happy Birthday Manking - người đàn ông với ước mơ có 7 waifu mỗi ngày trong tuần!! 🎂",
    "🌸 Chúc mừng sinh nhật Manking – thánh địa của gái Nhật, trùm cuối của làng otaku, người duy nhất xem anime không tua cảnh đối thoại! 🌸",
    "⭐ NanaShi Mumei Gái Nhật đang trên đường đến Việt Nam gặp ManKing đó, chỉ là kẹt visa 10 năm nữa mới tới! ⭐",
    "🎁 Sinh nhật vui vẻ, Minh Mẫn ơi! 🎁",
    "💖 Chúc bạn có một ngày sinh nhật thật đặc biệt! 💖",
  ]

  const animeGirls = [
    {
      name: "Sakura",
      color: "from-pink-400 to-pink-600",
      emoji: "🌸",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQzY4-mc3ZwxZBEpbLwIJ0AelhTqsUQjI5rA&s",
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/giong-gai-anime-HDojAPJhSTU8oKuHEPxVQToe4E6Jl8.wav",
      quote: "Kyaa~ Arigatou gozaimasu! 🌸",
    },
    {
      name: "NanaShi Mumei",
      color: "from-purple-400 to-purple-600",
      emoji: "💜",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYx-1OKD-6Tqbbfc3hztcruacAJD1eeXJ_Kw&s",
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/giong-gai-anime-HDojAPJhSTU8oKuHEPxVQToe4E6Jl8.wav",
      quote: "Hoo hoo~ ManKing-kun! 💜",
    },
    {
      name: "Miku",
      color: "from-cyan-400 to-cyan-600",
      emoji: "🎵",
      image:
        "https://w0.peakpx.com/wallpaper/30/88/HD-wallpaper-hatsune-miku-swimsuit-pretty-beautiful-anime-hot-beauty-checkered-vocaloids-blue-eyes-blue-vocaloid-twintail-miku-black-sexy-bikini-cute-hatsune-cool-blue-hair-white.jpg",
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/giong-gai-anime-HDojAPJhSTU8oKuHEPxVQToe4E6Jl8.wav",
      quote: "Miku desu! Let's sing together! 🎵",
    },
    {
      name: "Senpai Rabbit",
      color: "from-orange-400 to-orange-600",
      emoji: "🔥",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSic3TuYqGJS9K5gJh-C-fISBOQmTkNLDLZtw&s",
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/giong-gai-anime-HDojAPJhSTU8oKuHEPxVQToe4E6Jl8.wav",
      quote: "Senpai noticed me! Kyaa~ 🔥",
    },
    {
      name: "Zero Two",
      color: "from-red-400 to-red-600",
      emoji: "💕",
      image: "https://i.redd.it/0d88h974u9i41.jpg",
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/giong-gai-anime-HDojAPJhSTU8oKuHEPxVQToe4E6Jl8.wav",
      quote: "Darling~ Happy Birthday! 💕",
    },
    {
      name: "Rem",
      color: "from-blue-400 to-blue-600",
      emoji: "💙",
      image: "https://m.media-amazon.com/images/I/71FEp3CLgXL._UF1000,1000_QL80_.jpg",
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/giong-gai-anime-HDojAPJhSTU8oKuHEPxVQToe4E6Jl8.wav",
      quote: "Rem loves ManKing-sama! 💙",
    },
  ]

  useEffect(() => {
    if (showMainPage) {
      const interval = setInterval(() => {
        setCurrentWish((prev) => (prev + 1) % wishes.length)
      }, 3000)
      // Trigger initial confetti/fireworks when main page loads
      triggerConfetti()
      return () => clearInterval(interval)
    }
  }, [showMainPage, wishes.length])

  // Auto-play main audio when main page is shown
  useEffect(() => {
    if (showMainPage && mainAudioRef.current) {
      mainAudioRef.current.play().catch((error) => {
        if (error.name === "AbortError") {
          console.warn("Audio play was interrupted (likely by user interaction or browser policy).")
        } else {
          console.error("Error playing main audio:", error)
        }
      })
    }
  }, [showMainPage]) // Dependency on showMainPage

  const openInvitation = () => {
    setIsOpening(true)
    setShowConfetti(true)

    setTimeout(() => {
      setShowMainPage(true)
    }, 2000)

    setTimeout(() => {
      setShowConfetti(false)
    }, 4000)
  }

  const playAudio = (index: number) => {
    // Stop any currently playing audio from cards
    audioRefs.current.forEach((audio, i) => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    })

    const audio = audioRefs.current[index]
    if (audio) {
      setPlayingAudio(index)
      audio.currentTime = 0 // Reset audio to start
      audio.play().catch((error) => {
        if (error.name === "AbortError") {
          console.warn("Audio play was interrupted for card audio (likely by rapid clicks).")
        } else {
          console.error("Error playing card audio:", error)
        }
      })

      audio.onended = () => {
        setPlayingAudio(null)
      }
    }
  }

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const showSurpriseMessage = () => {
    setShowSurprise(true)
    setTimeout(() => setShowSurprise(false), 4000)
  }

  const blowCandles = () => {
    setShowCakeWithCandles(true)
    setTimeout(() => {
      setShowCakeWithCandles(false)
    }, 5000) // Show cake for 5 seconds
  }

  // Invitation Card Component
  if (!showMainPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* Background Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ["#ff69b4", "#ff1493", "#9370db", "#00bfff", "#ffd700"][
                    Math.floor(Math.random() * 5)
                  ],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Invitation Card */}
        <Card
          className={`max-w-md mx-4 bg-gradient-to-br from-pink-200 to-purple-200 border-4 border-gold shadow-2xl transform transition-all duration-1000 ${isOpening ? "scale-110 rotate-12" : "hover:scale-105"}`}
        >
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                THIỆP MỜI
              </h1>
              <div className="text-5xl mb-4">🎂</div>
            </div>

            <div className="mb-6 space-y-3">
              <h2 className="text-2xl font-bold text-purple-700">SINH NHẬT</h2>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                MINH MẪN
              </h3>
              <p className="text-xl text-purple-600 font-semibold">aka ✨ MANKING ✨</p>
            </div>

            <div className="mb-6 p-4 bg-white/50 rounded-lg border-2 border-pink-300">
              <p className="text-lg text-purple-700 font-medium mb-2">🌸 Chúc mừng sinh nhật Otaku số 1! 🌸</p>
              <p className="text-md text-pink-600">Cùng tham gia bữa tiệc sinh nhật đặc biệt với đầy đủ waifu!</p>
            </div>

            <div className="mb-6 text-4xl space-x-2">
              <span className="animate-bounce inline-block" style={{ animationDelay: "0s" }}>
                🎊
              </span>
              <span className="animate-bounce inline-block" style={{ animationDelay: "0.1s" }}>
                🎁
              </span>
              <span className="animate-bounce inline-block" style={{ animationDelay: "0.2s" }}>
                🌸
              </span>
              <span className="animate-bounce inline-block" style={{ animationDelay: "0.3s" }}>
                💖
              </span>
              <span className="animate-bounce inline-block" style={{ animationDelay: "0.4s" }}>
                ✨
              </span>
            </div>

            <Button
              onClick={openInvitation}
              disabled={isOpening}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-lg"
            >
              {isOpening ? (
                <>
                  <Sparkles className="mr-2 animate-spin" size={24} />
                  Đang mở thiệp... 🎆
                </>
              ) : (
                <>
                  <Gift className="mr-2" size={24} />
                  Mở Thiệp Sinh Nhật! 🎉
                </>
              )}
            </Button>

            <div className="mt-4 text-sm text-purple-600">Click để bắt đầu bữa tiệc! 🎈</div>
          </CardContent>
        </Card>

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-400 animate-pulse opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
              size={20 + Math.random() * 20}
            />
          ))}
        </div>
      </div>
    )
  }

  // Main Birthday Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 relative overflow-hidden animate-fadeIn">
      {/* Main MP3 Audio */}
      <audio ref={mainAudioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Anime%20Girls%20singing%20Happy%20Birthday-BqqvV94iXxeihlcyW31LdLNVounzre.mp3" loop preload="auto" />

      {/* Audio elements for cards */}
      {animeGirls.map((girl, index) => (
        <audio key={index} ref={(el) => (audioRefs.current[index] = el)} preload="auto">
          <source src={girl.audio} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      ))}

      {/* Animated Anime Girls */}
      <img
        src="/images/anime-girl-white-hair.png" // Updated image
        alt="Anime Girl with Sword"
        className="fixed bottom-0 left-0 h-full w-auto object-contain z-0 animate-slideInFromLeft"
        style={{ maxHeight: "100vh", width: "auto" }}
      />
      <img
        src="/images/erza-maid-bikini.png"
        alt="Anime Girl Black Hair"
        className="fixed bottom-0 right-0 h-full w-auto object-contain z-0 animate-slideInFromRight"
        style={{ maxHeight: "100vh", width: "auto" }}
      />

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-pink-400 animate-bounce opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
            size={16 + Math.random() * 16}
          />
        ))}
      </div>

      {/* Confetti Effect (Firework) */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 animate-ping rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 1.5}s`, // Varied duration for burst
                transform: `scale(${0.5 + Math.random() * 1.5})`, // Varied size
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4 animate-pulse">
            🎉 HAPPY BIRTHDAY 🎉
          </h1>
          <h2 className="text-4xl font-bold text-purple-600 mb-2">MINH MẪN</h2>
          <p className="text-2xl text-pink-500 font-semibold">aka ✨ MANKING ✨</p>
        </div>

        {/* Rotating Wishes */}
        <div className="text-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border-2 border-pink-200 inline-block">
            <p className="text-2xl font-bold text-purple-600 animate-pulse">{wishes[currentWish]}</p>
          </div>
        </div>

        {/* Anime Girls Title */}
        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
            💕 Đây là vợ của ManKing 💕
          </h3>
          <p className="text-xl text-purple-600 font-semibold">Harem của Otaku số 1! 🌸✨</p>
          <p className="text-md text-pink-500 mt-2">Click vào từng waifu để nghe giọng nói! 🎵</p>
        </div>

        {/* Anime Girls Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {animeGirls.map((girl, index) => (
            <Card
              key={index}
              className={`group hover:scale-105 transition-transform duration-300 cursor-pointer border-2 shadow-lg ${
                playingAudio === index ? "border-yellow-400 shadow-yellow-200" : "border-pink-200"
              }`}
              onClick={() => playAudio(index)}
            >
              <CardContent className="p-4">
                <div
                  className={`w-full h-48 bg-gradient-to-br ${girl.color} rounded-lg mb-3 flex items-center justify-center relative overflow-hidden shadow-inner`}
                >
                <img
                  src={girl.image || "/placeholder.svg"}
                  alt={`Anime girl ${girl.name}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <Sparkles className="absolute top-2 right-2 text-white animate-spin" size={16} />

                  {/* Audio indicator */}
                  <div className="absolute bottom-2 right-2">
                    <Volume2 className={`text-white ${playingAudio === index ? "animate-pulse" : ""}`} size={16} />
                  </div>

                  {/* Quote bubble when playing */}
                  {playingAudio === index && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 text-purple-600 text-xs px-2 py-1 rounded-full whitespace-nowrap animate-bounce">
                      {girl.quote}
                    </div>
                  )}
                </div>
                <p className="text-center font-bold text-purple-600">{girl.name}</p>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={12} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            onClick={triggerConfetti}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Sparkles className="mr-2" size={20} />
            Bắn Pháo Hoa! 🎆
          </Button>

          <Button
            onClick={showSurpriseMessage}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Gift className="mr-2" size={20} />
            Surprise! 🎁
          </Button>

          <Button
            onClick={blowCandles} // Call blowCandles function
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Cake className="mr-2" size={20} />
            Thổi Nến! 🕯️
          </Button>
        </div>

        {/* Surprise Message */}
        {showSurprise && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <Card className="bg-gradient-to-br from-pink-400 to-purple-500 p-8 text-center max-w-md mx-4 border-4 border-yellow-300 shadow-2xl animate-bounce">
              <CardContent>
                <h3 className="text-3xl font-bold text-white mb-4">🎊 SURPRISE! 🎊</h3>
                <p className="text-xl text-white mb-4">
                  Chúc Manking luôn được bao quanh bởi những cô gái anime xinh đẹp!
                </p>
                <p className="text-lg text-yellow-200">Mong bạn có một tuổi mới tràn đầy niềm vui và hạnh phúc! 💖✨</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Birthday Cake Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-pink-300">
            <div className="text-8xl mb-4">🎂</div>
            <h3 className="text-3xl font-bold text-purple-600 mb-4">Bánh Sinh Nhật Đặc Biệt</h3>
            <p className="text-lg text-pink-600 mb-4">Dành riêng cho Otaku số 1! 🌸</p>
            <div className="flex justify-center space-x-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                  🕯️
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cake with Burning Candles Animation */}
        {showCakeWithCandles && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn">
            <div className="relative bg-white p-8 rounded-lg shadow-xl animate-fadeIn">
              <h3 className="text-3xl font-bold text-center text-purple-700 mb-6">Happy Birthday!</h3>
              <div className="relative w-64 h-40 bg-pink-300 rounded-b-full mx-auto mb-4 shadow-lg">
                {/* Cake layers */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-pink-400 rounded-b-full"></div>
                <div className="absolute bottom-10 left-2 right-2 h-10 bg-pink-500 rounded-b-full"></div>
                <div className="absolute bottom-20 left-4 right-4 h-10 bg-pink-600 rounded-b-full"></div>

                {/* Candles */}
                <div className="absolute top-0 left-0 right-0 flex justify-around px-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative w-2 h-8 bg-yellow-300 rounded-t-sm">
                      <div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-orange-400 rounded-full animate-pulse"
                        style={{ boxShadow: "0 0 8px 2px rgba(255, 165, 0, 0.7)" }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-center text-lg text-purple-600">Make a wish, ManKing! ✨</p>
            </div>
          </div>
        )}

        {/* Footer Message */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-pink-200 to-purple-200 border-2 border-pink-300 shadow-lg">
            <CardContent className="p-6">
              <h4 className="text-2xl font-bold text-purple-700 mb-4">💝 Lời Chúc Đặc Biệt 💝</h4>
              <p className="text-lg text-purple-600 mb-2">Chúc Minh Mẫn (Manking) có một sinh nhật thật ý nghĩa!</p>
              <p className="text-md text-pink-600 mb-2">Mong bạn luôn giữ được niềm đam mê anime và manga! 🌸</p>
              <p className="text-md text-cyan-600">Tuổi mới nhiều sức khỏe, hạnh phúc và thành công! ⭐</p>
              <div className="mt-4 text-4xl">🎉🎂🎁🌸💖✨🎊🌟</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-400 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
            size={12 + Math.random() * 8}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        @keyframes slideInFromLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInFromLeft {
          animation: slideInFromLeft 2s ease-out forwards;
        }

        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInFromRight {
          animation: slideInFromRight 2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
