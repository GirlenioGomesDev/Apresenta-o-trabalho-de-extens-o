/** Adaptador para um Worker com binding D1 chamado DB. */
import { handleQuizRequest } from './quiz-service.mjs';
export default { fetch: (request, env) => handleQuizRequest(request, env) };
