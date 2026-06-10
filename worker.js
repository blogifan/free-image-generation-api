export default {
    async fetch(request, env) {
        if (request.method !== "POST") {
            return new Response(JSON.stringify({ error: "Método no permitido" }), { status: 405 });
        }
        try {
            const { prompt } = await request.json();
            if (!prompt) {
                return new Response(JSON.stringify({ error: "Se requiere un prompt" }), { status: 400 });
            }
            const result = await env.AI.run("@cf/stabilityai/stable-diffusion-xl-base-1.0", {
                prompt: prompt
            });
            return new Response(result, {
                headers: { "Content-Type": "image/jpeg" }
            });
        } catch (err) {
            return new Response(JSON.stringify({ error: "Error al generar" }), { status: 500 });
        }
    }
};