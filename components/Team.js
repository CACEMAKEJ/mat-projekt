import { Image } from 'semantic-ui-react';

const Team = () => (
  <div className='team' id='team'>
    <div className='team-info'>
      <h2>Ing. Pavel Čáp</h2>
      <p>Od roku 1996 se věnuje programování.</p>
      <p>
        Od roku 2013 začal vyvíjet rehabilitační pomůcky společně s Hamzovou
        léčebnou.
      </p>
      <p>
        V roce 2015 dostal cenu Duhové Křídlo za vývoj rehabilitačních pomůcek a
        vedení žáků k pomoci druhým.
      </p>
      <p>Od roku 2017 získal ocenění Microsoft Innovative Educator Expert.</p>
    </div>
    <div className='team-img'>
      <Image src='/cap.png'></Image>
    </div>
  </div>
);

export default Team;
