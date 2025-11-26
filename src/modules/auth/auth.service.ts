import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('Validating user:', email);
    const user = await this.prisma.user.findUnique({ where: { email } });
    console.log('User found:', !!user);
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log('Password match successful');
      const { password: _, ...result } = user;
      return result;
    }
    console.log('Password match failed or user not found');
    return null;
  }

  async login(loginDto: LoginDto) {
    console.log('Login attempt for:', loginDto.email);
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      console.log('Login failed: invalid credentials');
      throw new UnauthorizedException('Credenciales inválidas');
    }
    console.log('Login successful for user:', user.id);
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerDto: RegisterDto) {
    try {
      // Verificar si el email ya existe
      const existingUser = await this.prisma.user.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Error al registrar usuario. Intenta con otro correo.');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          name: registerDto.name,
          role: registerDto.role || 'user', // Permitir especificar rol, por defecto 'user'
        },
      });
      const { password, ...result } = user;
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
        user: result,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Error al registrar usuario.');
    }
  }

  async updateProfileImage(userId: number, file: Express.Multer.File) {
    const imagePath = `/uploads/${file.filename}`;
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { imagen: imagePath },
      select: {
        id: true,
        email: true,
        name: true,
        imagen: true,
      },
    });
    return user;
  }
}