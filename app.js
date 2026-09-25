/* Astro Shore — simulación creativa, sin datos astronómicos reales.
   Cambia estas constantes para ajustar los tiempos. */
(() => {
  'use strict';
  const CHANGE_MS = 4 * 60 * 1000;
  const IMAGE_MS = 3000;
  const root = document.getElementById('astro-shore');
  if (!root) return;
  const $ = selector => root.querySelector(selector);
  const asset = path => (globalThis.ASTRO_ASSETS || {})[path] || path;
  const planets = [
    {id:'mercurio',name:'Mercurio',max:1.35,
      who:'Es el chico astuto, comunicativo y divertido del grupo. Siempre tiene un dato curioso, una respuesta ingeniosa y mil conversaciones abiertas. Su talento: conectar ideas y personas sin perder la chispa.',
      direct:['Tiene el chat encendido.','Anda sociable, rápido de ideas y con ganas de contarlo todo. Hoy es ese amigo que convierte una charla cualquiera en un plan buenísimo.','En esta historia, te invita a expresar tus ideas, iniciar esa conversación pendiente y probar algo nuevo. Dale espacio a escuchar: una buena charla va en dos sentidos.'],
      retro:['Está releyendo sus mensajes.','Baja el ritmo y se queda pensando en lo que dijo… y en lo que quiso decir. No ha perdido su ingenio: está ordenando el ruido de su cabeza.','Su mood te propone releer antes de enviar, aclarar malentendidos y retomar una idea olvidada. No hace falta resolver todas las conversaciones hoy.']},
    {id:'venus',name:'Venus',max:0.95,
      who:'Es la chica encantadora, cariñosa y con un estilo imposible de ignorar. Le gustan los vínculos bonitos, el arte y los pequeños placeres. Sabe convertir un café cualquiera en una cita especial.',
      direct:['Tiene ganas de conectar.','Está afectuosa, creativa y lista para compartir lo que le gusta. Lleva el corazón abierto y encuentra belleza hasta en los detalles más sencillos.','Su energía de personaje te invita a cuidar tus vínculos, expresar cariño y disfrutar algo bonito sin complicarlo. Un gesto pequeño también puede decir mucho.'],
      retro:['Se está eligiendo a sí misma.','Se toma un respiro de agradar a todo el mundo. Está descubriendo qué quiere de verdad y qué relaciones le permiten ser ella misma.','Puedes tomar su historia como un recordatorio para revisar tus gustos y tus límites. Antes de decir que sí por compromiso, pregúntate si también lo quieres tú.']},
    {id:'marte',name:'Marte',max:0.65,
      who:'Es el chico valiente, competitivo y de mecha cortita. Si hay un reto, ya se apuntó. Tiene un corazón apasionado y una energía contagiosa, aunque a veces actúa antes de escuchar el plan completo.',
      direct:['Ya se puso los tenis.','Está decidido y listo para dar el primer paso. Quiere moverse, defender sus ideas y ponerle acción a todo eso que llevaba tiempo imaginando.','Su actitud te invita a empezar una tarea pendiente o moverte un poco. Usa el entusiasmo para avanzar, sin convertir cada diferencia en una competencia.'],
      retro:['Está contando hasta diez.','La prisa le empieza a pesar y necesita revisar hacia dónde va. Su fuerza sigue ahí, pero ahora quiere usarla con intención y menos impulso.','Su historia te propone hacer una pausa antes de discutir, descansar cuando lo necesites y dividir los retos grandes en pasos pequeños.']},
    {id:'jupiter',name:'Júpiter',max:0.22,
      who:'Es la chica optimista, generosa y aventurera que siempre dice: «¿Y si lo intentamos?». Le encanta aprender, viajar y compartir lo que descubre. Contagia ilusión, aunque a veces promete más planes de los que caben en un día.',
      direct:['Va por la siguiente aventura.','Está entusiasmada, curiosa y con ganas de ampliar su mundo. Ve posibilidades en todas partes y quiere llevar a sus amigos con ella.','Su personaje te anima a aprender algo, conocer una perspectiva distinta o atreverte con un proyecto. Acompaña la ilusión con un plan que sí quepa en tu agenda.'],
      retro:['Está revisando su brújula.','Hace una pausa para preguntarse qué experiencias le aportan de verdad. No quiere coleccionar aventuras: quiere que tengan sentido para ella.','Su mood te invita a revisar una meta y reconocer lo que ya aprendiste. Crecer también puede ser elegir menos cosas y dedicarles más atención.']},
    {id:'saturno',name:'Saturno',max:0.12,
      who:'Es la chica seria, leal y organizada del grupo. Parece exigente, pero es quien se queda cuando las cosas se complican. Cree en los acuerdos claros, los límites sanos y el valor de hacer las cosas con paciencia.',
      direct:['Tiene el plan bajo control.','Está firme y enfocada. No necesita hacerlo todo hoy: prefiere cumplir una promesa pequeña y construir algo que dure.',
        'Su historia te invita a ordenar prioridades, poner un límite claro y avanzar con constancia. Un paso sostenible vale más que una lista imposible.'],
      retro:['Está aflojando la exigencia.','Revisa las reglas que se impuso y se pregunta cuáles todavía le sirven. También está aprendiendo que pedir ayuda no le quita fortaleza.','Su actitud te propone distinguir tus responsabilidades de las que cargaste por costumbre. Ajustar un plan no significa que hayas fallado.']},
    {id:'urano',name:'Urano',max:0.055,
      who:'Es el chico original, independiente y un poquito impredecible. Llega con una idea rarísima que termina siendo brillante. Quiere espacio para experimentar y amigos con quienes pueda ser completamente él mismo.',
      direct:['Trae una idea fuera del guion.','Está inquieto, inventivo y dispuesto a probar otra manera de hacer las cosas. La rutina le queda chica y busca una ventana nueva.',
        'Su personaje te invita a cambiar un detalle de tu rutina o resolver algo de otra forma. Puedes experimentar sin tener que reinventar tu vida entera.'],
      retro:['Está reinventándose por dentro.','Por fuera parece tranquilo; por dentro está cuestionando todo. Necesita reconocer qué cambios nacen de él y cuáles solo siguen el ruido de los demás.','Su mood te propone darte espacio para pensar distinto y revisar una costumbre automática. No tienes que anunciar cada cambio para que sea valioso.']},
    {id:'neptuno',name:'Neptuno',max:0.032,
      who:'Es el chico sensible, soñador y artístico que hace una playlist para cada emoción. Tiene mucha imaginación y suele notar cómo se sienten los demás. A veces se pierde en las nubes, pero vuelve con una idea preciosa.',
      direct:['Está en modo inspiración.','La música, los colores y las historias le llegan directo al corazón. Quiere crear, acompañar y dejar que la imaginación haga su magia.',
        'Su historia te invita a dibujar, escuchar música o dedicar un momento a algo creativo. Disfruta imaginar y después elige un pequeño paso para darle forma.'],
      retro:['Está despejando la neblina.','Se aparta un momento del ruido para distinguir lo que siente de lo que imagina. Busca un poco de claridad sin renunciar a su sensibilidad.','Su mood te recuerda que puedes pedir explicaciones en lugar de adivinar lo que otros piensan. Date un respiro y vuelve a lo concreto cuando todo parezca confuso.']},
    {id:'pluton',name:'Plutón',max:0.018,
      who:'Es el chico intenso, reservado y magnético del grupo. No le interesan las conversaciones de adorno: quiere saber qué hay de verdad. Le cuesta soltar, pero cuando decide cambiar, lo hace desde el fondo.',
      direct:['Está listo para cerrar una etapa.','Se siente decidido a dejar atrás lo que ya no va con él. No necesita hacer ruido: sus cambios más importantes empiezan con una decisión honesta.',
        'Su personaje te invita a dejar una costumbre que ya no te sirve o terminar un pendiente que ocupa demasiado espacio. Puedes empezar con algo pequeño.'],
      retro:['Está mirando hacia dentro.','Anda introspectivo y reconoce emociones que había dejado guardadas. Hoy prefiere entenderse antes de intentar controlar todo a su alrededor.','Su historia te propone escribir lo que sientes, reconocer un límite y tratarte con paciencia. No necesitas tener todas las respuestas para conocerte un poco mejor.']}
  ];
  // La imagen 0 es el archivo original sin número: aparece en ambos estados.
  const imageSequence = direct => direct ? [0,1,2,3] : [0,4,5,6];
  let selected = null;
  let openedAt = 0;
  let lastPeriod = 0;
  let lastSecond = -1;
  let lastFrame = performance.now();
  let startedAt = Date.now();
  let hasEntered = false;
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const telemetry = (p, elapsed) => {
    const period = Math.floor(elapsed / CHANGE_MS);
    return { direct:p.isDirect, period, phase:(elapsed % CHANGE_MS) / CHANGE_MS };
  };
  // Reparto nuevo en cada revisión: siempre mixto y nunca cuatro/cuatro.
  // Se sortea desde cero: cada planeta puede mantener su estado anterior.
  function reviewDirections() {
    const counts = [1, 2, 3, 5, 6, 7];
    const directCount = counts[Math.floor(Math.random() * counts.length)];
    const order = planets.map((_, index) => index);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const directIndices = new Set(order.slice(0, directCount));
    let changed = 0;
    planets.forEach((p, index) => {
      const next = directIndices.has(index);
      if (p.isDirect !== next) {
        changed++;
        if (selected === index) openedAt = Date.now();
      }
      p.isDirect = next;
    });
    return changed;
  }
  reviewDirections();
  const velocity = (p, time, state) => {
    const magnitude = p.max * (0.10 + 0.90 * Math.sin(Math.PI * state.phase)) * (1 + .035 * Math.sin(time / 6000 + p.max));
    return (state.direct ? 1 : -1) * magnitude;
  };
  const format = n => `${n >= 0 ? '+' : '−'}${Math.abs(n).toFixed(3)} °/día`;
  // Estrellas deterministas: no parpadean ni cambian al abrir una ficha.
  let seed = 42;
  const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  for(let i=0;i<145;i++){
    const star=document.createElement('span');star.className='as-star';star.textContent=i%8===0?'✧':'✦';
    star.style.cssText=`left:${random()*100}%;top:${random()*100}%;font-size:${i%8===0?17:7+random()*6}px;opacity:${.4+random()*.6}`;
    $('.as-stars').append(star);
  }
  const nodes = planets.map((p,i) => {
    const lane = document.createElement('div');lane.className='as-lane';lane.style.top=`${i*100}px`;
    lane.innerHTML=`<svg class="as-orbit" viewBox="0 0 1000 85" preserveAspectRatio="none" aria-hidden="true"><path d="M -20 54 Q 500 38 1020 54"/></svg><button class="as-planet" data-planet="${p.id}" type="button" aria-label="Conocer a ${p.name}"><span class="as-telemetry">Dirección: <strong class="as-label-direction">Directo →</strong><br><span class="as-label-speed"></span></span><img src="${asset('assets/'+p.id+'-planeta.png')}" alt="" width="66" height="66"><span class="as-planet-name as-sr">${p.name}</span></button>`;
    $('.as-orbits').append(lane);
    const button=lane.querySelector('button');
    button.addEventListener('click',()=>openPlanet(i));
    const width=root.clientWidth;
    return {button,position:(156+Math.max(0,width-156)*(i+.5)/8)/(width+156),speed:button.querySelector('.as-label-speed'),direction:button.querySelector('.as-label-direction')};
  });
  // Precalienta la galería para que cada cambio de foto sea inmediato.
  function preload(p){for(let n=0;n<7;n++){const img=new Image();img.src=asset(`assets/${p.id}-${n}.webp`);}}
  function openPlanet(index){
    selected=index;openedAt=Date.now();root.classList.add('as-detail-open');
    $('.as-universe').hidden=true;$('.as-detail').hidden=false;
    $('.as-name').textContent=planets[index].name;
    $('.as-personality').textContent=planets[index].who;
    preload(planets[index]);renderDetail(Date.now()-startedAt);
    $('.as-back').focus({preventScroll:true});
  }
  function goBack(){
    const index=selected;selected=null;root.classList.remove('as-detail-open');
    $('.as-detail').hidden=true;$('.as-universe').hidden=false;
    if(index!==null)nodes[index].button.focus({preventScroll:true});
  }
  $('.as-back').addEventListener('click',goBack);
  $('.as-enter').addEventListener('click',()=>{
    hasEntered=true;startedAt=Date.now();lastFrame=performance.now();lastSecond=-1;
    $('.as-welcome').hidden=true;
    $('.as-universe').hidden=false;
    nodes[0].button.focus({preventScroll:true});
    root.scrollIntoView({block:'start',behavior:'instant'});
  });
  const conclusionButton=$('.as-conclusion-toggle');
  function closeConclusion(){
    $('.as-conclusion').hidden=true;
    $('.as-universe').hidden=false;
    root.classList.remove('as-detail-open');
    conclusionButton.focus();
  }
  conclusionButton.addEventListener('click',()=>{
    $('.as-universe').hidden=true;
    $('.as-conclusion').hidden=false;
    root.classList.add('as-detail-open');
    $('.as-conclusion-back').focus({preventScroll:true});
    root.scrollIntoView({block:'start',behavior:'instant'});
  });
  $('.as-conclusion-back').addEventListener('click',closeConclusion);
  root.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    if(!$('.as-conclusion').hidden)closeConclusion();
    else if(selected!==null)goBack();
  });
  function renderDetail(elapsed){
    if(selected===null)return;
    const p=planets[selected],state=telemetry(p,elapsed);
    const text=state.direct?p.direct:p.retro;
    $('.as-direction').textContent=state.direct?'Directo →':'← Retrógrado';
    $('.as-speed').textContent=format(velocity(p,elapsed,state));
    $('.as-status-title').textContent=text[0];$('.as-status-text').textContent=text[1];$('.as-effect-text').textContent=text[2];
    const seq=imageSequence(state.direct);
    const imageNumber=seq[Math.floor((Date.now()-openedAt)/IMAGE_MS)%seq.length];
    const portrait=$('.as-portrait');
    const key=`${p.id}-${imageNumber}`;
    if(portrait.dataset.key!==key){portrait.src=asset(`assets/${key}.webp`);portrait.dataset.key=key;portrait.alt=`Personaje de ${p.name}: ${imageNumber===0?'retrato principal':`expresión ${imageNumber}`}`;}
  }
  let boardWidth=$('.as-orbits').clientWidth || root.clientWidth;
  new ResizeObserver(()=>{boardWidth=root.clientWidth;}).observe(root);
  function tick(now){
    if(!root.isConnected)return;
    if(!hasEntered){lastFrame=now;requestAnimationFrame(tick);return;}
    const elapsed=Date.now()-startedAt,period=Math.floor(elapsed/CHANGE_MS);
    const dt=Math.min((now-lastFrame)/1000,.1);lastFrame=now;
    if(period!==lastPeriod){
      lastPeriod=period;
      const changed=reviewDirections();
      $('.as-announcement').textContent=changed
        ? `Revisión de la simulación: ${changed} planetas cambiaron de dirección.`
        : 'Revisión de la simulación: todos mantienen su dirección anterior.';
    }
    nodes.forEach((node,i)=>{
      const p=planets[i],state=telemetry(p,elapsed);
      if(!motionPreference.matches){
        const pxPerSecond=(12+(7-i)*2.4)*(.25+.75*Math.sin(Math.PI*state.phase));
        node.position+=(state.direct?1:-1)*pxPerSecond*dt/(boardWidth+156);
        node.position=((node.position%1)+1)%1;
      }
      const x=node.position*(boardWidth+156)-156;
      const center=(x+78)/boardWidth;
      const y=46+8*Math.pow(2*center-1,2)-26;
      node.button.style.transform=`translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`;
    });
    const second=Math.floor(elapsed/1000);
    if(second!==lastSecond){
      lastSecond=second;
      const left=Math.ceil((CHANGE_MS-elapsed%CHANGE_MS)/1000);
      $('.as-countdown').textContent=`Revisión en ${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`;
      nodes.forEach((node,i)=>{const p=planets[i],state=telemetry(p,elapsed);node.direction.textContent=state.direct?'Directo →':'← Retrógrado';node.speed.textContent=format(velocity(p,elapsed,state));});
      renderDetail(elapsed);
    }
    requestAnimationFrame(tick);
  }
