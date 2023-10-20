import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from '../../utils/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const requestedUrl = request.url;

    // Vérifiez si l'URL demandée correspond à l'un des modèles dans BY_PASS_URLS
    const match = Constants.BY_PASS_URLS.some((pattern) => {
      // Remplacez les paramètres de route dans le modèle par des caractères génériques de style Express
      const patternWithWildcards = pattern.replace(/\/:([^/]+)/g, '/:*');
      
      // Utiliser la correspondance de chemin de style Express
      const isMatch = requestedUrl.match(patternWithWildcards);
      
      return !!isMatch;
    });

    return match || super.canActivate(context);
  }
}
