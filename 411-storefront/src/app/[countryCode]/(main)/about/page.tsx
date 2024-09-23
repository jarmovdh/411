export default function About() {
  return (
    <div className="content-container mt-12 flex flex-col gap-2">
      <h1 className="text-2xl font-bold"> About</h1>
      <p>
        411 Radio is broadcasting from Amsterdam with a commitment to diverse
        music programming. Our shows blend new releases with leftfield gems
        spanning the past and present. Join us on a musical journey that brings
        enthusiasts together to celebrate the vibrant spectrum of sound.
      </p>
      <p>
        Our platform strives bo be a vibrant community built on a shared passion
        for music. Born from the desire to connect music lovers and create a
        space for authentic musical exploration, 411 Radio offers a unique blend
        of community-hosted shows and carefully curated content. Whether you're
        discovering new artists or revisiting beloved classics, 411 Radio
        provides a soundtrack for every moment.
      </p>
      <p>
        At 411 Radio, we believe in the power of music to unite, inspire, and
        transform. Join our community of passionate listeners and collectors,
        and let's celebrate the universal language of music together.
      </p>
      <p>
        At 411 Radio, we take our responsibility to artists and the music
        industry seriously. We are committed to operating our platform in full
        compliance with all relevant laws and regulations governing online radio
        broadcasting.
        <ol className="list-decimal list-inside mb-4">
          <li>
            BUMA/STEMRA License: This allows us to broadcast copyrighted musical
            works.
          </li>
          <li>
            SENA License: This permits us to use and broadcast recorded
            performances.
          </li>
        </ol>
        These licenses ensure that rights holders are fairly compensated for the
        use of their work on our platform. We respect the intellectual property
        rights of all artists, composers, and performers. Our community
        guidelines strictly prohibit the unauthorized use of copyrighted
        material, and we take swift action to address any potential
        infringements. 411 Radio is dedicated to supporting the music ecosystem.
        We believe in fair compensation for artists and work diligently to
        ensure that our operations contribute positively to the industry. If you
        have any questions or concerns regarding our licensing, copyright
        policies, or how we support artists, please don't hesitate to contact us
        at{" "}
        <a
          href="mailto:info@411.radio"
          className="text-blue-200 hover:underline"
        >
          info@411.radio
        </a>
        . We're committed to transparency and are always happy to provide more
        information on these important matters.
      </p>

      <h1>Contact</h1>
      <p>
        For any inquiries, please contact us at{" "}
        <a href="mailto:info@411.radio">info@411.radio</a>
      </p>
    </div>
  )
}
