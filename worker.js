exportar predeterminado {
  async fetch(solicititud, env) {
    const API_CLAVE = env.API_CLAVE;

    si (!API_CLAVE) retorno nuevo Respuesta("API_KEY sin configuración", { estatus: 500 });

    // Verificación de clave
    const url = nuevo URL(solicititud.url);
    const auth = solicititud.encabezados.get("Autorización");
    const clave de consulta = url.parámetros de búsqueda.get("clave");

    si (auth !== `Portador ${API_CLAVE}` && clave de consulta!== API_CLAVE) {
      retorno nuevo Respuesta(„Sin autorizado", { estatus: 401 });
    }

    intentar {
      const { prompt } = await solicititud.json();

      const optimizado = `${prompt}, arte lineal simple en blanco y negro, contores sólidos, grupos y llamativos exclusivamente, página de libro para colorear para adultos, alto contraste, sin sombreado, sin degradados, sin colores, fondo blanco, líneas limpias y compatibles con vectores`;

      const resultado = await env.IA.run("@cf/black-forest-labs/flux-1-schnell", {
        prompt: optimizado,
        ancho: 1024,
        alta: 1024,
        num_pasos: 8
      });

      retorno nuevo Respuesta(resultado, {
        encabezados: { "Tipo de contenido": "imagen/jpeg" }
      });
    } atrapar (e) {
      retorno nuevo Respuesta("Error: " + e.mensaje, { estatus: 500 });
    }
  }
};
