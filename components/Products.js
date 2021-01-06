const Products = () => (
  <div className='products' id='products'>
    <h1>NAŠE PRODUKTY</h1>
    <div className='product'>
      <div className='product-text'>
        <h2>Rehamza Software</h2>
        <p>
          Jedná se o softwarové řešení pro podporu rehabilitace. Skládá se ze
          sady programů, které navzájem komunikují a společně vytváří
          rehabilitační prostředí pro pacienta i lékaře. Software obsahuje velké
          množství cvičebních modulů. Software umožňuje individuální nastavení
          pro široké spektrum diagnóz.
        </p>
      </div>
      <div className='product-image'>
        <img src='/helpik.jpg' alt='Helpík' className='img-shadow'></img>
      </div>
    </div>
    <div className='product'>
      <div className='product-text'>
        <h2>Future Cube</h2>
        <p>
          Speciální barevná kostka, která slouží jako prostorový bezdrátový
          ovladač. Toto čidlo má i zvukovou a vibrační vazbu. Její předností je
          snadný úchop a bezdrátové nabíjení. Vhodné pro pacienty s poruchou
          hrubé motoriky, stability, u dětí s různou formou DMO, po
          kraniotraumatu a jiných úrazech, u dětí s poruchou koncentrace,
          senzoriky. Kontraindikace nejsou známy. Je zde důležitá zraková
          kontrola a schopnost porozumění zadaným úkolům.
        </p>
      </div>
      <div className='product-image'>
        <img src='/futurecube.png' alt='Helpík' className='img-shadow'></img>
      </div>
    </div>
    <div className='product'>
      <div className='product-text'>
        <h2>Motivační robot</h2>
        <p>
          Jedná se o malého humanoidního robota, který je bezdrátově propojen s
          počítačem PC. Robot se dokáže naučit libovolné cviky a posléze je
          opakovat. Rehabilitační pracovník pomocí manipulace s robotem ukáže,
          jak cviky provádět a po spuštění programu robot cviky opakuje. Tento
          projekt je určený především dětským pacientům pro zvýšení motivace ke
          cvičení a zároveň umožňuje terapeutovi sledovat a upravovat kvalitu
          prováděných cviků.
        </p>
      </div>
      <div className='product-image'>
        <img src='/robot.jpg' alt='Helpík' className='img-shadow'></img>
      </div>
    </div>
  </div>
);
export default Products;
