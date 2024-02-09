import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-hizki-sopa',
  templateUrl: './hizki-sopa.page.html',
  styleUrls: ['./hizki-sopa.page.scss'],
})
export class HizkiSopaPage implements OnInit {
  private palabras = [
    'IBAIA',
    'JAIAK',
    'ANTZOKIA',
    'MERKATUA',
    'ZUBIA',
    'GELTOKIA',
    'KALEA',
  ];
  private palabrasEncontradas: { palabra: string; tachada: boolean }[] = [];

  //AUDIOS
  audioCorrect: any;
  audioWrong: any;
  audioHelp: any;

  puntuazioa: number = 0;
  //MAPA
  mapa_visible = 'hidden';
  mapa_botoia = 'false';
  panel_visible = 'hidden';

  constructor(private renderer: Renderer2, private router: Router,private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.generarSopaDeLetras();
    console.log('Componente inicializado');

    this.audioCorrect = new Audio();
    this.audioCorrect.src = 'assets/audio/0Gunea/correctanswer.mp3';
    this.audioCorrect.load();

    this.audioWrong = new Audio();
    this.audioWrong.src = 'assets/audio/0Gunea/wronganswer.mp3';
    this.audioWrong.load();

    this.audioHelp = new Audio();
    this.audioHelp.src = 'assets/audio/0Gunea/help.mp3';
    this.audioHelp.load();

    this.activatedRoute.params.subscribe((params) => {
      console.log('Params: ', params);
    });

  }

  //Mapa erakusteko botoia aktibatzeko
  mapaErakutsi() {
    this.mapa_visible = 'visible';
    this.panel_visible = 'visible';
  }

  hurrengoJokoa() {
    const newPuntuazioa = Number(this.puntuazioa) + 5;
    const newParams = { ...this.activatedRoute.snapshot.params, puntuazioa: newPuntuazioa + 10 };
    // Luego, navega a la siguiente página con los nuevos parámetros
    this.router.navigate(['/test-galderak', newParams]);

      console.log('prueba',newParams);
  }

  audioGelditu() {
    //this.audio_active.pause()
  }

  audioJarraitu() {
    //this.audio_active.play()
  }

  getCelda(fila: number, columna: number): HTMLTableCellElement {
    const sopaDeLetrasElement = document.getElementById(
      'sopaDeLetras'
    ) as HTMLTableElement;
    return sopaDeLetrasElement.rows[fila].cells[columna];
  }

