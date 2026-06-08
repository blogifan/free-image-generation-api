export default {
  async fetch(request, env) {
    const API_KEY = env.API_KEY;

    if (!API_KEY) {
      return new Response("API_KEY no configurada", { status: 500 });
    }

    const url = new URL(request.url);
    const auth = request.headers.get("Authorization");
    const queryKey = url.searchParams.get("key");

    if (auth !== `Bearer ${API_KEY}` && queryKey !== API_KEY) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      const { prompt } = await request.json();

      const optimizedPrompt = `${prompt}, simple black and white line art, bold thick solid outlines only, coloring book page for adults, high contrast, no shading, no gradients, no colors, white background, clean vector friendly lines`;

      const result = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", {
        prompt: optimizedPrompt,
        width: 1024,
        height: 1024,
        num_steps: 8
      });

      return new Response(result, {
        headers: { "Content-Type": "image/jpeg" }
      });
    } catch (err) {
      return new Response("Error: " + err.message, { status: 500 });
    }
  }
};
Abajo escribe un commit message como Update worker.js with FLUX y haz Commit changes.