// Composición original de Astro Shore: house espacial, 124 BPM, 16 compases.
// Se sintetiza localmente: no requiere servicios, descargas ni archivos de terceros.
function synthAstroTrack(rate = 22050) {
  const frames = Math.round(rate * 16 * 4 * 60 / 124);
  const duration = frames / rate;
  const beat = duration / 64;
  const drums = [new Float32Array(frames), new Float32Array(frames)];
  const music = [new Float32Array(frames), new Float32Array(frames)];
  const tau = Math.PI * 2;
  let seed = 81029;
  const noise = () => {seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2147483648 - 1;};
  const hz = midi => 440 * Math.pow(2, (midi - 69) / 12);
  function add(bus, start, length, waveform, gain, pan = 0) {
    const offset = Math.round(start * rate), n = Math.floor(length * rate);
    const l = Math.sqrt((1-pan)/2), r = Math.sqrt((1+pan)/2);
    for(let i=0;i<n;i++) {
      const t=i/rate, sample=waveform(t,i)*gain, at=(offset+i)%frames;
      bus[0][at]+=sample*l;bus[1][at]+=sample*r;
    }
  }
  const chords = [[53,56,60,63],[49,53,56,60],[56,60,63,67],[51,55,58,65]];
  const roots = [41,37,44,39];
  const motifs = [[0,2,1,3],[0,1,2,1],[2,1,3,2],[0,2,3,1]];
  for(let bar=0;bar<16;bar++) {
    const start=bar*4*beat, chord=chords[bar%4];
    const lift=bar>=4&&bar<12?1:.82;
    for(let b=0;b<4;b++) {
      const at=start+b*beat;
      add(drums,at,.48,t=>{
        const phase=tau*(47*t+125*.019*(1-Math.exp(-t/.019)));
        return Math.sin(phase)*Math.exp(-t*11)*Math.min(1,t/.0025)+noise()*.055*Math.exp(-t*160);
      },.72);
      if(b===1||b===3) {
        let low=0;
        add(drums,at,.19,t=>{
          const n=noise();low=.75*low+.25*n;
          const burst=Math.exp(-t*24)*(t<.026?(.3+.7*Math.pow(Math.sin(t*650),2)):1);
          return (n-low)*burst+.13*Math.sin(tau*185*t)*Math.exp(-t*35);
        },.26);
      }
      let previous=0;
      add(drums,at+beat*.5,.14,(t)=>{const n=noise(),high=n-previous;previous=n;return high*Math.exp(-t*36)*Math.min(1,t/.001);},.09*lift,b%2?.25:-.25);
      for(const sub of [.25,.75]){
        let prior=0;
        add(drums,at+beat*sub,.048,t=>{const n=noise(),high=n-prior;prior=n;return high*Math.exp(-t*92);},.033*lift,sub===.25?-.45:.45);
      }
    }
    // Bajo sincopado con ataque suave; se aparta del bombo mediante bombeo.
    for(const [k,step] of [0,.75,1.5,2,2.75,3.5].entries()) {
      const frequency=hz(roots[bar%4]+(k===5&&bar%2===1?12:0));
      const len=beat*(k===5?.4:.58);
      add(music,start+step*beat,len,t=>{
        const phase=tau*frequency*t;
        const osc=Math.sin(phase)+.28*Math.sin(2*phase)+.13*Math.sin(3*phase)+.07*Math.sin(4*phase);
        return osc*Math.min(1,t/.006)*Math.exp(-t*8)*Math.min(1,(len-t)/.022);
      },.27);
    }
    // Acordes abiertos y ligeramente desafinados para una sensación espacial.
    chord.forEach((note,j)=>{
      const f=hz(note),length=4*beat+.55;
      add(music,start,length,t=>{
        const envelope=Math.min(1,t/.22)*Math.min(1,(length-t)/.7);
        const tone=.55*Math.sin(tau*f*.998*t)+.45*Math.sin(tau*f*1.002*t)+.12*Math.sin(tau*f*2*t);
        return tone*envelope*(.85+.15*Math.sin(tau*.25*t+j));
      },.040,j%2?.65:-.65);
    });
    // Melodía de campanas sintéticas con ecos que alternan de lado.
    [0.5,1.25,2.5,3.25].forEach((step,k)=>{
      const note=chord[motifs[Math.floor(bar/4)][k]]+24;
      const f=hz(note),gain=.10*(bar<4?.65:1);
      const voice=t=>Math.sin(tau*f*t+.7*Math.sin(tau*f*2*t)*Math.exp(-t*9))*Math.exp(-t*6)*Math.min(1,t/.003);
      add(music,start+step*beat,.9,voice,gain,k%2?.25:-.25);
      for(let echo=1;echo<=3;echo++) add(music,start+(step+echo*.75)*beat,.9,voice,gain*Math.pow(.33,echo),echo%2?.75:-.75);
    });
    if(bar===7||bar===15) {
      let lp=0;
      add(music,start+3*beat,beat,t=>{const n=noise();lp=.94*lp+.06*n;return lp*Math.pow(t/beat,2)*Math.min(1,(beat-t)/.015);},.17,.1);
    }
  }
  const channels=[new Float32Array(frames),new Float32Array(frames)];
  let peak=0;
  for(let i=0;i<frames;i++) {
    const phase=(i/rate)%beat;
    const pump=.28+.72*(1-Math.exp(-phase*11));
    for(let c=0;c<2;c++){
      const value=Math.tanh((drums[c][i]+music[c][i]*pump)*1.12);
      channels[c][i]=value;peak=Math.max(peak,Math.abs(value));
    }
  }
  // Pico máximo con margen para evitar saturación y bucle sin clic de borde.
  const scale=.88/Math.max(peak,.001),fade=Math.round(rate*.003);
  for(let i=0;i<frames;i++)for(let c=0;c<2;c++)channels[c][i]*=scale*Math.min(1,i/fade,(frames-1-i)/fade);
  return {channels,rate,duration};
}


  // El sonido se inicia solo tras pulsar el botón y continúa entre fichas.
  let musicContext=null,musicGain=null,musicSource=null;
  const audioButton=$('.as-audio-toggle');
  const volumeInput=$('.as-volume');
  function reflectMusicState(){
    const playing=musicContext?.state==='running' && !!musicSource;
    audioButton.setAttribute('aria-pressed',String(playing));
    audioButton.textContent=playing?'Ⅱ Pausar música':musicSource?'▶ Reanudar música':'▶ Activar música';
  }
  audioButton.addEventListener('click',async()=>{
    if(audioButton.disabled)return;
    audioButton.disabled=true;
    try{
      const AudioAPI=globalThis.AudioContext || globalThis.webkitAudioContext;
      if(!AudioAPI)throw new Error('Audio no disponible');
      if(!musicContext){
        musicContext=new AudioAPI();
        musicContext.addEventListener('statechange',()=>{if(!audioButton.disabled)reflectMusicState();});
      }
      if(musicSource && musicContext.state==='running'){
        await musicContext.suspend();
        $('.as-audio-status').textContent='Música pausada.';
      }else{
        await musicContext.resume();
        if(!musicSource){
          audioButton.textContent='Preparando música…';
          await new Promise(resolve=>setTimeout(resolve,30));
          const track=synthAstroTrack();
          const buffer=musicContext.createBuffer(2,track.channels[0].length,track.rate);
          track.channels.forEach((channel,i)=>buffer.copyToChannel(channel,i));
          musicGain=musicContext.createGain();
          musicGain.gain.value=Number(volumeInput.value)/100;
          musicGain.connect(musicContext.destination);
          musicSource=musicContext.createBufferSource();musicSource.buffer=buffer;musicSource.loop=true;
          musicSource.connect(musicGain);musicSource.start();
        }
        $('.as-audio-status').textContent='Música de antro espacial activada.';
      }
    }catch(error){
      $('.as-audio-status').textContent='No se pudo iniciar el audio. Pulsa el botón para volver a intentarlo.';
      if(musicContext && !musicSource){await musicContext.close().catch(()=>{});musicContext=null;}
    }finally{audioButton.disabled=false;reflectMusicState();}
  });
  volumeInput.addEventListener('input',()=>{
    if(musicGain)musicGain.gain.setTargetAtTime(Number(volumeInput.value)/100,musicContext.currentTime,.025);
  });
  globalThis.addEventListener('pagehide',()=>{if(musicContext)musicContext.close().catch(()=>{});},{once:true});

  tick(performance.now());
})();
