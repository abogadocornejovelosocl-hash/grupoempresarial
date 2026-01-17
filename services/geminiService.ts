
import { GoogleGenAI } from "@google/genai";
import { TaxTask, Client } from "../types";

// Fixed: Initializing GoogleGenAI strictly using the process.env.API_KEY environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateTaxSummary(tasks: TaxTask[], clients: Client[]): Promise<string> {
  const model = 'gemini-3-flash-preview';
  
  const clientData = tasks.map(task => {
    const client = clients.find(c => c.id === task.clientId);
    return {
      client: client?.name,
      rut: client?.rut,
      form: task.formType,
      status: task.status,
      missing: task.missingDocuments.join(', '),
      deadline: task.deadline
    };
  });

  const prompt = `
    Actúa como un experto asesor tributario en Chile. 
    Analiza la siguiente lista de tareas tributarias pendientes para una oficina contable y genera un reporte ejecutivo breve pero impactante para el dueño de la oficina.
    
    Tareas: ${JSON.stringify(clientData)}
    
    El reporte debe incluir:
    1. Resumen de cumplimiento general.
    2. Alertas críticas (vencimientos próximos o pasados).
    3. Recomendaciones de acción inmediata para los clientes que no han enviado documentos.
    4. Tono profesional, eficiente y claro.
    Responde en formato Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    // Fixed: Accessed .text property directly (not a method).
    return response.text || "No se pudo generar el reporte en este momento.";
  } catch (error) {
    console.error("Error generating tax summary:", error);
    return "Error al conectar con la inteligencia tributaria.";
  }
}

export async function getTaxAssistantResponse(query: string): Promise<string> {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Eres un asistente experto en normativa tributaria chilena (SII). 
    Responde la siguiente duda del contador de forma concisa y fundamentada:
    "${query}"
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    // Fixed: Accessed .text property directly (not a method).
    return response.text || "Lo siento, no tengo respuesta para eso ahora.";
  } catch (error) {
    console.error("Error in assistant:", error);
    return "Error en la consulta tributaria.";
  }
}
