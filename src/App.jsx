import { useState } from 'react';
import './App.css'
import { stats } from './content/stats'
import { useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState(0);
  const [gifs, setGifs] = useState([]); // [gif1, gif2, gif3, gif4, gif5
  const startCounter = () => {
    let counter = 0;
    let interval = setInterval(() => {
      counter += 193;
      setMessages(counter);
      if (counter >= 11194) {
        clearInterval(interval);
      }
    }, 0.1);
  }
  const getGifts = async () => {
    const { data } = await fetch('https://api.giphy.com/v1/gifs/search?api_key=EdCQeotGRlrGCjaCg3x18j2as4mp1C3n&q=party&limit=100').then(res => res.json())
    setGifs(data);
  }

  useEffect(() => {
    startCounter();
    getGifts();
  }, []);

  return (
    <div>
      <div className='flex flex-wrap justify-center fixed z-0 scale-125'>
        {gifs.map((gif, index) => <img key={'gif' + index} src={gif.images.fixed_width_downsampled.webp} />)}
      </div>
      <div className='flex flex-wrap fixed z-10 bg-zinc-950 opacity-95 backdrop-saturate-0 w-full h-full'></div>
      <div className="flex justify-center absolute w-full pb-8 p-2 md:p-4 backdrop-saturate-0 z-20">
        <div className='grid grid-cols-1 md:grid-cols-3 max-w-screen-xl w-full gap-1 md:gap-3'>
          <div className='md:col-span-3 bg-zinc-800 rounded-3xl p-3 mb-1 md:p-5 md:px-14 flex items-center'>
            <img className='h-8 md:h-12 mr-3 md:mr-6' src="/memerrr.png" />
            <div>
              <h1 className='text-xl md:text-2xl text-white font-black italic text-left'>Premios</h1>
              <h1 className='text-2xl md:text-4xl font-black italic text-left text-amber-400'>Memer 2023</h1>
            </div>
          </div>
          <div className='md:col-span-2 w-full rounded-3xl text-white px-12 py-24 flex flex-col bg-[length:-1000%_1000%] hover:bg-[length:300%_400%] bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-900 border-4 outline outline-0 hover:outline-2 outline-amber-400 duration-75 transition-all'
          /*style={{
            background: 'radial-gradient(193.85% 139.52% at 100% 97.3%, rgba(214, 202, 141, 0.23) 0%, rgba(214, 205, 160, 0.23) 0%, rgba(109, 104, 78, 0.72) 24.91%, rgba(39, 39, 42, 0.67) 65.1%, #27272A 100%)',
            backdropFilter: 'blur(2px)'
          }}*/
          >
            <div className='flex-1 flex flex-col items-center justify-center'>
              <p className='text-6xl md:text-9xl font-black italic text-white drop-shadow-[0px_0px_8px_rgba(251,191,36,1)]'>¡{new Intl.NumberFormat('es-MX').format(messages)}!</p>
              <p className='text-md md:text-xl font-bold py-7'>mensajes enviados</p>

            </div>
          </div>
          {stats.categorias.map((categoria, index) => {
            return (
              <div className='bg-zinc-800 hover:bg-[#20201b] rounded-3xl text-white p-5 border border-zinc-900 border-4 outline outline-0 hover:outline-2 outline-amber-400 duration-75 transition-all' key={index}>
                <h2 className='text-3xl font-black italic text-white drop-shadow-[0px_0px_8px_rgba(251,191,36,1)]'>{categoria.categoria.toUpperCase()}</h2>
                {categoria.usuarios.sort((usuarioA, usuarioB) => {
                  return usuarioB.puntaje - usuarioA.puntaje;
                }).map((usuario, index) => {
                  if (index > 0)
                    return (
                      <div className='flex my-3 items-center'
                        key={"user" + index}
                      >
                        <p className='w-8 font-bold italic'>#{index}</p>
                        <img src={stats.categorias[0].usuarios.find(user => user.usuario == usuario.usuario).avatar} className={`w-10 h-10 rounded-full mr-3 ml-1 text-center border border-zinc-800 border-2 outline outline-2 ${index == 1 ? 'outline-amber-400' : index == 2 ? 'outline-slate-400' : index == 3 ? 'outline-amber-800' : 'outline-zinc-600'}`} />
                        <p
                          className={`${index == 1 ? 'text-2xl font-black' : index == 2 ? 'text-xl font-bold' : index == 3 ? 'text-lg font-semibold' : ''} ${index > 3 ? 'font-semibold text-md' : ''} flex-1`}
                        >
                          {usuario.usuario}
                        </p>
                        <p
                          key={"user" + index}
                          className={`${index == 1 ? 'text-2xl' : index == 2 ? 'text-xl' : index == 3 ? 'text-lg' : ''} ${index < 4 ? 'font-bold' : ''} text-right w-fit`}
                        >
                          {new Intl.NumberFormat('es-MX').format(usuario.puntaje)}
                        </p>
                      </div>
                    )
                })}
              </div>
            )
          })
          }
          <div className='bg-zinc-800 hover:bg-[#20201b] rounded-3xl text-white p-5 border border-zinc-900 border-4 outline outline-0 hover:outline-2 outline-amber-400 duration-75 flex flex-col justify-between h-fit transition-all'>
            <h2 className='text-3xl font-black italic text-white drop-shadow-[0px_0px_8px_rgba(251,191,36,1)]'>PRIMER MENSAJE</h2>
            <div className='flex my-3 items-center flex-col'>
              <img src="/PM.png" />
            </div>
            <div className="flex items-center pt-4">
              <img src={stats.categorias[0].usuarios.find(user => user.usuario == "Isra").avatar} className='w-10 h-10 rounded-full text-center border border-zinc-800 border-2 outline outline-2 outline-amber-400' />
              <p
                className='font-black text-2xl ml-3'
              >
                Isra
              </p>
            </div>
          </div>
          <div className='bg-zinc-800 hover:bg-[#20201b] rounded-3xl text-white p-5 border border-zinc-900 border-4 outline outline-0 hover:outline-2 outline-amber-400 duration-75 flex flex-col justify-between h-fit transition-all'>
            <h2 className='text-3xl font-black italic text-white drop-shadow-[0px_0px_8px_rgba(251,191,36,1)]'>ÚLTIMO MENSAJE</h2>
            <div className='flex my-3 items-center flex-col'>
              <img src="/um.png" />
            </div>
            <div className="flex items-center pt-4">
              <img src={stats.categorias[0].usuarios.find(user => user.usuario == "milanwiche").avatar} className='w-10 h-10 rounded-full text-center border border-zinc-800 border-2 outline outline-2 outline-amber-400' />
              <p
                className='font-black text-2xl ml-3'
              >
                milanwiche
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
