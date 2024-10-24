import ShortUrlForm from "../components/ShortUrl";


export default function Home() {
  return (
    <article className="flex flex-col justify-center items-center gap-4 min-h-screen bg-gray-100 dark:bg-gray-800">

      <section className="flex flex-col max-w-4xl w-fullbg-white gap-2 p-8 dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-center font-bold text-2xl md:text-5xl">Guifre Link</h1>
        <p className="text-lg text-center font-bold underline">Actualment està en una fase de desenvolupament, així que la teva url pot ser que duri màxim 24hs.</p>
        <p className="text-center">Agraeixo la teva comprensió i espero que gaudeixis de la meva eina.</p>
      </section>
      <ShortUrlForm />
    </article>
  );
}