  generarSopaDeLetras() {
    const filas = 10; // Puedes ajustar según tus necesidades
    const columnas = 10; // Puedes ajustar según tus necesidades

    const sopaDeLetrasElement = document.getElementById(
      'sopaDeLetras'
    ) as HTMLTableElement;

    for (let i = 0; i < filas; i++) {
      const fila = sopaDeLetrasElement.insertRow(i);

      for (let j = 0; j < columnas; j++) {
        const celda = fila.insertCell(j);
        celda.textContent = '';
        celda.onclick = () => this.seleccionarPalabra(i, j);
      }
    }

    this.colocarPalabras();
    this.llenarEspaciosRestantes();
  }
  getPalabrasEncontradas() {
    return this.palabrasEncontradas;
  }
  llenarEspaciosRestantes() {
    const filas = 10; // Ajusta según tus necesidades
    const columnas = 10; // Ajusta según tus necesidades

    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        const celda = this.getCelda(i, j);

        if (celda.textContent === '') {
          celda.textContent = this.generarLetraAleatoria();
        }
      }
    }
  }

  generarLetraAleatoria(): string {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const indiceAleatorio = Math.floor(Math.random() * letras.length);
    return letras.charAt(indiceAleatorio);
  }

  colocarPalabras() {
    for (const palabra of this.palabras) {
      let colocada = false;

      // Intenta colocar la palabra en una posición aleatoria hasta que sea exitoso
      while (!colocada) {
        const direccion = Math.random() > 0.5 ? 'horizontal' : 'vertical';

        const fila = Math.floor(Math.random() * 10);
        const columna = Math.floor(Math.random() * 10);

        if (
          this.puedeColocarPalabra(palabra, fila, columna, direccion) &&
          this.noSeSuperponeConOtrasPalabras(
            palabra,
            fila,
            columna,
            direccion
          ) &&
          this.noIniciaOtraPalabra(palabra, fila, columna, direccion)
        ) {
          this.colocarPalabraEnSopa(palabra, fila, columna, direccion);
          colocada = true;
        }
      }
    }
  }
  noIniciaOtraPalabra(
    palabra: string,
    fila: number,
    columna: number,
    direccion: 'horizontal' | 'vertical'
  ): boolean {
    const longitud = palabra.length;

    // Verifica si la primera letra de la palabra no está dentro de otra palabra
    for (let i = 0; i < longitud; i++) {
      const nuevaFila = direccion === 'vertical' ? fila + i : fila;
      const nuevaColumna = direccion === 'horizontal' ? columna + i : columna;

      const celda = this.getCelda(nuevaFila, nuevaColumna);
      if (celda.textContent !== '' && celda.textContent !== palabra[i]) {
        return false;
      }
    }

    return true;
  }

  noSeSuperponeConOtrasPalabras(
    palabra: string,
    fila: number,
    columna: number,
    direccion: 'horizontal' | 'vertical'
  ): boolean {
    const longitud = palabra.length;

    // Verifica si la palabra no se superpone con otras palabras
    for (let i = 0; i < longitud; i++) {
      const nuevaFila = direccion === 'vertical' ? fila + i : fila;
      const nuevaColumna = direccion === 'horizontal' ? columna + i : columna;

      const celda = this.getCelda(nuevaFila, nuevaColumna);
      if (celda.textContent !== '' && celda.textContent !== palabra[i]) {
        return false;
      }
    }

    return true;
  }

  puedeColocarPalabra(
    palabra: string,
    fila: number,
    columna: number,
    direccion: 'horizontal' | 'vertical'
  ): boolean {
    const longitud = palabra.length;

    // Verifica si la palabra cabe en la dirección especificada
    if (
      (direccion === 'horizontal' && columna + longitud > 10) ||
      (direccion === 'vertical' && fila + longitud > 10)
    ) {
      return false;
    }

    // Verifica si la palabra se superpone con otra palabra
    for (let i = 0; i < longitud; i++) {
      const nuevaFila = direccion === 'vertical' ? fila + i : fila;
      const nuevaColumna = direccion === 'horizontal' ? columna + i : columna;

      const celda = this.getCelda(nuevaFila, nuevaColumna);
      if (celda.textContent !== '' && celda.textContent !== palabra[i]) {
        return false;
      }
    }

    return true;
  }

  colocarPalabraEnSopa(
    palabra: string,
    fila: number,
    columna: number,
    direccion: 'horizontal' | 'vertical'
  ) {
    for (let i = 0; i < palabra.length; i++) {
      const nuevaFila = direccion === 'vertical' ? fila + i : fila;
      const nuevaColumna = direccion === 'horizontal' ? columna + i : columna;

      const celda = this.getCelda(nuevaFila, nuevaColumna);
      celda.textContent = palabra[i];
    }
  }

  seleccionarPalabra(fila: number, columna: number) {
    const sopaDeLetrasElement = document.getElementById(
      'sopaDeLetras'
    ) as HTMLTableElement;
    const celda = sopaDeLetrasElement?.rows[fila]?.cells[columna];
    const letra = celda?.textContent;

    // if (celda?.classList.contains("seleccionada-correcta") || celda?.classList.contains("seleccionada-incorrecta")) {
    //   return;
    // } Así no se puede seleccionar una letra que ya ha sido seleccionada
    // Verifica si la palabra ya ha sido encontrada
    if (this.palabrasEncontradas.some((p) => p.palabra.charAt(0) === letra)) {
      return;
    }

    if (celda?.classList.contains('seleccionada-incorrecta')) {
      return;
    }

    const palabraSeleccionada: { fila: number; columna: number }[] = [];
    for (const palabra of this.palabras) {
      const palabraNormal = palabra;
      const palabraInvertida = palabra.split('').reverse().join('');

      if (
        palabraNormal.charAt(0) === letra ||
        palabraInvertida.charAt(0) === letra
      ) {
        const index = palabraNormal.indexOf(letra);

        if (
          columna - index >= 0 &&
          columna - index + palabraNormal.length <= 10 &&
          (palabraNormal ===
            this.obtenerPalabraHorizontal(
              fila,
              columna - index,
              palabraNormal.length
            ) ||
            palabraInvertida ===
              this.obtenerPalabraHorizontal(
                fila,
                columna - index,
                palabraNormal.length
              ))
        ) {
          // Marca la palabra completa solo si la letra seleccionada es la primera de la palabra
          if (index === 0) {
            palabraSeleccionada.push(
              ...Array.from({ length: palabraNormal.length }, (_, i) => ({
                fila,
                columna: columna - index + i,
              }))
            );
            console.log(`Palabra encontrada horizontalmente: ${palabraNormal}`);
            console.log(`Primera letra identificada: ${letra}`);
          }
          break;
        }

        if (
          fila - index >= 0 &&
          fila - index + palabraNormal.length <= 10 &&
          index === 0 && // Agregar esta condición para asegurar que sea la primera letra
          (palabraNormal ===
            this.obtenerPalabraVertical(
              fila - index,
              columna,
              palabraNormal.length
            ) ||
            palabraInvertida ===
              this.obtenerPalabraVertical(
                fila - index,
                columna,
                palabraNormal.length
              ))
        ) {
          // Marca la palabra completa solo si la letra seleccionada es la primera de la palabra
          palabraSeleccionada.push(
            ...Array.from({ length: palabraNormal.length }, (_, i) => ({
              fila: fila - index + i,
              columna,
            }))
          );
          console.log(`Palabra encontrada verticalmente: ${palabraNormal}`);
          console.log(`Primera letra identificada: ${letra}`);
          break;
        }
        if (
          fila - index >= 0 &&
          columna - index >= 0 &&
          fila - index + palabraNormal.length <= 10 &&
          columna - index + palabraNormal.length <= 10 &&
          (palabraNormal ===
            this.obtenerPalabraDiagonal(
              fila - index,
              columna - index,
              palabraNormal.length
            ) ||
            palabraInvertida ===
              this.obtenerPalabraDiagonal(
                fila - index,
                columna - index,
                palabraNormal.length
              ))
        ) {
          // Marca la palabra completa si la letra seleccionada es la primera de la palabra
          palabraSeleccionada.push(
            ...Array.from({ length: palabraNormal.length }, (_, i) => ({
              fila: fila - index + i,
              columna: columna - index + i,
            }))
          );
          console.log(`Palabra encontrada diagonalmente: ${palabraNormal}`);
          break;
        }

        if (
          fila - index >= 0 &&
          columna + index < 10 &&
          fila - index + palabraNormal.length <= 10 &&
          columna + index - palabraNormal.length + 1 >= 0 &&
          (palabraNormal ===
            this.obtenerPalabraDiagonalInversa(
              fila - index,
              columna + index,
              palabraNormal.length
            ) ||
            palabraInvertida ===
              this.obtenerPalabraDiagonalInversa(
                fila - index,
                columna + index,
                palabraNormal.length
              ))
        ) {
          // Marca la palabra completa si la letra seleccionada es la primera de la palabra
          palabraSeleccionada.push(
            ...Array.from({ length: palabraNormal.length }, (_, i) => ({
              fila: fila - index + i,
              columna: columna + index - i,
            }))
          );
          console.log(`Palabra encontrada diagonal inversa: ${palabraNormal}`);
          break;
        }
      }
    }

    if (palabraSeleccionada.length > 0) {
      this.marcarPalabraEncontrada(palabraSeleccionada);
      this.actualizarPalabrasEncontradas();
    } else {
      this.playAudio(this.audioWrong);
      celda?.classList.add('seleccionada-incorrecta');
      setTimeout(() => {
        celda?.classList.remove('seleccionada-incorrecta');
      }, 300);
    }
  }

  marcarPalabraEncontrada(
    letrasSeleccionadas: { fila: number; columna: number }[]
  ) {
    letrasSeleccionadas.forEach(({ fila, columna }) => {
      const celda = this.getCelda(fila, columna);
      this.renderer.addClass(celda, 'seleccionada-correcta');
    });

    const palabraEncontrada = this.palabras.find((palabra) => {
      const palabraNormal = letrasSeleccionadas
        .map(({ fila, columna }) => this.getCelda(fila, columna)?.textContent)
        .join('');
      const palabraInvertida = palabraNormal?.split('').reverse().join('');
      return palabra === palabraNormal || palabra === palabraInvertida;
    });

    if (palabraEncontrada) {
      this.palabrasEncontradas.push({
        palabra: palabraEncontrada,
        tachada: true,
      });
      this.playAudio(this.audioCorrect);
      if (this.palabrasEncontradas.length === this.palabras.length) {
        alert('¡Felicidades! Has encontrado todas las palabras.');
      }
    }
  }

  obtenerPalabraHorizontal(
    fila: number,
    columna: number,
    longitud: number
  ): string {
    let palabra = '';
    for (let i = 0; i < longitud; i++) {
      palabra += this.getCelda(fila, columna + i).textContent || '';
    }
    return palabra;
  }

  obtenerPalabraVertical(
    fila: number,
    columna: number,
    longitud: number
  ): string {
    let palabra = '';
    for (let i = 0; i < longitud; i++) {
      palabra += this.getCelda(fila + i, columna).textContent || '';
    }
    return palabra;
  }

  obtenerPalabraDiagonal(
    fila: number,
    columna: number,
    longitud: number
  ): string {
    let palabra = '';
    for (let i = 0; i < longitud; i++) {
      palabra += this.getCelda(fila + i, columna + i).textContent || '';
    }
    return palabra;
  }

  obtenerPalabraDiagonalInversa(
    fila: number,
    columna: number,
    longitud: number
  ): string {
    let palabra = '';
    for (let i = 0; i < longitud; i++) {
      palabra += this.getCelda(fila + i, columna - i).textContent || '';
    }
    return palabra;
  }

  obtenerListaPalabras(): string[] {
    console.log('Obteniendo lista de palabras:', this.palabras);
    return this.palabras;
  }

  actualizarPalabrasEncontradas() {
    const palabrasNoEncontradas = this.palabras.filter(
      (palabra) =>
        !this.palabrasEncontradas.find((p) => p.palabra === palabra)?.tachada
    );

    palabrasNoEncontradas.forEach((palabra) => {
      const palabraEncontrada = this.palabrasEncontradas.find(
        (p) => p.palabra === palabra
      );
      if (palabraEncontrada) {
        palabraEncontrada.tachada = true;
      }
    });

    const palabrasEncontradasHTML = this.palabrasEncontradas
      .filter((p) => p.tachada)
      .map(
        (palabra) =>
          `<span class="palabra-encontrada">${palabra.palabra}</span>`
      );

    const palabrasEncontradasElement = document.getElementById(
      'palabrasEncontradas'
    );

    // Verificación de nulidad
    if (palabrasEncontradasElement) {
      palabrasEncontradasElement.innerHTML = `
        <h4>Aurkitutako hitzak</h4>
        <ul>${palabrasEncontradasHTML
          .map((html) => `<li>${html}</li>`)
          .join('')}</ul>
      `;
    }
  }

  iluminarPrimeraLetraNoSeleccionada() {
    const sopaDeLetrasElement = document.getElementById(
      'sopaDeLetras'
    ) as HTMLTableElement;

    for (let i = 0; i < this.palabras.length; i++) {
      const palabra = this.palabras[i];

      // Verificamos si la palabra ya ha sido seleccionada
      if (
        this.palabrasEncontradas.some((p) => p.palabra === palabra && p.tachada)
      ) {
        continue;
      }

      // Buscamos la posición de la primera letra en la palabra actual
      for (let row = 0; row < sopaDeLetrasElement.rows.length; row++) {
        for (
          let col = 0;
          col < sopaDeLetrasElement.rows[row].cells.length;
          col++
        ) {
          const celda = sopaDeLetrasElement.rows[row].cells[col];

          if (celda.textContent === palabra.charAt(0)) {
            // Verificamos si la palabra se encuentra en la dirección horizontal
            if (this.puedeColocarPalabra(palabra, row, col, 'horizontal')) {
              // Marcamos la celda como iluminada
              celda.classList.add('iluminada-verde');

              // Configuramos un temporizador para quitar la clase después de un tiempo
              setTimeout(() => {
                celda.classList.remove('iluminada-verde');
              }, this.duracionIluminacion);

              // Salimos del bucle interno ya que hemos encontrado la primera letra
              return;
            }

            // Verificamos si la palabra se encuentra en la dirección vertical
            if (this.puedeColocarPalabra(palabra, row, col, 'vertical')) {
              // Marcamos la celda como iluminada
              celda.classList.add('iluminada-verde');

              // Configuramos un temporizador para quitar la clase después de un tiempo
              setTimeout(() => {
                celda.classList.remove('iluminada-verde');
              }, this.duracionIluminacion);

              // Salimos del bucle interno ya que hemos encontrado la primera letra
              return;
            }
          }
        }
      }
    }
  }

  private duracionIluminacion = 100;

  showHelpText() {
    this.playAudio(this.audioHelp);
    const helpTextElement = document.getElementById('helpText');
    if (helpTextElement) {
      helpTextElement.textContent = 'Laguntza eskatu duzu';
    }
  }

  playAudio(audio: HTMLAudioElement) {
    audio.play();
  }
}
