
import { useState } from 'react'
import Navbar from './Navbar'
import Home from './Home'
import MovieDetails from './MovieDetails'
import Login from './Login'
import AdminDashboard from './AdminDashboard'

function App() {
const [selectedMovie, setSelectedMovie] = useState(null)
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [role, setRole] = useState('')

  const movies = [
    {
      name: "Oppenheimer",
      image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
      rating: "8.3",
      year: "2023",
      genre: "Drama",
      language: "English",
      story: "The story of scientist J. Robert Oppenheimer."
    },
    {
      name: "The Dark Knight",
      image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: "9.0",
      year: "2008",
      genre: "Action",
      language: "English",
      story: "Batman protects Gotham City from crime."
    },
    {
      name: "Joker",
      image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
      rating: "8.4",
      year: "2019",
      genre: "Drama",
      language: "English",
      story: "A man faces difficult experiences in Gotham City."
    },
    {
      name: "Interstellar",
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: "8.7",
      year: "2014",
      genre: "Sci-Fi",
      language: "English",
      story: "Explorers travel through space to find a new home."
    },
    {
      name: "Manjummel Boys",
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/73a041192636849.65def29b86704.jpg",
      rating: "8.2",
      year: "2024",
      genre: "Thriller",
      language: "Malayalam",
      story: "A group of friends face a dangerous situation during a trip."
    },
    {
      name: "Premalu",
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/88dcec185852421.656ae6cd212da.jpg",
      rating: "7.8",
      year: "2024",
      genre: "Romance",
      language: "Malayalam",
      story: "A young man experiences love and friendship."
    },
    {
      name: "Aavesham",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MvcBqC-OblZIvRYMlX8wRyczFm80Zz5rFEg_xrRTaA&s=10",
      rating: "7.8",
      year: "2024",
      genre: "Action",
      language: "Malayalam",
      story: "Three college students meet a powerful gangster."
    },
    {
      name: "2018",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPNh2JkX6oEdJDFwjAs96_bJI0k4tN514rKEPM2jPfpQ&s=10",
      rating: "7.7",
      year: "2023",
      genre: "Drama",
      language: "Malayalam",
      story: "People unite during a devastating flood."
    },
    {
      name: "Vikram",
      image: "https://www.tallengestore.com/cdn/shop/files/Vikram-KamalHaasan-TamilMoviePoster2_18245138-8aa1-4619-a9eb-9ad060ab80bf.jpg?v=1714521548",
      rating: "8.3",
      year: "2022",
      genre: "Action",
      language: "Tamil",
      story: "A special team investigates mysterious crimes."
    },
    {
      name: "Leo",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyjwl8SbM8NDor-a_L-Z92i7fkE8tMkIpkDhAgN-veMw&s=10",
      rating: "7.2",
      year: "2023",
      genre: "Action",
      language: "Tamil",
      story: "A café owner faces a dangerous past."
    },
    {
      name: "Jailer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuW8v03lxE2Cs8Uv2UjLwcH8_5ifUxXg_gWPmTqOgKCX-SJ2O__4KuNHmo&s=10",
      rating: "7.1",
      year: "2023",
      genre: "Action",
      language: "Tamil",
      story: "A retired jailer protects his family."
    },
    {
      name: "Amaran",
      image: "https://preview.redd.it/amaran-first-look-poster-v0-ju7q4q14oxic1.jpeg?auto=webp&s=97ac5557e7ab36fc01a8d1bf04313aec688244af",
      rating: "8.2",
      year: "2024",
      genre: "Drama",
      language: "Tamil",
      story: "A biographical drama about an Indian Army officer."
    }
  ]
if (!isLoggedIn) {
  return (
    <Login
      onLogin={(userRole) => {
        setIsLoggedIn(true)
        setRole(userRole)
      }}
    />
  )
}
  return (
    <div>
      <Navbar />


    {role === 'admin' ? (
      <AdminDashboard />
    ) : selectedMovie ? (
      <MovieDetails
        movie={selectedMovie}
        onBack={() => setSelectedMovie(null)}
      />
    ) : (
<Home
  onMovieClick={setSelectedMovie}
  initialMovies={movies}
/>
    )}

    </div>
  )
}

export default App
