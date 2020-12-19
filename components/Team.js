import { Image } from 'semantic-ui-react';

const Team = () => (
  <div className='team' id='team'>
    <div className='team-info'>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        sit amet porta nibh. Aenean ut volutpat ligula. Nam sagittis ac ante
        dapibus pulvinar. Aenean et risus sed ligula facilisis suscipit nec
        elementum dui. Proin eget elementum est. Nulla neque magna, feugiat ut
        ligula non, posuere ultrices nisl. Vestibulum condimentum lacus in eros
        varius, sed lacinia massa hendrerit. Vestibulum at posuere turpis. Proin
        pharetra molestie ligula. Duis id magna odio. Pellentesque vel quam eget
        mi sollicitudin fermentum ut eu odio.
      </p>
    </div>
    <div className='team-img'>
      <Image src='/cap.png'></Image>
    </div>
  </div>
);

export default Team;
