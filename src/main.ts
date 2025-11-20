import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');

  // Servir archivos estáticos desde la carpeta uploads
  app.useStaticAssets('uploads', { prefix: '/uploads' });

  // Habilitar CORS para el frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.88.218:3000'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('WFL Backend API')
    .setDescription('API REST completa para el sistema de gestión de la Waifu Football League (WFL). Proporciona endpoints para gestionar series, equipos, jugadores y autenticación de usuarios.')
    .setVersion('1.0.0')
    .addTag('auth', 'Endpoints de autenticación y autorización')
    .addTag('series', 'Gestión de series y torneos')
    .addTag('equipos', 'Administración de equipos')
    .addTag('jugadores', 'Manejo de jugadores')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('http://localhost:4000', 'Servidor de desarrollo')
    .addServer('https://api.wfl.com', 'Servidor de producción')
    .setContact('WFL Support', 'https://github.com/lans757/wfl', 'support@wfl.com')
    .setLicense('Privado', 'https://github.com/lans757/wfl/blob/main/LICENSE')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      locale: 'es',
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
    },
    customSiteTitle: 'WFL Backend API Documentation',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #1f2937 }
    `,
    customfavIcon: '/favicon.ico',
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
