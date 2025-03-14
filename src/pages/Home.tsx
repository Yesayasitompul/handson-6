const Home = () => {

  return (
    <div className="flex flex-col space-y-20">

      <div className="relative w-full h-screen flex items-center justify-center text-center text-white bg-gradient-to-b from-black/50 to-transparent">
        <img className="absolute inset-0 w-full h-full object-cover brightness-50" src="https://i.pinimg.com/474x/f1/ca/4a/f1ca4a2b4143a4ce875b20261bc91a4c.jpg" alt="hero-bg" />
        <div className="relative z-10 flex flex-col space-y-6 max-w-2xl text-center">
          <p className="font-bold lg:text-7xl md:text-5xl text-3xl">Halo dan Selamat Datang!</p>
          <p className="font-medium text-lg md:text-2xl">Kami hadir untuk memberikan pengalaman unik dan berkesan bagi Anda.</p>
        </div>
      </div>

      <div className="bg-gray-50 py-20">
        <div className="flex flex-col space-y-20 p-6 mx-auto max-w-6xl">
          <p className="font-bold text-3xl md:text-5xl text-center text-gray-800">Jelajahi Layanan Terbaru Kami!</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img className="rounded-3xl shadow-lg w-full" src="https://img.freepik.com/free-photo/silver-aesthetic-wallpaper-with-shopping-cart_23-2149871753.jpg" alt="Produk Kami" />
            <div className="flex flex-col justify-center space-y-6 p-8 rounded-3xl bg-white shadow-md">
              <p className="w-fit py-2 px-6 rounded-full font-bold text-gray-800 bg-gray-200">Produk Kami</p>
              <p className="font-medium text-gray-700">Temukan berbagai layanan inovatif yang dirancang untuk memenuhi kebutuhan Anda. Dari kemudahan akses hingga pengalaman pengguna yang menyenangkan, kami siap melayani.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-last md:order-first flex flex-col justify-center space-y-6 p-8 rounded-3xl bg-white shadow-md">
              <p className="w-fit py-2 px-6 rounded-full font-bold text-gray-800 bg-gray-200">Resep Kami</p>
              <p className="font-medium text-gray-700">Inspirasi kuliner terbaik ada di sini. Nikmati berbagai ide memasak yang praktis dan lezat untuk menemani hari Anda.</p>
            </div>
            <img className="rounded-3xl shadow-lg w-full" src="https://i.pinimg.com/474x/fe/cd/8d/fecd8d89ca49a335ab2ed446828a3b9e.jpg" alt="Resep Kami" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
